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