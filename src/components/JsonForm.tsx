import {
  Button,
  Stack,
  TextInput,
  Textarea,
  Select,
  Radio,
  Group,
} from "@mantine/core";
import questions from "../assets/cuestionarios.json";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { motion } from "framer-motion";
import { InputAnimado,TextoAnimado } from "./animation";

function inputTextGen(inputElement: any, indice: any) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  switch (inputElement.tipo) {
    case "text":
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        if (inputValue.length > 0 && inputValue.length < inputElement.restricciones.min) {
          setError("Debe tener al menos "+inputElement.restricciones.min+" caracteres");
        } else if (inputValue.length > inputElement.restricciones.max) {
          setError("No puede superar los "+inputElement.restricciones.max+" caracteres");
        } else {
          setError(null);
        }
      };
      return (
        InputAnimado((
          <TextInput 
            id={inputElement.id}
            label={TextoAnimado(inputElement.pregunta, indice)}
            onChange={handleChange}
            error={error}
          />
        ), indice)
      );
    case "select":
      return (
        InputAnimado((

        <Select
          id={inputElement.id}
          label={TextoAnimado(inputElement.pregunta, indice)}
          data={inputElement.opciones}
        />        ), indice)

      );
    case "check":
      return (
        InputAnimado((

        <Radio.Group
          name={inputElement.id}
          label={TextoAnimado(inputElement.pregunta, indice)}
        >
          <Group mt="xs">
            {inputElement.opciones.map((element: any) => {
              return <Radio value={element} label={element} />;
            })}
          </Group>
        </Radio.Group>        ), indice)

      );
    case "textarea":
      return (
        InputAnimado((

        <Textarea
          id={inputElement.id}
          label={TextoAnimado(inputElement.pregunta, indice)}
        />        ), indice)

      );
    default:
      break;
  }
  return (
    <div>
      <p>{inputElement.pregunta}</p>
    </div>
  );
}

function formGen(form: any, key: any) {
  let indice = 0;
  return (
    <form key={key}>
      <h1>{form.titulo}</h1>
      {form.preguntas.map((element: any) => {
        let indiceTemp = indice;
        indice = indice + element.pregunta.length;
        return <>{inputTextGen(element, indiceTemp)}</>;
      })}
    </form>
  );
}

const JsonForm = () => {
  questions.map(element => {
    
  });
  return (
    <>
       {formGen(questions[0], 0)};
      
    </>
  );
};

export default JsonForm;
