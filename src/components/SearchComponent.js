// SearchComponent.js
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, IconButton, InputAdornment } from "@mui/material";

const SearchComponent = ({ onSearch, searchText, setSearchText }) => {
  const handleSearch = async (text) => {
    if (text && text !== "") onSearch(text);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Search only when the user has stopped typing for more than 2 second to avoid over-hitting the API
  const debouncedSearch = debounce(handleSearch, 2000);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    debouncedSearch(value);
  };

  return (
    <TextField
      id="outlined-controlled"
      label="Search User"
      sx={{
        width: "25%",
        margin: "2% auto 0 auto",
        display: "block",
        "@media (max-width: 960px)": {
          width: "40%",
        },
        "@media (max-width: 600px)": {
          width: "60%",
        },
      }}
      placeholder="Enter Name of User"
      inputProps={{ "aria-label": "search user" }}
      value={searchText}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchComponent;
