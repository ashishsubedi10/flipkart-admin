import axios from '../helpers/axios';
import { productConstant } from './constants';




export const addProduct = (form) => {
    return async dispatch => {
        dispatch({ type: productConstant.ADD_PRODUCT_REQUEST })
        const res = await axios.post(`/product/create`, form)
        console.log(res);
        if (res.status === 201) {
            console.log(res)
        }
    }
}