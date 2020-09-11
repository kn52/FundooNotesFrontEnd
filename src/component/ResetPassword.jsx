import React, {Component} from 'react';
import '../scss/SignIn.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class ResetPassword extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            password: '',
            confirmpassword:'',
            errors:{}
        };
        this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
        const {name , value} = event.target
        this.setState({
          [name] : value
        })
    }
    
    validateForm() {
        
        let errors = {}
        var isValid = true;
        var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}$/;
        if (!passwordPattern.test(this.state.password)) {
              isValid = false;
              errors["password"] = "*Please enter valid password.";
        }
        if (this.state.password === '') {
            isValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (this.state.confirmpassword !== this.state.password) {
            isValid = false;
            errors["confirm"] = "Passwords are not same";
        }
        if (this.state.confirmpassword === '') {
            isValid = false;
            errors["confirm"] = "*Please enter confirm password.";
        }
        
        this.setState({
            errors: errors
          });

        return isValid;
    }

    handleClick(event) {
        if(this.validateForm()){
            alert("Message sent");
        }
    }
	componentDidMount() {
        
	}

    render() {
        return(
            <div className='main_container'>
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
                        <span className='sign_title'>Account recovery</span>
                    </div>
                    <div className='child_content'>
                        <span className='txt_title'>
                            {this.props.email}
                        </span> 
                    </div>
                    <div className='child_form'>
                        <div className="base_form" >
                            <div style={{fontSize:'14px',textAlign:'left',paddingBottom:'4%'}}>
                                Enter new password...
                            </div>
                            <div style={{paddingBottom:'8%'}}>
                            <TextField name="password" label="Password" type="password" variant="outlined" value={this.state.password}
                                onChange={this.handleChange} style={{width:'100%'}} size='large'
                                error={this.state.errors.password} 
                                helperText={this.state.errors.password} required />
                            
                            </div>
					        <div>
                            <TextField name="confirmpassword" label="Confirm Password" type="password" variant="outlined" value={this.state.confirmpassword}
                                onChange={this.handleChange} style={{width:'100%'}} size='large'
                                error={this.state.errors.confirm} 
                                helperText={this.state.errors.confirm} required />
                            </div>
                            
                        </div>
                        <div className='child_action_container'>
                            <span></span>
							<Button type="submit" className="next_button" onClick={this.handleClick.bind(this)}>
                                <span style={{color:'white', fontWeight:'bold', textTransform:'none'}}>
                                    Next
                                </span>
							</Button>	
                        </div>
                    </div>					
                </div>
            </div>
        );
    }   
}