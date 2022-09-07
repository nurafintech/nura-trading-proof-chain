'use strict';
const React = require('react');
const ReactDOM = require('react-dom')
import { render } from 'react-dom'
window.React = React

import EmployeeApp from './components/employee-app.jsx'

ReactDOM.render(
		<EmployeeApp />,
	document.getElementById('react')
)
