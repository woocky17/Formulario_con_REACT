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
import { useTranslation } from "react-i18next";
import classes from './JsonForm.module.css';

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

/**
 * Función que genera el input correspondiente para cada tipo de pregunta.
 * Dependiendo del tipo de pregunta (`text`, `select`, `check`, `textarea`), genera un componente
 * de formulario adecuado con sus respectivas validaciones, manejo de errores y valores.
 * @param {FormQuestion} inputElement - El objeto que contiene la pregunta y sus propiedades.
 * @param {number} indice - El índice de la pregunta en el formulario.
 * @param {Function} handleInputChange - Función para manejar el cambio en el valor del input.
 * @param {Record<string, string>} formErrors - Objeto que contiene los errores de validación por cada input.
 * @param {any} currentValue - El valor actual del input.
 * @param {string} language - El idioma actual.
 * @returns {JSX.Element} - El componente JSX correspondiente al tipo de input.
 */
function InputTextGen({
  inputElement,
  indice,
  handleInputChange,
  formErrors,
  currentValue,
}: {
  inputElement: FormQuestion;
  indice: number;
  handleInputChange: (id: string, value: any) => void;
  formErrors: Record<string, string>;
  currentValue: any;
  language: string;
}) {
  const errorMessage = formErrors[inputElement.id] || null;
  const { t } = useTranslation();



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
        placeholder={inputElement.validacion?.min_edad ? t('datePlaceholder') : ''}
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
        placeholder={t("selectPlaceholder")}
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
/**
 * Función que genera el formulario completo, iterando sobre las preguntas y generando los
 * inputs correspondientes. Además, maneja el cambio de valores y los errores de validación.
 * @param {any} form - El objeto que contiene los datos del formulario (titulo, preguntas).
 * @param {Function} handleInputChange - Función para manejar el cambio en el valor de los inputs.
 * @param {Record<string, string>} formErrors - Objeto que contiene los errores de validación por cada input.
 * @param {FormData} formData - Los datos actuales del formulario.
 * @param {string} language - El idioma actual.
 * @returns {JSX.Element} - El componente JSX del formulario completo.
 */
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

  const { t } = useTranslation();

  useEffect(() => {
    if (existingFormData && existingFormData[cuestionarioActual]) {
      setCurrentFormData(existingFormData[cuestionarioActual]);
    } else {
      setCurrentFormData({});
    }
  }, [cuestionarioActual, existingFormData]);
  const questions = language === "en" ? questionsEn : questionsEs;

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

  /**
   * Función que maneja la validación del formulario, revisando si todas las preguntas
   * tienen respuestas válidas y que cumplen con las restricciones especificadas.
   * @returns {boolean} - Devuelve `true` si el formulario es válido, `false` en caso contrario.
   */

  const validateForm = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    const currentForm = questions[cuestionarioActual];

    currentForm.preguntas!.forEach((pregunta: FormQuestion) => {
      const valor = currentFormData[pregunta.id];

      // Valida si el valor está vacío o no se ha completado correctamente
      if (
        valor === undefined ||
        valor === null ||
        valor === "" ||
        (Array.isArray(valor) && valor.length === 0)
      ) {
        errors[pregunta.id] = t("selectError");
        isValid = false;
        return;
      }

      // Valida el tipo y el numero de caracteres de los campos "text" y "textarea"
      if (
        (pregunta.tipo === "text" || pregunta.tipo === "textarea") &&
        typeof valor === "string"
      ) {
        if (pregunta.restricciones) {
          if (
            valor.length < pregunta.restricciones.min ||
            valor.length > pregunta.restricciones.max
          ) {
            errors[pregunta.id] = t("lengthError")
              .replace("{min}", pregunta.restricciones.min.toString())
              .replace("{max}", pregunta.restricciones.max.toString());
            isValid = false;
          }
        }
        // Valida la edad mínima si está definida
        if (pregunta.validacion?.min_edad) {
          const datePattern = /^\d{2}-\d{2}-\d{4}$/;

          // si no cumple con el pattern 01-02-1999
          if (!datePattern.test(valor)) {
            errors[pregunta.id] = t("ageError");
            isValid = false;
          } else {
            // calculamos la diferencia de edad
            const [day, month, year] = valor.split("-").map(Number); // fecha que ha puesto el usuario viene en formato "19-02-1999", lo separamos en día, mes y año
            const birthDate = new Date(year, month - 1, day); // meses empiezan por 0, por eso restamos 1 al mes

            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            const dayDifference = today.getDate() - birthDate.getDate();

            // si aún no ha cumplido años en el año actual
            if (
              monthDifference < 0 ||
              (monthDifference === 0 && dayDifference < 0)
            ) {
              age--;
            }

            if (age < pregunta.validacion.min_edad) {
              errors[pregunta.id] = t("ageError").replace(
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
            errors[pregunta.id] = t("emailError").replace("{domain}", domain);
            isValid = false;
          }
        }
      }

      // Valida si el formato del email es correcto
      if (
        pregunta.tipo === "check" &&
        Array.isArray(valor) &&
        pregunta.validacion?.max_seleccionados
      ) {
        if (valor.length > pregunta.validacion.max_seleccionados) {
          errors[pregunta.id] = t("maxSelectionsError").replace(
            "{max}",
            pregunta.validacion.max_seleccionados.toString()
          );
          isValid = false;
        }
      }
    });

    setFormErrors(errors);

    if (!isValid) {
      setGeneralError(t("formError"));
    }

    return isValid;
  };
  /**
   * Función que maneja el envío del formulario. Valida el formulario, guarda los datos
   * y navega a la siguiente pantalla o a la pantalla de resumen.
   */
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
  /**
   * Función que permite navegar hacia el cuestionario anterior.
   * Se asegura de que no se pueda retroceder más allá del primer cuestionario.
   */
  const backToPrevious = () => {
    if (cuestionarioActual > 0) {
      setCuestionarioActual(cuestionarioActual - 1);
    }
  };

  const progressPercentage =
    ((cuestionarioActual + 1) / questions.length) * 100;

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <Text size="sm" mb="xs">
          {t("progress")}: {cuestionarioActual + 1}/{questions.length}
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

      <div className={classes.buttonsContainer}>
        {cuestionarioActual > 0 && (
          <Button
            variant="gradient"
            gradient={{ from: "#667eea", to: "#764ba2", deg: 135 }}
            size="md"
            radius="md"
            onClick={() => backToPrevious()}
          >
            {t("prev")}
          </Button>
        )}

        <Button
          variant="gradient"
          gradient={{ from: "#667eea", to: "#764ba2", deg: 135 }}
          size="md"
          radius="md"
          onClick={handleSubmit}
        >
          {cuestionarioActual < questions.length - 1 ? t("next") : t("finish")}
        </Button>
      </div>
    </div>
  );
};

export default JsonForm;
