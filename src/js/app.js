import m, { mount } from 'mithril';
import Model from './model';
import Nav from './modules/nav';
import _sortby from 'lodash.sortby';

var App = {
	//controller
	controller: function() {
		var links = Model.links();
		return {
			links: links,
			sorts: function(list) {
			    return {
			        onclick: function(e) {
			            var prop = e.target.getAttribute("data-sort-by")
			            if (prop) {
			                var first = list[0]
			                list.sort(function(a, b) {
			                    return a.data[prop] > b.data[prop] ? 1 : a.data[prop] < b.data[prop] ? -1 : 0
			                })
			                if (first === list[0]) list.reverse()
			            }
			        }
			    }
			}
		}
	},

	//view
	view: function(ctrl) {
		var list = ctrl.links().data.children;
		return m("div", ctrl.sorts(list), [
			Nav,
			m("button[data-sort-by=created]", 'sort by recency'),
			m("button[data-sort-by=score]", 'sort by score'),
			list.map(function(link) {
				if (link.data.is_self) {
					var postlink = m(`a[href='${link.data.permalink}']`, {config: m.route}, link.data.title)
				} else {
					var postlink = m(`a[href='${link.data.url}']`, link.data.title)
				}
				return m("div", [
					m("span", {class: 'score'}, link.data.score),
					postlink,
					m(`a[href='${link.data.permalink}']`, {config: m.route}, 'comments')
				])
			})
		]);
	}
};

module.exports = App
