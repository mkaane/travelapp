import React from 'react'
import { useState } from 'react';
import Map, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./app.css"

function App() {

  const [viewport, setViewport] = useState({
    latitude: 39.925533,
    longitude: 32.866287,
    zoom: 6
  })
  return (
  <div className="App">
  <Map
      {...viewport}
      onMove={evt => setViewport(evt.viewport)}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >
      <Marker latitude={39.925533} longitude={32.866287} offsetLeft={-20} offsetTop={-10}>
      <LocationOnIcon />
      </Marker>
      
      <Popup
        latitude={39.925533}
        longitude={32.866287}
        closeButton={true}
        closeOnClick={false}
        anchor="left">
          <div className='card'>
            <label>Place</label>
            <h4 className='place'>Anıtkabir</h4>
            <label>Review</label>
            <p className='desc'>Beautiful Place, I like it</p>
            <label>Rating</label>
            <div className='stars'>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
              <StarRateIcon className='star'/>
            </div>
            <label>Information</label>
            <span className='username'>Created by <b>kaan</b></span>
            <span className='date'>1 hour ago</span>
          </div>
      </Popup>
      
    
    </Map>
    </div>
  );
  
}

export default App;
