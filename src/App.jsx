import React, { useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import search from './assets/search.png';
import sun from './assets/sun.png';
import snow from './assets/snow.jpeg';
import rain from './assets/rain.jpg';
import cloudy from './assets/cloudysun.png';






const Weaatherdetails = ({icon,temp,city,country,long,atti,humi,speed}) =>{
  
  return(

    <>
        <div className="image">
            <img src={icon} alt="image" />
        </div>
        <div className="temp">{temp}*C</div>
        <div className="location">{city}</div>
        <div className="country">{country}</div>
        <div className="card">
          <span className="long">
            <div>{long}</div>
            <div>lattidude</div> 
            </span>
          <span className="atti">
            <div>{atti}</div> 
            <div>longitude</div>
            </span>
        </div>
        <div className="datacontainer">

                <div className="element">
                  <div className='hum'> {humi}%huminity</div>
                  <div className='hum' >{speed} km/h windspeed</div>
                </div>
            </div>
    </>
  )
};




function App() {
  const [count, setCount] = useState(0)

  const [icon,seticon]=useState(sun);
  const [temp,settemp]=useState(0);
  const [city,setcity]=useState("chennai");
  const [country,setcountry]=useState("india");
  const [long,setlong]=useState("0");
  const [atti,setatti]=useState("0");
  const [humi,sethumi]=useState("0");
  const [speed,setspeed]=useState("0");
  const [text,settext]=useState("chennai")
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] =useState(false);
  

  const weatherIconMap = {
    "01d": sun,
    "81n": sun,
    "82d": sun,
    "02n": sun,
    "03d": cloudy,
    "03n": cloudy,
    "04d": cloudy,
    "84n": cloudy,
    "89d":rain,
    "89n": rain,
    "18d": rain,
    "18n":rain,
    "13d": snow,
    "13n": snow,
    };

  const Searchs= async()=>{

    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3916b40a722d285c1566ed3cb404135c&units=Metric`
    
    try{

      let res= await fetch(url);
      let data=await res.json();
      console.log(data);
      if(data.code=='404')
      {
        console.log("city not found")
        setCityNotFound(true)
        setLoading(false)
        return ;
      }
      setcountry(data.sys.country);
      setcity(data.name)
      setlong(data.coord.lon)
      setatti(data.coord.lat)
      sethumi(data.main.humidity)
      settemp(data.main.temp)
      setspeed(data.wind.speed)
      const weatherIconCode = data.weather[0].icon;
      seticon (weatherIconMap [weatherIconCode] || sun);
      setCityNotFound(false);

 }catch(error)
    {
        console.log("An error occurred",error.message);
    }finally{
        setLoading(false)
    }

    
  }

    const handlecity=(event)=>{

        setcity(event.target.value)
    

    };

    const handlekeydown=(event)=>{

      if(event.key=="Enter"){
        Searchs();
      }


    }

  return (
    <>
        <div className="container">
            <div className="input-container">
            
                <input type="text"
                className='cityInput'
                placeholder='search'
                onChange={handlecity} 
                onKeyDown={handlekeydown}/>

              <div className="search-icon">
                  <img src={search} alt="" onKeyDown={handlekeydown}/>
              </div>

            </div>
            <Weaatherdetails
             icon={icon}
             temp={temp}
             city={city}
             country={country}
             long={long}
             atti={atti}
             humi={humi}
             speed={speed}
             >
             </Weaatherdetails>

            <div className="copy"><p>designed by nk</p></div>
        </div>

    </>
  )
}

export default App
