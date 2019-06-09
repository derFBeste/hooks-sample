import React, { useState, useEffect } from 'react';
import './App.css';
import Sources from './components/sections/Sources'
import Source from './components/sections/Source'
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
    console.log(rowInfo)
    setSourceSelection(rowInfo)
  }

  return (
    <div>
      <header>
        <div className="f2 b bb b--silver pa2">really cool dashboard</div>
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
