const jsdom = require('jsdom');

global.document = jsdom.jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
