import { createContext, useContext, useState } from "react";

const CardContext = createContext({});

function CardProvider({ children }: { children: React.ReactNode }) {
  const initCards = [
    {
      id: 0,
      name: "Lorem ipsum dolor sit a consectetur Ut praesent",
      description:
        "Lorem ipsum dolor sit amet consectetur. Ut praesent mi ac ut tincidunt risus at lectus. Est consequat tincidunt consectetur non hac integer nibh duis. Ullamcorper nibh scelerisque aliquam pellentesque.",
      imgUrl:
        "http://res.cloudinary.com/dzznxekfg/image/upload/v1701574344/dchz1q7y6qmkcivfgkss.png",
      like: 0,
      comments: [],
    },
    {
      id: 1,
      name: "Name",
      description:
        "Lorem ipsum dolor sit amet consectetur. ",
      imgUrl:
        "http://res.cloudinary.com/dzznxekfg/image/upload/v1701574344/dchz1q7y6qmkcivfgkss.png",
      like: 0,
      comments: [],
    },
    {
      id: 2,
      name: "Name",
      description:
        "Lorem ipsum dolor sit amet consectetur. ",
      imgUrl:
        "http://res.cloudinary.com/dzznxekfg/image/upload/v1701574344/dchz1q7y6qmkcivfgkss.png",
      like: 0,
      comments: [],
    },
    {
      id: 3,
      name: "Name",
      description:
        "Lorem ipsum dolor sit amet consectetur. ",
      imgUrl:
        "http://res.cloudinary.com/dzznxekfg/image/upload/v1701574344/dchz1q7y6qmkcivfgkss.png",
      like: 0,
      comments: [],
    }
  ];
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem("cards")) || initCards
  );
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchs")) || []
  );
  const [cardSearchValue,setCardSearchValue] = useState("");
  const [isSearchEmpty,setIsSearchEmpty] = useState(true);
  const [isSearchMatch,setIsSearchMatch] = useState(false);
  const [cardId,setCardId] = useState(0);
  
  return (
    <CardContext.Provider value={{ cards, setCards,cardSearchValue,setCardSearchValue,isSearchMatch,setIsSearchMatch,searchHistory,setSearchHistory,setIsSearchEmpty,isSearchEmpty,setCardId,cardId }}>
      {children}
    </CardContext.Provider>
  );
}

export default CardProvider;

export const CardState = () => {
  return useContext(CardContext);
};
