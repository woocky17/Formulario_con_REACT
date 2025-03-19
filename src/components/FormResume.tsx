import { Container, List, ThemeIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import questions from "../assets/cuestionarios.json";

const FormResume = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div>
      <h1>Form Resume</h1>
      {formData.length > 0 ? (
        <Container>
          {questions.map((form, index) => (
            <div key={index}>
              <h2>{form.titulo}</h2>
              {formData.map((formItem, formIndex) => (
                <div key={formIndex} className="form-item">
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="teal" size={24} radius="xl">
                      </ThemeIcon>
                    }
                  >
                    {Object.entries(formItem).map(([key, value]) => (
                      <List.Item key={key}>
                        <strong>{key}</strong>
                        {value as string}
                      </List.Item>
                    ))}
                  </List>
                </div>
              ))}
            </div>
          ))}
        </Container>
      ) : (
        <p>No hay datos de formulario guardados.</p>
      )}
    </div>
  );
};

export default FormResume;
