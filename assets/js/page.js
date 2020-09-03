(function (global) {
	'use strict';
	// TODO: 1. change controller, view, state to Classes with construtor initialization.
	// TODO: 2. move constants to proper classes
	// TODO: 3. approve visit convert to PUT method 
	const containerEl = document.getElementById('container');
	containerEl.style.minHeight = `${window.innerHeight}px`;

	global.scrollTop = () => {
		window.scrollTo(0, 0);
	}

	const visit_webhook = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/handleman_github_io-ybwyw/service/log_visit/incoming_webhook/visit';
	const visits_webhook = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/handleman_github_io-ybwyw/service/log_visit/incoming_webhook/get_visits'
	const put_like_webhook = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/handleman_github_io-ybwyw/service/set_like/incoming_webhook/like';
	const get_likes_webhook = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/handleman_github_io-ybwyw/service/set_like/incoming_webhook/get_likes';
	const geo_lookup = 'https://json.geoiplookup.io/';

	const pathnameParts = window.location.pathname.split('/');
	const articlePart = pathnameParts[pathnameParts.length - 1];

	const article = (articlePart !== '') ? articlePart.slice(0, -5) : '/';

	const excludedHosts = new Set(['127.0.0.1', 'localhost']);
	const hostname = window.location.hostname;
	const os = window.navigator.platform;

	const state = {
		article,
		hostname,
		userGeoData: {},
		os,
	};

	const controller = {

		approveVisit: (article, ip, country_name) => {

			const date = new Date().toUTCString();
			console.log('article is', article);
			fetch(`${visit_webhook}?article=${article}&ip=${ip}&country_name=${country_name}&date=${date}`)
				.then((res) => {
					res.ok ? console.log('visit approved') : console.error('visit couldnt be accepted!');
				});
		},

		approveLike: (article, ip = null, os) => {
			const date = new Date().toUTCString() || null;
			const requestOptions = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					article,
					ip,
					os,
					date
				})
			}

			fetch(put_like_webhook, requestOptions)
				.then((res) => {
					res.ok ? console.log('like approved') : console.error('like couldnt be accepted!');
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
		likesSelectorID: 'like-button',
		likesActiveClassName: 'liked',
		updateViews: (viewsNumber) => {
			const id = view.viewsSelectorID;
			const el = document.getElementById(id);
			if (el) {
				el.textContent = viewsNumber;
			}
		},
		likeButtonClickEvent: (callback) => {
			const id = view.likesSelectorID;
			const el = document.getElementById(id);
			const activeClassName = view.likesActiveClassName;
			if (el) {
				el.onclick = () => {
					if (el && !el.classList.contains(activeClassName)) {
						callback()
						view.likeButtonSetActive()
					}
				}
			}
		},
		likeButtonSetActive() {
			const id = view.likesSelectorID;
			const el = document.getElementById(id);
			const activeClassName = view.likesActiveClassName;

			if (el && !el.classList.contains(activeClassName)) {
				el.classList.add(activeClassName);
			}
		}
	};

	controller.getVisits(state.article)
		.then(data => view.updateViews(data));

	view.likeButtonClickEvent(() => controller.approveLike(state.article, state.userGeoData.ip, state.os));

	if (!excludedHosts.has(state.hostname)) {


		setTimeout(() => {
			fetch(geo_lookup)
				.then(response => response.json())
				.then(fetchData => state.userGeoData = fetchData)
				.then(() => controller.approveVisit(state.article, state.userGeoData.ip, state.userGeoData.country_name));
		}, 5000);
	}


})(window);