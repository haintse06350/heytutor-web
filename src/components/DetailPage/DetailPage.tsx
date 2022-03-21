/* eslint-disable no-unused-vars */
import React from "react";
import { useStyles } from "./DetailPage.style";
import Page from "../../layout/Page";
import { Box } from "@mui/material";
import BreadcrumbsTab from "../Common/Breadcrumbs/Breadcrumbs";
import FilterAndSearch from "./FilterAndSearch/FilterAndSearch";
import { Post } from "../../models/post";
import RegisterContent from "./ResultContent/RegisterContent";
import MyRequestContent from "./ResultContent/MyRequestContent";
import { filter, countBy, flattenDeep, map } from "lodash";
import FilterAndSearchMyRequest from "./FilterAndSearch/FilterAndSearchMyRequest";

export const DetailPage = () => {
  const classes = useStyles();
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

  const [tabValue, setTabValue] = React.useState("all");
  const [tabRequestValue, setTabRequestValue] = React.useState("isActive");
  const [hashtagLabels, setHashtagLabels] = React.useState(null);
  const [selectedHashtag, setSelectedHashtag]: any = React.useState([]);

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
        setTabRegisterData(registerData);
      } else {
        const filterDataByTab = filter(registerData, (o: any) => o[tabValue] === 1);
        setTabRegisterData(filterDataByTab);
      }
    }
  }, [tabValue, registerData]);

  React.useEffect(() => {
    const allHashtag = map(tabRegisterData, (item: any) => JSON.parse(item.postData.hashtag));
    const hashTagGroup = countBy(flattenDeep(allHashtag));
    setHashtagLabels(hashTagGroup);
  }, [tabRegisterData]);

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

  const getRegisteredData = async () => {
    const res = await Post.getListRegisteredPost();
    setRegisterData(res.attachPostData);
    const nbOfAllPost = res.attachPostData.length;
    const nbOfActivePost = res.attachPostData.filter((item: any) => item.isActive === 1).length;
    const nbOfConfirmedPost = res.attachPostData.filter((item: any) => item.isConfirmed === 1).length;
    const nbOfPendingPost = res.attachPostData.filter((item: any) => item.isPending === 1).length;
    const nbOfDonePost = res.attachPostData.filter((item: any) => item.isDone === 1).length;
    setPostCount({ nbOfAllPost, nbOfActivePost, nbOfConfirmedPost, nbOfPendingPost, nbOfDonePost });
    setHashtagLabels(res?.hashTagGroup);
  };

  const getListMyRequestData = async () => {
    const res = await Post.getListMyRequest();
    setMyRequestData(res);
  };

  React.useEffect(() => {
    getRegisteredData();
    getListMyRequestData();
  }, []);

  React.useEffect(() => {
    registerData && setTabRegisterData(registerData);
  }, [registerData]);

  return (
    <Page>
      <Box sx={{ pb: 5 }}>
        <BreadcrumbsTab
          history={[{ title: "Home", href: "/" }]}
          current={{ title: isMyRequest ? "My requests" : isRegistered ? "Registered Requests" : "" }}
        />
      </Box>
      <Box sx={{ pb: 3, mr: 1 }}>
        {isRegistered ? (
          <FilterAndSearch
            isSelectedHashtag={isSelectedHashtag}
            tabValue={tabValue}
            onChangeTab={onChangeTab}
            onClickHashtag={onClickHashtag}
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
          <RegisterContent data={tabRegisterData} />
        ) : (
          <MyRequestContent tabValue={tabRequestValue} data={tabRequestData} />
        )}
      </Box>
    </Page>
  );
};
