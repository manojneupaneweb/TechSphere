import axios from "axios";
const fatchByCategory = async(category)=>{
    const response = axios.get(`/api/v1/product/:${category}`)
    return response
} 
export default fatchByCategory