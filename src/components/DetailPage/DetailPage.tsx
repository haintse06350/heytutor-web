/* eslint-disable no-unused-vars */
import React from "react";
import { useStyles } from "./DetailPage.style";
import Page from "../../layout/Page";
import { Box } from "@mui/material";
import BreadcrumbsTab from "../Common/Breadcrumbs/Breadcrumbs";
import FilterAndSearch from "./FilterAndSearch/FilterAndSearch";
import { Post } from "../../models/post";
import ResultContent from "./ResultContent/ResultContent";
import { keys, filter, countBy, flattenDeep, map } from "lodash";

export const DetailPage = () => {
  const classes = useStyles();
  // const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const detail = urlParams.get("detail");

  const isMyRequest = pathname.includes("my-request");
  const isRegistered = pathname.includes("registered-request");
  const [registeredData, setRegisteredData]: any = React.useState(null);
  const [postCount, setPostCount]: any = React.useState(null);
  const [data, setData]: any = React.useState(null);
  const [tabValue, setTabValue] = React.useState("all");
  const [hashtagLabels, setHashtagLabels] = React.useState(null);

  const onChangeTab = (event: React.SyntheticEvent, tab: string) => {
    setTabValue(tab);
  };

  React.useEffect(() => {
    if (tabValue && data) {
      if (tabValue === "all") {
        setData(registeredData.attachPostData);
      } else {
        const filterDataByTab = filter(registeredData.attachPostData, (o: any) => o[tabValue] === 1);
        setData(filterDataByTab);
      }
    }
  }, [tabValue, registeredData]);

  React.useEffect(() => {
    if (tabValue && data) {
      const allHashtag = map(data, (item: any) => JSON.parse(item.postData.hashtag));
      const hashTagGroup = countBy(flattenDeep(allHashtag));
      setHashtagLabels(hashTagGroup);
    }
  }, [tabValue, data]);

  React.useEffect(() => {
    Post.getListRegisteredPost()
      .then((res: any) => {
        setRegisteredData(res);
        const nbOfAllPost = res.attachPostData.length;
        const nbOfActivePost = res.attachPostData.filter((item: any) => item.isActive === 1).length;
        const nbOfConfirmedPost = res.attachPostData.filter((item: any) => item.isConfirmed === 1).length;
        const nbOfPendingPost = res.attachPostData.filter((item: any) => item.isPending === 1).length;
        const nbOfDonePost = res.attachPostData.filter((item: any) => item.isDone === 1).length;
        setPostCount({ nbOfAllPost, nbOfActivePost, nbOfConfirmedPost, nbOfPendingPost, nbOfDonePost });
        setHashtagLabels(registeredData?.hashTagGroup);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    registeredData && setData(registeredData.attachPostData);
  }, [registeredData]);

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
          <FilterAndSearch
            tabValue={tabValue}
            onChangeTab={onChangeTab}
            hashtagCount={hashtagLabels}
            postCount={postCount}
          />
          <ResultContent data={data} />
        </Box>
      </Page>
    </Box>
  );
};
