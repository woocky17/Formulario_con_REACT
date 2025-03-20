import "./App.css";
import JsonForm from "./components/JsonForm";
import FormResume from "./components/FormResume";
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useState, useEffect } from "react";
import { Container } from "@mantine/core";

interface FormItem {
  cuestionario: number;
  [key: string]: string | string[] | number;
}

function App() {
  const [language, setLanguage] = useState("es");
  const [formData, setFormData] = useState<FormItem[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setFormData(Array.isArray(parsedData) ? parsedData : [parsedData]);
      } catch (error) {
        console.error("Error parsing stored form data:", error);
      }
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem("formData");
    setFormData([]);
    window.location.href = "/";
  };

  return (
    <div className="app-container">
      <Header language={language} setLanguage={setLanguage} />
      <main className="main-content">
        <Container size="lg" py="xl">
          <Routes>
            <Route path="/" element={<WelcomePage language={language} />} />
            <Route
              path="/form"
              element={
                <JsonForm
                  language={language}
                  formData={formData}
                  setFormData={setFormData}
                />
              }
            />
            <Route
              path="/resume"
              element={
                <FormResume
                  language={language}
                  formData={formData}
                  onReset={handleReset}
                />
              }
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
