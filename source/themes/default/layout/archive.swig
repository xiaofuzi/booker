{% extends './widget/_layout.html' %}

{% block content %}
	<div id="pageWrapper">
		<div id="mainContent">
			<div class="post-archive">
				<h2>文章列表：</h2>
			<ul class="posts-index">
				{% set posts =  page.posts %}
				{% for post in posts %}
						<li>
							<a href="{{ url_for(post.path) }}" target="_blank">{{ post.title }}</a>
							<p class="post-time">
								发表时间：{{ post.date|date('Y-m-d') }}
							</p>
						</li>
				{% endfor %}
			</ul>
			<nav class="pagination">
				{% if page.total > 1 %}
					{{ paginator(options) }}
				{% endif %}
			</nav>
			<!-- 标签导航 -->
			<aside>
				<h2>TAG:</h2>
				<ul class="post-tags">
					{% set tags = site.tags %}
					{% for t in tags %}
						<li>
							<a class="tag" href="{{t.permalink}}">{{ t.name }}</a><span>({{t.length}})</span>
						</li>
					{% endfor %}
				</ul>
			</aside>
			</div>
		</div>
	</div>
{% endblock %}