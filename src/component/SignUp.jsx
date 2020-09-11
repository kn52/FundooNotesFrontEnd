import React from 'react';
import '../scss/SignUp.css';
import Account from '../assets/images/account.svg'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            confirmpassword:'',
            errors:{},
            validateform:false
        }
        this.handleChange=this.handleChange.bind(this);
    }


    validate = () => {

        let isValid
		let error={};

        var emailPattern = /^[a-zA-Z]{3,}([-|+|.|_]?[a-zA-Z0-9]+)?[@]{1}[A-Za-z0-9]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]+)?$/;
        var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}$/;
		var namePattern = /[A-Z]{1}[a-zA-Z]{2,}$/;
		var number = /[0-9]{1,}$/;
		
		if (number.test(this.state.firstname)) {
            error['first']="Letters allowed";
        }
        if (this.state.firstname === '') {
            isValid = false;
            error['first'] = "*Please enter your first name.";
        }
        if (namePattern.test(this.state.firstname)) {
            error['first']="";
        }

        if (!emailPattern.test(this.state.email)) {
              console.log(emailPattern.test(this.state.email))  
              isValid = false;
              error["emailId"] = "*Please enter valid email-ID.";
        }
        if (this.state.email === '') {
            isValid = false;
            error["emailId"] = "*Please enter your email-ID.";
        }

        if (number.test(this.state.lastname)) {
            error['last']="Letters allowed";
        }
        if (this.state.lastname === '') {
            isValid = false;
            error["last"] = "*Please enter your last name.";
        }
        if (namePattern.test(this.state.lastname)) {
            error['last']="";
        }		
        if (!passwordPattern.test(this.state.password)) {
            console.log(passwordPattern.test(this.state.password))  
            isValid = false;
            error["password"] = "*Please enter valid password.";
        }
        if (this.state.password === '') {
            isValid = false;
            error["password"] = "*Please enter your password.";
        }
        if (this.state.confirmpassword !== this.state.password) {
            isValid = false;
            error["confirm"] = "Passwords are not same";
        }
        if (this.state.confirmpassword === '') {
            isValid = false;
            error["confirm"] = "*Please enter confirm password.";
        }
				
        
        if (error['first'] || error['last'] || error['email'] || error['password'] || error['confirm']) {
			this.setState({
				errors:error,
				validateform:false
			});
			return false;
		}else{
			this.setState({
				errors:error,
				validateform:true
			});
		}
		return true;
	}

    handleChange(event) {
        const {name , value} = event.target
        this.setState({
          [name] : value
        })
    }

    handleSubmit(event) {
        if(this.validate()){
            alert("Validate");
        }
    }

    render() {
        return(
            
            <div className='register_container'>
                <div className='register_child_container'>
                    <div className='register_form_container'>
                        <div className='register_title'>
                            <span className='register_main_title' style={{color: '#4285F4'}}>F</span>
                            <span className='register_main_title' style={{color: '#DB4437'}}>u</span>
                            <span className='register_main_title' style={{color: '#DB4437'}}>n</span>
                            <span className='register_main_title' style={{color: '#4285F4'}}>d</span>
                            <span className='register_main_title' style={{color: '#0F9D58'}}>o</span>
                            <span className='register_main_title' style={{color: '#DB4437'}}>o</span>
                        </div>
                        <div className='register_title'>
                            <span className='register_sign_title'>Create your fundoo account</span>
                        </div>
                        <div className='register_title'>
                            <span className='register_txt_title'>to use fundoo app</span> 
                        </div>
                        <div className='register_form'>
                            <div className='register_textfield'>
                                <TextField name="firstname" label="First Name" variant="outlined" value={this.state.firstname}
                                    onChange={this.handleChange} className='input_txt input_txt_width' size='small' 
                                    error={this.state.errors.first} 
                                    helperText={this.state.errors.first} required />
                            </div>
                            <div className='register_textfield'>
                                <TextField name="lastname" label="Last Name" variant="outlined" value={this.state.lastname}
                                    onChange={this.handleChange} className='input_txt input_txt_width' size='small' 
                                    error={this.state.errors.last} 
                                    helperText={this.state.errors.last} required />
                            </div>
                        </div>
                        <div className='register_content_container'>
                            <div> 
                                <TextField name="email" label="Email" type="text" variant="outlined" value={this.state.email}
                                    onChange={this.handleChange} style={{width:'100%' }} size='small' 
                                    error={this.state.errors.email} 
                                    helperText={this.state.errors.email} required />
                            </div>
                            <div style={{textAlign:'left'}}>
                                <span className='txt_size'>You can use letters numbers and periods</span>
                            </div>
                        </div>
                        <div className='register_content_container'>
                            <div className='register_password_form'>
                                <div className='register_textfield'>
                                    <TextField name="password" label="Password" type="password" variant="outlined" value={this.state.password}
                                        onChange={this.handleChange} className='input_txt input_txt_width' size='small'
                                        error={this.state.errors.password} 
                                        helperText={this.state.errors.password} required />
                                </div>
                                <div className='register_textfield'>
                                    <TextField name="confirmpassword" label="Confirm" type="password" variant="outlined" value={this.state.confirmpassword}
                                        onChange={this.handleChange} className='input_txt input_txt_width' size='small'
                                        error={this.state.errors.confirm} 
                                        helperText={this.state.errors.confirm} required />
                                </div>
                            </div>
                            <div style={{textAlign:'left'}}>
                                <span className='txt_size'>Use 8 or more characters with a mix of letters, numbers and symbols</span>
                            </div>
                        </div>
                        <div className='register_form_action'>
                            <Button style={{color:'#1a73e8', fontWeight:'bold', textTransform:'none'}}
                                onClick={()=>{this.props.history.push('/')}}>
                                Sign in instead
                            </Button>
                            <Button type="submit" className='next_button' onClick={this.handleSubmit.bind(this)}>
                                <span style={{color:'white', fontWeight:'bold', textTransform:'none'}}>
                                    Next
                                </span>
                            </Button>
                            
                        </div>
                    </div>
                    <div className='register_logo_container'>
                        <div className='register_child_image'>
                            <img src={Account} alt='' className='account_image'/>
                        </div>
                        <div className='register_child_txt'>
                            One account. All of Fundoo working for you.
                        </div>
                    </div>   
                </div>
            </div>
        );
    }
} 

export default withRouter(SignUp);