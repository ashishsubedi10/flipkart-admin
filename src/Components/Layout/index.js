import React from 'react'
import Header from '../Header'
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import './style.css';

/**
* @author
* @function Layout
**/

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar
                    ?
                    <Container fluid>
                        <Row>
                            <Col className="sidebar" md={2}>
                                <ul>
                                    <li><NavLink exact to={`/`} >Home</NavLink></li>
                                    <li><NavLink to={`/category`}>Category</NavLink></li>
                                    <li><NavLink to={`/products`}>Products</NavLink></li>
                                    <li><NavLink to={`/orders`}>Orders</NavLink></li>
                                </ul>
                            </Col>
                            <Col style={{ marginLeft: 'auto', paddingTop: '55px' }} md={10}>{props.children}</Col>
                        </Row>

                    </Container>
                    :
                    props.children
            }



        </>
    )

}

export default Layout