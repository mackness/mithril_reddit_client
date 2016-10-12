import m, { mount } from 'mithril';
import Model from './model';
import Nav from './modules/nav';
import moment from 'moment';
import showdown from 'showdown';


var Post = {
	//controller
	controller: function() {
		var comments = Model.comments();
		return {
			comments: comments,
			markdownConverter: (string) => m.trust(new showdown.Converter().makeHtml(string)),
		}
	},

	//view
	view: function(ctrl) {
		let post = ctrl.comments()[0].data.children[0].data;
		let comments = ctrl.comments()[1].data.children;

		var getChildren = (comment) => {
			let {replies} = comment.data;
			if (typeof replies == 'object') {
				return replies.data.children.map((comment) => {
					let chunk = m("div", {class: "comment"}, [
						m("span", {class: "comment-score"}, comment.data.score),
						m("p", ctrl.markdownConverter(comment.data.body)),
						getChildren(comment)
					])
					return chunk != 'undefined' ? chunk : '[deleted]'
				})
			} else {
				return
			}
		}

		return m("div", [
			Nav,
			m("h1", post.title),
			m("p", ctrl.markdownConverter(post.selftext)),
			m("div", {class: 'comments'}, [
				m("h3", 'comments:'),
				comments.map((comment)=> {
					return m("div", {class: "comment"}, [
						m("span", {class: "comment-score"}, comment.data.score),
						m("p", ctrl.markdownConverter(comment.data.body)),
						getChildren(comment)
					])
				})
			])
		]);
	}
};

module.exports = Post

