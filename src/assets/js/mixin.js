export const mixin={
 
  filters:{
    timeFormat(date){
      return date.split(" ")[0].split("-").join(".");
    }
  }
}