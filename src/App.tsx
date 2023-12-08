import {  useState } from 'react'
import Header from './components/Header'
import ListCard from './components/ListCard'

function App() {
  console.log("re-render parent")
  const [,setIsForceRender] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  
  return (
    <>
      <Header setIsForceRender={setIsForceRender} setIsModalAddOpen={setIsModalAddOpen} isModalAddOpen={false} isModalDeleteOpen={false} setIsModalDeleteOpen={function (): void {
        throw new Error('Function not implemented.');
      } } setIsClickCardDetail={function (): void {
        throw new Error('Function not implemented.');
      } } setIsModalEditOpen={function (): void {
        throw new Error('Function not implemented.');
      } } setIsCurrentPageChange={function (): void {
        throw new Error('Function not implemented.');
      } } setCurrentPage={function (): void {
        throw new Error('Function not implemented.');
      } } formatCompactNumber={function (): string {
        throw new Error('Function not implemented.');
      } } isCurrentPageChange={false} itemPerPage={0} currentPage={0} isChangeInput={false} isDelete={false} searchInputValue={''} isClickCardDetail={false} isModalEditOpen={false} id={0} name={''} description={''} imgUrl={''} like={0} comments={[]} isClickInput={false} setIsDelete={function (): void {
        throw new Error('Function not implemented.');
      } }/>
      <ListCard setIsForceRender={setIsForceRender} setIsModalAddOpen={setIsModalAddOpen} isModalAddOpen={isModalAddOpen} isModalDeleteOpen={false} setIsModalDeleteOpen={function (): void {
        throw new Error('Function not implemented.');
      } } setIsClickCardDetail={function (): void {
        throw new Error('Function not implemented.');
      } } setIsModalEditOpen={function (): void {
        throw new Error('Function not implemented.');
      } } setIsCurrentPageChange={function (): void {
        throw new Error('Function not implemented.');
      } } setCurrentPage={function (): void {
        throw new Error('Function not implemented.');
      } } formatCompactNumber={function (): string {
        throw new Error('Function not implemented.');
      } } isCurrentPageChange={false} itemPerPage={0} currentPage={0} isChangeInput={false} isDelete={false} searchInputValue={''} isClickCardDetail={false} isModalEditOpen={false} id={0} name={''} description={''} imgUrl={''} like={0} comments={[]} isClickInput={false} setIsDelete={function (): void {
        throw new Error('Function not implemented.');
      } }/>
      {/* <CardDetail/> */}
      {/* <NotFound/> */}
    </>
  )
}

export default App
