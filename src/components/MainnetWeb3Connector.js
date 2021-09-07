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
 * @file MainnetWeb3Connector.js
 * @copyright SKALE Labs 2021-Present
*/

import React from 'react';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import LanguageIcon from '@material-ui/icons/Language';
import TextField from '@material-ui/core/TextField';

import { styled, withStyles } from '@material-ui/core/styles';

const HeaderButton = styled(Button)({
  'color': 'rgb(217, 224, 33)',
});


const SkHeaderField = withStyles({
    'root': {
      backgroundColor: '#313131',
      borderRadius: '10px',
      minWidth: '300pt',

      '& label': {
        color: '#9a9a9a'
      },
      '& input': {
        color: 'white'
      },
      '& label.Mui-focused': {
        color: '#9a9a9a',
      },
      '& .MuiFilledInput-underline:after': {
        border: 0,
      },
    }
})(TextField);

export default function MainnetWeb3Connector(props) {
  const [edit, setEdit] = React.useState(null);
  const [inputEndpoint, setInputEndpoint] = React.useState(localStorage.getItem('skMainnetEndpoint') || '');
  const open = Boolean(edit);

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleSaveClick = () => {
    setEdit(false);
    props.setEndpoint(inputEndpoint);
    localStorage.setItem('skMainnetEndpoint', inputEndpoint);
  };

  const handleEndpointChange = (e) => {
    setInputEndpoint(e.target.value);
  };

  return (
    <div>
        <div className="flex-container marg-left-10">
          <div className="flex-container fl-centered marg-ri-10">
          {open ? <SkHeaderField id="filled-basic" label="Ethereum endpoint" variant="filled"  value={inputEndpoint} onChange={handleEndpointChange} /> : null}
          </div>
          <div className="flex-container header-spin-text">
            { open ? null : 
            <HeaderButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              color="primary"
              onClick={handleEditClick}
              startIcon={<LanguageIcon/>}
            > 
              {props.web3 ? 'Connected' : 'Click to connect'}
            </HeaderButton> }

            { open ? 
            <HeaderButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              color="primary"
              onClick={handleSaveClick}
              startIcon={<SaveIcon/>}
            > 
              Save endpoint
            </HeaderButton> : null}
          </div>
        </div>
      </div>
  );
}
