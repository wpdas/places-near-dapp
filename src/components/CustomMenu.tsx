import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import openUrl from "@dapp/utils/openUrl";
import { Box, SxProps, Theme } from "@mui/material";
import { wallet } from "@dapp/web3-services";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";

type Props = {
  sx?: SxProps<Theme>;
};

const CustomMenu = ({ sx }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { isWalletConnected } = useWeb3Auth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openLink = (url: string) => {
    handleClose();
    openUrl(url);
  };

  return (
    <Box sx={sx}>
      <IconButton
        aria-label="more"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => openLink("https://github.com/wpdas/places-near-dapp")}
        >
          Project&apos;s Repository
        </MenuItem>

        <MenuItem
          onClick={() =>
            openLink("https://www.linkedin.com/in/wenderson-pires-silva/")
          }
        >
          Author&apos;s LinkedIn
        </MenuItem>

        {isWalletConnected && (
          <MenuItem onClick={() => wallet.signOut()}>Disconnect</MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default CustomMenu;
