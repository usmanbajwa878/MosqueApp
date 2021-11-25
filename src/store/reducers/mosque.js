import {
  GET_MOSQUES_BY_LOCATION_COMPLETED,
  GET_MOSQUES_BY_LOCATION_PENDING,
  GET_MOSQUES_BY_LOCATION_REJECTED,
  POST_SELECTED_MOSQUE,
  POST_FAVOURITE_MOSQUE,
  REMOVE_MOSQUE,
  SELECT_MOSQUE_START,
  USER_PUSHED_TO_HOME
} from '../ActionTypes/ActionTypes';

const INITIAL_STATE = {
  selectedMosque: {},
  mosqueList: [],
  favouriteMosque: [],
  loading: false,
  error: {},
  userSelected:false
};

const MosqueReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_MOSQUES_BY_LOCATION_PENDING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_MOSQUES_BY_LOCATION_COMPLETED:
      let listData = action.payload;
      let result = listData.map(function(el) {
        var modified  = Object.assign({}, el);
        modified.selected = false;
        return modified;
      })
      return {
        ...state,
        loading: false,
        mosqueList: result,
      };
    case GET_MOSQUES_BY_LOCATION_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_SELECTED_MOSQUE:
      const payload = action.payload;
      let listFav = state.favouriteMosque;
      listFav.map((item)=>{
        if(item.mosqueId === payload.mosqueId) {
          item.selected = true;
          console.log("MTACHED")
          return item;

        }else {
          item.selected = false
          console.log("NOT MATCHED")
          return item
        }
      })
      return {
        ...state,
        selectedMosque: action.payload,
        favouriteMosque:listFav
      };
    // case SELECT_MOSQUE_START:
    //   return {
    //     ...state,
    //     selectedMosque:action.payload,
    //     favouriteMosque:[action.payload]
    //   }
    case POST_FAVOURITE_MOSQUE:
      let list = [];
      let selectedItem = {};
      if(state.userSelected){
        //user triggered event from the main screen
        const isExists =  state.favouriteMosque.findIndex(
          item => item.mosqueId === action.payload.mosqueId,
        );
        console.log("isExists",isExists);
        if (
          isExists == -1
        ) {
          list = [...state.favouriteMosque, action.payload]
        } else {
          list = state.favouriteMosque
        }
        selectedItem = state.selectedMosque;
      }else {
        list = [action.payload];
        selectedItem = action.payload
      }   
      return {
        ...state,
        favouriteMosque:list,
        selectedMosque:selectedItem
      }
    
      case USER_PUSHED_TO_HOME:
        return {
          ...state,
          userSelected:action.payload
        }

    case REMOVE_MOSQUE:
      const updatedArray = state.favouriteMosque.filter(
        item => item.mosqueId !== action.payload.mosqueId,
      );
      return {
        ...state,
        favouriteMosque: [...updatedArray],
      };

    default:
      return state;
      break;
  }
};

export default MosqueReducer;
