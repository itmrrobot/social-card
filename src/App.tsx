import { useState } from 'react'
import Header from './components/Header'
import ListCard from './components/ListCard'

function App() {
  console.log("re-render parent")
  const [,setIsForceRender] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  
  return (
    <>
      <Header setIsForceRender={setIsForceRender} setIsModalAddOpen={setIsModalAddOpen}/>
      <ListCard setIsForceRender={setIsForceRender} setIsModalAddOpen={setIsModalAddOpen} isModalAddOpen={isModalAddOpen}/>
      {/* <CardDetail/> */}
      {/* <NotFound/> */}
    </>
  )
}

export default App
