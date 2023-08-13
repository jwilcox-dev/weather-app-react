import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DefaultFormLayout from "../Common/DefaultFormLayout";
import AuthContext from "../../store/auth-context";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [result, setResult] = useState("Enter Email and Password To Log In");
  const [resultClass, setResultClass] = useState(
    "block mt-0 text-sm text-blue-500"
  );
  const { attemptLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const createError = (message) => {
    setResult(message);
    setResultClass("block mt-0 text-sm text-red-500");
  };

  const login = async (event) => {
    event.preventDefault();

    setResult("Attempting Login...");
    setResultClass("block mt-0 text-sm text-blue-500");

    const result = await attemptLogin(email, password);

    if (result === 200) {
      return navigate("/");
    }

    if (result === 401) {
      createError("Login Failed - Please Check Credentials and Try Again!");
      return;
    }

    if (result === 429) {
      createError("Login Failed - Too Many Attempts! Please Try Again Later.");
      return;
    }

    createError("Something Went Wrong - Please Try Again Later.");
  };

  return (
    <DefaultFormLayout>
      <form onSubmit={login}>
        <label className="block font-bold text-lg">Log In 🔑</label>
        <hr className="my-4" />
        <input
          autoFocus
          type="email"
          className="text-center border-2 mt-2 p-2 w-11/12 m-auto"
          placeholder="Email"
          required
          onInput={(e) => setEmail(e.target.value)}
          autoComplete="username"
        ></input>
        <input
          type="password"
          className="text-center border-2 mt-3 p-2 w-11/12 m-auto"
          placeholder="Password"
          required
          minLength={6}
          maxLength={24}
          onInput={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        ></input>
        <button className="button mt-3 mb-4 p-3 shadow-lg font-bold bg-green-500 w-11/12 m-auto">
          Submit
        </button>
        <label className={resultClass}>{result}</label>
      </form>
    </DefaultFormLayout>
  );
};

export default LoginForm;
