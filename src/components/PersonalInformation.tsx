import { Stack, TextInput, Button } from "@mantine/core";
import { useTranslation } from "react-i18next";

const PersonalInformation = () => {
    const { t, i18n } = useTranslation();
    return(
        <div>
        <div>
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
        <button onClick={() => i18n.changeLanguage("es")}>🇪🇸 Español</button>
        <button onClick={() => i18n.changeLanguage("en")}>🇺🇸 English</button>
      </div> cff
      <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="md"
    >
      <TextInput label="First name" placeholder="Nombre" required />
      <TextInput label="Last name" placeholder="Apellido" required />
      <TextInput label="Email" placeholder="Email" required />
      <Button variant="filled">Button</Button>
    </Stack>
    </div>
    )   
}

export default PersonalInformation;
