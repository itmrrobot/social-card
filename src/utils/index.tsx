export const formatCompactNumber = (number:number) => {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(1) + "k";
    } 
  }