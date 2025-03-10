import React, { useState, useEffect } from "react";

// Interfaz con la estructura de una pregunta del JSON
interface Pregunta {
    id: string;
    tipo: 'text' | 'select' | 'check' | 'textarea';
    pregunta: string;
    respuesta: any;
    opciones?: string[];
    restricciones?: {
        min?: number;
        max?: number;
    },
    validacion?: {
        formato?: string;
        dominio?: string;
        min_edad?: number;
        max_seleccionados?: number;
    }
}

// Interfaz con la estructura de un cuestionario del JSON
interface Cuestionario {
    titulo: string;
    preguntas: Pregunta[];
}

// Interfaz para definir las propiedades que recibirá el componente
interface PersonalFormProps {
    nextForm: () => void;
}

/** 
 * React.FC -> Declaramos que estamos creando un componente funcional
 * <PersonalFormProps> -> indica las props que el componente recibirá
 * ({ nextForm }) -> desestructuración de las props, accedemos directamente a nextForm
 */
const PersonalForm: React.FC<PersonalFormProps> = ({ nextForm }) => { 
    // estado para guardar los datos del cuestionario del JSON
    const [cuestionario, setCuestionario] = useState<Cuestionario | null>(null);
    
    // estado para guardar las respuestas
    const [respuestas, setRespuestas] = useState<{ [key: string]: string}>({});
    
    // estado para guardar los errores de validación
    const [errores, setErrores] = useState<string>('');
    
    // cargamos el cuestionario del JSON
    useEffect(() => {
        const fetchCuestionario = async () => {
            try {
              const response = await fetch('/assets/cuestionarios.json');
              const data: Cuestionario[] = await response.json();
              setCuestionario(data[0]);
            } catch (error) {
              console.error('Error al cargar el cuestionario de datos personales:', error);
            }
        };

        fetchCuestionario();
    }, []); // se ejecutará solo al montar el componente
    
    useEffect(() => {
        console.log('Respuestas actualizadas:', respuestas);
    }, [respuestas]);
    

    const handleRespuestaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, id: string) => {
        let value = e.target.value;

        // verficamos si el evento proviene de un input type checkbox
        if(e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
            value = e.target.checked? 'on' : '';
        }

        setRespuestas((prevRespuestas) => ({
           ...prevRespuestas,
           [id]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Respuestas:', respuestas);
        // guardar en localStorage?

        // validación del formulario
        const incompleteFields = Object.values(respuestas).some((respuesta) => respuesta === '');
        if(incompleteFields) {
            console.log('Campos incompletos');
            setErrores('Por favor, complete todos los campos.');
            return;
        }

        setErrores(''); // limpieza de errores si están todos los campos completos y validados
        nextForm(); // pasamos al siguiente formulario
    }

    if(!cuestionario) {
        return <div>Cargando cuestionario...</div>;
    }

    return (
        <>
            <h2 className="text-center mb-4">{cuestionario.titulo}</h2>
            <form onSubmit={handleSubmit}>
                {cuestionario.preguntas.map((pregunta) => (
                    <div key={pregunta.id} className="mb-3">
                        <label>{pregunta.pregunta}</label>

                        {pregunta.tipo === 'text' &&
                            <input type="text"
                            className="form-control"
                            value={respuestas[pregunta.id] || ''}
                            onChange={(e) => handleRespuestaChange(e, pregunta.id)}
                            min={pregunta.restricciones?.min}
                            max={pregunta.restricciones?.max}
                            />
                        }

                        {pregunta.tipo === 'select' &&
                            <select className="form-select"
                            onChange={(e) => handleRespuestaChange(e, pregunta.id)}>
                                {pregunta.opciones?.map((opcion) => (
                                    <option value={opcion} key={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                        }

                        {pregunta.tipo === 'check' && pregunta.opciones?.map((opcion) => (
                            <label>
                                <input type="checkbox"
                                className="form-check-input"
                                /**checked={respuestas[pregunta.id] === 'on'}*/
                                key={opcion}
                                onChange={(e) => handleRespuestaChange(e, pregunta.id)}/>
                                {opcion}
                            </label>
                        ))
                        }
                    </div>
                ))}

                {/** Si hay algún error de validación lo mostramos */}
                {errores &&
                    <div className="alert alert-danger">
                        {errores}
                    </div>
                }

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Siguiente</button>
                </div>
                
            </form>
        </>
    )
}


export default PersonalForm;