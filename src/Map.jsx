import React, { useState, useContext } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import GeoNotesContext from './context';

const OSM_MAP = {
    version: 8,
    sources: {
        osm: {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap Contributors',
            maxzoom: 19
        }
    },
    layers: [
        {
            id: 'osm',
            type: 'raster',
            source: 'osm'
        }
    ]
};


function Map() {
    const { notes, setNotes } = useContext(GeoNotesContext);
    const [location, setLocation] = useState({});
    const [content, setContent] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const [viewport, setViewport] = useState({
        width: 1280,
        height: 720,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    return (
        <>
            <pre>{JSON.stringify(notes)}</pre>
            <ReactMapGL
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle={OSM_MAP}
                onClick={(e) => {
                    console.log(e)
                    setLocation({ lat: e.lngLat[1], lng: e.lngLat[0] });
                    setShowPopup(true)
                }}
            >
                {showPopup && (<Popup latitude={location.lat} longitude={location.lng}
                    closeButton={true}
                    closeOnClick={true}
                    onClose={() => setShowPopup(false)}
                    anchor="top"
                ><div>
                        <input value={content} onChange={(e) => setContent(e.target.value)} />
                        <button onClick={() => {
                            setNotes([...notes, { lat: location.lat, lng: location.lng, content }]); setShowPopup(false)
                            setContent("")
                        }}>Save</button>
                    </div></Popup>)}
                {notes && notes.map(note => (
                    <Marker key={note.lat + note.lng} latitude={note.lat} longitude={note.lng}>
                        <div>{note.content}</div>
                        <div>{note.lat},{note.lng}</div>
                    </Marker>
                ))}
            </ReactMapGL>
        </>
    );
}

export default Map;