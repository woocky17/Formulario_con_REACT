/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInput, Textarea, Select, Radio, Group, Button } from "@mantine/core";
import questions from "../assets/cuestionarios.json";
import { useState } from "react";
import { InputAnimado, TextoAnimado } from "./animation";
import { useNavigate } from "react-router-dom";

// TODO: Cargar los datos del localStorage si existen
function InputTextGen({ inputElement, indice, handleInputChange, formErrors }: any) {
  const [value, setValue] = useState("");
  
  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    handleInputChange(inputElement.id, inputValue);
  };

  const errorMessage = formErrors[inputElement.id] || null;

  if (inputElement.tipo === "text") {
    return InputAnimado(
      <TextInput
        id={inputElement.id}
        label={TextoAnimado(inputElement.pregunta, indice)}
        onChange={handleChange}
        error={errorMessage}
      />,
      indice
    );
  }

  if (inputElement.tipo === "select") {
    return InputAnimado(
      <Select
        id={inputElement.id}
        label={TextoAnimado(inputElement.pregunta, indice)}
        data={inputElement.opciones}
        comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
        onChange={(value) => handleInputChange(inputElement.id, value)}
        error={errorMessage}
      />,
      indice
    );
  }

  if (inputElement.tipo === "check") {
    return InputAnimado(
      <Radio.Group
        name={inputElement.id}
        label={TextoAnimado(inputElement.pregunta, indice)}
        onChange={(value) => handleInputChange(inputElement.id, value)}
        error={errorMessage}
      >
        <Group mt="xs">
          {inputElement.opciones.map((element: any, i: number) => (
            <Radio key={i} value={element} label={element} />
          ))}
        </Group>
      </Radio.Group>,
      indice
    );
  }

  if (inputElement.tipo === "textarea") {
    return InputAnimado(
      <Textarea
        id={inputElement.id}
        label={TextoAnimado(inputElement.pregunta, indice)}
        onChange={(event) => handleInputChange(inputElement.id, event.target.value)}
        error={errorMessage}
      />,
      indice
    );
  }

  return (
    <div>
      <p>{inputElement.pregunta}</p>
    </div>
  );
}



function formGen(form: any, key: any, handleInputChange: any, formErrors: any) {
  let indice = 0;
  return (
    <form key={key}>
      <h1>{form.titulo}</h1>
      {form.preguntas.map((element: any) => {
        const indiceTemp = indice;
        indice = indice + element.pregunta.length;
        // return <>{InputTextGen(element, indiceTemp, handleInputChange)}</>;
        return (
          <InputTextGen
            key={element.id}
            inputElement={element}
            indice={indiceTemp}
            handleInputChange={handleInputChange}
            formErrors={formErrors}
          />
        );
      })}
    </form>
  );
}

const JsonForm = (t: any) => {
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<any>({});
  const [cuestionarioActual, setCuestionarioActual] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (id: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
    setFormErrors((prevErrors: any) => ({
      ...prevErrors,
      [id]: null, // Borra el error si el usuario corrige el campo
    }));
  };

  const validateForm = () => {
    let errors: any = {};
    let isValid = true;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@stucom\.com$/;

    // Validamos cada campo del cuestionario
    questions[cuestionarioActual].preguntas.forEach((pregunta: any) => {
      const valor = formData[pregunta.id];

      if(pregunta.tipo === 'text' || pregunta.tipo === 'textarea') {
        if(!valor || valor.length < pregunta.restricciones.min || valor.length > pregunta.restricciones.max) {
          errors[pregunta.id] = `El campo debe tener entre ${pregunta.restricciones.min} y ${pregunta.restricciones.max} caracteres`;
          isValid = false;
        } else if(pregunta.validacion && pregunta.validacion.min_edad && valor < pregunta.validacion.min_edad) {
          errors[pregunta.id] = `Debe ser mayor de ${pregunta.validacion.min_edad} años`;
          isValid = false;
        } else if(pregunta.validacion && pregunta.validacion.formato && !emailPattern.test(valor)) {
          errors[pregunta.id] = `Debe ingresar un email válido con dominio @stucom.com`;
          isValid = false;
        }
      }

      if(pregunta.tipo === 'select' && !valor) {
        errors[pregunta.id] = "Debe seleccionar una opción";
        isValid = false;
      }
      
      // TODO: Validar max_seleccionados
      if(pregunta.tipo === 'check' && !valor) {
        errors[pregunta.id] = "Debe seleccionar una opción";
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = () => {
    try {
      if(!validateForm()) {
        console.error("Error al validar el formulario");
        return;
      }

      // Guardar los datos del formulario en localStorage
      localStorage.setItem(`formData_${cuestionarioActual}`, JSON.stringify(formData));
      console.log("Form data saved to localStorage:", formData);

      // Paso al siguiente cuestionario:
      if(cuestionarioActual < questions.length - 1) {
        console.log("setCuestionarioActual", cuestionarioActual + 1);
        setCuestionarioActual(cuestionarioActual + 1);
        setFormData({}); // Reset de los datos para el siguiente cuestionario
      } else {
        console.log("¡Cuestionarios completados!");
        
        // Redireccionar a la página de resumen
        navigate("/resume");
      }
    } catch (error) {
        console.error("Error al guardar el formulario:", error);
    }

  };


  return (
    <>
      {formGen(questions[cuestionarioActual], cuestionarioActual, handleInputChange, formErrors)}
      <Button variant="filled" color="violet" size="md" radius="md" onClick={handleSubmit}>Siguiente</Button>
    </>
  );
};

export default JsonForm;
