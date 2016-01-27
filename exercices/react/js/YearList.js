'use strict';

var React = require('react');
var classNames = require('classNames');

module.exports = React.createClass({
	displayName: 'exports',

	render: function () {
		var props = this.props;

		return React.createElement(
			'div',
			{ className: 'year-list' },
			React.createElement(
				'ul',
				null,
				props.years.map(function (year, index) {
					var isSelected = props.selectedYear === year;
					return React.createElement(
						'li',
						{
							key: index,
							className: isSelected ? 'selected button' : 'button',
							onClick: function () {
								props.onChange(year);
							} },
						year
					);
				})
			)
		);
	}
});