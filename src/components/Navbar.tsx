import { Button, Stack, useMediaQuery } from "@mui/material";
import { useCallback, useState } from "react";
import NewPlaceDialog from "./dialogs/NewPlaceDialog";
import { wallet } from "@dapp/web3-services";
import Image from "next/image";
import placesLogo from "@dapp/images/places-logo.png";
import CustomMenu from "./CustomMenu";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";

const Navbar = () => {
  const isUnder818 = useMediaQuery("(max-width:818px)");
  const isUnder400 = useMediaQuery("(max-width:400px)");
  const [openNewPlaceDialog, setOpenNewPlaceDialog] = useState(false);
  const { isWalletConnected, ready } = useWeb3Auth();

  const connectWalletHandler = useCallback(() => {
    wallet.startUp(true);
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="#080A0B"
      sx={{ padding: isUnder400 ? "18px 12px" : "18px 32px" }}
    >
      <Image width={126} alt="NEAR logo" src={placesLogo} />
      <Stack direction="row">
        {isWalletConnected && (
          <Button
            onClick={() => setOpenNewPlaceDialog(true)}
            variant="contained"
            size={isUnder818 ? "small" : "medium"}
            sx={{
              background: "#3a5c5c",
              color: "#ffffff",
              textTransform: "none",
              fontSize: 16,
              mr: isWalletConnected ? 2 : 0,
            }}
          >
            Add New Place
          </Button>
        )}

        {!isWalletConnected && ready && (
          <Button
            variant="contained"
            size={isUnder818 ? "small" : "medium"}
            sx={{
              background: "#2852E3",
              color: "#ffffff",
              textTransform: "none",
              fontSize: 16,
            }}
            onClick={connectWalletHandler}
          >
            Connect Wallet
          </Button>
        )}

        <CustomMenu />
      </Stack>

      <NewPlaceDialog
        open={openNewPlaceDialog}
        onClose={() => setOpenNewPlaceDialog(false)}
      />
    </Stack>
  );
};

export default Navbar;
