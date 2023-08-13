import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import "./AddToFavouritesModal.css";

const AddToFavouritesModal = ({
  hideAddToFavouritesModal,
  postcode,
  updateFavouritedStatus,
}) => {
  const [description, setDescription] = useState();
  const [notifications, setNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Enter a Description for This Location");
  const [statusClass, setStatusClass] = useState(
    "block mt-2 mb-1 text-sm text-center text-blue-500"
  );

  const { token, updateFavourites } = useContext(AuthContext);

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const addToFavourites = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusClass("block mt-2 mb-1 text-sm text-center text-blue-500");
    setStatus("Adding Favourite...");
    axios
      .post(
        "http://localhost:8000/api/v1/favourites",
        {
          post_code: postcode,
          description,
          notifications,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          updateFavouritedStatus(description);
          updateFavourites(postcode, description);
          hideAddToFavouritesModal();
          return;
        }
      })
      .catch((err) => {
        setStatusClass("block mt-2 mb-1 text-sm text-center text-red-500");
        if (err.response.status === 422) {
          setStatus("Invalid Description Format");
          return;
        }
        setStatus("Error - Something Went Wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div id="modal-bg"></div>
      <dialog
        open
        className="atf__modal border-2 border-black bg-gray-100 font-normal"
      >
        <h1 className="text-center bg-gray-300 p-3 border-b-2 border-black font-bold">
          Add Location To Favourites ⭐
        </h1>
        <form className="px-0" onSubmit={addToFavourites}>
          <input
            type="text"
            className="text-center block mx-auto border-2 mt-5 p-2 mb-1"
            placeholder="Home"
            required
            minLength={1}
            maxLength={255}
            onInput={(e) => setDescription(e.target.value)}
          ></input>
          <label className={statusClass}>{status}</label>
          <hr className="mt-3" />
          <div className="mt-2">
            <label className="text-sm block text-center">
              <input
                type="checkbox"
                className="me-1"
                onChange={toggleNotifications}
              ></input>
              Receive Daily Notifications For Location?
            </label>
          </div>
          <div className="atf__modal__flex">
            <button className="bg-green-600 px-4 py-2 text-white">Save</button>
            <button
              type="button"
              onClick={hideAddToFavouritesModal}
              className="bg-red-600 px-4 py-2 text-white"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default AddToFavouritesModal;
