import React , {Component} from "react";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkFrom/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import FaceRecognitionImage from "../components/FaceRecognitionImage/FaceRecognitionImage";
import './App.css';
import Particles from 'react-particles-js';

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

class App extends Component {

  constructor(){
    super();
  }

  render(){
    return (
      <div>
        <Particles className="particles" params={particlesParameters}/>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm/>
        {/*
        <FaceRecognitionImage/>
        */}
      </div>
    )
  }

}

export default App;