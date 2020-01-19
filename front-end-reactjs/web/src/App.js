import React, { useState, useEffect } from 'react'
import api from './api'
import Devitem from './components/DevItem'
import Devform from './components/DevForm'
import './global.css'
import './app.css'
import './sidebar.css'
import './main.css'


function App() {
 
  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }
  
  return (
    <div id="app">
      <aside>
        <Devform onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <Devitem key={dev.id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
