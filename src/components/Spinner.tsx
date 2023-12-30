import { CircularProgress, Stack } from "@mui/material";

const Spinner = () => (
  <Stack alignItems="center" direction="column" m={2}>
    <CircularProgress />
  </Stack>
);

export default Spinner;
