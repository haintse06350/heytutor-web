import { makeStyles } from "@mui/styles";
import demoImg3 from "../../assets/default_images/3.jpg";

export const useStyles: any = makeStyles(() => ({
  wrapPostItem: {
    width: "90%",
    height: "auto",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#fff",
    margin: "10px 5%",
    padding: 20,
    wordBreak: "break-word",
  },

  userPanel: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
  },
  postTitleAndAction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userNameAndAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  isResolve: {
    display: "flex",
  },

  hashTag: {
    "& > div": {
      backgroundColor: "whitesmoke",
      width: "fit-content",
      padding: 3,
      borderRadius: 5,
    },
  },
  postImage: {
    width: "100%",
    height: 200,
    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  slideImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 200,
  },
  deadline: {
    display: "flex",
    alignItems: "center",
    marginTop: 8,
  },
  postContent: {
    marginTop: 20,
    backgroundImage: `url(${demoImg3})`,
    width: "100%",
    height: 400,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userAvatar: {
    border: "2px solid #94a4c4",
    borderRadius: "50%",
  },
  userStats: {
    display: "flex",
    padding: 16,
    background: "#edf2fa",
    borderRadius: 8,
  },
  userPostDetail: {
    display: "flex",
    flexDirection: "column",
  },
}));
