import { Container, NavLink, Switch } from "@mantine/core";
import { useState, useEffect } from "react";
import classes from "./Header.module.css";
import WelcomeBanner from "../assets/banners/CuestionariosApp.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    WelcomeBanner,
    // añadir más banners
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

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
            target.src = WelcomeBanner;
          }}
        />
      </div>
    </header>
  );
}
