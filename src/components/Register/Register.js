import React ,{Component} from "react";

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            registerName:'',
            registerSurname:'',
            registerEmail:'',
            registerPassword:''
        }
    }
    onNameChange=(event)=>{
        this.setState({registerName:event.target.value});
    }
    onSurnameChange=(event)=>{
        this.setState({registerSurname:event.target.value});
    }
    onEmailChange=(event)=>{
        this.setState({registerEmail:event.target.value});
    }
    onPasswordChange=(event)=>{
        this.setState({registerPassword:event.target.value});
    }
    registerNewUser=()=>{
        fetch('http://localhost:3000/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
               firstName:this.state.registerName,
               lastName:this.state.registerSurname,
               email:this.state.registerEmail,
               password:this.state.registerPassword
            })
        })
        .then(response=>response.json())
        .then(newUser=>{
            this.props.onRouteChange("home");
            this.props.onLoadUser(newUser);
        })
    }

    render(){
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                onChange={this.onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="surname">Surname</label>
                            <input
                                onChange={this.onSurnameChange} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="surname"  id="surname"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                onChange={this.onEmailChange} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={this.onPasswordChange} 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
            
                        </fieldset>
                        <div className="center">
                            <input 
                                onClick={this.registerNewUser}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                                type="submit" 
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
    
}

export default Register;