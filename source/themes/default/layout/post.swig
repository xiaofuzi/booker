{% extends './widget/_layout.html' %}

{% block title %}
	{{ page.title }}
{% endblock %}

{% block content %}
	<style>
		body{
			background: #f9f9f9;
		}
		#headerWrapper{
			background: #ffffff;
		}
	</style>
	<div id="pageWrapper">
		<div id="mainContent">
			<article class="post">
				<header>
					<h1>
						<a href="{{ url_for(page.path) }}">{{ page.title }}</a>
					</h1>
					<div class="post-info">
						<span class="post-time">
							<a class="permalink" href="javascrpt:void(0);">{{ page.date|date('Y-m-d') }}</a>
						</span>
						<span class="post-tag">
							{% set tags = page.tags %}
							{% for t in tags %}
								<a class="tag" href="{{t.permalink}}" target="_blank">{{ t.name }}</a>
							{% endfor %}
						</span>
					</div>
				</header>
				<div class="post-body">
					{{ page.content }}
				</div>
				<div class="post-nav">
					{% if page.prev.path != null %}
						<span class="prev"><a href="{{ url_for(page.prev.path) }}">Prev</a></span>
					{% endif %}
					{% if page.next.path != null %}
						<span class="next"><a href="{{ url_for(page.next.path) }}">Next</a></span>
					{% endif %}
				</div>
				<!-- 多说评论框 start -->
					<div class="ds-thread" data-thread-key="{{ page.title }}" data-title="{{ page.title }}" data-url="{{ url_for(page.path) }}"></div>
				<!-- 多说评论框 end -->
				<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
				<script type="text/javascript">
				var duoshuoQuery = {short_name:"yangxiaofu"};
					(function() {
						var ds = document.createElement('script');
						ds.type = 'text/javascript';ds.async = true;
						ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
						ds.charset = 'UTF-8';
						(document.getElementsByTagName('head')[0] 
						 || document.getElementsByTagName('body')[0]).appendChild(ds);
					})();
					</script>
				<!-- 多说公共JS代码 end -->
			</article>
		</div>
	</div>
{% endblock %}