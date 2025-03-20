import {
  Container,
  List,
  ThemeIcon,
  Title,
  Text,
  Paper,
  Button,
  Group,
} from "@mantine/core";
import questionsEs from "../assets/cuestionario-es.json";
import questionsEn from "../assets/cuestionario-en.json";

import { useNavigate } from "react-router-dom";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";


/**
 * 📌 Interfaz `FormItem`
 * Representa un objeto con los datos de un cuestionario.
 * - `cuestionario`: Número identificador del cuestionario.
 * - `[key: string]`: Permite almacenar preguntas con sus respuestas, que pueden ser `string`, `string[]` o `number`.
 */
interface FormItem {
  cuestionario: number;
  [key: string]: string | string[] | number;
}


/**
 * 📌 Props del componente `FormResume`
 * - `language`: Idioma seleccionado (es/en).
 * - `formData`: Array con las respuestas del usuario.
 * - `onReset`: Función para restablecer los datos del formulario.
 */
interface Props {
  language: string;
  formData: FormItem[];
  onReset: () => void;
}


/**
 * 📌 Componente `FormResume`
 * Muestra un resumen de las respuestas del usuario en el formulario.
 * - Carga las preguntas en el idioma seleccionado.
 * - Renderiza la información en una lista con el título del cuestionario y las respuestas.
 * - Permite reiniciar el formulario con una confirmación en un modal.
 * - Contiene botones para navegar o reiniciar los datos.
 */
const FormResume = ({ language, formData, onReset }: Props) => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  const questions = language === "en" ? questionsEn : questionsEs;


  /**
   * 📌 Función `getQuestion`
   * Obtiene el texto de la pregunta a partir de su identificador.
   * - Busca la pregunta dentro del cuestionario correspondiente.
   * - Si no encuentra la pregunta, devuelve el ID como fallback.
   * 
   * @param cuestionarioIndex - Índice del cuestionario en la lista.
   * @param questionId - Identificador de la pregunta.
   * @returns El texto de la pregunta o el ID si no se encuentra.
   */
  const getQuestion = (cuestionarioIndex: number, questionId: string) => {
    if (!questions[cuestionarioIndex].preguntas) return questionId;

    const question = questions[cuestionarioIndex].preguntas.find(
      (q: { id: string }) => q.id === questionId
    );

    return question?.pregunta;
  };

  /**
   * 📌 Función `handleReset`
   * Ejecuta la función `onReset` para restablecer los datos del formulario.
   */
  const handleReset = () => {
    onReset();
  };

  return (
    <Container size="lg">
      <Paper shadow="sm" p="xl" radius="md" withBorder mb="xl">
        <Title order={1} mb="xl" style={{ color: "#764ba2" }}>
          {t("title")}
        </Title>

        {formData.length > 0 ? (
          formData.map((formItem, formIndex) => (
            <Paper
              key={formIndex}
              shadow="xs"
              p="md"
              withBorder
              mb="lg"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <Title order={2} mb="md" style={{ color: "#667eea" }}>
                {questions[formItem.cuestionario]?.titulo ||
                  `${t("questionariTitle")} ${formItem.cuestionario + 1}`}
              </Title>

              <List
                spacing="md"
                size="md"
                center
                icon={
                  <ThemeIcon color="violet" size={24} radius="xl"></ThemeIcon>
                }
              >
                {Object.entries(formItem)
                  .filter(([key]) => key !== "cuestionario") // Filter out the cuestionario property
                  .map(([key, value]) => (
                    <List.Item key={key}>
                      <Text fw={500}>
                        {getQuestion(formItem.cuestionario, key)}
                      </Text>
                      <Text ml="xl">
                        {Array.isArray(value)
                          ? value.join(", ")
                          : (value as string)}
                      </Text>
                    </List.Item>
                  ))}
              </List>
            </Paper>
          ))
        ) : (
          <Text size="lg" mb="xl">
            {t("noData")}
          </Text>
        )}

        <Modal opened={opened} onClose={close}>
          <Text>{t("confirm")}</Text>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Button variant="default" onClick={close} mr={10}>
              {t("cancel")}
            </Button>
            <Button color="red" onClick={handleReset}>
              {t("acceptReset")}
            </Button>
          </div>
        </Modal>

        <Group mt="xl">
          <Button variant="outline" color="red" onClick={open}>
            {t("reset")}
          </Button>

          <Button variant="outline" color="blue" onClick={() => navigate("/")}>
            {t("back")}
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default FormResume;
