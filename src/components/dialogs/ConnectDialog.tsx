import { wallet } from "@dapp/web3-services";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ConnectDialog({ open, onClose }: Props) {
  const connectWalletHandler = useCallback(() => {
    wallet.startUp(true);
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Your wallet isn&apos;t connected</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You need to connect your wallet first!
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={connectWalletHandler}>Connect Wallet</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
