import { productConstant } from "../actions/constants";


const initState = {
    products: []
}
export default (state = initState, action) => {
    switch (action.type) {
        case productConstant.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
    }
    return state
}