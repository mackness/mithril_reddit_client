import m, { mount } from 'mithril';

var Model = {
	links: function() {
		return m.request({
			method: "GET", url: `https://www.reddit.com/r/${m.route.param("sub") || 'all'}.json`
		});
	},
	comments: function() {
		return m.request({
			method: "GET", url: `https://www.reddit.com/r/${m.route.param("sub")}/comments/${m.route.param("author")}/${m.route.param("title")}.json`
		});
	},
	defaultSubs: function() {
		return ['aww', 'funny', 'javascript'];
	},
	storedSubs: function() {
		return JSON.parse(localStorage.getItem('subs')) || [];
	},
	addSub: function(sub) {
		let x = m.request({
			method: "GET", url: `https://www.reddit.com/r/${sub}.json`
		}).then((res, err)=> {
			if (!err) {
				var subs = JSON.parse(localStorage.getItem('subs'))
				if (subs) {
					subs.push(sub)
					localStorage.setItem('subs', JSON.stringify(subs));
				} else {
					localStorage.setItem('subs', JSON.stringify([sub]));
				}
			} else {
				return err
			}
		});
		console.log('model', x)
	},
	deleteSub: function(sub) {
		var subs = JSON.parse(localStorage.getItem('subs'))
		if (subs) {
			let index = subs.indexOf(sub)
			subs.splice(index, 1)
			localStorage.setItem('subs', JSON.stringify(subs));
		}
	}
};

module.exports = Model;


