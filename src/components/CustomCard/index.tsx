import "./CustomCard.scss";
import heartIcon from "../../assets/imgs/heart-3-line.svg";
import heartFillIcon from "../../assets/imgs/heart-3-fill.svg";
import chatIcon from "../../assets/imgs/chat-3-line.svg";
import {
  Card,
  Dropdown,
  Flex,
  MenuProps,
  Space,
  Typography,
} from "antd";
import moreIcon from "../../assets/imgs/more-icon.svg";
import { Props } from "../../interface";
import CardDetail from "../CardDetail";
import { useState } from "react";
import { CardState } from "../../context/Cards";
import { formatCompactNumber } from "../../utils";

function CustomCard(props:Props) {
  const {setIsModalDeleteOpen,setIsDelete,isDelete,name,description,imgUrl,like,comments,id,setIsModalEditOpen,setIsForceRender} : Props = props;
  const items: MenuProps["items"] = [
    {
      label: <button className="btn-delete" onClick={(e) => {e.preventDefault();setIsModalEditOpen(true);setCardId(id);}}>Edit</button>,
      key: "0",
    },
    {
      label: <button className="btn-delete" onClick={(e) => {e.preventDefault();setIsModalDeleteOpen(true);setCardId(id);}}>Delete</button>,
      key: "1",
    },
  ];
  const [isClickCardDetail,setIsClickCardDetail] = useState(false);
  const {setCardId,cards,cardId} = CardState();
  const [,setLikeNumber] = useState(0);
  const [isChangeOneSecond,setIsChangeOneSecond] = useState(false);
  const [isClickHeart,setIsClickHeart] = useState(false);
  const [isClickMoreIcon,setIsClickMoreIcon] = useState(false);
  const handleClick = () => {
    setIsClickCardDetail(true)
    setIsDelete(false);
  }
  const card = cards.filter((c: { id: number; }) => c.id===id);
  const handleIncrease = () => {
    card[0].like++;
    setLikeNumber(card[0].like);
    const newItems = cards.map(
      (obj: { id: number }) =>
        card.find((o: { id: number }) => o.id === obj.id) || obj
    );
    localStorage.setItem("cards", JSON.stringify(newItems));
    setIsChangeOneSecond(true)
    setTimeout(() => setIsChangeOneSecond(false),1000)
    setIsClickHeart(true);
  }
  return (
    <>
      <Card className="card" onClick={handleClick}>
      <Flex
        gap="middle"
        align="start"
        vertical={false}
        className="card-content"
      >
        <div>
          <img src={imgUrl} alt="item-img" className="item-img" />
        </div>

        <Flex vertical className="card-wrap">
          <Typography.Text className="item-title">
            {name}
          </Typography.Text>
          <Typography.Text className="item-desc">
            {description}
          </Typography.Text>
        </Flex>
      </Flex>
      <div className="wrap-react">
        <div className="wrap-react-like" onClick={(e) => e.stopPropagation()}>
          <img src={isChangeOneSecond===false?heartIcon:heartFillIcon} alt="heart-icon" className="react-like-icon" onClick={handleIncrease}/>
          <div className="react-like-number" style={isClickHeart===true?{color:"#8E4EC6"}:{}}>{formatCompactNumber(card[0]?.like)}</div>
        </div>
        <div className="wrap-react-chat">
          <img src={chatIcon} alt="chat-icon" className="react-chat-icon" />
          <div className="react-chat-number">{comments?.length}</div>
        </div>
      </div>
    <div onClick={(e) => e.stopPropagation()}>

      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        className="more-icon"
        placement="bottomRight"
      >
        <a onClick={(e) => {e.stopPropagation();}}>
          <Space>
            <img src={moreIcon} alt="more-icon" style={isClickMoreIcon===true?{background:"#F3F3F3",borderRadius:"4px"}:{}} onClick={(e) => setIsClickMoreIcon(true)}/>
          </Space>
        </a>
      </Dropdown>
    </div>
    </Card>
    {isDelete===false&&<CardDetail setIsModalEditOpen={setIsModalEditOpen} setIsModalDeleteOpen={setIsModalDeleteOpen} setIsForceRender={setIsForceRender} id={id} name={name} description={description} imgUrl={imgUrl} like={like} comments={comments} isClickCardDetail={isClickCardDetail} setIsClickCardDetail={setIsClickCardDetail}/>}
    </>
  );
}

export default CustomCard;
