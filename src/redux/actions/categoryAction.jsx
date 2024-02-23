import CategoryService from "../../services/categoryService";
import { CATEGORY_DELETE, CATEGORIES_SET, CATEGORY_SET, COMMON_ERROR_SET, COMMON_LOADING_SET, COMMON_MESSAGE_SET, CATEGORY_STATE_CLEAR } from "./actionTypes";

export const insertCategory = (category, navigate) => async (dispatch) => {
    const service =await new CategoryService();

    try {
        console.log('Insert category');
        dispatch({
            type : COMMON_LOADING_SET,
            payload : true
        })
        const response  = await service.insertCategory(category);
        console.log(response);

        if(response.status === 201){

            dispatch({
                type : CATEGORY_SET,
                payload : response.data
            });

            dispatch({
                type : COMMON_MESSAGE_SET,
                payload : "Category is saved",
            });

            console.log(response);
        } else {
            dispatch({
                type : COMMON_ERROR_SET,
                payload : response.message
            })
        }
    } catch(error){
        dispatch ({
            type : COMMON_ERROR_SET,
            payload : error.response.data 
            ? error.response.data.message
            : error.message
        })
        console.log(error);
    }
    dispatch({
        type : COMMON_LOADING_SET,
        payload : false
    })
    navigate('/categories/list');
}

export const updateCategory = (id, category, navigate) => async (dispatch) => {
    const service = await new CategoryService();

    try {
        console.log('Update category');
        dispatch({
            type : COMMON_LOADING_SET,
            payload : true
        })
        const response  = await service.updateCategory(id, category);
        

        if(response.status === 201){

            dispatch({
                type : CATEGORY_SET,
                payload : response.data
            });

            dispatch({
                type : COMMON_MESSAGE_SET,
                payload : "Category is updated",
            });

            console.log(response);
        } else {
            dispatch({
                type : COMMON_ERROR_SET,
                payload : response.message
            })
        }
    } catch(error){
        dispatch ({
            type : COMMON_ERROR_SET,
            payload : error.response.data 
            ? error.response.data.message
            : error.message
        })
        console.log(error);
    }
    dispatch({
        type : COMMON_LOADING_SET,
        payload : false
    })
    navigate('/categories/list');
}

export const getCategories = () =>async (dispatch) => {
    const service = await new CategoryService();

    try{
        console.log("Get category");
        dispatch({
            type : COMMON_LOADING_SET,
            payload : true
        })
        const response = await service.getCategories();

        console.log(response);
        if(response.status === 200){
            dispatch({
                type : CATEGORIES_SET,
                payload : response.data
            })
        } else {
            dispatch({
                type : COMMON_ERROR_SET,
                payload : response.message,
            })
        }
    } catch(error){
        dispatch ({
            type : COMMON_ERROR_SET,
            payload : error.response.data 
            ? error.response.data.message
            : error.message
        })
    }
    dispatch({
        type : COMMON_LOADING_SET,
        payload : false
    })
}

export const deleteCategory = (id) =>async (dispatch) => {
    const service =await new CategoryService();

    try{
        console.log("Delete category");
        dispatch({
            type : COMMON_LOADING_SET,
            payload : true,
        });

        const response = await service.deleteCategory(id);

        console.log(response);
        if(response.status === 200){
            dispatch({
                type : CATEGORY_DELETE,
                payload : id,
            });

            dispatch({
                type : COMMON_MESSAGE_SET,
                payload : response.data
            })
        } else {
            dispatch({
                type : COMMON_ERROR_SET,
                payload : response.message,
            })
        }
    } catch(error){
        console.log(error);
        dispatch({
            type : COMMON_ERROR_SET,
            payload : error.response.data 
            ? error.response.data.message
            : error.message, 
        })
    }
    dispatch({
        type : COMMON_LOADING_SET,
        payload : false,
    })
}

export const getCategory = (id) =>async (dispatch) => {
    const service =await new CategoryService();

    try{
        console.log("Get category by ID");
        dispatch({
            type : COMMON_LOADING_SET,
            payload : true,
        });

        const response = await service.getCategory(id);

        console.log(response);
        if(response.status === 200){
            dispatch({
                type : CATEGORY_SET,
                payload : response.data,
            });

        } else {
            dispatch({
                type : COMMON_ERROR_SET,
                payload : response.message,
            })
        }
    } catch(error){
        console.log(error);
        dispatch({
            type : COMMON_ERROR_SET,
            payload : error.response.data 
            ? error.response.data.message
            : error.message, 
        })
    }
    dispatch({
        type : COMMON_LOADING_SET,
        payload : false,
    })
}

export const clearCategoryState = () => async (dispatch) => {
    dispatch({
        type : CATEGORY_STATE_CLEAR, 
    });
}
export const clearCategory = () => (dispatch) => {
    dispatch({
        type : CATEGORY_SET, 
        payload : {
            id : "",
            name : "",
            status : "Visible"
        }
    });
}