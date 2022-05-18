import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios";
import Map, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./app.css"


function App() {
  const currentUser = "cihan" //temporary
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: 39.925533,
    longitude: 32.866287,
    zoom: 6
  });

  useEffect( () => {
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
  
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id)
  }

  const handleAddClick = (e) => {
    //console.log(e) //we wrote this and try to double click on map, it return us lat and long values as "lngLat", so we will use this
    const [long, lat] = [e.lngLat.lng, e.lngLat.lat] ;
    setNewPlace({
      lat:lat,
      long:long,
    })  
  }

  return (
  <div className="App">
  <Map
      {...viewport}
      onMove={evt => setViewport(evt.viewport)}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      onDblClick = {handleAddClick}
    >
      
      {pins.map((p) => (
        <>
      <Marker 
      latitude={p.lat} 
      longitude={p.long} 
      offsetLeft={-20} 
      offsetTop={-10}>
      <LocationOnIcon style={{cursor:"pointer", color:p.username===currentUser ? "tomato" : "slateblue"}} 
      onClick={() => handleMarkerClick(p._id)}/>
      </Marker>
      {p._id === currentPlaceId && (//means if p_id equals currentPlaceId
      <Popup
        latitude={p.lat}
        longitude={p.long}
        closeButton={true}
        closeOnClick={false}
        anchor="left"
        onClose={()=>setCurrentPlaceId(null)}
        >
          <div className='card'>
            <label>Place</label>
            <h4 className="place">{p.title}</h4>
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
            <span className='date'>{new Date(p.createdAt).toDateString()}</span>
          </div>
      </Popup>
      )}
      </>
      ))}

        {newPlace && (
          <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={()=>setNewPlace(null)}
          >hello</Popup>
          )}
    
    </Map>
    </div>
  );
  
}

export default App;
