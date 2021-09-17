/**
 * @license
 * SKALE ima-ui
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @file Admin.js
 * @copyright SKALE Labs 2021-Present
*/

import Web3 from 'web3';
import React from 'react';
import { Link } from "react-router-dom";
import { MainnetChain, SChain } from '@skalenetwork/ima-js';

import ERC20Dashboard from '../dashboard/ERC20Dashboard';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CircularProgress from '@material-ui/core/CircularProgress';

import SkBtn from '../SkBtn';

import proxyMainnet from '../../abis/proxyMainnet.json';
import proxySchain from '../../abis/proxySchain.json';

import { getSchainEndpoint, getSchainName } from '../../networks';
import { formatWeiBalance } from '../../web3Helper';


class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        chain: '',
        chainChanged: false,
        disableWithdrawETH: true,
        disableUnlock: true
    };
    this.balanceChecker=this.balanceChecker.bind(this);
  }

  componentDidMount() {
    var intervalId = setInterval(this.balanceChecker, 5000);
    this.setState({intervalId: intervalId});
  }
 
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  async balanceChecker() {
    if (!this.props.mainnetWeb3) return;
    this.setState({mainnetChain: new MainnetChain(this.props.mainnetWeb3, proxyMainnet)}); // todo: handle network change

    if (this.props.currentSchain && (this.state.chain !== this.props.currentSchain || !this.state.sChain)) {
      let sChainEndpoint = getSchainEndpoint(this.props.currentSchain);
      let sChainWeb3 = new Web3(sChainEndpoint);
      this.setState({sChain: new SChain(sChainWeb3, proxySchain)});
    }
    if (!this.state.sChain) return;

    this.setState({
      loading: false,
      chainChanged: false,
      chain: this.props.currentSchain,
      account: this.props.currentAccount
    });
  }

  render() {
    const { loading } = this.state;

    if (loading || this.state.chain !== this.props.currentSchain ||  this.state.account !== this.props.currentAccount) {
      return (
        <div className="fullscreen-msg">
          <div>
            <div className="flex-container">
              <div className="flex-container fl-centered">
                <CircularProgress className='fullscreen-spin' />
              </div>  
              <div className="flex-container fl-centered">
                <h3 className='fullscreen-msg-text'>
                  Loading {this.props.currentSchain} 
                </h3>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="IMAUI">
        <Box component="span" m={1} >
          <Container maxWidth="md">
            !!!!!
          </Container>
        </Box>
      </div>
    );
  }
}

export default Admin;
