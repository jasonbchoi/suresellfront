import React, { Component } from 'react';
import HeadNav from './HeadNav';
import BaseNav from './BaseNav';
import { render } from 'react-dom';
import { Link } from 'react-router-dom'
// import SwipeToDelete from 'react-swipe-to-delete-component';

import { Form, Button, Col } from 'react-bootstrap';

class ViewAll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newSearch: '',
			features: [],
			car: null,
			allCars: null,
			token: localStorage.getItem('token') ? true : false,

		};
	}

	handleChange = (event) => {
		this.setState({ newSearch: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		let url = `https://suresell.herokuapp.com/cars/`;
		let newArr = [];
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				this.setState({ features: [...res] });
				for (let i = 0; i < this.state.features.length; i++) {
					if (
						Object.values(this.state.features[i]).includes(this.state.newSearch)
					) {
						newArr.push(this.state.features[i]);
					}
				}
				this.setState({ features: newArr });
			});
	};

	componentDidMount() {
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

	handleDelete = (event, id) => {
		event.preventDefault()
		let url = `https://suresell.herokuapp.com/cars/`;
		console.log(this)
		fetch(`${url}${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
		}).then(() => {
			fetch(url)
				.then((res) => res.json())
				.then((res) => {
					this.setState({ features: [...res] });
				})
		})
	};

	handleEdit = (event) => {
		// event.preventDefault();
		console.log(event.target);
		const data = {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('token')
			},
			body: JSON.stringify({
				year: this.state.year,
				make: this.state.make,
				model: this.state.year,
				trim: this.state.trim,
				// features: this.state.features,
			})
		};
		fetch(
			"https://suresell.herokuapp.com/cars/", data)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				fetch('https://suresell.herokuapp.com/cars/')
					.then((res) => {
						return res.json()
					})
					.then((res) => {
						this.setState({ data: res })
					})
			}).catch(error => console.error(error))
	}



	// handleDelete = (event) => {
	// 	fetch(`https://suresell.herokuapp.com/cars/${this.props.match.params.id}`, {
	// 		method: 'DELETE',
	// 	}).then(() => {
	// 		fetch(`https://suresell.herokuapp.com/cars`)
	// 			.then((res) => res.json())
	// 			.then((res) => {
	// 				this.setState({ allCars: res, redirect: true });
	// 			});
	// 	});
	// };
	// handleEdit = (event) => {
	// 	// event.preventDefault();
	// 	console.log(event.target);
	// 	const data = {
	// 		method: "PUT",
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: 'Bearer ' + localStorage.getItem('token')
	// 		},
	// 		body: JSON.stringify({
	// 			year: this.state.year,
	// 			make: this.state.make,
	// 			model: this.state.year,
	// 			trim: this.state.trim,
	// 			// features: this.state.features,
	// 		})
	// 	};
	// 	fetch(
	// 		"https://suresell.herokuapp.com/cars/", data)
	// 		.then((res) => {
	// 			return res.json()
	// 		})
	// 		.then((res) => {
	// 			console.log(res);
	// 		}).catch(error => console.error(error))
	// }

	render() {
		// if (this.handleDelete === undefined) {
		// 	return null;
		// }else{
		const handleDelete = this.handleDelete

		return (
			<div className='ViewAll'>
				<HeadNav />
				<div className='searchWrapper'>
					<Form className='ViewAllSearch' onSubmit={this.handleSubmit}>
						<Form.Row className='align-items-center'>
							<Col sm={9.5} className='my-1'>
								<Form.Control
									id='inlineFormInputName'
									placeholder='year, make, model, or trim'
									type='text'
									name='searchString'
									required
									onChange={this.handleChange}
								/>
							</Col>

							<Col xs='auto' className='my-1'>
								<Button type='submit' className='mb-2' id='Button'>
									Find
								</Button>
							</Col>
						</Form.Row>
					</Form>
				</div>

				<div className='cardContainer'>
					{console.log(this)}
					{this.state.features.map(function (car, index) {
						return (

							<div id='autoCard' key={car.id}>
								{console.log(this)}
								{/* <SwipeToDelete key={car.id} car={car}> */}
								<div className='headWrapper'>
									<div className='number'>{car.year}</div>
									<div className='makeModel'>
										{car.make} {car.model}
										<br />
										{car.trim}
									</div>
								</div>
								<div className='bodyWrapper'>
									<div className='left'>
										<ul>
											<li>A</li>
											<li>B</li>
											<li>C</li>
											<li>D</li>
											<li>E</li>
										</ul>
									</div>
									<div className='right'>
										<ul>
											<li>A</li>
											<li>B</li>
											<li>C</li>
											<li>D</li>
											<li>E</li>
											<Link
												to={{
													pathname: "/edit/" + car.id,
													data: car
												}}
											> Edit</Link>
											{/* <button className='editButton'
												name='handleEdit'
												href={'edit/'+car.id}

										
												// onClick={(e) => { handleEdit(e, car.id) }}
												>Edit
											</button> */}
											<button
												name='handleDelete'
												className='deleteButton'
												onClick={(e) => { handleDelete(e, car.id) }}>
												Delete
											</button>
										</ul>
									</div>
								</div>
								{/* </SwipeToDelete> */}
							</div>
						);
					})}
				</div>
				<BaseNav />
			</div>
		);
	}
}
// }

export default ViewAll;
