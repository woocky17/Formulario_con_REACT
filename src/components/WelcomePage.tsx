import { Button, Container, Title, Text, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

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
            Comienzar con los formularios.
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
