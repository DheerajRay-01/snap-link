export const getDate = ()=>{
const now = new Date();
  const formattedTime = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  });
return formattedTime
}