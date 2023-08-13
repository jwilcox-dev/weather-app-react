import { useState, useRef, useEffect } from "react";
import GoButton from "./GoButton";
import SummaryBox from "./SummaryBox";
import DefaultFormLayout from "../Common/DefaultFormLayout";
import OptionsBox from "./OptionsBox";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";

const PostcodeForm = () => {
  const [postcode, setPostcode] = useState();
  const [userHasSelectedPostcode, setUserHasSelectedPostcode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [locationData, setLocationData] = useState();
  const [weatherData, setWeatherData] = useState();
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteDescription, setFavouriteDescription] = useState();

  const [statusClass, setStatusClass] = useState(
    "block mt-3 text-sm text-blue-500"
  );

  const postcodeInputRef = useRef();
  const postcodeSelectRef = useRef();
  const { isLoggedIn, token, favourites } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      setLocationData();
      setWeatherData();
      setPostcode();
    }
  }, [isLoggedIn]);

  const createError = (message) => {
    setIsError(true);
    setStatusClass("block mt-3 text-sm text-red-500");
    setErrorMessage(message);
  };

  const updateFavouritedStatus = (description) => {
    setIsFavourite(true);
    setFavouriteDescription(description);
  };

  const selectPostcode = (value) => {
    setLocationData();
    setWeatherData();

    if (value) {
      setUserHasSelectedPostcode(true);
      setPostcode(value);
      postcodeInputRef.current.value = "";
      return;
    }
    setUserHasSelectedPostcode(false);
    postcodeInputRef.current.focus();
    setPostcode(postcodeInputRef.current.value);
  };

  const getWeather = (event) => {
    event.preventDefault();

    setStatusClass("block mt-3 text-sm text-blue-500");
    setIsLoading(true);
    setIsError(false);

    let headers = {};

    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    axios
      .get("http://localhost:8000/api/v1/get-weather", {
        params: {
          post_code: postcode,
        },
        headers,
      })
      .then((response) => {
        if (response.status === 204) {
          createError("Postcode Not Found!");
          return;
        }
        setLocationData(response.data.location);
        setWeatherData(response.data.weather);
        setIsFavourite(response.data.favourite.isFavourite);
        setFavouriteDescription(response.data.favourite.favouriteDescription);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          createError("Invalid Postcode Format.");
          return;
        }
        if (err.response.status === 429) {
          createError("Too Many Repeat Requests... Please Try Again Shortly!");
          return;
        }
        createError("Something Went Wrong - Please Try Again Later!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const displayStatus = () => {
    if (isError) {
      return errorMessage;
    }

    if (postcode && !isLoading && !locationData) {
      return "Press Go!";
    }

    if (isLoading && postcode) {
      return "Searching For Postcode...";
    }

    if (locationData) {
      return "Postcode Found Successfully!";
    }

    if (isLoggedIn) {
      return "Select A Location From Favourites, Or Enter A New Postcode";
    }

    return "Enter A New Postcode";
  };

  return (
    <DefaultFormLayout>
      <form onSubmit={getWeather}>
        <label className="block font-bold text-lg">Find Weather ☀</label>
        <hr className="my-4" />
        {isLoggedIn && (
          <select
            autoFocus
            className="text-center border-2 border-b-0 p-2 mt-2 w-11/12 m-auto"
            ref={postcodeSelectRef}
            onChange={(e) => selectPostcode(e.target.value)}
          >
            <option value="">
              {userHasSelectedPostcode
                ? "Enter a New Postcode"
                : "Click To Select A Location From Favourites"}
            </option>
            {favourites.map((favourite, idx) => {
              return (
                <option key={idx} value={favourite.post_code}>
                  {favourite.description}
                </option>
              );
            })}
          </select>
        )}
        <input
          type="text"
          className={
            isLoggedIn
              ? "text-center border-2 mt-0 p-2 w-11/12 m-auto"
              : "text-center border-2 mt-2 p-2 w-11/12 m-auto"
          }
          placeholder={
            isLoggedIn && userHasSelectedPostcode
              ? "Using Favourite Location"
              : "ST18 0WP"
          }
          required={isLoggedIn && userHasSelectedPostcode}
          disabled={isLoggedIn && userHasSelectedPostcode}
          ref={postcodeInputRef}
          onInput={(e) => setPostcode(e.target.value)}
        ></input>
        <label className={statusClass}>{displayStatus()}</label>
        <GoButton isLoading={isLoading} />
      </form>
      <hr />
      {locationData && weatherData ? (
        <SummaryBox locationData={locationData} weatherData={weatherData} />
      ) : (
        <p className="text-center mt-5 font-bold text-gray-700">
          Waiting for Postcode...
        </p>
      )}
      {locationData && weatherData && (
        <OptionsBox
          postcode={postcode}
          isFavourite={isFavourite}
          updateFavouritedStatus={updateFavouritedStatus}
          favouriteDescription={favouriteDescription}
        />
      )}
    </DefaultFormLayout>
  );
};

export default PostcodeForm;
