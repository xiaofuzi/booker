{% extends './widget/_layout.html' %}

{% block title %} 
	{{booktitle}}
{% endblock %}

{% block booktitle %} 
	{{booktitle}}
{% endblock %}
<hr>
{% block content %}
	<div id="pageWrapper">
		<div id="mainContent">
			<div class="post-archive">
				<h2>目录</h2>
			<ol class="posts-index">
				{% set categories =  data %}
				{% for category in categories %}
						<li>
							<a href="{{ category.path }}" target="_blank">{{ category.name }}</a>
						</li>
				{% endfor %}
			</ol>
			</div>
		</div>
	</div>
{% endblock %}