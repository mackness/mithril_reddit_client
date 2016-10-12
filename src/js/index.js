import m, { mount } from 'mithril';
import App from './app';
import Post from './post';

m.route(document.body, "/", {
	"/": App,
    "/r/:sub": App,
    "/r/:sub/comments/:author/:title" : Post
});

m.mount(document.getElementById("outlet"), App);
