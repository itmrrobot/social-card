import { Modal, Tooltip, Typography, message } from "antd";
import uploadIcon from "../../assets/imgs/image-add.svg";
import errorIcon from "../../assets/imgs/error-warning-line.svg";
import { ChangeEvent, useState } from "react";
import { Props } from "../../interface";
import axios from "axios";
import closeIcon from "../../assets/imgs/close-fill.svg";
import "./ModalCreateCard.scss";
import { CardState } from "../../context/Cards";
import editFillIcon from "../../assets/imgs/image-edit-fill.svg";
import checkFillIcon from "../../assets/imgs/check-fill.svg";
import questionLineIcon from "../../assets/imgs/question-line.svg";

function ModalCreateCard(props: Props) {
  const {
    isModalAddOpen,
    setIsModalAddOpen,
    setIsForceRender,
    isModalEditOpen,
    setIsModalEditOpen,
  } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [, setOver] = useState(false);
  const [imgOnCloudinary, setImgOnCloudinary] = useState("");
  const [name, setName] = useState("");  
  const [description, setDescription] = useState("");
  const [inputValueNameEdit, setInputValueNameEdit] = useState('')
  const [inputValueDescEdit, setInputValueDescEdit] = useState('')
  const [isClickEdit,setIsClickEdit] = useState(false);
  const inputNameElement = document.querySelector(
    "#form-input-name"
  ) as HTMLInputElement;
  const areaElement = document.querySelector(
    "#form-area"
  ) as HTMLTextAreaElement;
  const btnAddElement = document.querySelector(".btn-add");
  const [isCloseImgEdit, setIsCloseImgEdit] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cards, setCards, cardId }:any = CardState();
  const items = cards;
  const itemId = Math.max(...items.map((o: { id: number }) => o.id)) || 0;
  const card = {
    id: itemId === -Infinity ? 0 : itemId,
    imgUrl: imgOnCloudinary,
    name: name.trim(),
    description: description.trim(),
    comments: [],
    like: 0,
  };
  const newCard = items.filter((c: { id: number; }) => c.id === cardId);
  console.log(cards,cardId);
  if (name.length > 50 || inputValueNameEdit.length>50) {
    inputNameElement?.classList.add("input-invalid");
  } else {
    inputNameElement?.classList.remove("input-invalid");
  }
  if (description.length > 200||inputValueDescEdit.length>200) {
    areaElement?.classList.add("input-invalid");
  } else {
    areaElement?.classList.remove("input-invalid");
  }
  if(isModalAddOpen) {
    if (
      name.length > 0 &&
      name.length <= 50 &&
      description.length <= 200 &&
      description.length > 0 &&
      name.trim() !== "" &&
      description.trim() !== "" &&
      imgOnCloudinary !== ""
    ) {
      btnAddElement?.classList.add("active");
    } else {
      btnAddElement?.classList.remove("active");
    }
  }
  if (isModalEditOpen) {
    if (
      newCard[0]?.name.trim() === "" ||
      newCard[0]?.description.trim() === "" ||
      newCard[0]?.name.length > 50 ||
      newCard[0]?.description.length > 200 ||
      newCard[0]?.name.length === 0 ||
      newCard[0]?.description.length === 0 ||
      newCard[0]?.imgUrl === ""
    ) {
      btnAddElement?.classList.remove("active");
    } else {
      btnAddElement?.classList.add("active");
    }
  }
  const handleInputName = (e:ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[0-9]/g, "");
    e.target.value = e.target.value.replace(/^\s/, "");
    e.target.value= e.target.value.replace(/[$&+,:;=?[\]@#|{}'<>.^*()%!-/`~]/,'');
    e.target.value=e.target.value.replace(/\p{Emoji}/u,'');
    e.target.value=e.target.value.replace(/(\b)([a-zA-Z])/,
                   function(firstLetter: string){
                      return   firstLetter.toUpperCase();
                   });
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleInputNameEdit = (e:ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[0-9]/g, "");
    e.target.value = e.target.value.replace(/^\s/, "");
    e.target.value= e.target.value.replace(/[$&+,:;=?[\]@#|{}'<>.^*()%!-/`~]/,'');
    e.target.value=e.target.value.replace(/\p{Emoji}/u,'');
    e.target.value=e.target.value.replace(/(\b)([a-zA-Z])/,
                   function(firstLetter: string){
                      return   firstLetter.toUpperCase();
                   });
      
        setInputValueNameEdit(e.target.value);
        newCard[0].name=e.target.value;
      
  }
  console.log(newCard[0].name);
  const handleInputDescriptionEdit = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setInputValueDescEdit(e.target.value);
    e.target.value=e.target.value.replace(/(\b)([a-zA-Z])/,
                   function(firstLetter: string){
                      return   firstLetter.toUpperCase();
                   });
    newCard[0].description=e.target.value;
  }

  const handleInputDescription = (e) => {
    e.target.value=e.target.value.replace(/(\b)([a-zA-Z])/,
                   function(firstLetter: string){
                      return   firstLetter.toUpperCase();
                   });
    setDescription(e.target.value);
    console.log(e.target.value.length);
  };
  const handleCancel = () => {
    const inputNameElement = document.querySelector(
      "#form-input-name"
    ) as HTMLInputElement;
    const areaElement = document.querySelector(
      "#form-area"
    ) as HTMLTextAreaElement;
    const cardStore = JSON.parse(localStorage.getItem("cards"));
    const card = cardStore?.filter(c => c.id===cardId);
    if (isModalAddOpen) {
      setIsModalAddOpen(false);
      inputNameElement.value = "";
      areaElement.value = "";
      setName("");
      setDescription("");
      setImgOnCloudinary("");
    } 
    if(isModalEditOpen) {
      if(inputValueDescEdit==="") {
        newCard[0].description=card[0].description;
        setInputValueDescEdit(card[0].description);
      }
      if(inputValueNameEdit==="") {
        newCard[0].name=card[0].name;
        setInputValueNameEdit(card[0].name);
      }
      if(isClickEdit===false) {
        newCard[0].name=card[0].name;
        newCard[0].description=card[0].description;
        newCard[0].imgUrl=card[0].imgUrl;
        setIsCloseImgEdit(false);
      }
      setIsModalEditOpen(false);
    }
    
  };
  console.log(inputValueNameEdit,inputValueDescEdit);
  const handleUpload = async (e) => {
    if (!e.target.files) return;
    const sizeInMB = Number(
      (e.target.files[0].size / (1024*1024))
    );
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "tpmzgyak");
    const imageReg = /[\\/.](png|jpg|jpeg|svg)$/i;
    const string = e.target.files[0].type;
    const card = cards.filter((c: { id: number; }) => c.id === cardId);
    if (sizeInMB > 5) {
      messageApi.open({
        type: "warning",
        content: "This file is too large",
        style: {
          marginTop: "7.9vh",
        },
        icon: <img src={errorIcon} alt="error-warning-icon" />,
      });
    } 
    if(sizeInMB <= 5 && imageReg.test(string) === true) {
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dzznxekfg/image/upload",
          formData
        );
        if (isModalAddOpen) {
          setImgOnCloudinary(res.data?.url);
        } else {
          if (name === "" || description === "") {
            setName(card[0].name);
            setDescription(card[0].description);
          }
          if (isCloseImgEdit) {
            newCard[0].imgUrl = res.data?.url;
            setIsCloseImgEdit(false);
            setIsForceRender(true);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleRemoveImg = () => {
    setImgOnCloudinary("");
    if (isModalEditOpen) {
      newCard[0].imgUrl="";
      setIsCloseImgEdit(true);
    }
  };
  const handleCreate = () => {
    const condition =
      name.trim() === "" ||
      description.trim() === "" ||
      name.length > 50 ||
      description.length > 200 ||
      name.length === 0 ||
      description.length === 0 ||
      imgOnCloudinary === "";
    if (!condition) {
      items.unshift(card);
      card.id++;
      localStorage.setItem("cards", JSON.stringify(items));
      //setCards(items);
      messageApi.open({
        type: "success",
        content: "Successfully create!",
        duration: 3,
        style: {
          marginTop: "2.2vh"
        },
        className: "success-message",
        icon: <img src={checkFillIcon} alt="success-icon" />,
      });
      inputNameElement.value = "";
      areaElement.value = "";
      setImgOnCloudinary("");
      setName("");
      setDescription("");
      setIsModalAddOpen(false);
      setIsForceRender(true);
      setCards(items);
      //window.location.reload();
    }
    console.log(cards);
  };
  const handleEdit = () => {
    setInputValueDescEdit(areaElement.value);
    setInputValueNameEdit(inputNameElement.value);
    const condition =
      inputValueNameEdit.trim() === "" ||
      inputValueDescEdit.trim() === "" ||
      inputValueNameEdit.length > 50 ||
      inputValueDescEdit.length > 200 ||
      inputValueNameEdit.length === 0 ||
      newCard[0].description.length === 0 ||
      newCard[0].imgUrl === "";
      //const card = cards.filter((c: { id: number; }) => c.id === cardId);
    if (!condition) {
      const newItems = items.map(
        (obj: { id: number }) =>
          newCard.find((o: { id: number }) => o.id === obj.id) || obj
      );
      localStorage.setItem("cards", JSON.stringify(newItems));
      setCards(newItems);
      setIsModalEditOpen(false);
      setIsClickEdit(true);
      //setIsForceRender(true);
    }
  };
  return (
    <>
    <Modal
      closeIcon={false}
      okText="Create"
      open={isModalAddOpen ? isModalAddOpen : isModalEditOpen}
      width={594}
      onCancel={handleCancel}
      footer={null}
      className="modal-action"
    >
      {contextHolder}
      <Typography.Text className="model-delete-title">
        {isModalAddOpen ? "Create" : "Edit"} card
      </Typography.Text>
      {!imgOnCloudinary && isModalAddOpen ? (
        <div className="wrap-upload-img">
          <Tooltip
            placement="right"
            title={"Please use a square image that's less than 5MB."}
            
          >
            <img src={uploadIcon} alt="upload-icon" className="upload-icon" />
          </Tooltip>
          <div className="upload-btn-wrapper">
            <label htmlFor="upload" className="btn-upload-img">
              Upload image
            </label>
            <input
              type="file"
              name="myfile"
              id="upload"
              hidden
              onChange={handleUpload}
            />
            <Tooltip
            placement="top"
            title={"Please use a square image that's less than 5MB."}
            className="tooltip-moble"
          >

            <img src={questionLineIcon} alt="question-icon" className="hide-on-pc diplay-on-moble question-icon"/>
          </Tooltip>
          </div>
        </div>
      ) : (
        isModalAddOpen && (
          <div className="wrap-img-has-upload">
            <img
              src={imgOnCloudinary}
              onMouseOver={() => setOver(true)}
              onMouseOut={() => setOver(false)}
              alt="img-upload"
              className="img-upload"
            />
            <img
              src={closeIcon}
              alt="close-icon"
              className="close-icon"
              onClick={handleRemoveImg}
            />
          </div>
        )
      )}
      {newCard[0]?.imgUrl==="" && isModalEditOpen ? (
        <div className="wrap-upload-img">
          <Tooltip
            placement="right"
            title={"Please use a square image that's less than 5MB."}
          >
            <img src={uploadIcon} alt="upload-icon" className="upload-icon" />
          </Tooltip>
          <div className="upload-btn-wrapper">
            <label htmlFor="upload" className="btn-upload-img">
              Upload image
            </label>
            <input
              type="file"
              name="myfile"
              id="upload"
              hidden
              onChange={handleUpload}
            />
          </div>
        </div>
      ) : (
        isModalEditOpen && (
          <div className="wrap-img-has-upload">
            <img
              src={newCard[0].imgUrl}
              alt="img-upload"
              className="img-upload"
            />
            <img
              src={closeIcon}
              alt="close-icon"
              className="close-icon"
              onClick={handleRemoveImg}
            />
            <div className="popup-hover">
              <img src={editFillIcon} alt="edit-fill-icon" className="edit-fill-icon"/>
              <span className="popup-text">Edit</span>
            </div>
          </div>
        )
      )}
      <div className="form">
        <div className="form-group">
          <div className="form-text">
            <label className="form-label">
              Name
            </label>
            <span className="form-number">
              {isModalAddOpen
                ? name.length
                : name.length === 0
                ? newCard[0]?.name?.length
                : inputValueNameEdit.length}
              /50
            </span>
          </div>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your name"
            name="name"
            value={isModalAddOpen ? name : newCard[0]?.name}
            onChange={isModalAddOpen?handleInputName:handleInputNameEdit}
            id="form-input-name"
            onPaste={(e) => e.preventDefault()}
          />
        </div>
        <div className="form-group">
          <div className="form-text">
            <label className="form-label">
              Description
            </label>
            <span className="form-number">
              {isModalAddOpen
                ? description.length
                : description.length === 0
                ? newCard[0]?.description?.length
                : description.length}
              /200
            </span>
          </div>
          <textarea
            className="form-input form-area"
            placeholder="Type description here"
            name="description"
            onChange={isModalAddOpen ?handleInputDescription:handleInputDescriptionEdit}
            id="form-area"
            value={
              isModalAddOpen ? description : newCard[0]?.description
            }
          />
        </div>
      </div>
      <div className="group-btn">
        {isModalAddOpen ? (
          <button className="btn-add" onClick={handleCreate}>
            Create
          </button>
        ) : (
          <button className="btn-add active" onClick={handleEdit}>
            Save
          </button>
        )}
        <button onClick={handleCancel} className="ant-btn-default btn-cancel">
          Cancel
        </button>
      </div>
    </Modal>
    </>
  );
}

export default ModalCreateCard;
