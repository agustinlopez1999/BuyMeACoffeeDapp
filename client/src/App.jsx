import { useState, useEffect } from 'react';
import abi from "./contractJson/BuyMeACoffee.json";
import { ethers } from "ethers";
import Memos from './components/Memos';
import Buy from './components/Buy';
import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState('Not connected');

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xF3F4B1Bc2466707b7C1290fB9f073369D6DE5d8B";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        const accounts = await ethereum.request({
          method: "eth_requestAccounts"
        });

        setAccount(accounts[0] || 'Not connected');

        ethereum.on('accountsChanged', (newAccounts) => {
          setAccount(newAccounts[0] || 'Not connected');
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log(contract);

        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };

    template();
  }, []);

  return (
    <div className="App">
      Connected account: {account}
      <Buy state={state}></Buy>
      <Memos state={state}></Memos>
    </div>
  );
}

export default App;
