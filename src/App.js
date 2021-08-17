import logo from './logo.svg';
import './App.css';

import Web3 from 'web3';
import React from 'react';

import { MainnetChain, SChain } from '@skalenetwork/ima-js';

import proxyMainnet from './abis/proxyMainnet.json';
import proxySchain from './abis/proxySchain.json';


class App extends React.Component {
  constructor(props) {
    super(props);
    let web3 = this.initWeb3();

    //let mainnetABI = helper.jsonFileLoad(MAINNET_ABI_FILEPATH);

    const provider = new Web3.providers.HttpProvider('http://localhost:15000');
    let sChainWeb3 = new Web3(provider);

    // window.ethereum.enable();

    this.state = {
        mainnetChain: new MainnetChain(web3, proxyMainnet),
        sChain: new SChain(sChainWeb3, proxySchain)
    };
    this.balanceChecker=this.balanceChecker.bind(this);
  }


  initWeb3() {
    let web3;
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      // metamask is running
      web3 = new Web3(window.web3.currentProvider);
    } else {
      // set up provider through infura
      const provider = new Web3.providers.HttpProvider(
        // pass url of remote node
        'https://rinkeby.infura.io/v3/censored');
      web3 = new Web3(provider);

    }
    return web3
  }

  componentDidMount() {
    var intervalId = setInterval(this.balanceChecker, 5000);
    
    this.setState({intervalId: intervalId});
  }
 
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
 
 async balanceChecker() {
    let mainnetBalanceWei = await this.state.mainnetChain.ethBalance('0x6779adb81a75b55907FeA1a2c8ce5784edA14347');
    let mainnetBalanceRaw = this.state.mainnetChain.web3.utils.fromWei(mainnetBalanceWei);
    let mainnetBalance = Number(mainnetBalanceRaw).toFixed(3);
    this.setState({ mainnetBalance: mainnetBalance });

    let schainBalanceWei = await this.state.sChain.ethBalance('0x6779adb81a75b55907FeA1a2c8ce5784edA14347');
    let schainBalanceRaw = this.state.sChain.web3.utils.fromWei(schainBalanceWei);
    let sChainBalance = Number(schainBalanceRaw).toFixed(3);
    this.setState({ sChainBalance: sChainBalance });

    let address = this.state.mainnetChain.web3.eth.accounts.wallet;
    console.log('address');
    console.log(address);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Mainnet balance: {this.state.mainnetBalance} ETH
          </p>
          <p>
            sChain balance: {this.state.sChainBalance} sETH
          </p>
        </header>
      </div>
    );
  }
}

export default App;
