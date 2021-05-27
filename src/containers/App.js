import React , {Component} from "react";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkFrom/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import FaceRecognitionImage from "../components/FaceRecognitionImage/FaceRecognitionImage";
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
      input:'',
      imageUrl:'',
      box:{}
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
    .then(response=>this.setFaceBox(this.calculateImageBox(response)))
    .catch(err=>console.log(err));

  }

  render(){
    return (
      <div>
        <Particles className="particles" params={particlesParameters}/>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognitionImage 
        imageUrl={this.state.imageUrl} box={this.state.box}
        />
      </div>
    )
  }

}

export default App;