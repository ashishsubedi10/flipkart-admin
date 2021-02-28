import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Input from '../../Components/UI/Input'
import Layout from '../../Components/Layout'
import { login } from '../../actions'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

/**
* @author
* @function Signin
**/

const Signin = (props) => {
    const auth = useSelector(state => state.auth)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const userLogin = (e) => {
        e.preventDefault()
        const user = {
            email, password
        }
        dispatch(login(user))
    }
    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: "50px" }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                label="Email"
                                placeholder="Enter Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                placeholder="Enter password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button variant="primary" type="submit">
                                Signin
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </Layout>
    )

}

export default Signin