import React from "react";
import { useNavigate  } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Parse from 'parse/dist/parse.min.js';
import { Form } from "react-bootstrap";


 class UserRegistration extends React.Component {

  

  state = {
    email :'',
    username :'',
    password : ''
  }
  
  async doUserRegistration(e) {
    e.preventDefault()
    
    try{
      window.localStorage.clear()
       // Note that these values come from state variables that we've declared before
      const emailValue = this.state.email;
      const usernameValue = this.state.username;
      const passwordValue = this.state.password;
      console.log("Datos Enviados:")
      console.log(usernameValue, emailValue, passwordValue)
      
      
      const user = new Parse.User();
      user.set('username', usernameValue);
      user.set('email', emailValue);
      user.set('password', passwordValue);
      let  createdUser = await user.signUp()
      console.log(createdUser.id)
      if (createdUser.id !== null ){
        console.log("Bajanda");
        this.props.navigate("/", { replace: true });
      }
    }catch(error) {
      // signUp can fail if any parameter is blank or failed an uniqueness check on the server
      console.error('Error while signing up user', error);
      
    };
  }

  setValues(e){
    this.setState({
      [e.target.id]: e.target.value
    })
   
   
  }

  render(){
    return (
   
      <div className="row">
        <div className="col-md-6">
          <Form onSubmit={this.doUserRegistration.bind(this)}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control id="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.setValues.bind(this)}  />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

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
              Registrar
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}


function WithNavigate(props) {
  let navigate = useNavigate();
  return <UserRegistration {...props} navigate={navigate} />
}

export default WithNavigate