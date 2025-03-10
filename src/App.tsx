import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomePage from './components/WelcomePage';
import PersonalForm from './components/PersonalForm';
import AcademicForm from './components/AcademicForm';

function App() {
  const [formularioActual, setFormularioActual] = useState(0);

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
        {formularioActual === 1 && <PersonalForm nextForm={() => setFormularioActual(2)}/>}
      
        {/** FORMULARIO ACADÉMICO */}
        {formularioActual === 2 && <AcademicForm nextForm={() => setFormularioActual(3)}/>}
      
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
