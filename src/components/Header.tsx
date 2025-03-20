import { Container, NavLink, Switch } from "@mantine/core";
import { useState, useEffect } from "react";
import classes from "./Header.module.css";
import WelcomeBanner from "../assets/banners/CuestionariosApp.jpg";

interface Props {
  language: string;
  setLanguage: (lang: string) => void;
}

export function Header({ language, setLanguage }: Props) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    WelcomeBanner,
    //añadir mas banners
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleLanguageChange = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const dictionary = {
    es: {
      home: "Inicio",
      forms: "Formualarios",
      resume: "Resumen",
    },
    en: {
      home: "Home",
      forms: "Forms",
      resume: "Summary",
    },
  };

  const t = language === "en" ? dictionary.en : dictionary.es;

  return (
    <header className={classes.header}>
      <Container className={classes.inner} size="xl">
        <div className={classes.titleContainer}>
          <NavLink
            href="#required-for-focus"
            label={t.home}
            className={classes.navLink}
          />

          <NavLink
            href="#required-for-focus"
            label={t.forms}
            className={classes.navLink}
          />

          <NavLink
            href="#required-for-focus"
            label={t.resume}
            className={classes.navLink}
          />

          <Switch
            size="md"
            onLabel="EN"
            offLabel="ES"
            color="violet"
            checked={language === "en"}
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
