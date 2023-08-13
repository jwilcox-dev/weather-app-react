import { useState } from "react";
import { createPortal } from "react-dom";
import AddToFavouritesModal from "./AddToFavouritesModal";
import "./AddToFavouritesButton.css";

const AddToFavouritesButton = ({
  postcode,
  isFavourite,
  updateFavouritedStatus,
  favouriteDescription,
}) => {
  const [showModal, setShowModal] = useState(false);

  const showAddToFavouritesModal = () => {
    setShowModal(true);
  };

  const hideAddToFavouritesModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal &&
        createPortal(
          <AddToFavouritesModal
            hideAddToFavouritesModal={hideAddToFavouritesModal}
            postcode={postcode}
            updateFavouritedStatus={updateFavouritedStatus}
          />,
          document.getElementById("modal")
        )}
      {isFavourite ? (
        <p className="m-0 py-2 text-green-600">
          Favourited Location: {favouriteDescription} ⭐
        </p>
      ) : (
        <button
          className="atf__button bg-gray-200 px-10 py-2"
          onClick={showAddToFavouritesModal}
        >
          Add To Favourites ⭐
        </button>
      )}
    </>
  );
};

export default AddToFavouritesButton;
