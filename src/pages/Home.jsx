import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [programs, setPrograms] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const myApi = async () => {
      try {
        const resp = await fetch('https://api.tvmaze.com/shows')
        const data = await resp.json()
        setPrograms(data)
      } catch (error) {
        console.log(error)
      }
    }
    myApi()
  }, [])
  console.log(programs)
  const handleSearch = event => {
    setSearchTerm(event.target.value)
  }

  const filteredPrograms = programs.filter(myProgram => {
    return myProgram.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <>
      <div className='container'>
        <h1>ALL SHOWS</h1>

        <form className='form-inline my-2 my-lg-0 w-95 p-4'>
          <input type='text' className='form-control' id='search' placeholder='Enter name' value={searchTerm} onChange={handleSearch} />
        </form>

        <div className='row'>
          {filteredPrograms.map(myProgram => (
            <div className='col-sm-4 mb-4' key={myProgram.id}>
              <div className='card'>
                <img className='card-img-top' src={myProgram.image.medium} />
                <div className='card-body'>
                  <Link to={`/myProgram/${myProgram.url.split('/').slice(-2)[0]}`}>
                    <h4 className='card-title'>{myProgram.name}</h4>
                  </Link>
                  <h5>Rating: {myProgram.rating.average}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default Home
