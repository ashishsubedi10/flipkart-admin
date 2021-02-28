import axios from '../helpers/axios'
import { categoryConstant, productConstant } from './constants';

export const getInitialData = () => {
    return async dispatch => {

        const res = await axios.post(`/initialdata`);
        if (res.status === 200) {
            const { categories, products } = res.data;
            dispatch({
                type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstant.GET_ALL_PRODUCT_SUCCESS,
                payload: { products }
            })
        }
        console.log(res)

    }
}