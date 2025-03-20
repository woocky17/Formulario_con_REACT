import { Anchor, Container, Group, Text } from "@mantine/core";
import classes from "./Footer.module.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const links = [
  { label: "David" },
  { label: "Raúl" },
  { label: "Marc" },
  { label: "Judith" },
];

export function Footer() {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const { t } = useTranslation();

  /**
   * Hook para actualizar el valor de la fecha cada segundo.
   * Solo se ejecuta al montar el componente, generándose un intervalo que se actualiza cada segundo.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);

    // limpieza cuando se desmonta el componente o cuando cambian las dependencias (antes de ejecutar el efecto de nuevo) -- en este caso no hay dependencias asociadas --:
    return () => clearInterval(interval);
  }, []);

  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: "grape", to: "blue", deg: 84 }}
        >
          {t("appName")}
        </Text>
        <Text size="m" c="violet" fw={600}>
          {dateTime}
        </Text>
        <Group className={classes.links}>{items}</Group>
      </Container>
      {/* <Switch size="lg" onLabel="ENG" offLabel="ESP" color="violet"/> */}
    </div>
  );
}
