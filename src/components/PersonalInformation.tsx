import { useTranslation } from "react-i18next";

const PersonalInformation = () => {
    const { t, i18n } = useTranslation();
    return(
        <div>
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
        <button onClick={() => i18n.changeLanguage("es")}>🇪🇸 Español</button>
        <button onClick={() => i18n.changeLanguage("en")}>🇺🇸 English</button>
      </div>
    )   
}
export default PersonalInformation;