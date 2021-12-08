import React, { Component } from 'react'
import { Nav,Navbar, Container, NavDropdown } from 'react-bootstrap'
import "../assets/css/navbar.css";
import Categories from './Categories';


export default class Header extends Component {

    check_cookie_name(name) 
        {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) {
                return (match[2]);
            }
            else{
                return null;
            }
        }


    render() {
        let login = null;
        let user = this.check_cookie_name('username');
        if(user === null || user === undefined || user === ''){
            login = <Nav.Link href="/login">Login</Nav.Link>
        } else {
            login =  <Nav.Link href="/login">{this.check_cookie_name('username')}</Nav.Link>
        }
    

        return (
            
            <Navbar bg="success" sticky="top" variant="dark">
            
                <Container>
                    <Navbar.Brand href="#home">Dinner.me</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/places">Explorar</Nav.Link>
                        <NavDropdown title="Categorias" id="collasible-nav-dropdown">
                            <Categories></Categories>
                        </NavDropdown>
                    </Nav>
                    <Nav>{login}</Nav>
                </Container>
           
            </Navbar>
         
        )
    }
}
