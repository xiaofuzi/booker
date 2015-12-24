# how to use?

* 安装好后使用初始化命令创建一个示例

```node
booker init
```

该命令会创建一个示例项目(这里借助于阮一峰的es6书籍)，包含如下文件：

## 目录结构

* source
	* chapters[存放章节文本]
	* pages[相关页面]
	* themes[渲染主题]
		* layout[对应主题使用的模板]
			* chapter.swig[章节模板]
			* index.swig[首页模板]
			* page模板
			* 自定义页面模板(和相关页面的文件名等同)
* config.js[配置文件]
* dest[编译后的文件，运行生成命令后创建]

## 章节文本

将章节文本以markdown格式存放在chapters文件夹下。注意文件名以 'chaptername-01.md'的形式，数字标明章节的顺序。

## 编译

```node
booker g
booker generate
```

上面两条命令均可编译生成。

## 本地预览

```node
booker s
booker server
```
运行如上命令即可预览书籍

## 事实预览

```node
booker  s -v
booker s -w
```

加上 -v 或是 -w 参数就可以达到实时预览的效果 
