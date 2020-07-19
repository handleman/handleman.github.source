(function(global) {
'use strict';
	const containerEl = document.getElementById('container');
	containerEl.style.minHeight = `${window.innerHeight}px`;

	global.scrollTop = ()=>{
		window.scrollTo(0,0);
	}

	const visit_webhook = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/handleman_github_io-ybwyw/service/log_visit/incoming_webhook/visit';
	const geo_lookup = 'https://json.geoiplookup.io/';

	const approveVisit = (userData)=>{
		const pathnameParts = window.location.pathname.split('/');
		const articlePart = pathnameParts[ pathnameParts.length-1 ];

		const article = (articlePart !== '') ? articlePart.slice(0,-5)  : '/';

		console.log('article is', article);

		fetch(`${visit_webhook}?article=${article}&ip=${userData.ip}&country_name=${userData.country_name}`)
		.then((res)=>{
			res.ok ? console.log('visit approved') : console.error('visit couldn be accepted!');
		});
	}

	setTimeout(()=>{
		fetch(geo_lookup)
		.then(response => response.json())
		.then(approveVisit);
	}, 5000);
})(window);

