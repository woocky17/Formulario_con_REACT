import { Button, Container, Title, Text, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  // const particlesInit = async (engine: Engine) => {
  //   await loadSlim(engine);
  // };

  const dictionary = {
    es: {
      welcome: "Bienvenido",
      description:
        "Esta aplicación te permite completar una serie de cuestionarios sobre diferentes temas.",
      startButton: "Comenzar",
    },
    en: {
      welcome: "Welcome",
      description:
        "This application allows you to complete a series of questionnaires on different topics.",
      startButton: "Start",
    },
  };

  const t = language === "en" ? dictionary.en : dictionary.es;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "white",
      }}
    >
      <Container size="sm">
        <Paper
          shadow="xl"
          p="xl"
          radius="md"
          style={{
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            padding: "40px",
          }}
        >
          <Title order={1} mb="sm">
            ¡Bienvenido!
          </Title>
          <Text size="lg" mb="xl">
            Comenzar con los formularios.
          </Text>
          <Button size="lg" variant="white" onClick={() => navigate("/form")}>
            Comenzar
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default WelcomePage;
