import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [loader, setLoader] = useState(false);

  const {
      register,
      handleSubmit,
      reset,
      formState: {errors},
  } = useForm({
      mode: "onTouched",
  });

  return (
    <div>Login</div>
  )
}

export default Login
