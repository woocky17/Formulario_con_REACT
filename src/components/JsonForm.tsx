/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TextInput,
  Textarea,
  Select,
  Radio,
  Checkbox,
  Group,
  Button,
  Paper,
  Title,
  Text,
  Alert,
  Progress,
} from "@mantine/core";
import questionsEs from "../assets/cuestionario-es.json";
import questionsEn from "../assets/cuestionario-en.json";
import { useState, useEffect } from "react";
import { InputAnimado, TextoAnimado } from "./animation";
import { useNavigate } from "react-router-dom";

interface FormQuestion {
  id: string;
  tipo: string;
  pregunta: string;
  respuesta: string | string[];
  opciones?: string[];
  restricciones?: {
    min: number;
    max: number;
  };
  validacion?: {
    min_edad?: number;
    formato?: string;
    dominio?: string;
    max_seleccionados?: number;
  };
}

interface FormItem {
  cuestionario: number;
  [key: string]: string | string[] | number;
}

interface FormData {
  [key: string]: string | string[] | number;
}

interface JsonFormProps {
  language: string;
  formData: FormItem[];
  setFormData: React.Dispatch<React.SetStateAction<FormItem[]>>;
}

function InputTextGen({
  inputElement,
  indice,
  handleInputChange,
  formErrors,
  currentValue,
  language,
}: {
  inputElement: FormQuestion;
  indice: number;
  handleInputChange: (id: string, value: any) => void;
  formErrors: Record<string, string>;
  currentValue: any;
  language: string;
}) {
  const errorMessage = formErrors[inputElement.id] || null;

  const dictionary = {
    es: {
      selectPlaceholder: "Selecciona una opción",
    },
    en: {
      selectPlaceholder: "Select an option",
    },
  };

  const t = language === "en" ? dictionary.en : dictionary.es;

  const texts = {
    es: {
      selectPlaceholder: "Selecciona una opción",
    },
    en: {
      selectPlaceholder: "Select an option",
    },
  };

  const t = language === "en" ? texts.en : texts.es;

  if (inputElement.tipo === "text") {
    return InputAnimado(
      <TextInput
        id={inputElement.id}
        label={TextoAnimado(inputElement.pregunta, indice)}
        onChange={(event) =>
          handleInputChange(inputElement.id, event.target.value)
        }
        error={errorMessage}
        value={currentValue || ""}
        required
      />,
      indice
    );
  }

  if (inputElement.tipo === "select") {
    return InputAnimado(
      <Select
        id={inputElement.id}
        label={TextoAnimado(inputElement.pregunta, indice)}
        data={inputElement.opciones || []}
        comboboxProps={{
          transitionProps: { transition: "pop", duration: 200 },
        }}
        onChange={(value) => handleInputChange(inputElement.id, value || "")}
        error={errorMessage}
        value={currentValue || null}
        placeholder={t.selectPlaceholder}
        required
      />,
      indice
    );
  }

  if (inputElement.tipo === "check") {
    if (
      inputElement.validacion?.max_seleccionados &&
      inputElement.validacion.max_seleccionados > 1
    ) {
      return InputAnimado(
        <Checkbox.Group
          value={Array.isArray(currentValue) ? currentValue : []}
          onChange={(value) => handleInputChange(inputElement.id, value)}
          label={TextoAnimado(inputElement.pregunta, indice)}
          error={errorMessage}
          required
        >
          <Group mt="xs">
            {(inputElement.opciones || []).map((option, i) => (
              <Checkbox key={i} value={option} label={option} />
            ))}
          </Group>
        </Checkbox.Group>,
        indice
      );
    }

    return InputAnimado(
      <Radio.Group
        name={inputElement.id}
        label={TextoAnimado(inputElement.pregunta, indice)}
        onChange={(value) => handleInputChange(inputElement.id, value)}
        error={errorMessage}
        value={currentValue || ""}
        required
      >
        <Group mt="xs">
          {(inputElement.opciones || []).map((element, i) => (
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
        onChange={(event) =>
          handleInputChange(inputElement.id, event.target.value)
        }
        error={errorMessage}
        value={currentValue || ""}
        minRows={4}
        required
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

function FormGenerator({
  form,
  handleInputChange,
  formErrors,
  formData,
  language,
}: {
  form: any;
  handleInputChange: (id: string, value: any) => void;
  formErrors: Record<string, string>;
  formData: FormData;
  language: string;
}) {
  let indice = 0;

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder mb="xl">
      <Title order={2} mb="lg" style={{ color: "#764ba2" }}>
        {form.titulo}
      </Title>
      {form.preguntas.map((element: FormQuestion) => {
        const indiceTemp = indice;
        indice = indice + element.pregunta.length;
        return (
          <InputTextGen
            key={element.id}
            inputElement={element}
            indice={indiceTemp}
            handleInputChange={handleInputChange}
            formErrors={formErrors}
            currentValue={formData[element.id]}
            language={language}
          />
        );
      })}
    </Paper>
  );
}

const JsonForm = ({
  language,
  formData: existingFormData,
  setFormData: setExistingFormData,
}: JsonFormProps) => {
  const [currentFormData, setCurrentFormData] = useState<FormData>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [cuestionarioActual, setCuestionarioActual] = useState(0);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const navigate = useNavigate();

  const texts = {
    es: {
      next: "Siguiente",
      finish: "Finalizar",
      formError: "Por favor, corrige los errores antes de continuar.",
      progress: "Progreso",
      lengthError: "El campo debe tener entre {min} y {max} caracteres",
      ageError: "Debe ser mayor de {age} años",
      emailError: "Debe ingresar un email válido con dominio @{domain}",
      selectError: "Debe seleccionar una opción",
      maxSelectionsError: "Debe seleccionar máximo {max} opciones",
      minSelectionsError: "Debe seleccionar al menos una opción",
    },
    en: {
      next: "Next",
      finish: "Finish",
      formError: "Please correct the errors before continuing.",
      progress: "Progress",
      lengthError: "Field must be between {min} and {max} characters",
      ageError: "You must be older than {age} years",
      emailError: "You must enter a valid email with domain @{domain}",
      selectError: "You must select an option",
      maxSelectionsError: "You must select maximum {max} options",
      minSelectionsError: "You must select at least one option",
    },
  };

  const t = language === "en" ? texts.en : texts.es;

  useEffect(() => {
    if (existingFormData && existingFormData[cuestionarioActual]) {
      setCurrentFormData(existingFormData[cuestionarioActual]);
    } else {
      setCurrentFormData({});
    }
  }, [cuestionarioActual, existingFormData]);
  const questions = language === "en" ? questionsEn : questionsEs;

  const texts = {
    es: {
      next: "Siguiente",
      finish: "Finalizar",
      formError: "Por favor, corrige los errores antes de continuar.",
      progress: "Progreso",
      lengthError: "El campo debe tener entre {min} y {max} caracteres",
      ageError: "Debe ser mayor de {age} años",
      emailError: "Debe ingresar un email válido con dominio @{domain}",
      dateError:
        "Debe ingresar una fecha válida en formato DD-MM-YYYY (p.ej., 31-01-2002)",
      selectError: "Debe seleccionar una opción",
      maxSelectionsError: "Debe seleccionar máximo {max} opciones",
      minSelectionsError: "Debe seleccionar al menos una opción",
    },
    en: {
      next: "Next",
      finish: "Finish",
      formError: "Please correct the errors before continuing.",
      progress: "Progress",
      lengthError: "Field must be between {min} and {max} characters",
      ageError: "You must be older than {age} years",
      emailError: "You must enter a valid email with domain @{domain}",
      dateError:
        "You must enter a valid date with the DD-MM-YYYY format (e.g., 31-01-2002)",
      selectError: "You must select an option",
      maxSelectionsError: "You must select maximum {max} options",
      minSelectionsError: "You must select at least one option",
    },
  };

  const t = language === "en" ? texts.en : texts.es;

  useEffect(() => {
    if (existingFormData && existingFormData[cuestionarioActual]) {
      setCurrentFormData(existingFormData[cuestionarioActual]);
    } else {
      setCurrentFormData({});
    }
  }, [cuestionarioActual, existingFormData]);

  const handleInputChange = (id: string, value: any) => {
    setCurrentFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (formErrors[id]) {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
    }

    if (generalError) {
      setGeneralError(null);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    const currentForm = questions[cuestionarioActual];

    currentForm.preguntas.forEach((pregunta: FormQuestion) => {
      const valor = currentFormData[pregunta.id];

      if (
        valor === undefined ||
        valor === null ||
        valor === "" ||
        (Array.isArray(valor) && valor.length === 0)
      ) {
        errors[pregunta.id] = t.selectError;
        isValid = false;
        return;
      }

      if (
        (pregunta.tipo === "text" || pregunta.tipo === "textarea") &&
        typeof valor === "string"
      ) {
        if (pregunta.restricciones) {
          if (
            valor.length < pregunta.restricciones.min ||
            valor.length > pregunta.restricciones.max
          ) {
            errors[pregunta.id] = t.lengthError
              .replace("{min}", pregunta.restricciones.min.toString())
              .replace("{max}", pregunta.restricciones.max.toString());
            isValid = false;
          }
        }

        if (pregunta.validacion?.min_edad) {
          const datePattern = /^\d{2}-\d{2}-\d{4}$/;

          // si no cumple con el pattern 01-02-1999
          if (!datePattern.test(valor)) {
            errors[pregunta.id] = t.dateError;
            isValid = false;
          } else {
            // calculamos la diferencia de edad
            const birthDate = new Date(valor);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            const monthDifference =
              new Date().getMonth() - birthDate.getMonth();
            const dayDifference = new Date().getDate() - birthDate.getDate();

            if (
              age < pregunta.validacion.min_edad ||
              (age === pregunta.validacion.min_edad && monthDifference < 0) ||
              (age === pregunta.validacion.min_edad &&
                monthDifference === 0 &&
                dayDifference < 0)
            ) {
              errors[pregunta.id] = t.ageError.replace(
                "{age}",
                pregunta.validacion.min_edad.toString()
              );
              isValid = false;
            }
          }
        }

        if (pregunta.validacion?.formato === "email") {
          const domain = pregunta.validacion.dominio || "";
          const emailPattern = new RegExp(`^[a-zA-Z0-9._%+-]+@${domain}$`);

          if (!emailPattern.test(valor)) {
            errors[pregunta.id] = t.emailError.replace("{domain}", domain);
            isValid = false;
          }
        }
      }

      if (
        pregunta.tipo === "check" &&
        Array.isArray(valor) &&
        pregunta.validacion?.max_seleccionados
      ) {
        if (valor.length > pregunta.validacion.max_seleccionados) {
          errors[pregunta.id] = t.maxSelectionsError.replace(
            "{max}",
            pregunta.validacion.max_seleccionados.toString()
          );
          isValid = false;
        }
      }
    });

    setFormErrors(errors);

    if (!isValid) {
      setGeneralError(t.formError);
    }

    return isValid;
  };

  const handleSubmit = () => {
    try {
      if (!validateForm()) {
        return;
      }

      const updatedFormData = [...existingFormData];

      updatedFormData[cuestionarioActual] = {
        ...currentFormData,
        cuestionario: cuestionarioActual,
      };

      setExistingFormData(updatedFormData);

      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      if (cuestionarioActual < questions.length - 1) {
        setCuestionarioActual(cuestionarioActual + 1);
      } else {
        navigate("/resume");
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const progressPercentage =
    ((cuestionarioActual + 1) / questions.length) * 100;

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <Text size="sm" mb="xs">
          {t.progress}: {cuestionarioActual + 1}/{questions.length}
        </Text>
        <Progress
          value={progressPercentage}
          color="violet"
          size="md"
          radius="xl"
        />
      </div>

      <FormGenerator
        form={questions[cuestionarioActual]}
        handleInputChange={handleInputChange}
        formErrors={formErrors}
        formData={currentFormData}
        language={language}
      />

      {generalError && (
        <Alert title="Error" color="red" mb="md">
          {generalError}
        </Alert>
      )}

      <Button
        variant="gradient"
        gradient={{ from: "#667eea", to: "#764ba2", deg: 135 }}
        size="md"
        radius="md"
        onClick={handleSubmit}
      >
        {cuestionarioActual < questions.length - 1 ? t.next : t.finish}
      </Button>
    </div>
  );
};

export default JsonForm;
