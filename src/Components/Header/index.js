import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { signout } from '../../actions'

/**
* @author
* @function Header
**/

const Header = (props) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch('')
    const logout = () => {
        dispatch(signout())
    }
    const renderLoggedIn = () => {
        return (
            <Nav >
                <li className="nav-item">
                    <NavLink to="/signin" onClick={logout} className="nav-link">Sign Out</NavLink>
                </li>

            </Nav>
        )
    }
    const renderNotLoggedIn = () => {
        return (
            <Nav >
                <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </li>

            </Nav>
        )

    }
    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
            <Container fluid>
                <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    {auth.authenticate ? renderLoggedIn() : renderNotLoggedIn()}
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )

}

export default Header