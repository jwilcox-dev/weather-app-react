import "./GoButton.css";

const GoButton = ({ isLoading }) => {
  return (
    <button
      className="go__button button mt-3 mb-5 p-3 shadow-lg font-bold w-11/12 m-auto"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "GO!"}
    </button>
  );
};

export default GoButton;
