import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Loader,
  Services,
  Navbar,
  Transactions,
  Welcome,
  Footer,
} from "./components/index";

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
