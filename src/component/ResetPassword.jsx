import React, {Component} from 'react';
import '../scss/SignIn.scss';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class ResetPassword extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            password: '',
            confirmpassword:'',
            showPassword:false,
            errors:{}
        };
        this.handleChange = this.handleChange.bind(this);
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

    handleClick(event) {
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
                            <div>
                                <FormControl 
                                    variant="outlined" 
                                    fullWidth
                                    style={{height:"65px"}} 
                                    error={this.state.errors.password}>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        autoComplete={false}
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.handleChange.bind(this,'password')}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {!this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>
                            </div>
					        <div>
                                <FormControl 
                                    variant="outlined" 
                                    fullWidth 
                                    error={this.state.errors.confirm}
                                    style={{marginTop: 20,height:'65px'}}>
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        autoComplete={false}
                                        value={this.state.confirmpassword}
                                        name="confirmpassword"
                                        onChange={this.handleChange.bind(this,'confirm')}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {!this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>
							</div>
                            <div style={{textAlign:'left'}}>
                                <span className='txt_size'>
									Use eight or more characters with a mix of uppercase lowercase letters, numbers and with one special symbol
								</span>
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

export default withRouter(ResetPassword);