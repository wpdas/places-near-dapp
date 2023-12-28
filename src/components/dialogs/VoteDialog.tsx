import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  placeName: string;
  onClose: () => void;
};

export default function VoteDialog({ open, placeName, onClose }: Props) {
  const [feedback, setFeedback] = useState("");
  const [ratingValue, setRatingValue] = useState<number | null>(5);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`What do think about ${placeName}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide your feedback or thoughts about this place.
        </DialogContentText>
        <TextField
          onChange={(e) => setFeedback(e.target.value)}
          autoFocus
          margin="dense"
          id="feedback"
          label="Feedback"
          type="text"
          fullWidth
          multiline
          variant="standard"
        />
        <Rating
          sx={{ mt: 1 }}
          name="simple-controlled"
          value={ratingValue}
          onChange={(_, newValue) => {
            setRatingValue(newValue);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Send</Button>
      </DialogActions>
    </Dialog>
  );
}
