# Crowdsale React dApp (SSR + RR4 + SASS)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Uses:
- React Router 4
- Express JS (Server Rendering with prefetching data)
- Redux with thunk middleware and isomorphic-fetch
- Sass Loader with Web pack
- Flow for type checking
- EsLint for linting

## WIP
- Tested on Ropsten Network using metaMask.
- Testing Server Side Rendering.

## Setup
First install the dependencies, in the root directory of this project run.
`npm install`

Copy `/src/index.dist.js` to `/src/index.js` and replace relevant fields.

## Running
For **Development** run `npm start`

This will start a development server on `localhost:3000`

For **Production** with server side rendering run `npm run build && npm run server`.
