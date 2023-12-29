import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, Rating, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { contract } from "@dapp/web3-services";
import { placesUpdateObservable } from "@dapp/utils/observables";

type Props = {
  open: boolean;
  placeName: string;
  placeId: number;
  onClose: () => void;
};

export default function VoteDialog({
  open,
  placeName,
  placeId,
  onClose,
}: Props) {
  // TODO: implement feedback to the Smart Contract
  const [feedback, setFeedback] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [status, setStatus] = useState<"ready" | "in_progress">("ready");

  const sendVote = useCallback(async () => {
    setStatus("in_progress");
    await contract.vote(placeId, ratingValue);
    placesUpdateObservable.notify({});
    onClose();
  }, [ratingValue, placeId, onClose]);

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
          disabled={status === "in_progress"}
        />
        <Rating
          sx={{ mt: 1 }}
          disabled={status === "in_progress"}
          name="simple-controlled"
          value={ratingValue}
          onChange={(_, newValue) => {
            setRatingValue(newValue!);
          }}
        />
      </DialogContent>

      {status === "in_progress" ? (
        <Stack alignItems="center" direction="column" m={2}>
          <CircularProgress />
        </Stack>
      ) : (
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={sendVote}>Send</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
