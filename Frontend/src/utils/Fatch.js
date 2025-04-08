import axios from "axios";
const fatchByCategory = async (category) => {
    
    const response = axios.get(`/api/v1/category/getproductbycategories/:${category}`)
    return response
}
export default fatchByCategory