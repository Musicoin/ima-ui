import logo from './logo.svg';
import './App.css';

import App from './App';


import { useMetamask } from "use-metamask";


function AppWrap() {
  const { connect, metaState } = useMetamask();

  return (
    <div className="AppWrap">
      <App />
    </div>
  );
}

export default AppWrap;