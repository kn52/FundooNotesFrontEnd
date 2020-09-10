import React from 'react';
import '../scss/SignUp.scss';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import UserService from '../service/UserService';

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            confirmpassword:'',
            showPassword:false,
            validateForm:false,
            errors:{},
        }
        this.handleChange=this.handleChange.bind(this);
    }

	handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    
    handleChange(field,event) {
        const {name , value} = event.target
        this.setState({
          [name] : value
        })
    }

    handleSubmit(event) {
        
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
                                    onChange={this.handleChange.bind(this,'firstname')} className='input_txt input_txt_width' size='small' 
                                    style={{height:"45px"}} error={this.state.errors.first} 
                            </div>
                            <div className='register_textfield'>
                                <TextField name="lastname" label="Last Name" variant="outlined" value={this.state.lastname}
                                    onChange={this.handleChange.bind(this,'lastname')} className='input_txt input_txt_width' size='small' 
                                    style={{height:"45px"}} error={this.state.errors.last} 
                            </div>
                        </div>
                        <div className='register_content_container'>
                            <div> 
                                <TextField name="email" label="Email" type="text" variant="outlined" value={this.state.email}
                                    onChange={this.handleChange.bind(this,'email')} style={{width:'100%' }} size='small' 
                                    error={this.state.errors.email} style={{width:'100%',height:"50px"}} 
                            </div>
                            <div style={{textAlign:'left'}}>
                                <span className='txt_size'>You can use letters numbers and periods</span>
                            </div>
                        </div>
                        <div className='register_content_container'>
                            <div className='register_password_form_container' >
                                <div className='register_password_form'>
									<div className='register_textfield' >
										<TextField name="password" label="Password" type={this.state.showPassword ? "text" : "password"} variant="outlined" value={this.state.password}
											onChange={this.handleChange.bind(this,'password')} className='input_txt input_txt_width' size='small'
											style={{height:"50px"}} error={this.state.errors.password} 
									</div>
									<div className='register_textfield'>
										<TextField name="confirmpassword" label="Confirm" type={this.state.showPassword ? "text" : "password"} variant="outlined" value={this.state.confirmpassword}
											onChange={this.handleChange.bind(this,'confirm')} className='input_txt input_txt_width' size='small'
											style={{height:"50px"}} error={this.state.errors.confirm} 
											helperText={this.state.errors.confirm} required />
									</div>
								</div>
								<div className="eye_icon_container">
									<InputAdornment className="eye_icon">
										<IconButton
										aria-label="toggle password visibility"
										onClick={this.handleClickShowPassword}
										onMouseDown={this.handleMouseDownPassword}
										edge="end"
										>
										{!this.state.showPassword ? <Visibility /> : <VisibilityOff />}
									   </IconButton>
									</InputAdornment>
								</div>
								
							</div>
                            <div style={{textAlign:'left'}}>
                                <span className='txt_size'>
								Use 8 or more characters with a mix of uppercase lowercase letters, numbers and with one special symbol
								</span>
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