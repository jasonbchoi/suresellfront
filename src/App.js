import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import About from './components/About';
import Add from './components/Add';
import Search from './components/Search';
import ViewAll from './components/ViewAll';
import Edit from './components/Edit'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			username: '',
			password: '',
			login: false,
			error: false,
		};
	}

	renderRedirect = () => {
		if (this.state.login && !this.state.error) {
			return <Redirect to='/viewall' />;
		}
	};
	//needs token to be passed as header for each request
	handleLogin = (event) => {
		event.preventDefault();
		const url = `https://suresell.herokuapp.com/api/token/`;
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				if (res.access) {
					localStorage.setItem('token', res.access);
				} else {
					throw new Error('unsuccessful login');
				}
			})
			.then((res) => {
				this.setState({
					token: this.state.token,

					username: this.state.username,
					password: this.state.password,
					login: localStorage.getItem('token') ? true : false,
				});
				console.log(res);
			})
			.catch((err) => {
				this.setState({ error: true });
				console.error(err);
				if (this.state.error) {
					alert('Username and/or password is invalid');
				}
			});
	};


	handleLogout = () => {
		localStorage.removeItem('token');
		this.setState({
			token: '',
			email: '',
			username: '',
			password: '',
			login: false,
		});
	};
	handleRead = () => {
		let url = `https://suresell.herokuapp.com/cars/`;
		if (this.state.token) {
			fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((res) => res.json())
				.then((res) => {
					this.setState({ features: [...res] });
				});
		}
	}

	handleChangeEmail = (event) =>
		this.setState({
			email: event.target.value,
		});
	handleChangeUsername = (event) =>
		this.setState({
			username: event.target.value,
		});
	handleChangePassword = (event) =>
		this.setState({
			password: event.target.value,
		});

	render() {
		// if(this.state.login){
		// 	return <Redirect to='/viewall'/>
		// }

		return (
			<div className='App'>
				{this.renderRedirect()}
				<Route
					path='/edit/:id'
					component={Edit}
					handleRead={this.handleRead}
				/>
				{/* <Edit/> */}
				<Route
					path='/'
					exact
					render={() => {
						return (
							<Login
								handleLogout={this.handleLogout}
								handleLogin={this.handleLogin}
								handleChangeEmail={this.handleChangeEmail}
								handleChangePassword={this.handleChangePassword}
								handleChangeUsername={this.handleChangeUsername}
							/>
						);
					}}
				/>
				<Route path='/about' component={About} />
				<Route path='/viewall' component={ViewAll} handleRead={this.handleRead} />
				<Route path='/add' component={Add} />
				{/* <Route path='/search' component={Search} /> */}
			</div>
		);
	}
}

export default withRouter(App);
