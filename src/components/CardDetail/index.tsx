import { Dropdown, MenuProps, Modal, Space } from "antd";
import heartIcon from "../../assets/imgs/heart-icon-for-card-detail.svg";
import heartFillIcon from "../../assets/imgs/heart-big-fill.svg";
import moreIcon from "../../assets/imgs/more-icon.svg";
import "./CardDetail.scss";
import { Props } from "../../interface";
import { useState } from "react";
import { CardState } from "../../context/Cards";
import arrowBack from "../../assets/imgs/arrow-left-line.svg";
import { formatCompactNumber } from "../../utils";

function CardDetail(props: Props) {
  const {
    isClickCardDetail,
    setIsClickCardDetail,
    id,
    name,
    description,
    imgUrl,
    comments,
    setIsModalDeleteOpen,
    setIsModalEditOpen,
  } = props;
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          className="btn-delete"
          onClick={(e) => {
            e.preventDefault();
            setIsModalEditOpen(true);
            setCardId(id);
          }}
        >
          Edit
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button
          className="btn-delete"
          onClick={(e) => {
            e.preventDefault();
            setIsModalDeleteOpen(true);
            setCardId(id);
          }}
        >
          Delete
        </button>
      ),
      key: "1",
    },
  ];
  const [isHidden, setIsHidden] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentDescription, setCommentDescription] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cards, setCards, setCardId }:any = CardState();
  const cardFilterById = cards?.filter((c: { id: number }) => c.id === id);
  const [moreNumber, setMoreNumber] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [isChangeOneSecond,setIsChangeOneSecond] = useState(false);
  const [isClickHeart,setIsClickHeart] = useState(false);
  const [,setLikeNumber] = useState(0);
  const [isClickMoreIcon,setIsClickMoreIcon] = useState(false);
  const lastestFiveComments =
    comments.length >= 5
      ? comments.slice(comments.length - 5 - moreNumber, comments.length)
      : comments;
  const inputNameElement = document.querySelector(
    "#form-input-name"
  ) as HTMLInputElement;
  const inputDescriptionElement = document.querySelector(
    "#form-input-description"
  ) as HTMLInputElement;
  const btnPostElement = document.querySelector(".btn-post-comment");
  const handleIncrease = () => {
    cardFilterById[0].like++;
    setLikeNumber(cardFilterById[0].like);
    const newItems = cards.map(
      (obj: { id: number }) =>
      cardFilterById.find((o: { id: number }) => o.id === obj.id) || obj
    );
    localStorage.setItem("cards", JSON.stringify(newItems));
    setIsChangeOneSecond(true)
    setTimeout(() => setIsChangeOneSecond(false),1000)
    setIsClickHeart(true);
  }
  if (commentName.length > 50) {
    inputNameElement?.classList.add("input-invalid");
  } else {
    inputNameElement?.classList.remove("input-invalid");
  }
  if (commentDescription.length > 200) {
    inputDescriptionElement?.classList.add("input-invalid");
  } else {
    inputDescriptionElement?.classList.remove("input-invalid");
  }
  if (
    commentName.length > 0 &&
    commentName.length <= 50 &&
    commentDescription.length <= 200 &&
    commentDescription.length > 0 &&
    commentName.trim() !== "" &&
    commentDescription.trim() !== ""
  ) {
    btnPostElement?.classList.add("active");
  } else {
    btnPostElement?.classList.remove("active");
  }
  const handleCancel = () => {
    setIsClickCardDetail(false);
    setIsHidden(false);
  };
  if (commentName.length > 50) {
    inputNameElement?.classList.add("input-invalid");
  } else {
    inputNameElement?.classList.remove("input-invalid");
  }
  if (commentDescription.length > 200) {
    inputDescriptionElement?.classList.add("input-invalid");
  } else {
    inputDescriptionElement?.classList.remove("input-invalid");
  }
  const ucfirst = (str: string) => {
    str = str.toLowerCase();
    return str.replace(/(\b)([a-zA-Z])/, function (firstLetter) {
      return firstLetter.toUpperCase();
    });
  };
  const timeSince = (date: Date) => {
    const now = new Date();
    const diff = now.valueOf() - date.valueOf();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 24) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      return formattedDate;
    } else {
      return `${Math.abs(hours)} hour ago`;
    }
  };
  const handleClickMore = () => {
    const remain = comments.length - moreNumber;
    if (remain % 5 === 0 && remain < comments.length) {
      setMoreNumber(moreNumber + 5);
    } else {
      setMoreNumber(moreNumber + remain);
    }
    console.log("click");
    if (moreNumber > comments.length) {
      setIsClick(true);
    }
    //setMoreComments(comments);
  };
  const handlePostComment = () => {
    const date = new Date();
    console.log(timeSince(date));
    const comment = {
      name: commentName !== "unknown" ? ucfirst(commentName) : commentName,
      content: commentDescription,
      time: date,
    };
    if (commentName.trim() !== "" && commentDescription.trim() !== "") {
      comments.push(comment);
      cardFilterById[0].comments = comments;
      const newItems = cards.map(
        (obj: { id: number }) =>
          cardFilterById.find((o: { id: number }) => o.id === obj.id) || obj
      );
      localStorage.setItem("cards", JSON.stringify(newItems));
      setCards(newItems);
      setCommentDescription("");
      inputDescriptionElement.value="";
      inputNameElement.value="";
    }
  };
  return (
    <Modal
      footer={null}
      closeIcon={false}
      open={isClickCardDetail}
      onCancel={handleCancel}
      okText="Delete"
      width={604}
      className="modal-card-detail"
    >
      <div className="card-detail-wrap">
        <img src={imgUrl} alt="card-detail-img" className="card-detail-img" />
        <h3 className="card-detail-title">{name}</h3>
        <div className="card-detail-desc">{description}</div>
        <div className="card-detail-like">
          <img src={isChangeOneSecond===false?heartIcon:heartFillIcon} alt="heart-icon" className="heart-icon" onClick={handleIncrease}/>
          <span className="number-heart" style={isClickHeart===true?{color:"#8E4EC6"}:{}}>{formatCompactNumber(cardFilterById[0]?.like)}</span>
        </div>
        <div className="card-detail-comment" style={comments.length===0?{paddingBottom:"314px"}:{}}>
          <span className="comment-text">Comment</span>
          <span className="comment-number">({comments.length})</span>
        </div>
        <div className="comments-list">
          {lastestFiveComments.reverse().map((comment:{name:string,content:string,time:string}, index:number) => {
            return (
              <div className="comment-item" key={index}>
                <div className="comment-name">{comment.name}</div>
                <div className="comment-content">{comment.content}</div>
                <div className="comment-time">
                  {timeSince(new Date(comment.time))}
                </div>
              </div>
            );
          })}
          {comments.length > 5 && (
            <div
              className="wrap-btn-more"
              style={isClick ? { display: "none" } : {}}
            >
              <button className="btn-more" onClick={handleClickMore}>
                More comments
              </button>
            </div>
          )}
        </div>
      </div>
      {isHidden === false ? (
        <div className="wrap-btn-comment">
          <button className="btn-add-comment" onClick={() => setIsHidden(true)}>
            Write comment
          </button>
        </div>
      ) : (
        <div className="form-comment">
          <div className="wrap-check-box">
            <input
              type="checkbox"
              className="checkbox"
              onClick={() => {
                setIsChecked(!isChecked);
                isChecked === false
                  ? setCommentName("unknown")
                  : setCommentName("");
              }}
            />
            <span className="check-box-text">Comment as Unknown</span>
          </div>
          <div className="group-input">
            <input
              type="text"
              className="form-input"
              disabled={isChecked}
              style={
                isChecked
                  ? {
                      backgroundColor: "#EDEDED",
                      border: "1px solid #E2E2E2",
                      color: "#9E9E9E",
                    }
                  : {}
              }
              name="name"
              id="form-input-name"
              placeholder="Your name"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[0-9]/g, "");
                e.target.value=e.target.value.replace(/(\b)([a-zA-Z])/,
                   function(firstLetter: string){
                      return   firstLetter.toUpperCase();
                   });
                setCommentName(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-input"
              name="description"
              id="form-input-description"
              placeholder="Type your comment here"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/^\s/, "");
                e.target.value=e.target.value.replace(/(\b)([a-zA-Z])/,
                   function(firstLetter: string){
                      return   firstLetter.toUpperCase();
                   });
                setCommentDescription(e.target.value);
              }}
            />
          </div>
          <div className="wrap-btn-post">
            <button className="btn-post-comment" onClick={handlePostComment}>
              Post comment
            </button>
          </div>
        </div>
      )}
      <div className="wrap-back-dropdown">
        <div className="wrap-back hide-on-pc diplay-on-moble">
          <img src={arrowBack} alt="" className="arrow-back" onClick={() => {setIsClickCardDetail(false);setIsHidden(false)}}/>
          <span className="text">Details</span>
        </div>
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          className="more-icon more-icon-card-detail"
          placement="bottomRight"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img src={moreIcon} alt="more-icon" style={isClickMoreIcon===true?{background:"#F3F3F3",borderRadius:"4px"}:{}} onClick={() => setIsClickMoreIcon(true)}/>
            </Space>
          </a>
        </Dropdown>
      </div>
    </Modal>
  );
}

export default CardDetail;
