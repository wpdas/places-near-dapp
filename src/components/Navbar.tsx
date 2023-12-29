import { Button, Stack, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import NewPlaceDialog from "./dialogs/NewPlaceDialog";
import { wallet } from "@dapp/web3-services";
import Image from "next/image";
import placesLogo from "@dapp/images/places-logo.png";
import CustomMenu from "./CustomMenu";

const Navbar = () => {
  const isUnder818 = useMediaQuery("(max-width:818px)");
  const isUnder400 = useMediaQuery("(max-width:400px)");
  const [openNewPlaceDialog, setOpenNewPlaceDialog] = useState(false);
  const [isUserConnected, setIsUserConnected] = useState<
    "yes" | "no" | "pending"
  >("pending");

  // Check if user is connected
  useEffect(() => {
    (async () => {
      const isConnected = await wallet.isSignedIn();
      setIsUserConnected(isConnected ? "yes" : "no");
    })();
  }, []);

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
      {/* <Typography
        variant="h6"
        color="white"
        fontSize={22}
        fontWeight="bold"
        letterSpacing={1}
        sx={{
          background: "linear-gradient(45deg, #93EAEA, #CB80E2 80%)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Places
      </Typography> */}
      <Image width={126} alt="NEAR logo" src={placesLogo} />
      <Stack direction="row">
        {isUserConnected === "yes" && (
          <Button
            onClick={() => setOpenNewPlaceDialog(true)}
            variant="contained"
            size={isUnder818 ? "small" : "medium"}
            sx={{
              background: "#3a5c5c",
              color: "#ffffff",
              textTransform: "none",
              fontSize: 16,
              mr: isUserConnected !== "yes" ? 2 : 0,
            }}
          >
            Add New Place
          </Button>
        )}

        {isUserConnected !== "yes" && (
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
            {isUserConnected === "pending" ? "..." : "Connect Wallet"}
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
