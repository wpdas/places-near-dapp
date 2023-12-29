import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating, Stack, useMediaQuery } from "@mui/material";
import { useState } from "react";
import VoteDialog from "./dialogs/VoteDialog";
import { Address } from "@dapp/web3-services/near-interface";

type Props = {
  id: number;
  name: string;
  imageUrl: string;
  avarageVotes: number;
  address: Address;
  description: string;
};

const PlaceInfo = ({
  id,
  name,
  imageUrl,
  avarageVotes,
  address,
  description,
}: Props) => {
  const maxWidth454 = useMediaQuery("(max-width:454px)");
  const [openVoteDialog, setOpenVoteDialog] = useState(false);

  const mapQuery = address
    ? `${address.address}, ${address.city}, ${address.state_or_province}, ${address.country}`
    : "Brazil";

  const openMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      "_blank"
    );
  };

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
          // image="https://mui.com/static/images/cards/paella.jpg"
          // image={imageUrl}
          image={imageUrl || "https://mui.com/static/images/cards/paella.jpg"}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description ||
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
          <Rating
            sx={{ ml: 1, mb: maxWidth454 ? 1 : 0 }}
            name="simple-controlled"
            value={avarageVotes}
            readOnly
          />
          <Button size="small" onClick={() => setOpenVoteDialog(true)}>
            Rate it
          </Button>
          <Button size="small" onClick={openMap}>
            Open Map
          </Button>
        </Stack>
      </CardActions>
      <VoteDialog
        placeId={id}
        placeName={name}
        open={openVoteDialog}
        onClose={() => setOpenVoteDialog(false)}
      />
    </Card>
  );
};

export default PlaceInfo;
