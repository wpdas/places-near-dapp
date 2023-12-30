import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQuery } from "@mui/material";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { Place } from "@dapp/web3-services/near-interface";

// Fields to use as search keyword filter
const fuseOptions = {
  keys: [
    "name",
    "place_type",
    "address.address",
    "address.city",
    "address.country",
    "address.state_or_province",
  ],
};

type Props = {
  places: Place[] | null;
  onFilterPlaces: (places: Place[] | null) => void;
};

const Search = ({ places, onFilterPlaces }: Props) => {
  const [fuse, setFuse] = useState<Fuse<Place>>();
  const [searchPattern, setSearchPattern] = useState("");
  const isUnder1230 = useMediaQuery("(max-width:1230px)");

  // Init Fuse
  useEffect(() => {
    if (places) {
      setFuse(new Fuse(places, fuseOptions));
    }
  }, [places]);

  // Process Fuse Search
  useEffect(() => {
    if (places && fuse) {
      const result = fuse.search(searchPattern || " ");
      const filteredPlaces = result.map((fuseItem) => fuseItem.item);

      if (searchPattern.length > 0) {
        onFilterPlaces(filteredPlaces);
        return;
      }
      onFilterPlaces(null);
    }
  }, [searchPattern, fuse, places, onFilterPlaces]);

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
        onChange={(e) => setSearchPattern(e.target.value)}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
