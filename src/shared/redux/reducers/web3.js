export const WEB3_INITIALIZED = '@ssr/web3/loaded';

const initialState = {
  web3Instance: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case 'WEB3_INITIALIZED':
    return Object.assign({}, state, {
      web3Instance: action.payload.web3Instance
    });

  default:
    return state;
  }
}
