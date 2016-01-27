'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var NameList = require('./NameList.js');
var YearList = require('./YearList.js');

var data = require('../liste_des_prenoms_2004_a_2012.json');
var yearSet = new Set();

var cleanData = data.map(function (item) {
	yearSet.add(parseInt(item.fields.annee));

	item.fields.annee = parseInt(item.fields.annee);

	return item.fields;
});

/*var years = Array.from(yearSet).sort();*/ // Array.from()

var years = [];

dateSet.forEach(function (date) {
	years.push(date);
});

years.sort();

var Application = React.createClass({
	displayName: 'Application',

	changeYear: function (year) {
		console.log('clicked on', year);
		this.setState({
			selectedYear: year
		});
	},

	getInitialState: function () {
		return {
			selectedYear: 2004
		};
	},

	render: function () {

		var self = this;
		var state = this.state;
		var props = this.props;

		return React.createElement(
			'div',
			null,
			React.createElement(YearList, {
				years: props.years,
				selectedYear: state.selectedYear,
				onChange: this.changeYear }),
			React.createElement(NameList, { nameInfos: props.nameInfos.filter(function (nameInfo) {
					return nameInfo.annee === state.selectedYear;
				}) })
		);
	}
});

ReactDOM.render(React.createElement(Application, {
	nameInfos: cleanData,
	years: years }), document.getElementById('myReactApp'));