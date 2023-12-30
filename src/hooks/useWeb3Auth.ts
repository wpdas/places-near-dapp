import { Web3AuthContext } from "@dapp/contexts/Web3AuthProvider";
import { useContext } from "react";

const useWeb3Auth = () => useContext(Web3AuthContext);
export default useWeb3Auth;
