import { Button, Container, Title, Text, Paper, List } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              {t("welcome")}
            </Title>
            <Text size="lg" mb="xl">
              {t("description")}
            </Text>
          </div>
        </div>

        <List spacing="sm" size="md" center mb="xl"></List>

        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: "#667eea", to: "#764ba2" }}
          onClick={() => navigate("/form")}
        >
          {t("startButton")}
        </Button>
      </Paper>
    </Container>
  );
};

export default WelcomePage;
