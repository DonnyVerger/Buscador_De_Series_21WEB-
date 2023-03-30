import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ShowDetails = () => {
  const [show, setShow] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [cast, setCast] = useState([])
  const { id } = useParams()
  useEffect(() => {
    Promise.all([
      fetch(`https://api.tvmaze.com/shows/${id}`),
      fetch(`https://api.tvmaze.com/shows/${id}/episodes`),
      fetch(`https://api.tvmaze.com/shows/${id}/cast`)
    ])
      .then(([resShow, resEpisodes, resCast]) =>
        Promise.all([resShow.json(), resEpisodes.json(), resCast.json()])
      )
      .then(([dataShow, dataEpisodes, dataCast]) => {
        setShow(dataShow)
        setEpisodes(dataEpisodes)
        setCast(dataCast)
      })
  }, [])
  // useEffect(() => {
  //   fetch(`https://api.tvmaze.com/shows/${id}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setShow(data)
  //     }).catch(error => {
  //       console.log(error)
  //     })
  // }, [])
  // // Api con la informacion de los episodios//
  // useEffect(() => {
  //   fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setEpisodes(data)
  //     }).catch(error => {
  //       console.log(error)
  //     })
  // }, [])
  // console.log(episodes)
  // // Api con el cast
  // useEffect(() => {
  //   fetch(`https://api.tvmaze.com/shows/${id}/cast`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setCast(data)
  //     }).catch(error => {
  //       console.log(error)
  //     })
  // }, [])
  console.log(cast)
  return (
    <>
      <div className='container-md'>
        <h1>{show?.name}</h1>
        <div className='d-flex'>
          <div>
            <img src={show?.image.medium} alt='' />
          </div>
          <div className='px-3 py-1 description'>
            <p>
              b {show?.summary}
            </p>
          </div>
          <div className='info'>
            <h3>Show Info</h3>
            <div className='show-info'>
              <p>
                <b>Genres: </b>{show?.genres}<b /><br />
                <b>Language: </b>{show?.language}<b /><br />
                <b>Premiered: </b>{show?.premiered}<b /> <br />
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2>Episodes</h2>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Season</th>
                <th>Episode</th>
                <th>Episode Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map(episode => (
                <tr key={episode.id}>
                  <td>{episode.season}</td>
                  <td>{episode.number}</td>
                  <td>{episode.name}</td>
                  <td>{episode.rating.average}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div />
        </div>
        <div>
          <h2>Actors</h2>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Actor Name</th>
                <th>Photo</th>
                <th>Character Name</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {cast.map(member => (
                <tr key={member.id}>
                  <td>{member.person.name}</td>
                  <td><img src={member.person.image?.medium} alt='' /></td>
                  <td>{member.character.name}</td>
                  <td><img src={member.character.image?.medium} alt='' /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ShowDetails
