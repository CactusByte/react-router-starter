import { ethers } from 'ethers'
import ContractABI from './contractABI.json';

let selectedAccount;
let nftContract;
let isInitialized = false;

export const init = async () => {
  let browserProvider = window.ethereum;

  const provider = new ethers.providers.Web3Provider(browserProvider);
  const signer = provider.getSigner();
  nftContract = new ethers.Contract("0x2fb25dE8575cadBba4e20a297A05065999d658a5",ContractABI, signer 
  );
  isInitialized = true;
};

export const mintToken = async () => {
  if (!isInitialized) {
    await init();
  }
  return nftContract.set()
  //.mint(selectedAccount)
  //.send({from: selectedAccount})
}