import './App.css';
import { useEffect, useState } from 'react'
import getImageForWeather from './utils/getImageForWeather.js'
import { fetchWeather } from './utils/api'
function App() {
  const [data, setData] = useState({
    location: 'Da Nang',
    weather: 'Clear',
    temperature: 24
  });
  function handleInputChange(e) {
    setCity(e.target.value);
  }
  function handleButtonClick(e) {
    handleGetData();

  }
  function handleKeypress(e)  {
    //it triggers by pressing the enter key
  if (e.keyCode === 13) {
    handleGetData();
  }
};
  async function handleGetData() {
    var tempCity=city;
    tempCity=tempCity.toLowerCase();
    tempCity=tempCity.replace(' ','');
    const response = await fetchWeather(tempCity);
    console.log('response', response);
    if (!response) {
      alert("Location not found");
      return;

    }
    setData(response);
    document.getElementById('inputId').value='';
    document.getElementById('inputId').focus();
  }
  const [city, setCity] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <img src={getImageForWeather(data.weather)} alt='weather'></img>
        <p>{data.location}</p>
        <p>{data.weather}</p>
        <p>{data.temperature}&#176;C</p>
        <input
          id='inputId'
          placeholder='Search City'
          value={city}
          onChange={handleInputChange}
          onKeyUp={handleKeypress}
        ></input>
        <button
          onClick={handleButtonClick}
        >Search</button>

      </header>
    </div>
  );
}

export default App;
