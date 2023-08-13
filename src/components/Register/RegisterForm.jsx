import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DefaultFormLayout from "../Common/DefaultFormLayout";
import AuthContext from "../../store/auth-context";
import axios from "axios";

const RegisterForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [result, setResult] = useState("Enter Email and Password To Register");
  const [resultClass, setResultClass] = useState(
    "block mt-0 text-sm text-blue-500"
  );

  const { registerLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const createError = (message) => {
    setResult(message);
    setResultClass("block mt-0 text-sm text-red-500");
  };

  const register = async (event) => {
    event.preventDefault();

    setResult("Registering Account...");
    setResultClass("block mt-0 text-sm text-blue-500");

    try {
      const response = await axios.post("http://localhost:8000/api/v1/users", {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.status === 200) {
        registerLogin(email, response.data.token);
        navigate("/");
      }
    } catch (err) {
      if (err.response.status === 422) {
        createError(
          "Registration Failed. Please Check Email and Password and Try Again."
        );
      }
      if (err.response.status === 429) {
        createError("Too Many Repeat Requests... Please Try Again Shortly!");
      }
    }
  };

  return (
    <DefaultFormLayout>
      <form onSubmit={register} autoComplete="off">
        <label className="block font-bold text-lg">Register 🖊️</label>
        <hr className="my-4" />
        <input
          autoFocus
          type="email"
          className="text-center border-2 mt-2 p-2 w-11/12 m-auto"
          placeholder="Email"
          required
          onInput={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="text-center border-2 mt-3 p-2 w-11/12 m-auto"
          placeholder="Password"
          required
          minLength={6}
          maxLength={24}
          onInput={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          className="text-center border-2 mt-3 p-2 w-11/12 m-auto"
          placeholder="Repeat Password"
          required
          minLength={6}
          maxLength={24}
          onInput={(e) => setPasswordConfirmation(e.target.value)}
        ></input>
        <button className="button mt-3 mb-4 p-3 shadow-lg font-bold bg-green-500 w-11/12 m-auto">
          Submit
        </button>
        <label className={resultClass}>{result}</label>
      </form>
    </DefaultFormLayout>
  );
};

export default RegisterForm;
