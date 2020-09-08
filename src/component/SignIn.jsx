import React, {Component} from 'react';
import '../scss/SignIn.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

export default class SignIn extends Component{
    
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
    
    handleEmail(event,txt) {
        if(txt === 'email' && this.validate('email')){
            document.getElementById('email_cont').style.display='none';
		    document.getElementById('password_cont').style.display='block';
        }
        if(txt === 'password'){
            document.getElementById('email_cont').style.display='block';
		    document.getElementById('password_cont').style.display='none';
        }
	}
	
	handleSubmitForm(event) {
            document.getElementById('email_cont').style.display='none';
		    document.getElementById('password_cont').style.display='block';
        
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
                                onChange={this.handleChange.bind(this,'email')} style={{width:'100%'}} size='large' 
                                style={{height:"70px",width:"100%"}}
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
                    </div>
                    <div className='child_form'>
                        <div class="base_form" >
                        <TextField name="passsword" label="Password" type="text" variant="outlined" value={this.state.password}
                                onChange={this.handleChange.bind(this,'email')} style={{width:'100%'}} size='large' 
                                style={{height:"70px",width:"100%"}}
                                required />
							<div style={{textAlign:'left',paddingTop:'5%'}}>
                            </div>
                            <div className='forget'>
                                <Button style={{textAlign:'left',color:'#1a73e8', fontWeight:'bold', textTransform:'none'}}
                                    >
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
}