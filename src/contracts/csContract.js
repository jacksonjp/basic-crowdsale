import CONFIG from '../config';
const csContract = web3 => {
  return web3
    ? web3.eth
      .contract(CONFIG.CROWDSALEABI)
      .at(CONFIG.CROWDSALEADDR, (err, ctr) => {
        return ctr;
      })
    : 'hello';
};

export default csContract;
