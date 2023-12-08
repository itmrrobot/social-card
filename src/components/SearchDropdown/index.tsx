import "./SearchDropdown.scss";
import closeIcon from "../../assets/imgs/close-line.svg";
import { CardState } from "../../context/Cards";
import { Props } from "../../interface";

function SearchDropdown(props:Props) {
  const { searchHistory ,setSearchHistory,setCardSearchValue }  = CardState();
  const {isClickInput,isChangeInput,searchInputValue} = props;
  const lastFiveSearch = searchHistory.length>=5 ? searchHistory.slice(searchHistory.length-5,searchHistory.length):searchHistory;
  const exists = searchHistory?.filter((s: string) => s===searchInputValue||s.toLowerCase().includes(searchInputValue?.toLowerCase()));
  const NoResultSearch = () => {
    return (
        <div className="search-dropdown">
            <div className="search-item">No result</div>
        </div>
    )
  }
  const highlight = (needle:string, haystack:string) =>
  haystack.replace(
      new RegExp(needle, 'gi'),
      (str: string) => `<div class="highlight">${str}</div>`
  );
  const MatchResultSearch = () => {
    console.log(exists)
    return (
      <div className="search-dropdown" onClick={() => console.log("Hello")}>
        {exists.length!==0?exists.map((existSearch:string,index:number) => {
          return <div className="search-item" key={index} onClick={() => setCardSearchValue(existSearch)}><div className="search-item-child" dangerouslySetInnerHTML={{__html:highlight(searchInputValue,existSearch)}}></div></div>
        }):<></>}
      </div>
  )
  }
  const handleDeleteSearch = ({index}:{index:number}) => {
    searchHistory.splice(index,1);
    localStorage.setItem("searchs",JSON.stringify(searchHistory));
    setSearchHistory(searchHistory);
    //setIsForceRender(true);
    
  }
  return (
    <>
        {isClickInput&&lastFiveSearch.length!==0?<div className="search-dropdown">
      {lastFiveSearch?.map((search:string, index:number) => {
        return <div className="search-item" key={index} onClick={() => setCardSearchValue(search)}>
          <div className="search-text">{search}</div>
          <img src={closeIcon} alt="close-icon" className="search-close-icon" onClick={() => handleDeleteSearch({index})}/>
        </div>;
      })}
    </div>:<></>}
    {isChangeInput&&searchInputValue!==""?exists.length===0?<NoResultSearch/>:<MatchResultSearch/>:<></>}
    </>
  );
}

export default SearchDropdown;
