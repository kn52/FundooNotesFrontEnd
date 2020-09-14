import '../scss/SignIn.scss';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import SnackBar from '../util/SnackBar';
import UserService from '../service/UserService';
import Typography from '@material-ui/core/Typography';

class ResetPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            password: '',
            confirmpassword:'',
            showPassword:false,
            validateForm:false,
            sty:'',
            message:'',
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

    handleClick = () => {
        this.setState({open:true});
    };

    handleClose = (event) => {
        this.setState({open:false});
        if(this.state.sty === "success"){
            this.setState({
                password: '',
                confirmpassword:'',
                showPassword:false,
                validateForm:false,
                sty:'',
                message:'',
                errors:{}
            })
            this.props.history.push('/');
        }

    };

    handleChange(field,event) {
        const {name , value} = event.target
        this.setState({
          [name] : value
        },()=>this.validate(field))
    }

    validate(type) {

        let errors = {}
        var isValid = true;
        var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=[^$@!#%*?&]*[$#@!%*?&][^$@!#%*?&]*$).{8,}$/;

        switch(type) {
            case 'password':
                if (!passwordPattern.test(this.state.password)) {
                    isValid = false;
                    errors["password"] = "*Please enter valid password.";
                }
                if (this.state.password === '') {
                    isValid = false;
                    errors["password"] = "*Please enter your password.";
                }
                break;

            case 'confirm':
                if (this.state.confirmpassword !== this.state.password) {
                    isValid = false;
                    errors["confirm"] = "Passwords are not same";
                }
                if (this.state.confirmpassword === '') {
                    isValid = false;
                    errors["confirm"] = "*Please enter confirm password.";
                }
                break;

            default:
                isValid=true;
                break;
        }



        this.setState({
            validateForm:isValid,
            errors: errors
          });
    }

    handleSubmitClick = (event) => {
        console.log("Handle=click");
            let token=window.location.pathname.substring(15,(15+64));
            const data = {
                "newPassword":this.state.password
            }
            UserService.resetPassword(data,token).then((res) => {
				this.setState({
                    sty:"success",
                    message:"Password Updated Successfully",
                })
                this.handleClick();
			})
			.catch((err) => {
                this.setState({
                    sty:"error",
                    message:"Password Not Updated",
                })
                this.handleClick();
				console.log(err);
			})
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
                <SnackBar opn={this.state.open} close={this.handleClose}
                    msg={this.state.message} severity={this.state.sty}/>
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
                                <Typography>
                                    Enter new password...
                                </Typography>
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
                                    <FormHelperText error>{this.state.errors.password}</FormHelperText>
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
                                    <FormHelperText error>{this.state.errors.confirm}</FormHelperText>
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
							<Button type="submit" className="next_button" onClick={this.handleSubmitClick}>
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
