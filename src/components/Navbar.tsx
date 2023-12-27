import { Button, Stack, Typography, useMediaQuery } from "@mui/material";

const Navbar = () => {
  const isUnder818 = useMediaQuery("(max-width:818px)");
  const isUnder400 = useMediaQuery("(max-width:400px)");

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
          variant="contained"
          size={isUnder818 ? "small" : "medium"}
          sx={{
            background: "#3a5c5c",
            color: "#ffffff",
            textTransform: "none",
            fontSize: 16,
            mr: 2,
          }}
        >
          New Place
        </Button>
        <Button
          variant="contained"
          size={isUnder818 ? "small" : "medium"}
          sx={{
            background: "#2852E3",
            color: "#ffffff",
            textTransform: "none",
            fontSize: 16,
          }}
        >
          Connect Wallet
        </Button>
      </Stack>
    </Stack>
  );
};

export default Navbar;
