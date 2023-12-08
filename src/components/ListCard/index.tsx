import "./ListCard.scss";
import CustomPagination from "../CustomPagination";
import { Col, Modal, Row, Typography } from "antd";
import CustomCard from "../CustomCard";
import { Key, useState } from "react";
import { CardState } from "../../context/Cards";
import NotFound from "../NotFound";
import ModalCreateCard from "../ModalCreateCard";
import { Props } from "../../interface";

function ListCard(props:Props) {
  const {setIsForceRender,setIsModalAddOpen,isModalAddOpen} = props;
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen,setIsModalEditOpen] = useState(false);
  const [isDelete,setIsDelete] = useState(false);
  const { cards , cardSearchValue,cardId,setCards,isSearchMatch }  = CardState();
  const [currentPage,setCurrentPage] = useState(1);
  const [isCurrentPageChange,setIsCurrentPageChange] = useState(false);
  const [itemPerPage] = useState(10);
  const lastItemIndex = currentPage*itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  let newCards = cards.slice(firstItemIndex,lastItemIndex);
  const notFoundElement = document.querySelector(".not-found-wrap") as HTMLDivElement;
  let exists = false;
  if(notFoundElement!==null) {
    exists=true;
  } else {
    exists=false;
  }
  
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
            setIsDelete={setIsDelete}
          />
        </Col>
        })}
      </Row>:<NotFound/>}
      {cards.length>=10?isSearchMatch===false?<CustomPagination setIsCurrentPageChange={setIsCurrentPageChange} isCurrentPageChange={isCurrentPageChange}  itemPerPage={itemPerPage} setCurrentPage={setCurrentPage } currentPage={currentPage}/>:<></>:<></>}
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
      :<ModalCreateCard isModalEditOpen={isModalEditOpen} setIsModalEditOpen={setIsModalEditOpen}/>}
      {<ModalCreateCard isModalAddOpen={isModalAddOpen} setIsModalAddOpen={setIsModalAddOpen} setIsForceRender={setIsForceRender}/>}
    </div>
  );
}

export default ListCard;
