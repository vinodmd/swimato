import React from "react";

class CardClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInfo:{name:"default",location:"default"} };
    // console.log("child constructor");
  }

  async componentDidMount() {
    // console.log("child componentDidMount");
    let apiData =  await fetch('https://api.github.com/users/vinodmd');
     apiData =  await apiData.json();
    console.log(apiData);
    this.setState({userInfo:{name:apiData.name,location:apiData.location}})
  }
  componentDidUpdate() {  
    // console.log("child componentDidUpdate");
  }

  componentWillUnmount() {
    // console.log("child componentWillUnmount");
  }

  render() {
    return (
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
        <h3 className="text-xl font-semibold mb-2">
          <strong>Name:</strong> {this.state.userInfo.name}
        </h3>
        <p className="text-gray-700 mb-1">
          <strong>Location:</strong>{" "}
          {/* {this.state.userInfo.location ? this.state.userInfo.location : "default"} */}
        </p>
        <p className="text-gray-700">
          <strong>Instagram:</strong> @{this.props.instagram?.toLowerCase()}
        </p>
    
        {/* Uncomment if needed later
        <p className="mt-4">
          <strong>Count:</strong> {this.state.count}
          <button
            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              this.setState(() => {
                console.log("child setState");
                return { count: this.state.count + 1 };
              });
            }}
          >
            Increment
          </button>
        </p> */}
      </div>
    );
    
  }
}
export default CardClass;
