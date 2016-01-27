'use strict';

var React = require('react');
var classNames = require('classNames');

module.exports = React.createClass({
	render: function(){
		var props = this.props;

		return (
			<div className='year-list'>
				<ul>
					{props.years.map(function(year, index){
						var isSelected = props.selectedYear === year;
						return (<li
							key = {index}
							className = {isSelected ? 'selected button' : 'button'}
							onClick = {function(){
								props.onChange(year);
							}}>
								{year}
							</li>);
					})}
				</ul>
			</div>	
		);
	}
});
