'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// var names = require('../liste_des_prenoms_2004_a_2012.json');

var MyComponent = React.createClass({
	displayName: 'MyComponent',

	render: function () {
		return React.createElement(
			'div',
			null,
			'Coucou !'
		);
	}
});

ReactDOM.render(React.createElement(
	'div',
	null,
	React.createElement(
		'h1',
		null,
		'Je suis un titre généré par React'
	),
	'Coucou !'
), document.getElementById('myReactApp'));

React.createElement(
	'div',
	{ className: 'myClass' },
	' // jsx',
	React.createElement(
		'h1',
		null,
		'Exemple'
	),
	'Je suis un composant div sous React'
);

React.createElement('div', { // js
	className: 'myClass'
}, React.createElement('h1', null, 'Exemple'), 'Je suis un composant div sous React');

/////////////////////////////////////////////

React.createElement(
	MonComposant,
	{ myProp: this.whatever },
	' // jsx',
	React.createElement(
		'h1',
		null,
		'Exemple'
	),
	'Je suis un composant custom sous React'
);

React.createElement('MonComposant', { // js
	myProp: this.whatever
}, React.createElement('h1', null, 'Exemple'), 'Je suis un composant custom sous React');