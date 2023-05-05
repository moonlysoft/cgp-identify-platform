import React from "react";
// import Sidebar from './components/widgets/Sidebar';
import { Route, Routes } from "react-router-dom";
import Backend from "./page/Backend";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
// import Navbar from './components/widgets/Navbar';
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/widgets/Layout";

function App() {
  return (
    <Router>
      <div className="App bg-primary">
        <section>
          <div>
            <Routes>
              <Route
                path="/home"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/backend"
                element={
                  <Layout>
                    <Backend />
                  </Layout>
                }
              />

              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default App;
