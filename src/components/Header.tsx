import { Container, NavLink, Switch } from "@mantine/core";
import { useState, useEffect } from "react";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import banner1 from "../assets/banners/banner1.png";
import banner2 from "../assets/banners/banner2.png";
import banner3 from "../assets/banners/banner3.png";
import banner4 from "../assets/banners/banner4.png";
import banner5 from "../assets/banners/banner5.png";

/**
 * 📌 Componente `Header`
 * - Contiene la navegación principal de la aplicación.
 * - Muestra un banner que cambia automáticamente.
 * - Permite cambiar el idioma entre español e inglés.
 */
export function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [banner1, banner2, banner3, banner4, banner5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleLanguageChange = () => {
    const newLanguage = i18n.language === "es" ? "en" : "es";
    i18n
      .changeLanguage(newLanguage)
      .catch((err) => console.error("Error changing language:", err));
  };

  return (
    <header className={classes.header}>
      <Container className={classes.inner} size="xl">
        <div className={classes.titleContainer}>
          <NavLink
            onClick={() => navigate("/")}
            label={t("home")}
            className={classes.navLink}
          />

          <NavLink
            onClick={() => navigate("/form")}
            label={t("forms")}
            className={classes.navLink}
          />

          <NavLink
            onClick={() => navigate("/resume")}
            label={t("resume")}
            className={classes.navLink}
          />

          <Switch
            size="md"
            onLabel="EN"
            offLabel="ES"
            color="violet"
            checked={i18n.language === "en"}
            onChange={handleLanguageChange}
          />
        </div>
      </Container>

      <div className={classes.bannerContainer}>
        <img
          src={banners[currentBanner]}
          alt="Banner"
          className={classes.banner}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = banner1;
          }}
        />
      </div>
    </header>
  );
}
