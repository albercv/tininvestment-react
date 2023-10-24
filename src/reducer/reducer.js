import { SET_DRAFT_PICTURE } from '../action/actions.js';

const initialState = {
  draftPictureState: null,
};

const rootReducer = (state = initialState, action) => {
  console.log(`PAYLOAD: ${JSON.stringify(action.payload)}`);
  switch (action.type) {
    case SET_DRAFT_PICTURE:
      return {
        ...state,
        draftPictureState: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;