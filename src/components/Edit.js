import React, { Component } from 'react';
import HeadNav from "./HeadNav";
import BaseNav from "./BaseNav";
//import FeatureList from './FeatureList'
import { Form, Row, Col, Button } from "react-bootstrap";
import {Redirect} from 'react-router-dom'

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            year: "",
            make: "",
            model: "",
            trim: "",
            feature: '',
            features: [],
            data: {},
            redirect:false,
        };
    }

    clearForm = () => {
        this.setState({ feature: '' });
    };
    handleChange = (event) =>
        this.setState({
            feature: event.target.value,
        });

    componentDidMount() {
        console.log(this.props.features);
        // const { data } = this.props.location
        // if (this.props.features) {
        let tempdata = this.props.features.find((feature) => {
            return feature.id === 5
        })
        this.setState({
            id: tempdata.id,
            year: tempdata.year,
            make: tempdata.make,
            model: tempdata.model,
            trim: tempdata.trim
            // console.log(data);
        })
        // }

        // if (this.state.data) {
        // this.setState({
        //     id: this.state.data.id,
        //     year: this.state.data.year,
        //     make: this.state.data.make,
        //     model: this.state.data.model,
        //     trim: this.state.data.trim
        // })


        // }


    }
    // addFeature = (event) => {
    //     event.preventDefault();
    //     this.setState(prevState => {
    //         return {
    //             features: [...prevState.features, this.state.feature]
    //         }
    //     })
    //     console.log(this.state.features);

    //     this.clearForm()
    // };

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

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
        const data = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                year: this.state.year,
                make: this.state.make,
                model: this.state.model,
                trim: this.state.trim,
                // features: this.state.features,
            })
        };
        fetch(
            `https://suresell.herokuapp.com/cars/${this.state.id}`, data)
            .then((res) => {
                return res.json()
            })
            .then((res) => {

                this.props.handleRead()
                this.setState({redirect:true})
            }).catch(error => console.error(error))
        // this.props.history.push('/viewall')
    }


    render() {
        if(this.state.redirect){
            return <Redirect to='/viewall'/>
        }
        return (
            <div>
                {console.log(this)}
                <HeadNav />

                <Form className="AddField">

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


                <Button
                    type="submit"
                    className="AddCard"
                    onClick={this.handleSubmit}
                    variant="primary"
                    size="lg"
                    block
                    href='/viewall'
                >
                    Edit Card
        </Button>

                <BaseNav />
            </div>
        );
    }
}

export default Edit;