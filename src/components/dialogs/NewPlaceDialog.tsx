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
import useCSCService from "@dapp/hooks/useCSCService";
import { contract } from "@dapp/web3-services";
import { placesUpdateObservable } from "@dapp/utils/observables";
import Spinner from "../Spinner";

type Props = {
  open: boolean;
  onClose: () => void;
};

const defaultForm = {
  name: "",
  address: "",
  country: "",
  state_or_province: "",
  city: "",
  picture_url: "",
  description: "",
  type: "",
};

export default function NewPlaceDialog({ open, onClose }: Props) {
  const [form, setForm] = useState(defaultForm);

  const { countries, states, loadingStates, cities, loadingCities } =
    useCSCService(
      form.country.split("-")[1], //iso2
      form.state_or_province.split("-")[1] //iso2
    );

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

  const createPlace = async () => {
    if (canAdd) {
      setLoading(true);

      const result = await contract.addPlace({
        name: form.name,
        description: form.description,
        pictures: [form.picture_url],
        place_type: form.type,
        address: {
          address: form.address,
          country: form.country.split("-")[0], // name
          state_or_province: form.state_or_province.split("-")[0], // name
          city: form.city,
        },
      });

      // End of process
      setLoading(false);
      placesUpdateObservable.notify({});
      closeHandler();
    }
  };

  const closeHandler = () => {
    setForm(defaultForm);
    onClose();
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>{`New place`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please provide your the needed info for this new place you want to
          add.
        </DialogContentText>

        {loading ? (
          <Spinner />
        ) : (
          <Stack>
            <TextField
              margin="dense"
              label="Name"
              variant="standard"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {form.name && (
              <TextField
                margin="dense"
                label="Picture URL"
                variant="standard"
                value={form.picture_url}
                onChange={(e) =>
                  setForm({ ...form, picture_url: e.target.value })
                }
              />
            )}

            {form.picture_url && (
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
            )}

            {form.description && (
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
                    <MenuItem value="house">House</MenuItem>
                    <MenuItem value="building">Building</MenuItem>
                    <MenuItem value="travel">Travel</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                    <MenuItem value="beauty">Beauty</MenuItem>
                    <MenuItem value="landscape">Landscape</MenuItem>
                    <MenuItem value="shopping">Shopping</MenuItem>
                    <MenuItem value="company">Company</MenuItem>
                    <MenuItem value="service">Service</MenuItem>
                    <MenuItem value="store">Store</MenuItem>
                    <MenuItem value="beach">Beach</MenuItem>
                    <MenuItem value="health">Health</MenuItem>
                    <MenuItem value="hospital">Hospital</MenuItem>
                    <MenuItem value="movie theater">Movie Theater</MenuItem>
                    <MenuItem value="movie theater">Theater</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            {/* Country */}
            {form.type && (
              <Box mt={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="country"
                    label="Country"
                    value={form.country}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        country: e.target.value,
                      });
                    }}
                  >
                    {countries.map((country) => (
                      <MenuItem
                        key={country.id}
                        value={`${country.name}-${country.iso2}`}
                      >
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {/* State or Province */}
            {form.country && !loadingStates && states.length > 0 && (
              <Box mt={3}>
                <FormControl fullWidth>
                  <InputLabel>State/Province</InputLabel>
                  <Select
                    labelId="state_or_province"
                    label="State/Province"
                    value={form.state_or_province}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        state_or_province: e.target.value,
                      })
                    }
                  >
                    {states.map((state) => (
                      <MenuItem
                        key={state.id}
                        value={`${state.name}-${state.iso2}`}
                      >
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {/* Cities */}
            {form.state_or_province && !loadingCities && cities.length > 0 && (
              <Box mt={3}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    labelId="state_or_province"
                    label="City"
                    value={form.city}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        city: e.target.value,
                      })
                    }
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}

            {form.city && (
              <Stack mt={1}>
                <TextField
                  margin="dense"
                  label="Address"
                  variant="standard"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </Stack>
            )}

            {(loadingStates || loadingCities) && <Spinner />}
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={closeHandler}>
          Cancel
        </Button>
        <Button disabled={!canAdd || loading} onClick={createPlace}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
