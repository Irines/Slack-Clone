import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import "../styles/search-modal.css";
import { db } from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function SearchModal({ open, setOpen }) {
  const [search, setSearch] = useState("");
  const [dataFromDB, setDataFromDB] = useState([]);
  const [chatIdList, setChatIdList] = useState([]);

  useEffect(() => {
    getAllRoomsIds();
  }, []);

  useEffect(() => {
    console.log("chatIdList 1", chatIdList);
    getAllMessages();
  }, [chatIdList]);

  const getAllRoomsIds = async () => {
    try {
      const parentCollection = await db.collection("rooms").get();
      debugger;
      let idList = [];
      parentCollection.forEach(
        (doc) => idList.push(doc.id)
      );
      setChatIdList(idList);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMessages = async () => {
    try {
      const parentCollectionRef = db.collection("rooms");
      console.log("chatIdList 2", chatIdList);
      chatIdList.forEach((chatId) => {
        getNestedCollection(chatId, parentCollectionRef);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getNestedCollection = async (chatId, parentCollectionRef) => {
    const nestedCollectionRef = parentCollectionRef
      .doc(chatId)
      .collection("messages");

    const querySnapshot = await nestedCollectionRef.get();

    querySnapshot.forEach((doc) => {
      console.log("messages", doc.id, " => ", doc.data());
      setDataFromDB((prevData) => [...prevData, {...doc.data(), chatId}]);
    });
  };

  const openSearchResults = (params) => {
    
  }

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const clearSearch = (params) => {
    setSearch("");
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle onClose={handleClose} id="customized-dialog-title">
        <div className="row">
          <SearchIcon style={{ fill: "#6e6e6e" }}></SearchIcon>
          <input
            type="text"
            value={search}
            onChange={onChangeHandler}
            placeholder="Search (well, it's faster than scrolling)"
          ></input>
          <p onMouseDown={clearSearch}>clear</p>
        </div>
      </BootstrapDialogTitle>
      <DialogContent id="search-content">
        {search ? (
          <div className="btn-search" onClick={openSearchResults}>
            <SearchIcon style={{ fill: "white" }}></SearchIcon>
            <p>{search} - Search messages, files and more</p>
          </div>
        ) : (
          <div className="options">
            <p>I'm looking for...</p>
            <div className="row-items">
              <div className="item">
                <ForumOutlinedIcon></ForumOutlinedIcon>Messages
              </div>
              <div className="item">
                <FolderOpenIcon></FolderOpenIcon>Files
              </div>
              <div className="item">
                <TagOutlinedIcon></TagOutlinedIcon>Channels
              </div>
              <div className="item">
                <PeopleOutlineOutlinedIcon></PeopleOutlineOutlinedIcon>People
              </div>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Search
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
