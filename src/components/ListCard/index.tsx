import "./ListCard.scss";
import CustomPagination from "../CustomPagination";
import { Col, Modal, Row, Typography } from "antd";
import CustomCard from "../CustomCard";
import {   useState } from "react";
import { CardState } from "../../context/Cards";
import NotFound from "../NotFound";
import ModalCreateCard from "../ModalCreateCard";
import { Props } from "../../interface";

function ListCard(props:Props) {
  const {setIsForceRender,setIsModalAddOpen,isModalAddOpen} = props;
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen,setIsModalEditOpen] = useState(false);
  const [isDelete,setIsDelete] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cards , cardSearchValue,cardId,setCards,isSearchMatch }:any  = CardState();
  const [currentPage,setCurrentPage] = useState(1);
  const [isCurrentPageChange,setIsCurrentPageChange] = useState(false);
  const [itemPerPage] = useState(10);
  const lastItemIndex = currentPage*itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  let newCards = cards.slice(firstItemIndex,lastItemIndex);
  
  
  
  const handleCancel = () => {
    setIsModalDeleteOpen(false);
  };
  if(cardSearchValue) {
    newCards = cards?.filter((card: { name: string; }) => {
      {
        return card.name.toLowerCase()===cardSearchValue.toLowerCase().trim()
        ||card.name.toLowerCase()===cardSearchValue.toLowerCase().trim()
        ||card.name.toLowerCase().includes(cardSearchValue.toLowerCase().trim()
        )
      }
    })
  } 
  const handleDeleteOk = () => {
    const cards = newCards?.filter((c: { id: number; }) => c.id!==cardId);
    localStorage.setItem("cards",JSON.stringify(cards));
    setCards(cards);
    setIsModalDeleteOpen(false);
    setIsDelete(true);
    console.log(cardId);
  }
  return (
    <div className="wrapper">
      {newCards.length!==0?<Row gutter={16}>
        {newCards?.map((card: { name: string; description: string; imgUrl: string; like: number; comments: object[]; id: number; },index: number) => {
          return <Col span={12} key={index}>
          <CustomCard
              isModalDeleteOpen={isModalDeleteOpen}
              setIsModalDeleteOpen={setIsModalDeleteOpen}
              name={card.name}
              description={card.description}
              imgUrl={card.imgUrl}
              like={card.like}
              comments={card.comments}
              id={card.id}
              setIsModalEditOpen={setIsModalEditOpen}
              setIsForceRender={setIsForceRender}
              isDelete={isDelete}
              setIsDelete={setIsDelete} isModalAddOpen={false} setIsModalAddOpen={function (): void {
                throw new Error("Function not implemented.");
              } } setIsClickCardDetail={function (): void {
                throw new Error("Function not implemented.");
              } } setIsCurrentPageChange={function (): void {
                throw new Error("Function not implemented.");
              } } setCurrentPage={function (): void {
                throw new Error("Function not implemented.");
              } } formatCompactNumber={function (): string {
                throw new Error("Function not implemented.");
              } } isCurrentPageChange={false} itemPerPage={0} currentPage={0} isChangeInput={false} searchInputValue={""} isClickCardDetail={false} isModalEditOpen={false} isClickInput={false}          />
        </Col>
        })}
      </Row>:<NotFound/>}
      {cards.length>=10?isSearchMatch===false?<CustomPagination setIsCurrentPageChange={setIsCurrentPageChange} isCurrentPageChange={isCurrentPageChange} itemPerPage={itemPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} isModalAddOpen={false} setIsModalAddOpen={function (): void {
        throw new Error("Function not implemented.");
      } } isModalDeleteOpen={false} setIsModalDeleteOpen={function (): void {
        throw new Error("Function not implemented.");
      } } setIsForceRender={function (): void {
        throw new Error("Function not implemented.");
      } } setIsClickCardDetail={function (): void {
        throw new Error("Function not implemented.");
      } } setIsModalEditOpen={function (): void {
        throw new Error("Function not implemented.");
      } } formatCompactNumber={function (): string {
        throw new Error("Function not implemented.");
      } } isChangeInput={false} isDelete={false} searchInputValue={""} isClickCardDetail={false} isModalEditOpen={false} id={0} name={""} description={""} imgUrl={""} like={0} comments={[]} isClickInput={false} setIsDelete={function (): void {
        throw new Error("Function not implemented.");
      } }/>:<></>:<></>}
      {isModalDeleteOpen?<Modal
        closeIcon={false}
        onCancel={handleCancel}
        okText="Delete"
        open={isModalDeleteOpen}
        width={594}
        onOk={handleDeleteOk}
      >
        <Typography.Text className="model-delete-title mb-16">
          Delete card?
        </Typography.Text>
        <Typography.Text className="model-delete-desc">
          You will not be able to restore the card after taking this action.
        </Typography.Text>
      </Modal>
      :<ModalCreateCard isModalEditOpen={isModalEditOpen} setIsModalEditOpen={setIsModalEditOpen} isModalAddOpen={false} setIsModalAddOpen={function (): void {
          throw new Error("Function not implemented.");
        } } isModalDeleteOpen={false} setIsModalDeleteOpen={function (): void {
          throw new Error("Function not implemented.");
        } } setIsForceRender={function (): void {
          throw new Error("Function not implemented.");
        } } setIsClickCardDetail={function (): void {
          throw new Error("Function not implemented.");
        } } setIsCurrentPageChange={function (): void {
          throw new Error("Function not implemented.");
        } } setCurrentPage={function (): void {
          throw new Error("Function not implemented.");
        } } formatCompactNumber={function (): string {
          throw new Error("Function not implemented.");
        } } isCurrentPageChange={false} itemPerPage={0} currentPage={0} isChangeInput={false} isDelete={false} searchInputValue={""} isClickCardDetail={false} id={0} name={""} description={""} imgUrl={""} like={0} comments={[]} isClickInput={false} setIsDelete={function (): void {
          throw new Error("Function not implemented.");
        } }/>}
      {<ModalCreateCard isModalAddOpen={isModalAddOpen} setIsModalAddOpen={setIsModalAddOpen} setIsForceRender={setIsForceRender} isModalDeleteOpen={false} setIsModalDeleteOpen={function (): void {
        throw new Error("Function not implemented.");
      } } setIsClickCardDetail={function (): void {
        throw new Error("Function not implemented.");
      } } setIsModalEditOpen={function (): void {
        throw new Error("Function not implemented.");
      } } setIsCurrentPageChange={function (): void {
        throw new Error("Function not implemented.");
      } } setCurrentPage={function (): void {
        throw new Error("Function not implemented.");
      } } formatCompactNumber={function (): string {
        throw new Error("Function not implemented.");
      } } isCurrentPageChange={false} itemPerPage={0} currentPage={0} isChangeInput={false} isDelete={false} searchInputValue={""} isClickCardDetail={false} isModalEditOpen={false} id={0} name={""} description={""} imgUrl={""} like={0} comments={[]} isClickInput={false} setIsDelete={function (): void {
        throw new Error("Function not implemented.");
      } }/>}
    </div>
  );
}

export default ListCard;
