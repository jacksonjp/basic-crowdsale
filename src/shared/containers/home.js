import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import csContract from '../../contracts/csContract';
import tokenContract from '../../contracts/tokenContract';

type Props = {
  web3: PropTypes.Object
};

class Home extends Component<Props> {
  constructor() {
    super();
    this.state = {
      amountRaised: 0,
      amountUpdated: false,
      address: '',
      saleEnd: '',
      etherAddress: '',
      etherBalance: 0,
      transactions: []
    };
    this.getTokenBalance = this.getTokenBalance.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.weiRaised = this.weiRaised.bind(this);
  }
  handleChange(event) {
    this.setState({ etherAddress: event.target.value });
  }
  weiRaised(CSContract) {
    var that = this;
    var web3 = this.props.web3;
    CSContract.amountRaised({}, (err, result) => {
      var ether = web3.fromWei(result, 'ether').toString();
      that.setState({
        amountRaised: ether
      });
    });
  }
  amountRaised() {
    if (this.props.web3) {
      var web3 = this.props.web3;
      var that = this;
      var CSContract = csContract(this.props.web3);
      CSContract.amountRaised({}, (err, result) => {
        var ether = web3.fromWei(result, 'ether').toString();
        that.setState({
          amountRaised: ether,
          address: CSContract.address
        });
      });
      CSContract.deadline({}, (err, time) => {
        that.setState({
          saleEnd: new Date(time.toString() * 1000).toDateString()
        });
      });
      CSContract.fundingGoal({}, (err, result) => {
        var ether = web3.fromWei(result, 'ether').toString();
        that.setState({
          goal: ether
        });
      });
      CSContract.rate({}, (err, result) => {
        var ether = result.toString();
        that.setState({
          rate: ether
        });
      });
      var events = CSContract.allEvents({ fromBlock: 0, toBlock: 'latest' });
      events.watch(function(error, log) {
        var logs = that.state.transactions;
        logs.push(log);
        that.setState({
          transactions: logs
        });
        that.weiRaised(CSContract);
      });
      events.get(function() {});
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.web3 && !this.state.amountUpdated) {
      this.setState({ amountUpdated: true }, function() {
        this.amountRaised();
      });
    }
  }
  getTokenBalance() {
    var that = this;
    var web3 = this.props.web3;
    var CoinContract = tokenContract(this.props.web3);
    if (this.state.etherAddress) {
      CoinContract.balanceOf(this.state.etherAddress, function(err, result) {
        var ether = web3.fromWei(result, 'ether').toString();
        that.setState({
          etherBalance: ether
        });
      });
    }
  }
  render() {
    if (!this.props.web3) return <div>Loading....</div>;
    var web3 = this.props.web3;
    var tsList = this.state.transactions
      .slice(0)
      .reverse()
      .map(function(ts, key) {
        var purchaser = ts.args;
        var coins = web3.fromWei(purchaser.amount, 'ether').toString();
        return (
          <p key={key}>
            <a style={{ color: 'blue' }}>{purchaser.backer}</a> contributed{' '}
            <strong>{coins}</strong> ether
          </p>
        );
      });
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Sale End Date: {this.state.saleEnd}</h1>
            Funding Goal: {this.state.goal}
            <br />
            Ether raised: {this.state.amountRaised}
            <br />
            1 ether = {this.state.rate} JCK2
            <br />
            Please send Ether to this Address: <b>{this.state.address}</b>
            <br />
            <br />
            Type Address to check JCK2 Balance
            <br />
            <br />
            <input
              value={this.state.etherAddress}
              onChange={this.handleChange}
            />
            <button onClick={() => this.getTokenBalance()}>Get Balance</button>
            {this.state.etherBalance ? (
              <div>
                <br />
                You have {this.state.etherBalance} JCK2
              </div>
            ) : (
              ''
            )}
            <br />
            <br />
            {this.state.transactions.length ? (
              <div>
                <h2>Transaction History</h2>
                <div>{tsList}</div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    web3: state.web3.web3Instance
  };
};
export default connect(mapStateToProps)(Home);
