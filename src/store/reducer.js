const initialState = {
    userName: null,
    auth: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NAME_POP' :
            return {
                ...state,
                userName: action.resName
            };
        case 'NAME_SAVE':
            return {
                ...state,
                auth: action.checked
            };
        default:
            return {
                state
            }
    }
};

export default reducer;