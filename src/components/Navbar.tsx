import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import NewPlaceDialog from "./dialogs/NewPlaceDialog";
import { wallet } from "@dapp/web3-services";

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
      bgcolor="#000000"
      sx={{ padding: isUnder400 ? "18px 12px" : "18px 32px" }}
    >
      <Typography
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
      </Typography>
      {/* <Image
        width={146}
        height={28}
        alt="NEAR logo"
        src="https://reart-web3-dapp.web.app/static/media/reart-logo.1b00c6108e98ce3070534edcbdc9125d.svg"
      /> */}
      <Stack direction="row">
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
          New Place
        </Button>

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

        {/* TODO: Mostrar quantidade de NEAR quando tiver connectado */}
      </Stack>

      <NewPlaceDialog
        open={openNewPlaceDialog}
        onClose={() => setOpenNewPlaceDialog(false)}
      />
    </Stack>
  );
};

export default Navbar;
