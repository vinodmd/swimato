import React from "react";
import Card from "./Card";
import CardClass from "./CardClass";

class AboutUs extends React.Component{
  constructor(props){
    super(props)
    console.log("parent counstructor")
  }
  componentDidMount(){
    console.log("parent componentDidMount")
  }
  render(){

    console.log("parent render")
      return (
        <>
          <div className="aboutus"> this is my about us page</div>
          <CardClass instagram={'unstable_athma'}/>
        </>
      );
    };
}


export default AboutUs;
