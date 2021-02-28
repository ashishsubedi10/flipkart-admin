import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions';

import Layout from '../../Components/Layout'
import Input from '../../Components/UI/Input'

/**
* @author
* @function Signup
**/

const Signup = (props) => {
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const dispatch = useDispatch()

    const userSignUp = (e) => {
        e.preventDefault();
        const user = { firstName, lastName, email, userName, password }
        dispatch(signup(user))
    }

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }
    if (user.loading) {
        return <h1>Loading....</h1>
    }
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: "50px" }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignUp}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="Enter First Name"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label="Last Name"
                                        placeholder="Enter Last Name"
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                label="Email"
                                placeholder="Enter Email "
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="User Name"
                                placeholder="Enter Use Name "
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />

                            <Input
                                label="Password"
                                placeholder="Enter Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Sign Up
                        </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </Layout>
    )

}

export default Signup