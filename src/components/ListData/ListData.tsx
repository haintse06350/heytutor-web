/* eslint-disable no-unused-vars */
import React from "react";
// import { useStyles } from "./DetailPage.style";
import Page from "../../layout/Page";
import { Box } from "@mui/material";
import BreadcrumbsTab from "../Common/Breadcrumbs/Breadcrumbs";
import FilterAndSearch from "./FilterAndSearch/FilterAndSearch";
import { Post } from "../../models/post";
import RegisterContent from "./ListRequest/RegisterContent";
import MyRequestContent from "./ListRequest/MyRequestContent";
import { filter, countBy, flattenDeep, map } from "lodash";
import FilterAndSearchMyRequest from "./FilterAndSearch/FilterAndSearchMyRequest";

export const ListData = () => {
  // const classes = useStyles();
  // const navigate = useNavigate();
  // const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  // const detail = urlParams.get("detail");

  const isMyRequest = pathname.includes("my-request");
  const isRegistered = pathname.includes("registered-request");

  const [postCount, setPostCount]: any = React.useState(null);

  const [registerData, setRegisterData]: any = React.useState(null);
  const [myRequestData, setMyRequestData]: any = React.useState(null);

  const [tabRegisterData, setTabRegisterData]: any = React.useState(null);
  const [tabRequestData, setTabRequestData]: any = React.useState(null);

  const [registerDataFilter, setRegisterDataFilter] = React.useState(tabRegisterData);

  const [tabValue, setTabValue] = React.useState("all");
  const [tabRequestValue, setTabRequestValue] = React.useState("isActive");
  const [hashtagLabels, setHashtagLabels] = React.useState(null);
  const [selectedHashtag, setSelectedHashtag]: any = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sortDataBy, setSortDataBy] = React.useState("deadline");

  console.log("sortBy", sortDataBy);

  const [filters, setFilters]: any = React.useState({ time: "week" });

  const onChangeTab = (event: React.SyntheticEvent, tab: string) => {
    setTabValue(tab);
    setSelectedHashtag([]);
  };

  const onChangeRequestTab = (event: React.SyntheticEvent, tab: string) => {
    setTabRequestValue(tab);
  };

  const isSelectedHashtag = (hashtag: string) => {
    return selectedHashtag.includes(hashtag);
  };

  const onClickHashtag = (hashtag: string) => {
    if (selectedHashtag.length === 0) {
      setSelectedHashtag([hashtag]);
    } else {
      const isSelected = isSelectedHashtag(hashtag);
      if (isSelected) {
        const removeHashtag = selectedHashtag.filter((item: string) => item !== hashtag);
        setSelectedHashtag(removeHashtag);
      } else {
        setSelectedHashtag([...selectedHashtag, hashtag]);
      }
    }
  };

  React.useEffect(() => {
    if (tabValue && registerData) {
      if (tabValue === "all") {
        setRegisterDataFilter(registerData);
      } else {
        const filterDataByTab = filter(registerData, (o: any) => o[tabValue] === 1);
        setRegisterDataFilter(filterDataByTab);
      }
    }
  }, [tabValue, registerData]);

  React.useEffect(() => {
    const allHashtag = map(registerDataFilter, (item: any) => JSON.parse(item.hashtag));
    const hashTagGroup = countBy(flattenDeep(allHashtag));
    setHashtagLabels(hashTagGroup);
  }, [registerDataFilter]);

  React.useEffect(() => {
    if (tabRequestValue && myRequestData) {
      switch (tabRequestValue) {
        case "isActive": {
          setTabRequestData(myRequestData.postHasSupporter);
          return;
        }
        case "isPending": {
          setTabRequestData(myRequestData.postHasRegister);
          return;
        }
        case "isNew": {
          setTabRequestData(myRequestData.postHasNoRegister);
          return;
        }
        case "isOnEvent": {
          setTabRequestData(myRequestData.postOnEvent);
          return;
        }
      }
    }
  }, [tabRequestValue, myRequestData]);

  const getRegisteredData = async (filters: any) => {
    setLoading(true);
    const res = await Post.getListRegisteredPost(filters);
    setRegisterData(res.attachPostData);
    const nbOfAllPost = res.attachPostData.length;
    const nbOfActivePost = res.attachPostData.filter((item: any) => item.isActive === 1).length;
    const nbOfConfirmedPost = res.attachPostData.filter((item: any) => item.isConfirmed === 1).length;
    const nbOfPendingPost = res.attachPostData.filter((item: any) => item.isPending === 1).length;
    const nbOfDonePost = res.attachPostData.filter((item: any) => item.isDone === 1).length;
    setPostCount({ nbOfAllPost, nbOfActivePost, nbOfConfirmedPost, nbOfPendingPost, nbOfDonePost });
    setHashtagLabels(res?.hashTagGroup);
    setLoading(false);
  };

  const getListMyRequestData = async () => {
    const res = await Post.getListMyRequest();
    setMyRequestData(res);
  };

  React.useEffect(() => {
    isRegistered && getRegisteredData(filters);
    isMyRequest && getListMyRequestData();
  }, [isMyRequest, isRegistered, filters]);

  React.useEffect(() => {
    registerData && setRegisterDataFilter(registerData);
  }, [registerData]);

  React.useEffect(() => {
    registerData && setTabRegisterData(registerData);
  }, [registerData]);

  console.log("filters", filters);

  return (
    <Page>
      <Box sx={{ pb: 5 }}>
        <BreadcrumbsTab
          history={[{ title: "Trang chủ", href: "/" }]}
          current={{ title: isMyRequest ? "Vấn đề của tôi" : isRegistered ? "Vấn đề tôi đăng kí hỗ trợ" : "" }}
        />
      </Box>
      <Box sx={{ pb: 3, mr: 1 }}>
        {isRegistered ? (
          <FilterAndSearch
            isSelectedHashtag={isSelectedHashtag}
            tabValue={tabValue}
            onChangeTab={onChangeTab}
            onClickHashtag={onClickHashtag}
            setRegisterDataFilter={setRegisterDataFilter}
            setSortBy={setSortDataBy}
            sortBy={sortDataBy}
            setFilters={setFilters}
            filters={filters}
            registerData={tabRegisterData}
            hashtagCount={hashtagLabels}
            postCount={postCount}
          />
        ) : (
          <FilterAndSearchMyRequest
            isSelectedHashtag={isSelectedHashtag}
            tabValue={tabRequestValue}
            onChangeTab={onChangeRequestTab}
            onClickHashtag={onClickHashtag}
            data={myRequestData}
          />
        )}
        {isRegistered ? (
          <RegisterContent loading={loading} data={registerDataFilter} tab={tabValue} />
        ) : (
          <MyRequestContent loading={loading} tabValue={tabRequestValue} data={tabRequestData} />
        )}
      </Box>
    </Page>
  );
};
