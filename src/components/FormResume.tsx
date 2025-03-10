import { useLocation } from "react-router-dom";

interface FormData {
  formData: string[];
}

const FormResume = () => {
  const location = useLocation();
  const { formData } = (location.state as FormData) || {};

  return (
    <div>
      FormResume
      {formData ? (
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
