{% extends './widget/_layout.html' %}

{% block content %}
	<div id="pageWrapper">
		<div id="mainContent">
			<div class="post-archive">
				<h2>目录</h2>
			<ul class="posts-index">
				{% set categories =  data %}
				{% for category in categories %}
						<li>
							<a href="{{ category.path }}" target="_blank">{{ category.name }}</a>
						</li>
				{% endfor %}
			</ul>
			</div>
		</div>
	</div>
{% endblock %}