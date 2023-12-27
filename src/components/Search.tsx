import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQuery } from "@mui/material";

const Search = () => {
  // TODO: Filtrar utilizando o endereço, cidade, país e tipo (food, travel, shopping, race, etc)
  // TODO: Implementar isso no Contrato

  const isUnder1230 = useMediaQuery("(max-width:1230px)");

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: isUnder1230 ? "100%" : 724,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Filter Places"
        inputProps={{ "aria-label": "Filter places" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
