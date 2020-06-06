import React from "react";
import "./styles/App.scss";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Nav />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
