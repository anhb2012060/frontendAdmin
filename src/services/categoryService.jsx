import axios from "axios";
import { API_CATEGORY } from "./constant"


export default class CategoryService {
    insertCategory = async (category) => {
        return await axios.post(API_CATEGORY, category);
    };

    getCategories = async () => {
        return await axios.get(API_CATEGORY);
    }
    
    getCategoriesPage = async () => {
        return await axios.get(API_CATEGORY + "/page");
    }

    deleteCategory = async (id) => {
        return await axios.delete(API_CATEGORY + "/" + id);
    }

    getCategory = async (id) => {
        return await axios.get(API_CATEGORY + "/" + id);
    }

    updateCategory = async (id, category) => {
        return await axios.patch(API_CATEGORY + "/" + id, category);
    }
}