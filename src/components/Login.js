import React, { Component } from 'react'
import { useNavigate  } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';
import { Form,  Button } from 'react-bootstrap'
import Axios from 'axios'


class Login extends Component {

   

    state = {
        username: '',
        password: '',
        currentUser : null
    }

    
    setValues(e){
        this.setState({
        [e.target.id]: e.target.value
        })
    }

    // Function that will return current user and also update current username
    async getCurrentUser () {
    const currentUser = await Parse.User.current();
    
    // Update state variable holding current user
    
    return currentUser;
  };

    async componentWillUnmount (user) {
        this.setState({currentUser: this.getCurrentUser});
    }

    


    async doUserLogIn (e){
        e.preventDefault();
        try {
        // const usernameValue = this.state.username;
        // const passwordValue = this.state.password;
        const data = {user : this.state.username, pass: this.state.password}
        const url = "http://127.0.0.1:3001"
        const api_call = await Axios.post(url,data)
        console.log(api_call)
        } catch (error) {
          console.log(error.message)
        }
        // Note that these values come from state variables that we've declared before
        // const usernameValue = this.state.username;
        // const passwordValue = this.state.password;
        // try {
        //   const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
        //   // logIn returns the corresponding ParseUser object
        //   // To verify that this is in fact the current user, `current` can be used
        //   const currentUser = await Parse.User.current();
          
        //   console.log(loggedInUser === currentUser);
        //   if(loggedInUser === currentUser){
        //       this.setCookie(currentUser.get('username'))
        //   }
        //   // Clear input fields
        //   this.setState({username: ''});
        //   this.setState({password: ''});
        //   // Update state variable holding current user
        //   this.getCurrentUser();
        //   this.props.navigate("/", { replace: true });
        //   return true;
        // } catch (error) {
        //   // Error can be caused by wrong parameters or lack of Internet connection
        //   alert(`Error! ${error.message}`);
        //   return false;
        // }
      };

      setCookie(user) {
        if(user === null || user === undefined || user === ''){
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }else{
            document.cookie = `username=${user}`; 
        }
        
      };

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
      async doUserLogOut () {
        try {
          await Parse.User.logOut();
          // To verify that current user is now empty, currentAsync can be used
          const currentUser = await Parse.User.current();
          if (currentUser === null) {
            alert('Success! No user is logged in anymore!');
          }
          // Update state variable holding current user
          this.getCurrentUser();
          this.setCookie(null)
          this.props.navigate("/", { replace: true });

          return true;
          
        } catch (error) {
          alert(`Error! ${error.message}`);
          return false;
        }
      };


    render() {
        let user = this.check_cookie_name('username');
        if(user === null || user === undefined || user === ''){
           return (
            <div className="row">
            <div className="col-md-6">
              <Form name="Form" onSubmit={this.doUserLogIn.bind(this)}>
                <Form.Group className="mb-3" >
                  <Form.Label>Username</Form.Label>
                  <Form.Control id="username" type="text" placeholder="Enter Username" value={this.state.username} onChange={this.setValues.bind(this)} />
                </Form.Group>
    
                {/* controlId="formBasicPassword" */}
                <Form.Group className="mb-3" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control id="password" type="password" placeholder="Password" value={this.state.password} onChange={this.setValues.bind(this)} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
           )
       }
       else{
           return (
            <div className="container">
            <h2 className="heading">{'Pantalla de Usuario'}</h2>
            <hr />
            
            <h2 className="heading">{`Hola ${this.check_cookie_name('username')} !`}</h2>
            <div className="">
              <Button
                onClick={this.doUserLogOut.bind(this)}
                variant="success"
              >
                Log Out
              </Button>
            </div>
          </div>
           )
        //    this.islogin()
       }
       
    }


}


function WithNavigate(props) {
    let navigate = useNavigate();
    return <Login {...props} navigate={navigate} />
  }
  
  export default WithNavigate