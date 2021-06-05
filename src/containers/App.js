import React , {Component} from "react";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkFrom/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import FaceRecognitionImage from "../components/FaceRecognitionImage/FaceRecognitionImage";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import "./App.css";
import Particles from "react-particles-js";
import Clarifai from 'clarifai';

const particlesParameters={
  particles:{
    number:{
      value:30,
      density:{
        enable:true,
        value_area:300
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: '7d0b3c60878247aca2be076cee85a2c1'
 });

class App extends Component {

  constructor(){
    super();
    this.state={
      input:"",
      imageUrl:"",
      box:{},
      route:"signIn",
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        surname:'',
        email:'',
        entries:0,
      }
    }
  }
  
  calculateImageBox(data){
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("mainImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width - (clarifaiFace.right_col*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }
  }
  setFaceBox(boxObj){
    this.setState({box:boxObj})
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response=>{
      if(response){
        fetch('http://localhost:3000/image',{
          method:'put',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify({
            email:this.state.user.email
          })
        })
        .then(response=>response.json())
        .then(count=>this.setState(Object.assign(this.state.user,{entries:count})))
      }
      this.setFaceBox(this.calculateImageBox(response))
    })
    .catch(err=>console.log(err));
    
  }

  onRouteChange=(newRoute)=>{
    if(newRoute==="home"){
      this.setState({isSignedIn:true})
    }
    else{
      this.setState({isSignedIn:false})
    }

    this.setState({route:newRoute})
  }
  onLoadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      surname:data.surname,
      email:data.email,
      entries:data.entries,
    }
  })
  console.log(this.state.user);
  }

  render(){
    const {imageUrl,box,isSignedIn,user} = this.state;
    return (
      <div>
        <Particles className="particles" params={particlesParameters}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {
          this.state.route==="signIn"
          ?<SignIn 
             onRouteChange={this.onRouteChange}
             onLoadUser={this.onLoadUser}
            />
          :(
            this.state.route==="register"
            ?<Register 
              onRouteChange={this.onRouteChange}
              onLoadUser={this.onLoadUser}
              />
            :<div>
              <Logo/>
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognitionImage 
                imageUrl={imageUrl} box={box}
              />
            </div>
          )
        }
      </div>
    )
  }

}

export default App;