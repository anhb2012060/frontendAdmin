import ManufacturerService from './../../services/manufacturerService';
import { COMMON_ERROR_SET, COMMON_LOADING_SET, COMMON_MESSAGE_SET, MANUFACTURERS_SET, MANUFACTURER_APPEND, MANUFACTURER_DELETE, MANUFACTURER_SET, MANUFACTURER_SET_PAGEABLE, MANUFACTURER_UPDATE } from './actionTypes';

export const insertManufacturer = (manufacturer) => async (dispatch) => {
    const service = await new ManufacturerService();

    try {
        console.log('Insert manufacturer');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true
        })
        const response = await service.insertManufacturer(manufacturer);
        console.log(response);

        if (response.status === 201) {

            dispatch({
                type: MANUFACTURER_SET,
                payload: response.data
            });

            dispatch({
                type: MANUFACTURER_APPEND,
                payload: response.data
            })

            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: "Manufacturer is saved",
            });

            console.log(response);
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data
                ? error.response.data.message
                : error.message
        })
        console.log(error);
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false
    })
}

export const getManufacturers = () => async (dispatch) => {
    const service = await new ManufacturerService();

    try {
        console.log("Get manufacturers");
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true
        })
        const response = await service.getManufacturers();

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: MANUFACTURERS_SET,
                payload: response.data
            })
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data
                ? error.response.data.message
                : error.message
        })
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false
    })
}

export const getManufacturer = (id) => async (dispatch) => {
    const service = await new ManufacturerService();

    try {
        console.log("Get manufacturer");
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true
        })
        const response = await service.getManufacturer(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: MANUFACTURER_SET,
                payload: response.data
            })
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data
                ? error.response.data.message
                : error.message
        })
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false
    })
}

export const updateManufacturer = (manufacturer) => async (dispatch) => {
    const service = await new ManufacturerService();

    try {
        console.log('Update manufacturer');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true
        })
        const { id } = manufacturer;
        const response = await service.updateManufacturer(id, manufacturer);


        if (response.status === 201) {

            dispatch({
                type: MANUFACTURER_SET,
                payload: response.data
            });

            dispatch({
                type: MANUFACTURER_UPDATE,
                payload: response.data
            })

            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: "Manufacturer is updated",
            }); 

            console.log(response);
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data
                ? error.response.data.message
                : error.message
        })
        console.log(error);
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false
    })
}

export const deleteManufacturer = (id) => async (dispatch) => {
    const service = await new ManufacturerService();

    try {
        console.log("Delete manufacturer");
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.deleteManufacturer(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: MANUFACTURER_DELETE,
                payload: id,
            });

            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: response.data
            })
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data
                ? error.response.data.message
                : error.message,
        })
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    })
}

export const getManufacturerByName = (params) => async (dispatch) => {
    const service = await new ManufacturerService();

    try {
        console.log("Get manufacturer by name");
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true
        })
        const response = await service.getManufacturerByName(params);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: MANUFACTURERS_SET,
                payload: response.data.content,
            })

            const pagination = {
                query : params.query,
            }

            // dispatch({
            //     type : MANUFACTURER_SET_PAGEABLE,
            //     payload : pagination
            // })
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data
                ? error.response.data.message
                : error.message
        })
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false
    })
}

export const getManufacturerPage = (params) => async (dispatch) => {
    const service = await new ManufacturerService();

    try {
        console.log("Get manufacturer with page");
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true
        })
        const response = await service.getManufacturersPage(params);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: MANUFACTURERS_SET,
                payload: response.data.content,
            })

            const {size,totalPages, totalElements, pageable} = response.data

            const pagination = {
                size : size,
                query : params.query,
                page : pageable.pageNumber,
                totalPages : totalPages,
                totalElements : totalElements
            }

            dispatch({
                type : MANUFACTURER_SET_PAGEABLE,
                payload : pagination
            })
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data
                ? error.response.data.message
                : error.message
        })
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false
    })
}