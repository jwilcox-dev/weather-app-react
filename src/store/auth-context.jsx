import { useState, createContext } from "react";
import axios from "axios";

const AuthContext = createContext({
  isLoggedIn: false,
  loggedInAs: "",
  favourites: [],
  token: "",
  updateFavourites: (postcode, description) => {},
  attemptLogin: (email, password) => {},
  registerLogin: (email, token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [token, setToken] = useState("");

  const attemptLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/authenticate-user",
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        setLoggedInAs(response.data.email);
        setToken(response.data.token);
        setFavourites(response.data.favourites);
        return 200;
      }
    } catch (err) {
      return err.response.status;
    }
  };

  const updateFavourites = (postcode, description) => {
    const newFavourite = {
      post_code: postcode,
      description,
    };
    setFavourites([...favourites, newFavourite]);
  };

  const registerLogin = (email, token) => {
    setIsLoggedIn(true);
    setLoggedInAs(email);
    setToken(token);
    setFavourites([]);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLoggedInAs("");
    setToken("");
    setFavourites([]);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedInAs,
        favourites,
        token,
        updateFavourites,
        attemptLogin,
        registerLogin,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
