import "./DefaultFormLayout.css";

const DefaultFormLayout = ({ children }) => {
  return (
    <div className="default__form bg-white p-8 pb-5 mt-8 m-auto text-center mb-28">
      {children}
    </div>
  );
};

export default DefaultFormLayout;
