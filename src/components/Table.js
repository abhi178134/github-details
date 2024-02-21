import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
  Typography,
  Link,
  Grid,
} from "@mui/material";

import axios from "axios";

const ODD_OPACITY = 0.1;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
      },
    },
  },
}));

const Table = React.memo(({ rows, columns, totalCount, onPageChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 100,
    page: 0,
  });
  
  useEffect(() => {
    onPageChange(paginationModel);
  }, [paginationModel]);

  const handleRowClick = async (params) => {
    let userName = params?.row?.login;

    let headersList = {
      Accept: "*/*",
      Authorization: `token ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
    };

    let reqOptions = {
      url: `https://api.github.com/users/${userName}`,
      method: "GET",
      headers: headersList,
    };

    let response = await axios.request(reqOptions);
    console.log(response.data);
    setSelectedUser(response.data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          margin: "2rem",
          height: "80vh",
          width: "80%",
          "@media (min-width:600px)": {
            height: "80%",
            width: "80%",
          },
        }}
      >
        <StripedDataGrid
          rows={rows}
          columns={columns}
          sx={{
            boxShadow: 2,
            border: "2px solid #ccc",
            "& .MuiDataGrid-row:hover": {
              color: "primary.main",
            },
            height: "100%",
            width: "100%",
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          onRowClick={handleRowClick}
          rowCount={totalCount}
          paginationMode="server"
          pageSizeOptions={[25, 50, 100]}
          onPaginationModelChange={setPaginationModel}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                alt={selectedUser.name}
                src={selectedUser.avatar_url}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">{selectedUser.name}</Typography>
              {selectedUser.login && (
                <Typography>Username: {selectedUser.login}</Typography>
              )}
              {selectedUser.company && (
                <Typography>Company: {selectedUser.company}</Typography>
              )}
              {selectedUser.email && (
                <Typography>Email: {selectedUser.email}</Typography>
              )}
              {selectedUser.location && (
                <Typography>Location: {selectedUser.location}</Typography>
              )}
              {selectedUser.bio && (
                <Typography>Bio: {selectedUser.bio}</Typography>
              )}
              {selectedUser.twitter_username && (
                <Typography>
                  Twitter Username: {selectedUser.twitter_username}
                </Typography>
              )}
              <Typography>Public Repos: {selectedUser.public_repos}</Typography>
              <Typography>Followers: {selectedUser.followers}</Typography>
              <Typography>Following: {selectedUser.following}</Typography>
              {selectedUser.html_url && (
                <Link
                  href={selectedUser.html_url}
                  target="_blank"
                  rel="noopener"
                >
                  GitHub Profile
                </Link>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
export default Table;
