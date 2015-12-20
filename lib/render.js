var fsMore = require('./helper/file'),
    log = require('./helper/log'),
    marked = require('marked'),
    swig = require('swig'),
    yaml = require('yamljs'),
    fs = require('fs-extra'),
    path = require('path');

/*
 * global data
 */

var rootPath = process.cwd(),
    config = require(rootPath + '/config'),
    bookName = config.name || 'chapters';;

config.theme = config.theme || 'default';

var destPath = rootPath + '/dest/',
    chapterPath = rootPath + "/source/chapters",
    pagePath = rootPath + "/source/pages/",
    layoutdir = rootPath + '/source/themes/' + config.theme + '/layout/',
    chapterLayout = layoutdir + '/chapter',
    pageLayout = layoutdir + '/page',
    indexLayout = layoutdir + '/index',
    themePublic = rootPath + '/source/themes/' + config.theme + '/public';


/*index page*/
var category = [];

/*
 * swig config
 */
swig.setDefaults({
    autoescape: false,
    highlight: function(code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});


var chapter = function() {
    this.booktitle = config.title;
    this.themePath = rootPath + '/source/themes/' + config.theme;
}

/*
 * private method
 */
var markParse = function(data) {
    return marked(data);
}

/*public path process*/
var publicPath = function(data) {
    if (!config.server.subdir) return;
    var public_Path = path.join(path.sep, config.server.subdir, path.sep);

    /*使用正则替换
    匹配规则：href="/public/
    */
    data = data.replace(/\s*href\s*=\s*"\s*\/public\/|\s*href\s*=\s*'\s*\/public\//g, 'href="' + public_Path + 'public/');
    return data;
}



var swigRender = function(layout, filename, locals) {
    var dest = '';

    swig.renderFile(layout + '.swig', locals, function(err, fileData) {
        if (err) throw err;
        filename = filename.replace(/.md/, '.html');
        if (layout.slice(-7) == 'chapter') {
            dest = path.join(destPath, bookName, filename);
        } else {
            dest = path.join(destPath, filename);
        }

        fileData = publicPath(fileData);
        fsMore.write(dest, fileData, function() {
            log.info(filename + ' generate success!');
        });
    });
}

/*Book data parse*/
var chapterMeta = function(filename, data) {
    var meta = new chapter();



    /*chapter meta parse*/
    // var content = data.split('---');
    // if(content.length == 1){
    //  console.error(filename + " hasn't a title.");
    //  meta.title = filename;
    // }else{
    //  var header = yaml.parse(content.shift());
    //  meta.chaptertitle = header.title;
    // }

    meta.chaptertitle = filename.replace(/-\d*.md/, '');

    meta.content = markParse(data);
    swigRender(chapterLayout, filename, {
        data: meta
    });
}

var pageMeta = function(filename, data) {
    var meta = {};
    /*
    meta = {
        title: 'title',
        content: 'content'
    }
    */
    meta.title = filename.replace(/.md/, '');
    meta.content = markParse(data);

    var currentLayout = pageLayout;
    if (fsMore.isExistSync(layoutdir + meta.title + '.swig')) {
        currentLayout = layoutdir + meta.title;
    }
    swigRender(currentLayout, filename, {
        data: meta
    });
}


var chapterRender = function() {
    var dirname = chapterPath;

    fsMore.readDirRecur(dirname, chapterMeta);
    chapterTheme();
    categoryRender();
}

var pagesRender = function() {
    var dirname = pagePath;
    fsMore.readDirRecur(dirname, pageMeta);
}

var fileRender = function(filename) {
    if (path.basename(filename) != '.md') {
        var dest = path.relative(themePublic, filename);
        dest = path.join(destPath + 'public', dest);
        fsMore.copy(filename, dest, function(err) {
            if (err) throw err;
            log.info("themes process success!");
        });
    }
    fs.readFile(filename, 'utf8', function(err, data) {
        var item = path.basename(filename);
        chapterMeta(item, data);
    })
}

/*theme process*/
var chapterTheme = function() {
    fsMore.copy(themePublic, destPath + 'public', function(err) {
        if (err) throw err;
        log.info("themes process success!");
    });
}

/*index page*/
var categoryParse = function(name) {
    var dirname = name || chapterPath;
    var files = fs.readdirSync(chapterPath)
    files.forEach(function(file) {
        var fullname = dirname + '/' + file;
        if (fs.statSync(fullname).isDirectory()) {
            categoryParse(fullname);
        } else {
            if (path.extname(fullname) == '.md') {
                var chapterMeta = {
                    name: file.replace(/-\d*.md/, ''),
                    path: bookName + '/' + file.replace(/.md/, '.html'),
                    order: file.match(/-\d*.md/)[0].slice(1).replace(/.md/, '')
                }
                category.push(chapterMeta);
                log.info(file + ' is categoried.');
            }
        }
    })
}

var categoryRender = function() {
    categoryParse();
    /*order*/
    category.sort(function(o1, o2) {
        return o1.order - o2.order;
    })
    swigRender(indexLayout, 'index.html', {
        data: category,
        booktitle: config.title
    });
}


var render = function(file) {
    if (file) {
        fileRender(file);
    } else {
        /*clean dest dir and generate*/
        fsMore.cleanDir(destPath, function() {
            chapterRender();
            pagesRender();
        });
    }
}

module.exports = render;
