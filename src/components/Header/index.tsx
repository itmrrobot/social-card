/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Header.scss";
import logo from "../../assets/imgs/logo.svg";
import addIcon from "../../assets/imgs/add-line.svg";
import searchIcon from "../../assets/imgs/search-line.svg";
import { Button } from "antd";
import  {   ChangeEvent, useState } from "react";
import { Props } from "../../interface";
import { CardState } from "../../context/Cards";
import SearchDropdown from "../SearchDropdown";
import logoOnMoble from "../../assets/imgs/logo-on-moble.svg";
import searchBlackIcon from "../../assets/imgs/search-line-black.svg";

function Header(props:Props) {
  //const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const {setIsForceRender,setIsModalAddOpen} = props;
  const {setCardSearchValue,cardSearchValue,searchHistory,setIsSearchEmpty,setIsSearchMatch,isSearchMatch}:any= CardState();
  const [isClickInput,setIsCliclInput] = useState(false);
  const [isChangeInput,setIsChangeInput] = useState(false);
  const [searchInputValue,setSearchInputValue] = useState("");
  const inputElement = document.querySelector(".search-input") as HTMLInputElement;
  const notFoundElement = document.querySelector(".not-found-wrap") as HTMLDivElement;
  console.log(notFoundElement)
  document.addEventListener("click",function() {
    setIsCliclInput(false);
    setIsChangeInput(false);
  })
  console.log(isSearchMatch)
  const showModal = () => {
    setIsModalAddOpen(true);
    setIsForceRender(true);
  };

  const handleSearch = (e) => {
    if(e.which===13) {
      setCardSearchValue(e.target.value);
      setIsSearchEmpty(false)
      const divElement = document.createElement("div");
        divElement.classList.add("container");
      if(e.target.value.length<=50&&e.target.value.trim()!=="") {
        searchHistory?.unshift(e.target.value);
        localStorage.setItem("searchs",JSON.stringify(searchHistory));
        setIsCliclInput(false);
        setIsSearchEmpty(true)
        setIsChangeInput(false);
      } 
      if(notFoundElement===null) {
        setIsSearchMatch(false)
      } else {
        setIsSearchMatch(true)
      }
      
    console.log("Search .................")
    }
  }

  const handleClick = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    setIsCliclInput(true);
  }

  const handleSearchByClick = () => {
    setCardSearchValue(inputElement?.value);
    if(cardSearchValue === undefined) {
      setCardSearchValue("");
      setIsForceRender(true);
    }
    if(inputElement?.value.length<=50&&inputElement?.value.trim()!=="") {
      searchHistory?.unshift(inputElement.value);
      localStorage.setItem("searchs",JSON.stringify(searchHistory));
      setIsCliclInput(false);
      setIsChangeInput(false);
    }
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[0-9]/g, "");
    e.target.value = e.target.value.replace(/^\s/, "");
    e.target.value= e.target.value.replace(/[$&+,:;=?[\]@#|{}'<>.^*()%!-/`~]/,'');
    e.target.value=e.target.value.replace(/\p{Emoji}/u,'');
    setSearchInputValue(e.target.value);
    setIsCliclInput(false);
    setIsChangeInput(true);
  }

  return (
    <div className="header">
      <div>

      <img src={logo} alt="logo" className="logo-img hide-on-moble" />
      <div className="header-wrap">
        <button className="btn-create hide-on-moble" onClick={showModal}>
          <img src={addIcon} alt="add-icon" className="add-icon" />
          <span className="add-text">Create new card</span>
        </button>
        <div className="wrap-logo-btn hide-on-pc diplay-on-moble">
          <img src={logoOnMoble} alt="logo" className="logo-on-moble" />
          <button className="btn-create" onClick={showModal}>
          <img src={addIcon} alt="add-icon" className="add-icon" />
          </button>
          </div>
        <div className="group">
          <img src={searchBlackIcon} alt="search-icon" className="hide-on-pc diplay-on-moble"/>
          <input type="text" placeholder="Search.." name="searchValue" className="search-input" onKeyDown={handleSearch} onClick={handleClick} onChange={handleChange}/>
          <Button className="btn-search hide-on-moble" onClick={handleSearchByClick}>
            <img src={searchIcon} alt="search-icon" />
          </Button>
          <SearchDropdown isChangeInput={isChangeInput} searchInputValue={searchInputValue} isClickInput={isClickInput} setIsForceRender={setIsForceRender} isModalAddOpen={false} setIsModalAddOpen={function (): void {
              throw new Error("Function not implemented.");
            } } isModalDeleteOpen={false} setIsModalDeleteOpen={function (): void {
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
            } } isCurrentPageChange={false} itemPerPage={0} currentPage={0} isDelete={false} isClickCardDetail={false} isModalEditOpen={false} id={0} name={""} description={""} imgUrl={""} like={0} comments={[]} setIsDelete={function (): void {
              throw new Error("Function not implemented.");
            } }/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Header;
