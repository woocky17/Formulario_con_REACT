import { useEffect, useState } from "react";

const FormResume = () => {
  const [formData, setFormData] = useState<string[]>([]);

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
        <ul>
          {formData.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default FormResume;
