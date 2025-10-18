import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
      
  };

  return (
    <div className="border min-h[calc(100vh-160px)] flex justify-center items-center">
      <form className="bg-white p-6 rounded-lg shadow-lg w-96"
        onSubmit={handleSubmit((data) => {
          setLoader(true);
          console.log(data);
          setTimeout(() => {
            setLoader(false);
            navigate("/");
          }, 2000);
        })}
      >
        Login
      </form>
    </div>
  )
}

export default Login
