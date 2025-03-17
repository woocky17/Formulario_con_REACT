import './App.css'
import { Switch } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();  // Accedemos a la función `t` para traducir
  const [resultat, setResultat] = useState<number>(0);  // Definimos `resultat` con tipo `number`

  useEffect(() => {
    const Valor1 = 1;
    setResultat(Valor1);  
  }, []);

  const handleLanguageChange = (checked: boolean) => {
    if (checked) {
      i18n.changeLanguage('en'); 
    } else {
      i18n.changeLanguage('es'); 
    }
  };

  return (
    <div className="App">
    <div>{t('Welcome')}</div>  {/* Traducción de la clave 'test' */}
    <Switch size="xl" onLabel="ENG" offLabel="ESP" 
    onChange={(event) => handleLanguageChange(event.currentTarget.checked)}/>
    </div>

  )
}

export default App

//agafar json i traduir i escollir el json 
