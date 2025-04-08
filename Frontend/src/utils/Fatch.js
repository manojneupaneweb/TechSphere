import axios from "axios";
const fatchByCategory = async (category) => {
    
    const response= await axios.get(`/api/v1/category/getproductbycategories/${category}`)

    return response
}
export default fatchByCategory