import React, { Component } from "react";
import HeadNav from "./HeadNav";
import BaseNav from "./BaseNav";
//import FeatureList from './FeatureList'
import { Form, Row, Col, Button } from "react-bootstrap";
import { Redirect, Link } from 'react-router-dom'

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      make: "",
      model: "",
      trim: "",
      feature: '',
      features: [],
      redirect: false,
    };
  }
  clearForm = () => {
    this.setState({ feature: '' });
  };
  handleChange = (event) =>
    this.setState({
      feature: event.target.value,
    });
  addFeature = (event) => {
    event.preventDefault();
    this.setState(prevState => {
      return {
        features: [...prevState.features, this.state.feature]
      }
    })
    console.log(this.state.features);

    this.clearForm()
  };


  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const data = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        year: this.state.year,
        make: this.state.make,
        model: this.state.year,
        trim: this.state.trim,
      })
    };
    fetch(
      "https://suresell.herokuapp.com/cars/", data)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        this.props.handleRead()
        this.setState({ redirect: true })
      }).catch(error => console.error(error))
    this.props.history.push('/viewall')

  }





  handleChangeYear = (event) =>
    this.setState({
      year: event.target.value,
    });
  handleChangeMake = (event) =>
    this.setState({
      make: event.target.value,
    });
  handleChangeModel = (event) =>
    this.setState({
      model: event.target.value,
    });
  handleChangeTrim = (event) =>
    this.setState({
      trim: event.target.value,
    });

  render() {
    // if(this.state.redirect){
    //   return <Redirect to={{pathname:'/viewall', state:{
    //     features:this.props.features,
    //     token: localStorage.token
    //   }}}/>
    // }
    return (
      <div className="Add">
        <HeadNav />

        <Form className="AddField" onSubmit={this.handleSubmit.bind(this)}>
          Add a Car
          <br />
          <br />
          Vehicle Specs
          <Row>
            <Col>
              <Form.Control
                placeholder="Year"
                type="text"
                name="year"
                required
                onChange={this.handleChangeYear}
                value={this.state.year}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Make"
                type="text"
                name="make"
                required
                onChange={this.handleChangeMake}
                value={this.state.make}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Control
                placeholder="Model"
                type="text"
                name="model"
                required
                onChange={this.handleChangeModel}
                value={this.state.model}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Trim"
                type="text"
                name="trim"
                required
                onChange={this.handleChangeTrim}
                value={this.state.trim}
              />
            </Col>
          </Row>
        </Form>
        <br />

        <div className='AddForm'>
          <ul className='features'>
            {this.state.features.map((item) => (
              <li className='featureItem' key={item}>{item}</li>
            ))}
          </ul>
          <Form inline className='AddFeature' onSubmit={this.addFeature}>
            Add Feature
					<Form.Control
              className='mb-2 mr-sm-2'
              id='inlineFormInputName2'
              placeholder='Feature'
              type='text'
              name='searchString'
              required
              onChange={this.handleChange}
              value={this.state.feature}
            />
            <Button type='submit' className='mb-2' id='Button'>
              +
					</Button>
            <Form.Text className='text-muted'>**Abbreviate Features**</Form.Text>
          </Form>
        </div>

        {/* <Link to='/viewall'> */}
        <Button
          type="submit"
          className="AddCard"
          // onClick={this.handleSubmit}
          variant="primary"
          size="lg"
          block
        // href='/viewall'
        >
          Make Card
        </Button>
        {/* </Link> */}


        <BaseNav />
      </div>
    );
  }
}

export default Add;
