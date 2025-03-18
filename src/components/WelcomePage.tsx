import { Button, Container, Title, Text, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const WelcomePage = () => {
  const navigate = useNavigate();

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        pointerEvents: "auto",
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: "transparent",
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              repulse: { distance: 50 },
              push: { quantity: 10 },
            },
          },
          particles: {
            number: { value: 100 },
            size: { value: 3 },
            move: { enable: true, speed: 1.4 },
            links: { enable: true, color: "#ffffff", opacity: 0.7 },
          },
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Container size="sm" style={{ position: "relative", zIndex: 1 }}>
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
