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
  name: string;
  imageUrl: string;
  avarageVotes: number;
  address: Address;
  description: string;
};

const PlaceInfo = ({
  name,
  imageUrl,
  avarageVotes,
  address,
  description,
}: Props) => {
  // TODO: Definir o tamanho minimo para o CARD
  const mapQuery = address
    ? `${address.address}, ${address.city}, ${address.state_or_province}, ${address.country}`
    : "Brazil";
  const isUnder400 = useMediaQuery("(max-width:400px)");
  const [openVoteDialog, setOpenVoteDialog] = useState(false);

  const openMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      "_blank"
    );
  };

  return (
    <Card
      sx={{ maxWidth: isUnder400 ? 300 : 345, m: isUnder400 ? 0 : 2, mb: 2 }}
    >
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
      <CardActions>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Rating
            sx={{ ml: 1 }}
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
        placeName={name}
        open={openVoteDialog}
        onClose={() => setOpenVoteDialog(false)}
      />
    </Card>
  );
};

export default PlaceInfo;
