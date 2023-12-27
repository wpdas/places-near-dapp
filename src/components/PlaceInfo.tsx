import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating, Stack } from "@mui/material";

const PlaceInfo = () => {
  // TODO: Pegar o endereço dos items do contrato
  const mapQuery = "av afonso pena 2112 belo horizonte";

  const openMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      "_blank"
    );
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://mui.com/static/images/cards/paella.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Rating sx={{ ml: 1 }} name="simple-controlled" value={2} readOnly />
          <Button size="small">Rate it</Button>
          <Button size="small" onClick={openMap}>
            Open Map
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PlaceInfo;