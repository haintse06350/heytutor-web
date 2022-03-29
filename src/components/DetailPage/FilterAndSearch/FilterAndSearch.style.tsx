import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(() => ({
  detailRoot: {},
  searchAndFilter: {
    background: "#ffffff",
    padding: 16,
    borderRadius: 12,
  },
  deleteIcon: {
    background: "#fff",
    "& > .MuiChip-deleteIcon": {
      color: "rgb(255, 94, 123)",
      "&:hover": {
        color: "rgb(255, 25, 67)",
      },
    },
  },
  moreFilter: {
    background: "#fff",
    "& > span": {
      fontWeight: 600,
    },
  },
  selectedHashtag: {
    background: "#00AB55",
    color: "#fff",
  },

  tab: {
    display: "flex",
    alignItems: "center",
    "& > p": {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    "& > span": {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.5,
      textTransform: "none",
      whiteSpace: "normal",
      marginLeft: 8,
      padding: "0px 10px",
      borderRadius: 10,
      backgroundColor: "rgb(229, 234, 242)",
    },
  },
  textField: {
    "& > div": {
      background: "#fff",
    },
  },
}));
