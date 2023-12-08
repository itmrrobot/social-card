export interface Props {
  isModalAddOpen: boolean;
  setIsModalAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClickCardDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCurrentPageChange: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  formatCompactNumber: () => string;
  isCurrentPageChange: boolean;
  itemPerPage: number;
  currentPage: number;
  isChangeInput: boolean;
  isDelete: boolean;
  searchInputValue:string;
  isClickCardDetail: boolean;
  isModalEditOpen: boolean;
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  like: number;
  comments: Array<object>;
  isClickInput: boolean;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
