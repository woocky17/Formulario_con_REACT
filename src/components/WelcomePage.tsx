import { Button, Container, Title, Text, Paper, List } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconCheck } from "@tabler/icons-react";

interface WelcomePageProps {
  language: string;
}
// import Particles from "react-tsparticles";
// import { Engine } from "tsparticles-engine";
// import { loadSlim } from "tsparticles-slim";

const WelcomePage = ({ language }: WelcomePageProps) => {
  const navigate = useNavigate();
  // const particlesInit = async (engine: Engine) => {
  //   await loadSlim(engine);
  // };

  const texts = {
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

  const t = language === "en" ? texts.en : texts.es;

  return (
    <Container size="md">
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        style={{
          backgroundColor: "white",
          padding: "40px",
        }}
      >
        {/* <Particles>
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
      /> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <Title order={1} mb="md" style={{ color: "#764ba2" }}>
              {t.welcome}
            </Title>
            <Text size="lg" mb="xl">
              {t.description}
            </Text>
          </div>
        </div>

        <List
          spacing="sm"
          size="md"
          center
          icon={<IconCheck style={{ color: "#764ba2" }} />}
          mb="xl"
        ></List>

        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: "#667eea", to: "#764ba2" }}
          onClick={() => navigate("/form")}
        >
          {t.startButton}
        </Button>
      </Paper>
    </Container>
  );
};

export default WelcomePage;
