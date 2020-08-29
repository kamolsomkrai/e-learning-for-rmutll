import React from "react";
// import logo from './logo.svg';
import "./App.css";
import Header from "./components/Header/Header";
import { Route ,Redirect} from "react-router-dom";
import Mainpage from "./components/Mainpage/Mainpage";
import Imagegallery from "./components/Imagegallery/Imagegallery";
import intropage from "./components/Intropage/intropage";
import Rmultlogo from "./components/Logo/Rmultlogo";
// import Gallery from "./components/pic/pic";

function App() {
  return (
    <div className="grid-container">
      <section className="Logo">
        <Rmultlogo />
      </section>
      <header>
        <Header />
      </header>
      {/* <section className="Banner">Banner</section> */}
      <main>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/intro" />}
        />
        <Route path="/intro" component={intropage} />
          <Route path="/Mainpage" component={Mainpage} />
          <Route path="/image" component={Imagegallery} />

      </main>
      {/* <footer>footer</footer> */}
      {/* <section className="Hamberger"></section> */}
    </div>
  );
}

export default App;
