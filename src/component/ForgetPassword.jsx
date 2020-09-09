import React, {Component} from 'react';
import '../scss/SignIn.scss';
import TextField from '@material-ui/core/TextField';

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
        })
    }
    
    handleSubmit(event) {
        
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
                <SnackBar opn={this.state.open} close={this.handleClose} />
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
                                style={{width:'100%',height:"70px"}}
                                required />
                        </div>
                        <div className='child_action_container'>
                            <span></span>
							<Button type="submit" className="next_button" onClick={this.handleSubmit.bind(this)}>
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