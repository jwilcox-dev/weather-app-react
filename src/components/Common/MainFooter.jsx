import "./MainFooter.css";

const MainFooter = () => {
  return (
    <footer className="fixed bottom-0 p-3 w-full text-center bg-gray-800 text-white">
      <div className="main__footer">
        <p>☀ ☁ 🌫 🌧</p>
        <p>Weather Finder - Josh Wilcox &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default MainFooter;
