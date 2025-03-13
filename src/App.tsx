import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomePage from './components/WelcomePage';
import PersonalForm from './components/PersonalForm';
import AcademicForm from './components/AcademicForm';

function App() {
  const [formularioActual, setFormularioActual] = useState(0);
  const [respuestas, setRespuestas] = useState(() => {
    const respuestasGuardadas = localStorage.getItem('respuestas');
    return respuestasGuardadas ? JSON.parse(respuestasGuardadas): {};
  });


  // Al clicar el botón 'Reset' se eliminan las respuestas guardadas y vuelve al inicio
  // Esta función se pasa como prop a los formularios
  const handleReset = () => {
    setRespuestas({});
    setFormularioActual(0);
    localStorage.removeItem('respuestas');
  }

  //<> para devolver varios elementos sin tener que envolverlos en un div
  return (
    <div className="container mt-3">
      <header className='d-flex justify-content-between'>
        <h1>HEADER: Título de la app</h1>
        <div>
          <button className="btn btn-success">English</button> {/** onClick={() => i18n.changeLanguage('en')} */}
          <button className="btn btn-success">Español</button>
        </div>
      </header>

      <hr />
      <main>
        {/** WELCOME PAGE */}
        {formularioActual === 0 &&
          <div>
            <WelcomePage />
            <button onClick={() => setFormularioActual(1)} className='btn btn-success'>Empezar</button>
          </div>
        }

        {/** FORMULARIO PERSONAL */}
        {formularioActual === 1 && 
        <>
          <PersonalForm nextForm={() => setFormularioActual(2)}
          resetForm={handleReset}
          respuestasGuardadas={respuestas}
          />
        </>
        }
        
      
        {/** FORMULARIO ACADÉMICO */}
        {formularioActual === 2 &&
        <>
          <AcademicForm nextForm={() => setFormularioActual(3)}/>
          <button onClick={handleReset} className='btn btn-success'>Reset</button>
        </>
        }
      
      </main>

      <hr />
      <footer>
        <p>FOOTER: Nombre de la app</p>
        <p>Fecha, hora y minutos</p>
      </footer>
    </div>
  )
}

export default App
