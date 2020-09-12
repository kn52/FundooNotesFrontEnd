import React, {Component} from 'react';
import '../scss/SignIn.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserService from '../service/UserService';

export default class ForgetPassword extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            email: '',
            validateForm:false,
            errors:{}
        };
        this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(field,event) {
		const { name, value } = event.target;
        this.setState({
          [name] : value
        },()=>this.validate(field))
    }
    
    validate(type) {
        
        let error = {}
        var isValid = true;
        switch(type) {
            
            case 'email':
                var emailPattern = /^[a-zA-Z]{3,}([-|+|.|_]?[a-zA-Z0-9]+)?[@]{1}[A-Za-z0-9]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]+)?$/;
                if (!emailPattern.test(this.state.email)) {
                      isValid = false;
                      error["email"] = "*Please enter valid email.";
                }
                if (this.state.email === '') {
                    isValid = false;
                    error["email"] = "*Please enter your email.";
                  }               
                break;

            default:
                isValid=true;
                break;
        }
        
        this.setState({
            validateForm:isValid,
            errors: error
          });
    }

    handleClick(event) {
        if(this.state.validateForm){
			const data = {
                "email":this.state.email
            }

            UserService.forget(data).then((res) => {
				console.log(res.data);
				this.setState({
                    email:'',
                    validateForm:false,
                    errors:{}
				})
			})
			.catch((err) => {
				console.log(err);
			})
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
                    <div className='child_form'>
                        <div className="base_form" >
                            <div style={{fontSize:'14px',textAlign:'left',paddingBottom:'4%'}}>
                                Enter email you remember using with fundoo app
                            </div>
					        <TextField name="email" label="Enter your email" type="text" variant="outlined" value={this.state.email}
                                onChange={this.handleChange.bind(this,'email')} style={{width:'100%'}} size='large' 
                                error={this.state.errors.email}
                                helperText={this.state.errors.email}
                                required />
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