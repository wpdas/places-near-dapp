import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { contract } from "@dapp/web3-services";
import { placesUpdateObservable } from "@dapp/utils/observables";
import Spinner from "../Spinner";
import { Place } from "@dapp/web3-services/near-interface";
import useWeb3Auth from "@dapp/hooks/useWeb3Auth";

type Props = {
  place: Place;
  open: boolean;
  onClose: () => void;
};

export default function VoteDialog({ place, open, onClose }: Props) {
  const [status, setStatus] = useState<"ready" | "in_progress">("ready");
  const { accountId } = useWeb3Auth();

  // Check if this user has registered a vote already, if so, return the previous info
  const previousVote = useMemo(() => {
    return place.votes.find((vote) => vote.account_id === accountId);
  }, [place.votes, accountId]);

  // Current feedback / rating value
  const [feedback, setFeedback] = useState(previousVote?.feedback || "");
  const [ratingValue, setRatingValue] = useState(previousVote?.vote_value || 0);

  const closeHandler = useCallback(() => {
    onClose();

    // Clean up
    setTimeout(() => {
      setStatus("ready");
    }, 1000);
  }, [onClose]);

  // Send vote handle
  const sendVote = useCallback(async () => {
    setStatus("in_progress");
    console.log(feedback, ratingValue);
    await contract.vote(place.id, ratingValue, feedback);
    placesUpdateObservable.notify({});
    closeHandler();
  }, [ratingValue, feedback, place.id, closeHandler]);

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>{`What do think about ${place.name}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide your feedback or thoughts about this place.
        </DialogContentText>
        <TextField
          onChange={(e) => setFeedback(e.target.value)}
          defaultValue={previousVote?.feedback}
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
        <Spinner />
      ) : (
        <DialogActions>
          <Button onClick={closeHandler}>Cancel</Button>
          <Button onClick={sendVote}>
            {previousVote ? "Update Feedback" : "Send"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
