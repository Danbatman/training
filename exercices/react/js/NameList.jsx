'use strict';

var React = require('react');
var classNames = require('classNames');

module.exports = React.createClass({
	selectGender: function(sexe){

		console.log('Sexe choisi', sexe);
		var sexeSet = this.state.sexeSet;

		if (sexeSet.has(sexe))
			sexeSet.delete(sexe);
		else
			sexeSet.add(sexe);

		this.setState({
			sexeSet: sexeSet
		});
	},

	getInitialState: function(){
		var sexeSet = new Set();
		sexeSet.add('F');
		sexeSet.add('M');
		return {
			sexeSet: sexeSet
		};
	},

	render: function(){

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

		var filteredNameInfos = props.nameInfos.filter(function(nameInfo, index){
			return state.sexeSet.has(nameInfo.sexe);
		});

		return (
			<div className='name-list'>
				<ul>
					<li key={1}
						className = {mClass}
						onClick = { function(){
							self.selectGender('M');
						}
					}>
						Hommes
					</li>
					<li key={2}
						className = {fClass} 
						onClick = { function(){
							self.selectGender('F');
						}
					}>
						Femmes
					</li>
				</ul>

				<ul>
					{filteredNameInfos.map(function(nameInfo, index){
						return (
							<li key = {index}>
								<div className = {['name', nameInfo.sexe].join(' ')}
									style = {
										{width:nameInfo.nombre + 'px'}
									}>
									{nameInfo.prenoms}
								</div>
								<div>{nameInfo.nombre}</div>
							</li>);
					})}
				</ul>

			</div>
		);
	}
});