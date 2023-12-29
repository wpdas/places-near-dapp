import { PlacesContractInterface } from "./near-interface";
import { wallet } from "./near-wallet";

const contract = new PlacesContractInterface(wallet);

export { contract, wallet };
