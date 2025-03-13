<<<<<<< HEAD
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
import { TextoAnimado } from "./TextoAnimado";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useState,
} from "react";

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
        <TextInput
          id={inputElement.id}
          label={TextoAnimado(inputElement.pregunta, indice)}
          onChange={handleChange}
          error={error}
        />
      );
    case "select":
      return (
        <Select
          id={inputElement.id}
          label={TextoAnimado(inputElement.pregunta, indice)}
          data={inputElement.opciones}
        />
      );
    case "check":
      return (
        <Radio.Group
          name={inputElement.id}
          label={TextoAnimado(inputElement.pregunta, indice)}
        >
          <Group mt="xs">
            {inputElement.opciones.map((element: any) => {
              return <Radio value={element} label={element} />;
            })}
          </Group>
        </Radio.Group>
      );
    case "textarea":
      return (
        <Textarea
          id={inputElement.id}
          label={TextoAnimado(inputElement.pregunta, indice)}
        />
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
  return (
    <>
      {questions.map((element, key) => {
        return formGen(element, key);
      })}
    </>
=======
import { Button, Container, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JsonForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(0);
  const [formData, setFormData] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    if (form === 4) {
      navigate("/resume");
    }
  }, [form, navigate, formData]);

  const nextForm = () => {
    setForm((current) => current + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = [...formData];
    newFormData[form] = e.currentTarget.value;
    setFormData(newFormData);
  };

  return (
    <Container size="md" style={{ textAlign: "center", padding: "50px 0" }}>
      <h1>Form {form}</h1>
      <TextInput
        value={formData[form] || ""}
        onChange={handleInputChange}
      ></TextInput>
      <Button
        onClick={() => {
          nextForm();
        }}
      >
        Next
      </Button>
    </Container>
>>>>>>> 5f79f347f00462d56230abe5bf48eb4f8875c4bc
  );
};

export default JsonForm;
