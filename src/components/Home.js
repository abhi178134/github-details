import axios from "axios";
import React, { useState } from "react";
import SearchComponent from "./SearchComponent";

import Table from "./Table";
import Avatar from "@mui/material/Avatar";

export const Home = () => {
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: "avatar_url",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => {
        return <Avatar src={params.value} />;
      },
    },
    { field: "login", headerName: "User Name", width: 300 },
    { field: "html_url", headerName: "GitHub URL", width: 400 },
  ];

  const handleSearch = async (searchText) => {
    console.log(searchText);

    let headersList = {
      Accept: "*/*",
      Authorization: `token ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
    };

    let reqOptions = {
      url: `https://api.github.com/search/users?q=${searchText}&sort=followers&per_page=100`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);

    setRows([...response.data.items]);
  };
  return (
    <>
      <SearchComponent onSearch={handleSearch} />
      {rows.length > 1 && (
        <Table
          sx={{ margin: "10rem 0 0 10rem", flex: 1 }}
          rows={rows}
          columns={columns}
        />
      )}
    </>
  );
};
