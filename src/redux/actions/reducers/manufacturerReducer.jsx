import { MANUFACTURERS_SET, MANUFACTURER_APPEND, MANUFACTURER_DELETE, MANUFACTURER_SET, MANUFACTURER_SET_PAGEABLE, MANUFACTURER_STATE_CLEAR, MANUFACTURER_UPDATE } from "../actionTypes";

const initialState = {
    manufacturer: {},
    manufacturers: [],
    pagination: {
        size: 5,
        page: 0,
        totalElements: 0,
        query: '',
        totalPages: 1
    }
}

const manufacturerReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case MANUFACTURER_SET:
            return { ...state, manufacturer: payload }
        case MANUFACTURER_APPEND:
            return { ...state, manufacturers: [...state.manufacturers, payload] }
        case MANUFACTURERS_SET:
            return { ...state, manufacturers: payload }
        case MANUFACTURER_DELETE:
            return { ...state, manufacturers: state.manufacturers.filter(item => item.id !== payload) }
        case MANUFACTURER_UPDATE:
            //Xóa đi manufacturer cũ 
            const newManufacturer = state.manufacturers.filter(item => item.id !== payload.id)
            //Rồi thêm manufacturer mới vào thế vào vị trí đó, coi như cập nhật lại manufacturer
            return { ...state, manufacturers: [...newManufacturer, payload] }
        case MANUFACTURER_STATE_CLEAR:
            return {
                manufacturer: {},
                manufacturers: []
            }
        case MANUFACTURER_SET_PAGEABLE:
            return { ...state, pagination : payload};
        default:
            return state
    }
}

export default manufacturerReducer;