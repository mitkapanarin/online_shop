import { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
  render() {
    return (
      <h1 className="flex flex-col justify-center items-center h-[60vh]">
        <h1 className="text-3xl">Welcome to the Home Page!</h1>
        <Link to="/clothes" className="my-4 font-bold underline">
          Click to Visit Shop
        </Link>
      </h1>
    );
  }
}

export default Home;
