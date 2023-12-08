/* eslint-disable @typescript-eslint/no-explicit-any */
import "./Header.scss";
import logo from "../../assets/imgs/logo.svg";
import addIcon from "../../assets/imgs/add-line.svg";
import searchIcon from "../../assets/imgs/search-line.svg";
import { Button } from "antd";
import  {   useState } from "react";
import { Props } from "../../interface";
import { CardState } from "../../context/Cards";
import SearchDropdown from "../SearchDropdown";
import logoOnMoble from "../../assets/imgs/logo-on-moble.svg";
import searchBlackIcon from "../../assets/imgs/search-line-black.svg";

function Header(props:Props) {
  //const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const {setIsForceRender,setIsModalAddOpen} = props;
  const {setCardSearchValue,searchHistory,setIsSearchEmpty,setIsSearchMatch,isSearchMatch}:any= CardState();
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
      const divElement = document.createElement("div");
        divElement.classList.add("container");
      if(e.target.value.length<=50&&e.target.value.trim()!=="") {
        searchHistory?.push(e.target.value);
        const reverse = searchHistory?.reverse();
        localStorage.setItem("searchs",JSON.stringify(reverse));
        setIsCliclInput(false);
        setIsSearchEmpty(false)
        //setIsForceRender(true);
        setIsChangeInput(false);
      } 
      if(notFoundElement===null) {
        setIsSearchMatch(false)
      } else {
        setIsSearchMatch(true)
      }
    }
  }

  const handleClick = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    setIsCliclInput(true);
  }

  const handleSearchByClick = () => {
    setCardSearchValue(inputElement?.value);
    if(inputElement?.value.length<=50&&inputElement?.value.trim()!=="") {
      searchHistory?.push(inputElement.value);
      const reverse = searchHistory?.reverse();
      localStorage.setItem("searchs",JSON.stringify(reverse));
      setIsCliclInput(false);
      setIsChangeInput(false);
    }
  }

  const handleChange = (e) => {
    e.target.value = e.target.value.replace(/[0-9]/g, "");
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').substr(0,50);
    setSearchInputValue(e.target.value);
    setIsCliclInput(false);
    setIsChangeInput(true);
  }

  const HeaderOnMoble = () => {
    return (
      <div className="hide-on-pc diplay-on-moble">
        <div className="header-wrap">
          <div className="wrap-logo-btn">
          <img src={logoOnMoble} alt="logo" className="logo-on-moble" />
          <button className="btn-create" onClick={showModal}>
          <img src={addIcon} alt="add-icon" className="add-icon" />
          </button>
          </div>
          <div className="group">
          <img src={searchBlackIcon} alt="search-icon" />
          <input type="text" placeholder="Search.." name="searchValue" className="search-input" onKeyDown={handleSearch} onClick={handleClick} onChange={handleChange}/>
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
    )
  }

  return (
    <div className="header">
      <div className="hide-on-moble">

      <img src={logo} alt="logo" className="logo-img" />
      <div className="header-wrap">
        <button className="btn-create" onClick={showModal}>
          <img src={addIcon} alt="add-icon" className="add-icon" />
          <span className="add-text">Create new card</span>
        </button>
        <div className="group">
          <input type="text" placeholder="Search.." name="searchValue" className="search-input" onKeyDown={handleSearch} onClick={handleClick} onChange={handleChange}/>
          <Button className="btn-search" onClick={handleSearchByClick}>
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
      <HeaderOnMoble/>
    </div>
  );
}

export default Header;
