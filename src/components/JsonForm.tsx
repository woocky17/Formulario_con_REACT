import { Button, Container, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JsonForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(0);
  const [formData, setFormData] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    if (form === 4) {
      navigate("/resume");
    }
  }, [form, navigate, formData]);

  const nextForm = () => {
    setForm((current) => current + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = [...formData];
    newFormData[form] = e.currentTarget.value;
    setFormData(newFormData);
  };

  return (
    <Container size="md" style={{ textAlign: "center", padding: "50px 0" }}>
      <h1>Form {form}</h1>
      <TextInput
        value={formData[form] || ""}
        onChange={handleInputChange}
      ></TextInput>
      <Button
        onClick={() => {
          nextForm();
        }}
      >
        Next
      </Button>
    </Container>
  );
};

export default JsonForm;
