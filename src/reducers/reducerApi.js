import { actionType } from '../action/actionType'
const initState = {
    article: {},
    dataArt:'',
    isLoading:false
}
export const reducerApi = (state = initState, action) => {
    switch (action.type) {
        case actionType.FETCH_ARTICLE:
            
            return { ...state, article: action.payLoad }
        case actionType.UPLOAD_ARTICLE:
            return {...state,article:action.payLoad};
        case actionType.DELETE_ARITCLE:
            return{...state,article:action.payLoad};
        case actionType.VEIW_ARTICLE:
            return{...state,dataArt:action.payLoad}
        case actionType.SEARCH_ARTICLE:
            console.log('this is ',action.isLoading)
            return{...state,article:action.payLoad,isLoading:action.isLoading}
        default:
            return state;
    }
}