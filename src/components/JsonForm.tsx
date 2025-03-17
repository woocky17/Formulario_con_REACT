import { Button, Stack, TextInput, Textarea, Select } from "@mantine/core";
import questions from "../assets/cuestionarios.json";

function inputTextGen(inputElement: any) {
  switch (inputElement.tipo) {
    case "text":
      return (
          <TextInput 
            id={inputElement.id}
            label={inputElement.pregunta}
          />
      );
    case "select":
      return (
        <Select 
          id={inputElement.id}
          label={inputElement.pregunta}
          data={inputElement.opciones}
        />
      )

    default:
      break;
  }
  return (
    <div>
      <p>{inputElement.pregunta}</p>
    </div>
  );
}

function formGen(form: any) {
  return form.preguntas.map((element: any) => {
    return inputTextGen(element);
  });
}

const JsonForm = () => {
  return (
    <>
      {questions.map((element, key) => {
        return formGen(element, key);
      })}
    </>
  );
};

export default JsonForm;
