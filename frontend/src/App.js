import React from 'react'
import { useState } from 'react';
import Map, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

function App() {

  const [viewport, setViewport] = useState({
    latitude: 39.925533,
    longitude: 32.866287,
    zoom: 4
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
        <div>hello</div>
      </Marker>
      
    
    </Map>
    </div>
  );
  
}

export default App;
