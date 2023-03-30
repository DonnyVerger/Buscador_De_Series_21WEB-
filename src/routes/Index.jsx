import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Detail from '../pages/Detail'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* Params: Sirven para pasar datos dinamicos en una url */}
      {/* <Route path='/pokemon/:id' element={<PokemonDetail />} /> */}
      <Route path='/myProgram/:id' element={<Detail />} />
    </Routes>
  )
}
export default RoutesIndex
