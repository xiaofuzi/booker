{% extends './widget/_layout.html' %}

{% block content %}
	<div id="pageWrapper">
		<div id="mainContent">
			{{ page.content }}
		</div>
	</div>
{% endblock %}