/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation } from "react-router-dom";
import { useStyles } from "./DetailPage.style";
import Page from "../../layout/Page";
import { Box, Paper, Typography } from "@mui/material";
import BreadcrumbsTab from "../Common/Breadcrumbs/Breadcrumbs";
import { map, uniq, flattenDeep } from "lodash";
import FilterAndSearch from "./FilterAndSearch/FilterAndSearch";
import { Post } from "../../models/post";
import { filter } from "lodash";
import ResultContent from "./ResultContent/ResultContent";

export const DetailPage = () => {
  const classes = useStyles();
  const location = useLocation();
  // const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const detail = urlParams.get("detail");

  const isMyRequest = pathname.includes("my-request");
  const isRegistered = pathname.includes("registered-request");

  const [allData, setAllData] = React.useState(null);
  const [listHashtag, setListHashtag]: any = React.useState(null);
  const [groupData, setGroupData] = React.useState(null);

  console.log(listHashtag, detail, location.state);
  // const onDeleteFilter = (type: string, item: string) => {
  //   if (type === "onEvent") {
  //     setIsOnEventChecked(false);
  //   }
  //   if (type === "hashtag") {
  //     const filterHashtag = filter(filters.hashtag, (o: string) => o !== item);
  //     filters.hashtag = filterHashtag;
  //   } else {
  //     for (const key in filters) {
  //       if (filters[key] === item) {
  //         delete filters[key];
  //       }
  //     }
  //   }
  //   setFilters({ ...filters });
  // };

  // React.useEffect(() => {
  //   if (detail) {
  //     const newFilter = {
  //       status: detail,
  //     };
  //     setFilters({ ...filters, ...newFilter });
  //   }
  // }, [detail]);

  // React.useEffect(() => {
  //   let time: any = null;
  //   const compactDateData = compact(dateData);
  //   if (finishPickDate) {
  //     if (compactDateData.length === 1) {
  //       time = { date: moment(compactDateData[0].toString()).format("MMM Do YY") };
  //     } else {
  //       time = {
  //         fromto: `
  //           Từ ${moment(compactDateData[0].toString()).format("MMM Do YY")} Tới ${moment(
  //           compactDateData[1].toString()
  //         ).format("MMM Do YY")}
  //         `,
  //       };
  //     }
  //     setFilters({ ...filters, ...time });
  //   }
  // }, [finishPickDate]);

  // React.useEffect(() => {
  //   if (postData) {
  //     const listHashtag = map(postData, (item: any) => {
  //       return JSON.parse(item["Post.hashtag"]);
  //     });
  //     const uniqHashTag = uniq(flattenDeep(listHashtag));
  //     setListHashtag(uniqHashTag);
  //   }
  // }, [postData]);

  // React.useEffect(() => {
  //   if (filters) {
  //     const statusFilter = filters.status;
  //     const hashtagFilter = filters.hashtag;
  //     const eventFilter = filters.onEvent;

  //     let filterOptions = {};
  //     let hashtagOptions = {};
  //     let eventOptions = {};

  //     if (statusFilter) {
  //       filterOptions = {
  //         type: statusFilter,
  //         value: 1,
  //       };
  //     }
  //     if (hashtagFilter) {
  //       hashtagOptions = {
  //         type: "hashtag",
  //         value: hashtagFilter,
  //       };
  //     }

  //     if (eventFilter) {
  //       eventOptions = {
  //         type: "onEvent",
  //         value: 1,
  //       };
  //     }

  //     Post.getListPostByFilter({ filters: [filterOptions, hashtagOptions, eventOptions] }).then((res) => {
  //       setPostData(res);
  //     });
  //   }
  // }, [filters]);

  // const isHashTag = (item: any) => {
  //   if (filters["hashtag"] === item) {
  //     return true;
  //   }
  // };

  React.useEffect(() => {
    Post.getListPostByFilter({ filters: [] }).then((res) => {
      const nbTotalPost = res.length;
      const nbPendingPost = filter(res, (item: any) => item.isPending).length;
      const nbActivePost = filter(res, (item: any) => item.isActive).length;
      const nbDonePost = filter(res, (item: any) => item.isDone).length;
      const nbConfirmPost = filter(res, (item: any) => item.isConfirmed).length;

      console.log(nbTotalPost, nbPendingPost, nbActivePost, nbDonePost, nbConfirmPost);
    });
  }, []);

  return (
    <Box sx={{ mt: 10 }}>
      <Page className={classes.detailRoot}>
        <Box sx={{ pb: 5 }}>
          <BreadcrumbsTab
            history={[{ title: "Home", href: "/" }]}
            current={{ title: isMyRequest ? "My requests" : isRegistered ? "Registered Requests" : "" }}
          />
        </Box>
        <Box sx={{ pb: 3, mr: 1 }}>
          <FilterAndSearch data={location?.state.data} />
          <Typography sx={{ mt: 2, color: "#000" }}>Showing 10 results: </Typography>
          <ResultContent />
        </Box>
      </Page>
    </Box>
  );
};
