import React, {Component} from 'react';
import '../scss/SignIn.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import UserService from '../service/UserService';

class Login extends Component{
    
	constructor(props){

        super(props)
        this.state = {
            email: '',
            password: '',
			showPassword:false,
            errors: {},
        };
        this.handleChange=this.handleChange.bind(this);
    }
  
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
          [name] : value
        })
    }
	
	handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    validateForm(type) {
        
        let errors = {}
        var isValid = true;
        switch(type) {
            case 'email':
                var emailPattern = /^[a-zA-Z]{3,}([-|+|.|_]?[a-zA-Z0-9]+)?[@]{1}[A-Za-z0-9]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]+)?$/;
                if (!emailPattern.test(this.state.email)) {
                        isValid = false;
                        errors["emailId"] = "*Please enter valid email-ID.";
                }
                if (this.state.email === '') {
                    isValid = false;
                    errors["emailId"] = "*Please enter your email-ID.";
                }
                break;
                
            case 'password':
                var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}$/;
                if (!passwordPattern.test(this.state.password)) {
                      console.log(passwordPattern.test(this.state.password))  
                      isValid = false;
                      errors["password"] = "*Please enter valid password.";
                }
                if (this.state.password === '') {
                    isValid = false;
                    errors["password"] = "*Please enter your password.";
                }
                break;
            
            default:
                break;  
        }
        

        this.setState({
            errors: errors
        });

        return isValid;
    }

	handleEmail(event,txt) {
        if(txt === 'email' && this.validateForm('email')){
            document.getElementById('email_cont').style.display='none';
		    document.getElementById('password_cont').style.display='block';
        }
        if(txt === 'password'){
            document.getElementById('email_cont').style.display='block';
		    document.getElementById('password_cont').style.display='none';
        }
	}
	
	handleSubmitForm(event) {
        if(this.validateForm('password')){
			const data = {
				"email":this.state.email,
				"password": "akhil@823"
			}
			this.showLoader();
			UserService.login(data).then((res) => {
				console.log(res.data);
				this.setState({
					email:'',
					password:''
				})
			})
			.catch((err) => {
				console.log(err);
			})
		}else{
            document.getElementById('email_cont').style.display='none';
		    document.getElementById('password_cont').style.display='block';
        }
	}
	
	componentDidMount() {
		document.getElementById('email_cont').style.display='block';
		document.getElementById('password_cont').style.display='none';
	}

    render() {
        return(
			<>
			<div className='main_container' id='fade'>
                <div id="loader_container">
					<div id="loader"></div>
				</div>
				<div className='main_title'>
                    <span className='title' style={{color: '#4285F4'}}>F</span>
                    <span className='title' style={{color: '#DB4437'}}>u</span>
                    <span className='title' style={{color: '#DB4437'}}>n</span>
                    <span className='title' style={{color: '#4285F4'}}>d</span>
                    <span className='title' style={{color: '#0F9D58'}}>o</span>
                    <span className='title' style={{color: '#DB4437'}}>o</span>
                </div>
                <div id='email_cont' className="child_container">
                    <div className='child_content'>
                        <span className='sign_title'>Sign In</span>
                    </div>
                    <div className='child_content'>
                        <span className='txt_title'>to use fundoo app</span> 
                    </div>
                    <div className='child_form'>
                        <div className="base_form" >
					        <TextField name="email" label="Email or phone" type="text" variant="outlined" value={this.state.email}
                                onChange={this.handleChange} style={{width:'100%'}} size='large' 
                                error={this.state.errors.emailId}
                                helperText={this.state.errors.emailId} 
                                required />
                            
                            <div className='error_message'></div>
                        </div>
                        <div className='child_action_container'>
                            <Button style={{color:'#1a73e8', fontWeight:'bold', textTransform:'none'}}
                                onClick={()=>{this.props.history.push('/register')}}>
                                Create account
                            </Button>
							<Button type="submit" className="next_button" onClick={()=>this.handleEmail(this,'email')}>
                                <span style={{color:'white', fontWeight:'bold', textTransform:'none'}}>Next</span>
							</Button>	
                        </div>
                    </div>					
                </div>
				
				<div id='password_cont' className="child_container">
                    <div className='child_content'>
                        <span className='sign_title'>Welcome</span>
                    </div>
                    <div className='child_txt'>
                        <Chip avatar=
                        {<Avatar><span className='avatar_title'>{this.state.email.slice(0,1)}</span></Avatar>} 
                            label={<span className='avatar_title'>{this.state.email}</span>} 
                            onClick={()=>this.handleEmail(this,'password')} />
                    </div>
                    <div className='child_form'>
                        <div class="base_form" >
							<FormControl 
                                variant="outlined" 
                                fullWidth 
                                error={this.state.errors.password}
                                style={{marginTop: 30}} >
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={!this.state.showPassword ? 'text' : 'password'}
                                    autoComplete={false}
                                    value={this.state.password}
                                    name="password"
                                    onChange={this.handleChange}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                                <FormHelperText error>{this.state.errors.password}</FormHelperText>
                            </FormControl>
					        <div style={{textAlign:'left',paddingTop:'5%'}}>
                                <span className='txt_size'>
									Use eight or more characters with a mix of uppercase lowercase letters, numbers and with one special symbol
								</span>
                            </div>
                            <div className='forget'>
                                <Button style={{textAlign:'left',color:'#1a73e8', fontWeight:'bold', textTransform:'none'}}
                                    onClick={()=>{this.props.history.push('/forgetpassword')}}>
                                    Forget password?
                                </Button>
                                <div className=''>
                                    <Button type="submit" className='next_button' 
                                        onClick={this.handleSubmitForm.bind(this)}>
                                        <span style={{color:'white', fontWeight:'bold', textTransform:'none'}}>
                                            Next
                                        </span>
                                    </Button>	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			</>
        );
    }

	showLoader = () => {
        let i=0;
        if (i === 0) {
            i = 1;
            let element1= document.getElementById("loader_container");
            let element2 = document.getElementById("loader");
            let fade = document.getElementById("fade");
            element2.style.backgroundColor = 'lightgray';
			element1.style.backgroundColor = '#1a73e8';
            let width = 1;
            fade.style.opacity = 0.3;
            let id = setInterval(frame, 10);
            setTimeout(() => {
                element1.style.display = 'none';
                fade.style.opacity = 1;
            }, 1000);
            function frame() {
					if (width >= 100) {
						clearInterval(id);
						i = 0;
					} else {
						width++;
						element1.style.width = width + "%";					
					}
				}
        }
    }
}

export default withRouter(Login);