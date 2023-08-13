import weatherCodes from "../../enums/WeatherCodes";
import "./SummaryBox.css";

const SummaryBox = ({ locationData, weatherData }) => {
  const getWeatherType = () => {
    const weatherType = weatherCodes.find((weatherCode) => {
      return weatherCode.ids.includes(weatherData.current_weather.weathercode);
    });
    return weatherType.description;
  };

  return (
    <>
      <h2 className="font-bold mt-4">Weather</h2>
      <p className="text-center">{getWeatherType()}</p>
      <div className="flex__summary flex justify-center mt-5">
        <div>
          <h4 className="font-bold">Latitude</h4>
          <p className="text-blue-400">{locationData.lat}</p>
        </div>
        <div>
          <h4 className="font-bold">Longitude</h4>
          <p className="text-blue-400">{locationData.lon}</p>
        </div>
        <div>
          <h4 className="font-bold">Temperature</h4>
          <p className="text-blue-400">
            {weatherData.current_weather.temperature}°C
          </p>
        </div>
      </div>
      <div className="text-center mt-4 text-xs text-gray-400 font-bold">
        {locationData.display_name.split(", ").map((item, idx) => {
          return <p key={idx}>{item}</p>;
        })}
      </div>
      <p className="text-center mt-4 text-xs font-bold">
        Last Updated:{" "}
        {new Date(weatherData.current_weather.time).toLocaleString()}
      </p>
    </>
  );
};

export default SummaryBox;
