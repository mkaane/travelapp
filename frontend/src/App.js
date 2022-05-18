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
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [rating, setRating] = useState(0)
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
  
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id)
    setViewport({...viewport, latitude:lat, longitude:long})
  }

  const handleAddClick = async (e) => {
    //console.log(e) //we wrote this and try to double click on map, it return us lat and long values as "lngLat", so we will use this
    const [long, lat] = [e.lngLat.lng, e.lngLat.lat] ;
    setNewPlace({
      lat:lat,
      long:long,
    })  
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title: title,
      desc: desc,
      rating: rating,
      lat:newPlace.lat,
      long:newPlace.long
    }
    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null); //we do not want to see new pin popup after create a new pin
    } catch (err) {
      console.log(err)
    }
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
      onClick={() => handleMarkerClick(p._id, p.lat, p.long)}/>
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
              {Array(p.rating).fill(<StarRateIcon className='star'/>)}
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
          onClose={()=>setNewPlace(null)}>
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input placeholder='Enter a title' 
                onChange={(e) => setTitle(e.target.value)}
                />

                <label>Review</label>
                <textarea placeholder='Describe this place'
                onChange={(e) => setDesc(e.target.value)}/>
                

                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>

                </select>
                <button className='submitButton' type="submit">Add Pin</button>
              </form>
            </div>
          </Popup>
          )}
          {currentUser ? (<button className='button logout'>Logout</button>) : 
          (<div className='buttons'>
          <button className='button login'>Login</button>
          <button className='button register'>Register</button>
          </div>)}
          
    
    </Map>
    </div>
  );
  
}

export default App;
