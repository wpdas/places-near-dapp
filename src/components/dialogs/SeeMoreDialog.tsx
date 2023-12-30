import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, Divider, Rating, Stack, Typography } from "@mui/material";
import { Place } from "@dapp/web3-services/near-interface";

type Props = {
  place: Place;
  open: boolean;
  onClose: () => void;
};

export default function SeeMoreDialog({ place, open, onClose }: Props) {
  const mapQuery = place.address
    ? `${place.address.address}, ${place.address.city}, ${place.address.state_or_province}, ${place.address.country}`
    : "";

  const openMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
      "_blank"
    );
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Feedbacks for {place.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* No feedback message */}
          {place.votes.length === 0 && (
            <Typography color="text.secondary" mb={1}>
              No feedback available.
            </Typography>
          )}
        </DialogContentText>

        {/* Feedbacks */}
        <Stack>
          {place.votes.map((vote) => (
            <Stack key={`${place.id}-${vote.account_id}`}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Chip label={vote.account_id} />
                <Rating
                  sx={{ ml: 4 }}
                  name="simple-controlled"
                  value={vote.vote_value}
                  readOnly
                />
              </Stack>

              {vote.feedback && (
                <Typography variant="body2" mt={2}>
                  {vote.feedback}
                </Typography>
              )}
              <Divider sx={{ mt: 2 }} />
            </Stack>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button size="small" onClick={openMap}>
          Open Map
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
