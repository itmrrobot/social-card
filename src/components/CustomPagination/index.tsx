import { Pagination, PaginationProps } from "antd";
import "./CustomPagination.scss";
import arrowRightIcon from "../../assets/imgs/arrow-right.svg";
import arrowLeftIcon from "../../assets/imgs/arrow-left.svg";
import { CardState } from "../../context/Cards";
import { useState } from "react";
import { Props } from "../../interface";

const pageSize = 10;
function CustomPagination(props:Props) {
  const {cards} = CardState();
  const {setCurrentPage,currentPage,itemPerPage,setIsCurrentPageChange,isCurrentPageChange} = props
  const [page,setPage] = useState(currentPage);
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return (
        <a className="prev">
          <img src={arrowLeftIcon} alt="arrow-right-icon" />
          <div>Previous</div>
        </a>
      );
    }
    if (type === "next") {
      return (
        <a className="next">
          <div>Next</div> <img src={arrowRightIcon} alt="arrow-right-icon" />
        </a>
      );
    }
    return originalElement;
  };
  const handlePagination = (e) => {
    setIsCurrentPageChange(false);
    setPage(e.target.value);
    if(e.target.value<=0) {
      setCurrentPage(1);
    } else if(e.target.value>Math.ceil(cards.length/itemPerPage)) {
      setCurrentPage(Math.ceil(cards.length/itemPerPage));
    } else {
      setCurrentPage(Number(e.target.value));
    }
  }
  const handleChange =(e) => {
    setPage(e.target.value);
  }
  const handlePressEnter = (e) => {
    if(e.which===13) {
      if(e.target.value<=0) {
        setCurrentPage(1);
      } else if(e.target.value>Math.ceil(cards.length/itemPerPage)) {
        setCurrentPage(Math.ceil(cards.length/itemPerPage));
      } else {
        setCurrentPage(Number(e.target.value));
      }
    }
  }
  return (
    <div className="wrap-pagination">
      <Pagination current={currentPage} pageSize={pageSize} onChange={(page) => {setCurrentPage(page);setIsCurrentPageChange(true)}} showLessItems total={cards.length} itemRender={itemRender}/>
      <div className="pagination-page">
        <div className="pagination-text">Page</div>
        <input type="number" className="pagination-input" onClick={handlePagination} onKeyDown={handlePressEnter} onChange={handleChange} name="input" value={isCurrentPageChange===true?currentPage:page}/>
        <div className="pagination-total-page">
          of {Math.ceil(cards.length/itemPerPage)}
        </div>
      </div>
    </div>
  );
}

export default CustomPagination;
