import React, { Component } from 'react'
import Parse from 'parse/dist/parse.min.js';
// import Categorie from './Categorie';
import { NavDropdown } from 'react-bootstrap';







export default class Categories extends Component {
    
    state = {
        categorias: [],
        
    }

    async componentDidMount(){
        try {
            window.localStorage.clear()
            const Categoria = Parse.Object.extend('Categoria');
            const query = new Parse.Query(Categoria);
            const data = await query.findAll();
            var temp = []
            for (const cat of data){
                temp = temp.concat(cat.get('categoria'))
            }
            
            this.setState({categorias : temp})
           
            

            
        } catch (error) {
            console.log('Error Recibiendo las categorias: ', error);
        }  
    }


    render() {
         
        return (this.state.categorias.map((cat,i) => <NavDropdown.Item href={cat} key={i}> {cat}</NavDropdown.Item>) )
    }
}
