import m, { mount } from 'mithril';
import Model from '../model';

var nav = {}
nav.sublist = Array;

nav.controller = function() {
	this.defaultSubs = Model.defaultSubs() 
	this.list = Model.storedSubs().concat(new nav.sublist());
	this.add = (sub) => {
	 	Model.addSub(sub)
	 	this.list.push(sub)
	}
	this.delete = (sub) => {
	 	let i = this.list.indexOf(sub);
	 	this.list.splice(i, 1);
	 	Model.deleteSub(sub);
	}	
}

nav.view = function(ctrl) {
	
	var inputAttrs = () => {
		return {
			onchange: (event)=> {
				 nav['sub'] = event.target.value;
			},
			placeholder: "add sub reddit"
		}
	}

	var submit = (sub, event) => {
		event.preventDefault();
		ctrl.add(sub)
	}

	return m("div", [
		m("div", {class: "nav"}, [
			ctrl.defaultSubs.map((link)=> {
				return m("div.link", [
					m(`a[href='/r/${link}']`, {config: m.route}, link),
				])
			})
		]),
		m("div", {class: "nav"},[
			ctrl.list.map((link)=> {
				return m("div.link", [
					m(`a[href='/r/${link}']`, {config: m.route}, link),
					m("span.remove", {onclick: ctrl.delete.bind(ctrl, link)}, "x")
				])
			}),
			m("form", {onsubmit: submit.bind(this, nav['sub'])}, [
				m("input[type='text']", inputAttrs()),
				m("button", {type: 'submit'}, "+")
			])
		])
	])
}

module.exports = nav






