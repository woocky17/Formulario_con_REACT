import "./App.css";
import JsonForm from "./components/JsonForm";
import FormResume from "./components/FormResume";
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface FormItem {
  cuestionario: number;
  [key: string]: string | string[] | number;
}

function App() {
  const { i18n } = useTranslation();
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
      <Header />
      <main className="main-content">
        <Container size="lg" py="xl">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/form"
              element={
                <JsonForm
                  formData={formData}
                  setFormData={setFormData}
                  language={i18n.language}
                />
              }
            />
            <Route
              path="/resume"
              element={
                <FormResume
                  formData={formData}
                  onReset={handleReset}
                  language={i18n.language}
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
