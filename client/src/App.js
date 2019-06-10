import React, { useState, useEffect } from 'react'
import './App.css'
import Sources from './components/Sources'
import Source from './components/Source'
import { getSources } from './api'

function App() {
  const [sources, setSources] = useState([])
  const [sourceSelection, setSourceSelection] = useState({})
  
  useEffect(() => {
    const fetchSource = async () => {
      const result = await getSources()
      setSources(result.data)
    }
    fetchSource()
  }, [])

  const handleRowClick = (rowInfo) => {
    setSourceSelection(rowInfo)
  }

  return (
    <div>
      <header>
        <div className="f3 white bg-black-80 b bb b--silver pa2">sources & message dashboard</div>
      </header>
      <Sources 
        input={sources}
        onRowClick={handleRowClick}
      />
      <Source 
        input={sourceSelection}
      />
    </div>
  );
}

export default App;
