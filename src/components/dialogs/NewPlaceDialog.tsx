import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NewPlaceDialog({ open, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    country: "",
    state_or_province: "",
    city: "",
    picture_url: "",
    description: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const canAdd =
    form.name &&
    form.address &&
    form.country &&
    form.state_or_province &&
    form.city &&
    form.picture_url &&
    form.description &&
    form.type;

  const createPlace = () => {
    if (canAdd) {
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`New place`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide your the needed info for this new place you want to
          add.
        </DialogContentText>

        {loading ? (
          <p>Loading</p>
        ) : (
          <Stack>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              variant="standard"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Address"
              variant="standard"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Country"
              variant="standard"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />
            <TextField
              margin="dense"
              label="State/Province"
              variant="standard"
              value={form.state_or_province}
              onChange={(e) =>
                setForm({ ...form, state_or_province: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="City"
              variant="standard"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Picture URL"
              variant="standard"
              value={form.picture_url}
              onChange={(e) =>
                setForm({ ...form, picture_url: e.target.value })
              }
            />
            <TextField
              margin="dense"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              id="feedback"
              label="Description"
              type="text"
              multiline
              variant="standard"
            />
            <Box mt={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="type"
                  label="Select a Type"
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value as string })
                  }
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={!canAdd} onClick={onClose}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
