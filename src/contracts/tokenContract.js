import CONFIG from '../config';
const CoinContract = web3 => {
  return web3
    ? web3.eth
      .contract(CONFIG.TOKENABI)
      .at(CONFIG.TOKENADDR, (err, ctr) => {
        return ctr;
      })
    : 'hello';
};

export default CoinContract;
