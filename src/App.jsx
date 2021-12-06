import { useState } from 'react'
import GeoNotesContext from './context'
import Map from './Map'


function App() {
  const [notes, setNotes] = useState([])

  return (
    <GeoNotesContext.Provider value={{notes,setNotes}}>

      <div className="App">
        <Map />
      </div>
    </GeoNotesContext.Provider>
  )
}

export default App
