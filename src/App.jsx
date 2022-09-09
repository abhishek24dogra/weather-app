import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import "react-bootstrap";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.css';
import 'weather-react-icons/lib/css/weather-icons.css';
import { IoLocation, IoSearch } from 'react-icons/io5';

const weatherKey = {
  key: 'c3077108e0f14c79b5ab3a5bd4568df3',
  base: `https://api.openweathermap.org/data/2.5/forecast?`,

  icon: 'https://openweathermap.org/img/w'
}

function App() {


  const [location, setLocation] = useState({ lat: '', long: '' });
  const [search, setSearch] = useState(null);
  const [weather, setWeather] = useState([]);
  const [date, setDate] = useState("")


  const coordinateData = async () => {
    try {
      const Api = await axios.get(`${weatherKey.base}lat=${location.lat}&lon=${location.long}&exclude=hourly,minutely&units=metric&appid=${weatherKey.key}`);
      setWeather(Api.data);
      console.log(Api.data)
      // const dt = weather.current.dt
      // var day = new Date(dt * 1000);
      // setDate(day.toDateString())
      // console.log(date)
    }
    catch (err) {
      console.log(err)
    }
  }


  const fetchData = async () => {
    await axios.get(`${weatherKey.base}q=${search}&units=metric&APPID=${weatherKey.key}`)
      .then(result => {
        console.log(result.data);
        setWeather(result.data)
      });
      
      
  }

  const handleOnChange = (e) => {
    setSearch(e.target.value)
    
    if (e.key === "Enter" || e.type === 'click') {
      fetchData();
      
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({ lat: position.coords.latitude, long: position.coords.longitude });
      //console.log(location.lat, location.long)
    });

  }, [])


  return (
    <div className='main '>
      <div>
        {(typeof weather.city != 'undefined') ?
          <img className="app-img" src={`https://source.unsplash.com/random?${weather.city.name}, weather`} alt="sky" />
          : <img className="app-img" src="https://cdn.vox-cdn.com/thumbor/tyz6flsYzG7cBdB5-19DvR2Wem8=/0x0:1004x753/1200x800/filters:focal(422x296:582x456)/cdn.vox-cdn.com/uploads/chorus_image/image/63710251/20150428-cloud-computing.0.1489222360.0.jpg" alt="sky" />
        }
      </div>


      <div className="input-group mb-3 pt-5 d-flex justify-content-center ">
        <div className="input-group-prepend">
          <button className="btn btn-dark px-4 d-flex justify-content-center" type="button" onClick={coordinateData}><IoLocation /></button>
        </div>
        <input type="text" className="br-2 " onChange={handleOnChange}
          onKeyDown={handleOnChange}
          placeholder='Enter City' />
        <div className="input-group-append">
          <button className="btn btn-dark my-auto px-4 d-flex justify-content-center item-center" onClick={handleOnChange}  type="button"><IoSearch/></button>
        </div>
      </div>



      {(typeof weather.city != 'undefined') ?
            (
              <div className="App-Box d-flex flex-wrap flex-column ">
                
                <div className='cards mt-4'>
                  <div className='mt-4 d-flex justify-content-center p-2'>
                    <h1 className=' card text-light  bg-dark p-4'>{weather.city.name}</h1>
                  </div>
                  <div className='card bg-dark p-5 '>
                    <div>
                      <div className='d-flex flex-column align-items-center'>
                        <img className="icon" src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} alt="icon" />
                        < h1 className='degree text-light mt-3  '>  {(weather.list[0].main.temp).toFixed(1)} °C  </h1>
                        <span className='bracket'>{`(feels like ${weather.list[0].main.feels_like}°C) `}</span>
                      </div>

                    </div>
                    <div className='d-flex '>
                      <span className='text-light mt-3 justify-content-between mx-5'> {`Max: ${weather.list[0].main.temp_max}`} °C  </span>
                      <span className='text-light mt-3 justify-content-between mx-5'>{`Min: ${weather.list[0].main.temp_min} °C`}</span>
                    </div>
                  </div >
                </div>
                <div className='d-flex flex-row flex-wrap'>
                {weather.list.slice(1,6).map((item,{dt})=>{
                  return(
                  <div key={dt} className='card-mini bg-dark p-1 mt-5 mx-3 d-flex flex-column align-items-center'>
                      <img className="icon d-flex align-items-center" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="icon" />
                      < h1 className='degree text-light mt-3 d-flex justify-content-center'>  {(item.main.temp).toFixed(1)} °C  </h1>
                      <div className='d-flex '>
                      <span className='text-light mt-1  mx-2'> {`Max: ${item.main.temp_max}`} °C  </span>
                      <span className='text-light mt-1  mx-2'>{`Min: ${item.main.temp_min} °C`}</span>
                    </div>
                    </div>
                    )})}
                </div>
              </div>
              
            )

            : (<div></div>)}
    </div>



  );
}

export default App;
