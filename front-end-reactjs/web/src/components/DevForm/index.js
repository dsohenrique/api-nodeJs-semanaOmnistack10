import React, { useState , useEffect} from 'react'
import './styles.css'

function Devform({ onSubmit }) {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [github_username, setGithub_username] = useState('')
    const [techs, setTechs] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position)
          const { latitude, longitude } = position.coords
          setLatitude(latitude)
          setLongitude(longitude)
        },
          (err) => {
            console.log(err)
          }, {
          timeout: 30000,
        })
      }, [])

      async function handleSubmit(e){
        e.preventDefault()
        await onSubmit({
          github_username,
          techs,
          latitude,
          longitude
        })
        setGithub_username('')
        setTechs('')
      }
    return (
        <>
        <strong>Cadastrar</strong>
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="">Usuário Github</label>
                <input name="github_username" required value={github_username} onChange={e => setGithub_username(e.target.value)}></input>
            </div>
            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs" required value={techs} onChange={e => setTechs(e.target.value)}></input>
            </div>
            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input name="latitude" required value={latitude}
                        onChange={e => setLatitude(e.target.value)}></input>
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input name="longitude" required value={longitude}
                        onChange={e => setLongitude(e.target.value)}></input>
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
        </>
    )
}
export default Devform