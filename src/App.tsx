import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./Footer";
import Hero from "./Hero";
import Header from "./Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col bg-cover bg-no-repeat bg-fixed bg-hero-background">
          <div className="bg-gradient-to-t from-black to-transparent fixed w-dvw h-dvh z-0"></div>
          <Header></Header>
          <Hero></Hero>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
