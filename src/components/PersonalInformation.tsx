import { Button, Stack, TextInput } from "@mantine/core";

const PersonalInformation = () => {
  return (
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
  );
};

export default PersonalInformation;
