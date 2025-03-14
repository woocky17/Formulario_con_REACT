import "./App.css";
import JsonForm from "./components/JsonForm";
import FormResume from "./components/FormResume";
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/form" element={<JsonForm />} />
        <Route path="/resume" element={<FormResume />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
