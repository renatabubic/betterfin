import React from "react";
import "./styles/App.scss";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import axios from "axios";
import { proxyurl, url } from "./secrets";
import { nameToLowerCase } from "./helperFunctions";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get(proxyurl + url);
      const data = res.data;
      const name = data.accounts.account[0].displayedName.split(" ");
      let firstName = nameToLowerCase(name[0]);
      let lastName = nameToLowerCase(name[1]);
      this.setState({
        firstName,
        lastName,
      });
    } catch (error) {
      console.log(`There was an error loading data. Error code: ${error}`);
    }
  }
  render() {
    return (
      <div className="App">
        <Nav state={this.state} />
        <Dashboard />
        <Footer />
      </div>
    );
  }
}

export default App;
