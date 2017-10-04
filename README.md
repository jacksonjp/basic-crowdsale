# basic-crowdsale

Crowdsale uses a Fixed Supply Token (Tested on ropsten) - https://ropsten.etherscan.io/address/0x03968377E199c1FD33c65Eb3f7820CDcC369e31C

## Steps

- Deploy Coin Contract with Initial Supply, Coin Name and Coin Symbol (Copy deployed token address)
- Deploy Crowdsale with Benificary Wallet, Duraton in minutes, Funding Goal in Ethers, Tokens Per Ether and Copied token address
- Send some tokens for crowdsale distrubution to Crowdsale Contract Address
- Once there are enough tokens to distribute, sending ether to the Crowdsale contract address will give you back Coins.
