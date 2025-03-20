import { Anchor, Container, Group, Text } from "@mantine/core";
import classes from "./Footer.module.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * 📌 Lista `links`
 * Contiene un conjunto de objetos con nombres que se mostrarán como enlaces en el pie de página.
 */
const links = [
  { label: "David" },
  { label: "Raúl" },
  { label: "Marc" },
  { label: "Judith" },
];


/**
 * 📌 Componente `Footer`
 * Renderiza un pie de página con el nombre de la aplicación, la fecha y hora actualizada dinámicamente y una lista de enlaces.
 * - Usa `useState` para manejar la fecha y hora actualizada en tiempo real.
 * - Utiliza `useEffect` para actualizar la fecha y hora cada segundo mediante un intervalo.
 * - Traduce el nombre de la aplicación usando `useTranslation`.
 *
 * @returns Un componente de pie de página con nombre de la app, fecha/hora y enlaces.
 */
export function Footer() {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const { t } = useTranslation();

  /**
   * 📌 `useEffect`
   * - Inicia un intervalo que actualiza la fecha y hora cada segundo.
   * - Se ejecuta solo una vez al montar el componente (`[]` como dependencia).
   * - Limpia el intervalo cuando el componente se desmonta o cuando cambian las dependencias (antes de ejecutar el efecto de nuevo) para evitar fugas de memoria.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);

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
    </div>
  );
}
