import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating, Stack, useMediaQuery } from "@mui/material";
import { useCallback, useState } from "react";
import VoteDialog from "./dialogs/VoteDialog";
import SeeMoreDialog from "./dialogs/SeeMoreDialog";
import ConnectDialog from "./dialogs/ConnectDialog";
import { Place } from "@dapp/web3-services/near-interface";
import { wallet } from "@dapp/web3-services";

type Props = {
  place: Place;
};

const PlaceInfo = ({ place }: Props) => {
  const maxWidth454 = useMediaQuery("(max-width:454px)");
  const [openVoteDialog, setOpenVoteDialog] = useState(false);
  const [openSeeMoreDialog, setOpenSeeMoreDialog] = useState(false);
  const [openConnectDialog, setOpenConnectDialog] = useState(false);

  const rateHandler = useCallback(async () => {
    if (await wallet.isSignedIn()) {
      setOpenVoteDialog(true);
      return;
    }
    setOpenConnectDialog(true);
  }, []);

  return (
    <Card
      sx={{
        width: maxWidth454 ? "100%" : 345,
        minHeight: 315,
        m: maxWidth454 ? 0 : 2,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack>
        <CardMedia
          sx={{ height: 140 }}
          image={
            place.pictures[0] ||
            "https://mui.com/static/images/cards/paella.jpg"
          }
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {place.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {place.description ||
              "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}
          </Typography>
        </CardContent>
      </Stack>

      <CardActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          flexDirection={maxWidth454 ? "column" : "row"}
          alignItems={maxWidth454 ? "center" : "start"}
        >
          <Stack direction="row" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              ({place.votes_counter})
            </Typography>
            <Rating
              sx={{ ml: 1, mb: maxWidth454 ? 1 : 0 }}
              name="simple-controlled"
              value={place.avarage_votes}
              readOnly
            />
          </Stack>
          <Button size="small" onClick={rateHandler}>
            Rate it
          </Button>
          <Button size="small" onClick={() => setOpenSeeMoreDialog(true)}>
            See More
          </Button>
        </Stack>
      </CardActions>
      <VoteDialog
        place={place}
        open={openVoteDialog}
        onClose={() => setOpenVoteDialog(false)}
      />

      <SeeMoreDialog
        place={place}
        open={openSeeMoreDialog}
        onClose={() => setOpenSeeMoreDialog(false)}
      />

      <ConnectDialog
        open={openConnectDialog}
        onClose={() => setOpenConnectDialog(false)}
      />
    </Card>
  );
};

export default PlaceInfo;
