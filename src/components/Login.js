import React from 'react';
import { Form, Button } from 'react-bootstrap';

function Login(props) {
	return (
		<div className='bg-img'>
			<div className='Login'>
				<Form className='LoginForm' onSubmit={props.handleLogin}>

					<Form.Group controlId='username'>
						<Form.Label>Username</Form.Label>
						<Form.Control
							type='Username'
							onChange={props.handleChangeUsername}
							placeholder='Username'
						/>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							onChange={props.handleChangePassword}
							placeholder='Password'
						/>
					</Form.Group>

					<Button
						id='LoginButton'
						variant='primary'
						type='submit'>
						Login
					</Button>

					<Button
						onClick={props.handleLogout}
						id='LogoutButton'
						variant='primary'
						type='button'>
						Logout
					</Button>

				</Form>
			</div>
		</div>
	);
}

export default Login;
