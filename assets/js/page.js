(function (global) {
	'use strict';
	const containerEl = document.getElementById('container');
	containerEl.style.minHeight = `${window.innerHeight}px`;

	global.scrollTop = () => {
		window.scrollTo(0, 0);
	}

	const visit_webhook = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/handleman_github_io-ybwyw/service/log_visit/incoming_webhook/visit';
	const visits_webhook = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/handleman_github_io-ybwyw/service/log_visit/incoming_webhook/get_visits'
	const geo_lookup = 'https://json.geoiplookup.io/';

	const pathnameParts = window.location.pathname.split('/');
	const articlePart = pathnameParts[pathnameParts.length - 1];

	const article = (articlePart !== '') ? articlePart.slice(0, -5) : '/';

	const excludedHosts = new Set(['127.0.0.1', 'localhost']);
	const hostname = window.location.hostname;

	const state = {
		article,
		hostname
	};

	const controller = {

		approveVisit: (userData, article) => {

			const date = new Date().toUTCString();
			console.log('article is', article);

			fetch(`${visit_webhook}?article=${article}&ip=${userData.ip}&country_name=${userData.country_name}&date=${date}`)
				.then((res) => {
					res.ok ? console.log('visit approved') : console.error('visit couldn be accepted!');
				});
		},

		getVisits: (article) => fetch(`${visits_webhook}?article=${article}`)
			.then(response => response.json())
			.then((res) => {
				return res.visits.$numberInt;
			})

	};

	const view = {

		viewsSelectorID: 'views-number',
		updateViews: (viewsNumber) => {
			const id = view.viewsSelectorID;
			const el = document.getElementById(id);
			if (el) {
				el.textContent = viewsNumber;
			}
		}
	};

	controller.getVisits(state.article)
		.then(data => view.updateViews(data));

	if (!excludedHosts.has(state.hostname)) {


		setTimeout(() => {
			fetch(geo_lookup)
				.then(response => response.json())
				.then(userData => controller.approveVisit(userData, state.article));
		}, 5000);
	}


})(window);