'use strict';

var React = require('react');
var classNames = require('classNames');

module.exports = React.createClass({
	displayName: 'exports',

	selectGender: function (sexe) {

		console.log('Sexe choisi', sexe);
		var sexeSet = this.state.sexeSet;

		if (sexeSet.has(sexe)) sexeSet.delete(sexe);else sexeSet.add(sexe);

		this.setState({
			sexeSet: sexeSet
		});
	},

	getInitialState: function () {
		var sexeSet = new Set();
		sexeSet.add('F');
		sexeSet.add('M');
		return {
			sexeSet: sexeSet
		};
	},

	render: function () {

		var self = this;
		var state = this.state;
		var props = this.props;

		var mClass = classNames({
			'selected': state.sexeSet.has('M'),
			'M': true
		});

		var fClass = classNames({
			'selected': state.sexeSet.has('F'),
			'F': true
		});

		var filteredNameInfos = props.nameInfos.filter(function (nameInfo, index) {
			return state.sexeSet.has(nameInfo.sexe);
		});

		filteredNameInfos.sort(function (a, b) {
			return parseFloat(b.nombre) - parseFloat(a.nombre);
		});

		return React.createElement(
			'div',
			{ className: 'name-list' },
			React.createElement(
				'ul',
				null,
				React.createElement(
					'li',
					{ key: 1,
						className: mClass,
						onClick: function () {
							self.selectGender('M');
						} },
					'Hommes'
				),
				React.createElement(
					'li',
					{ key: 2,
						className: fClass,
						onClick: function () {
							self.selectGender('F');
						} },
					'Femmes'
				)
			),
			React.createElement(
				'ul',
				null,
				filteredNameInfos.map(function (nameInfo, index) {
					return React.createElement(
						'li',
						{ key: index },
						React.createElement(
							'div',
							{ className: ['name', nameInfo.sexe].join(' '),
								style: { width: nameInfo.nombre + 'px' } },
							nameInfo.prenoms
						),
						React.createElement(
							'div',
							null,
							nameInfo.nombre
						)
					);
				})
			)
		);
	}
});