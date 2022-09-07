'use strict';
const React = require('react');
var axios = require('axios');
import EmployeeList from './employee-list.jsx'
import AddEmployee from './add-employee.jsx'
import Form from './Form.jsx';
import Navbar from './Navbar.jsx';
import HeroSection from './HeroSection.jsx';

export default class EmployeeApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { employees: [], trades: [] };
        this.addEmployee = this.addEmployee.bind(this);
        this.addTrade = this.addTrade.bind(this);

        this.Axios = axios.create(
            {
                headers: { 'content-type': 'application/json' }
            }
        );
    }
    componentDidMount() {
        let _this = this;
        this.Axios.get('/employees').then(
            function (response) {
                _this.setState({ employees: response.data });
            }
        ).catch(function (error) { });
    }
    addEmployee(firstName, lastName) {
        let _this = this;
        this.Axios.post(
            '/employee/add',
            {
                firstName,
                lastName
            }
        ).then(
            function (response) {
                _this.setState({ employees: response.data });
            }
        ).catch(function (error) { });
    }
    // addTrade(tradeNumber, dailyNumber, date, time, exchange, callType, tradeType, pair, firstEntry, secondEntry, target, stop, leverage, baseCandle, source, status) {
    addTrade(tradeNumber) {
        let _this = this;
        this.Axios.post(
            '/trade/add',
            {
                tradeNumber,
            }
            ).then(
            function (response) {
                _this.setState({ trades: response.data });
                console.log("jjj", trades)
            }
        ).catch(function (error) { });
    }
    render() {
        return (
            <div>
                <HeroSection />
                <Form addTrade={this.addTrade} />
                <AddEmployee addEmployee={this.addEmployee} />
                <EmployeeList employees={this.state.employees} />
            </div>
        )
    }
}
