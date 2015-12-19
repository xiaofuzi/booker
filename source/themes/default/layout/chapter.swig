{% extends './widget/_layout.html' %}
{%block title%}
	{{data.chaptertitle}}
{% endblock%}

{% block content %}
<div id="pageWrapper">
	<div id="mainContent">
		<article class="post">
			{{data.content}}
		</article>
	</div>
</div>
{% endblock %}