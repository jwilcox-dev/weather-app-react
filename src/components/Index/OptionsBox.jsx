import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import AddToFavouritesButton from "./AddToFavouritesButton";

const OptionsBox = ({
  postcode,
  isFavourite,
  updateFavouritedStatus,
  favouriteDescription,
}) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <hr className="mt-5" />
      <h2 className="font-bold mt-4">
        {isLoggedIn ? (
          <AddToFavouritesButton
            postcode={postcode}
            isFavourite={isFavourite}
            updateFavouritedStatus={updateFavouritedStatus}
            favouriteDescription={favouriteDescription}
          />
        ) : (
          <p className="m-0 py-2">
            <NavLink to="/register" className="underline text-blue-400">
              Register
            </NavLink>{" "}
            or{" "}
            <NavLink to="/login" className="underline text-blue-400">
              Log In
            </NavLink>{" "}
            to Add This Location to Your Favourites ⭐!
          </p>
        )}
      </h2>
    </>
  );
};

export default OptionsBox;
