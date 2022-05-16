import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios"
import Map, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./app.css"

function App() {
  const [pins, setPins] = useState([])
  const [viewport, setViewport] = useState({
    latitude: 39.925533,
    longitude: 32.866287,
    zoom: 6
  })

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);


  return (
  <div className="App">
  <Map
      {...viewport}
      onMove={evt => setViewport(evt.viewport)}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >
      
      {pins.map(p => (
        <>
      <Marker latitude={p.lat} 
      longitude={p.long} 
      offsetLeft={-20} 
      offsetTop={-10}>
      <LocationOnIcon />
      </Marker>
      
      <Popup
        latitude={p.lat}
        longitude={p.long}
        closeButton={true}
        closeOnClick={false}
        anchor="left">
          <div className='card'>
            <label>Place</label>
            <h4 className='place'>{p.title}</h4>
            <label>Review</label>
            <p className='desc'>{p.desc}</p>
            <label>Rating</label>
            <div className='stars'>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
            </div>
            <label>Information</label>
            <span className='username'>Created by <b>{p.username}</b></span>
            <span className='date'>1 hour ago</span>
          </div>
      </Popup>
      
      </>
      ))}
    
    </Map>
    </div>
  );
  
}

export default App;
