import { Card, Fade, IconButton, Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useQuery } from "@apollo/client";
import { GET_SEARCH_OUTPUT } from "../../types/types";
import { GET_SEARCH } from "../../gql-functions";
import { useState } from "react";
import MainSearchResaults from "./resualts";

const MainSearchModal = ({ open, searchText, close }: any) => {
  return (
    <Modal open={open} hideBackdrop>
      <Fade timeout={{ enter: 500, exit: 500 }} in={open}>
        {open ? (
          <div
            onClick={(e: any) => {
              if (e.target.id === "parent") close();
            }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "RGBA(0,0,0,0.7)",
            }}
            id="parent"
          >
            <MainSearchResaults searchText={searchText} close={close} />
          </div>
        ) : (
          <div></div>
        )}
      </Fade>
    </Modal>
  );
};

export default MainSearchModal;
