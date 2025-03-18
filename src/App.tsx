import './App.css'
import { Switch } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// function App() {
  

//   return (
//     <div className="App">
//     <div>{t('Welcome')}</div>  {/* Traducción de la clave 'test' */}
    
//     </div>

//   )
// }

// export default App

//agafar json i traduir i escollir el json 
import "./App.css";
import JsonForm from "./components/JsonForm";
import FormResume from "./components/FormResume";
import WelcomePage from "./components/WelcomePage";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";

function App() {

  const { t, i18n } = useTranslation();  // Accedemos a la función `t` para traducir
  const [resultat, setResultat] = useState<number>(0);  // Definimos `resultat` con tipo `number`


  const handleLanguageChange = (checked: boolean) => {
    if (checked) {
      i18n.changeLanguage('en'); 
    } else {
      i18n.changeLanguage('es'); 
    }
  };

  return (
    <>
      <nav>
        <Switch size="xl" onLabel="ENG" offLabel="ESP" 
        onChange={(event) => handleLanguageChange(event.currentTarget.checked)}/>
      </nav>
      <Routes>
        <Route path="/" element={<WelcomePage translate={t}/>} />
        <Route path="/form" element={<JsonForm translate={t}/>} />
        <Route path="/resume" element={<FormResume translate={t}/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
