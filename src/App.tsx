import "./App.css";
import FormResume from "./components/FormResume";
import JsonForm from "./components/JsonForm";
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/form" element={<JsonForm />} />
      <Route path="/resume" element={<FormResume />} />
    </Routes>
  );
}

export default App;
