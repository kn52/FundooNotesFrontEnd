import React from 'react';
import '../scss/SignUp.scss';
import Account from '../assets/images/account.svg'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SnackBar from '../util/SnackBar';
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
            sty:'',
            message:'',
            errors:{},
        }
        this.handleChange=this.handleChange.bind(this);
    }

    handleClick = () => {
        this.setState({open:true});
    };
    
    handleClose = (event) => {
        this.setState({open:false});
        if(this.state.sty === "success")
        {
            this.setState({
                firstname:'',
                lastname:'',
                email:'',
                password:'',
                confirmpassword:'',
                showPassword:false,
                validateForm:false,
                sty:'',
                message:'',
                errors:{},
            })
            this.props.history.push('/login');
        }
    };

	handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    validate = (type) => {

        let isValid = true;
		let error={};

        var emailPattern = /^[a-zA-Z]{3,}([-|+|.|_]?[a-zA-Z0-9]+)?[@]{1}[A-Za-z0-9]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]+)?$/;
        var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}$/;
		var number = /[0-9]{1,}$/;
        
        if ( type === 'firstname' || type === 'All' )
        {
            console.log("first");
            if (number.test(this.state.firstname)) {
                isValid = false;
                error['first']="*Only Letters allowed";
            }
            if (this.state.firstname === '') {
                isValid = false;
                error['first'] = "*Please enter your first name.";
            }
        }
        
        if ( type === 'lastname' || type === 'All' )
        {
            console.log("second");
            if (number.test(this.state.lastname)) {
                isValid = false;
                error['last']="*Only Letters allowed";
            }
            if (this.state.lastname === '') {
                isValid = false;
                error["last"] = "*Please enter your last name.";
            }
        }
        if ( type === 'email' || type === 'All' )
        {
            console.log("email");
            if (!emailPattern.test(this.state.email)) {
                isValid = false;
                error["email"] = "*Please enter valid email-ID.";
            }
            if (this.state.email === '') {
                isValid = false;
                error["email"] = "*Please enter your email-ID.";
            }
        }
        if ( type === 'password' || type === 'confirm' || type === 'All' )
        {
            console.log("password");
            if (!passwordPattern.test(this.state.password)) {
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
        }
        
        this.setState({
            errors:error,
            validateForm:isValid
        });
        
        return isValid;
	}

    handleChange(field,event) {
        const {name , value} = event.target
        this.setState({
          [name] : value
        },()=>this.validate(field))
    }

    handleSubmit(event) {
        if(this.validate('All')){
            
            const data = {
				"firstName": this.state.firstname,
				"lastName": this.state.lastname, 
				"phoneNumber": "",
				"imageUrl": "",
				"service": "advance",
				"email": this.state.email,
				"cartId": "",
				"password": this.state.password
			}
			
			UserService.register(data).then((res) => {
                console.log(res);
                this.setState ({
                    sty:'success',
                    message:'Registered Successfully'
                })
                this.handleClick();
            })
			.catch((err) => {
                console.log(err);
                this.setState ({
                    sty:'error',
                    message:'Email Already Exist'
                })
                this.handleClick();
			})
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
                        <SnackBar opn={this.state.open} onclose={this.handleClose} 
                            msg={this.state.message} severity={this.state.sty}/>
                
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
                                    helperText={this.state.errors.first} required />
                            </div>
                            <div className='register_textfield'>
                                <TextField name="lastname" label="Last Name" variant="outlined" value={this.state.lastname}
                                    onChange={this.handleChange.bind(this,'lastname')} className='input_txt input_txt_width' size='small' 
                                    style={{height:"45px"}} error={this.state.errors.last} 
                                    helperText={this.state.errors.last} required />
                            </div>
                        </div>
                        <div className='register_content_container'>
                            <div> 
                                <TextField name="email" label="Email" type="text" variant="outlined" value={this.state.email}
                                    onChange={this.handleChange.bind(this,'email')} size='small' 
                                    error={this.state.errors.email} style={{width:'100%',height:"50px"}} 
                                    helperText={this.state.errors.email} required />
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
											helperText={this.state.errors.password} required />
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