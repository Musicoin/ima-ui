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
 * @file Dashboard.js
 * @copyright SKALE Labs 2021-Present
*/

import Web3 from 'web3';
import React from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { Link } from "react-router-dom";

import SkBtn from '../SkBtn';

import skLogo from '../../meta/logos/skale.png';
import tetherLogo from '../../meta/logos/tether.png';
import usdcLogo from '../../meta/logos/usdc.png';
import uniLogo from '../../meta/logos/mkr.png';

import tokensMeta from '../../meta/tokens.json';


function createData(name, symbol, mainnetBalance, sChainBalance, logo) {
  return { name, symbol, mainnetBalance, sChainBalance, logo };
}

const rows = [
  createData('SKALE', 'SKL', '150000.0', '600.0', skLogo),
  createData('Tether', 'USDT', '2300.5', '900.0',  tetherLogo),
  createData('USDC', 'USDC', 0, 0,usdcLogo),
  createData('Maker', 'MKR', '5900.0', 0, uniLogo),
];


export default class ERC20Dashboard extends React.Component {
  constructor(props) {
    super(props);

    console.log(tokensMeta);
    this.state = {
      tokensData: []
    };
  }

  componentDidMount() {
    this.loadTokens();
  }
 
  componentWillUnmount() {
    
  }

  loadTokens() {

    
    
    this.setState({tokens: tokensMeta})
  }

  render() {
    const { tokensData } = this.state;

    return (
      <Box component="span" m={1}>
        <Container maxWidth="md">
            <h2 className='marg-bott-40'>
              ERC20 Tokens
            </h2>
            <TableContainer component={Paper} className='marg-bott-40'>
              <Table aria-label="simple table">
              <TableHead>
                  <TableRow>
                    <TableCell className='table-left-padd'>Token</TableCell>
                    <TableCell align="right">Mainnet balance</TableCell>
                    <TableCell align="right">sChain balance</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row" className='table-left-padd'>
                        <div className="flex-container">
                            <div className="flex-container fl-centered">
                              <img src={row.logo} className="coin-logo" alt="logo" />
                            </div>
                            <p className="coin-name flex-container">
                              {row.name} ({row.symbol})
                            </p>
                          </div>
                      </TableCell>
                      <TableCell align="right">{row.mainnetBalance}</TableCell>
                      <TableCell align="right">{row.sChainBalance}</TableCell>
                      <TableCell align="right">
                      <Link className='table-btn' to="/eth/deposit">
                          <SkBtn color="primary" >Deposit</SkBtn>
                        </Link>
                        <Link className='table-btn' to={this.state.disableWithdrawETH ? '#' : "/eth/withdraw"}>
                          <SkBtn color="primary" disabled={this.state.disableWithdrawETH}>Withdraw</SkBtn>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </Container>
      </Box>
    );
  }
}
