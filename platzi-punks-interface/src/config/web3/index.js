import Web3 from "web3/dist/web3.min";
import { InjectedConnector } from "@web3-react/injected-connector";

const connector = new InjectedConnector({
  supportedChainIds: [
    4 // Rinkeby, esta es la red en la que esta desplegado el contrato de 'platzi-punks'
  ],
});

const getLibrary = (provider) => {
  // devuelve una nueva instancia de web3 con el provedor (metamask en este caso)
  return new Web3(provider);
};

export { connector, getLibrary };