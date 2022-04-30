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
import { countBy, flattenDeep, map } from "lodash";
import { useNavigate } from "react-router-dom";

export const ListData = () => {
  // const classes = useStyles();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const detail = urlParams.get("detail");

  const isMyRequest = pathname.includes("my-request");
  const isRegistered = pathname.includes("registered-request");

  const [postCount, setPostCount]: any = React.useState(null);

  const [registerData, setRegisterData]: any = React.useState(null);
  const [myRequestData, setMyRequestData]: any = React.useState(null);

  const [tabRegisterData, setTabRegisterData]: any = React.useState(null);
  const [tabRequestData, setTabRequestData]: any = React.useState(null);

  const [registerDataFilter, setRegisterDataFilter] = React.useState(tabRegisterData);
  const [myRequestFilter, setMyRequestFilter] = React.useState(tabRequestData);

  const [tabValue, setTabValue] = React.useState("all");
  const [tabRequestValue, setTabRequestValue] = React.useState("isActive");
  const [hashtagLabels, setHashtagLabels] = React.useState(null);
  const [selectedHashtag, setSelectedHashtag]: any = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sortDataBy, setSortDataBy] = React.useState("deadline");

  const [filters, setFilters]: any = React.useState({ time: "month" });

  const onChangeTab = (event: React.SyntheticEvent, tab: string) => {
    setTabValue(tab);
    setSelectedHashtag([]);
  };

  const onChangeRequestTab = (event: React.SyntheticEvent, tab: string) => {
    setTabRequestValue(tab);
    if (tab === "isConfirmed") {
      navigate("/my-request?detail=processing", { replace: true });
    }
    if (tab === "isActive") {
      navigate("/my-request?detail=active", { replace: true });
    }
    if (tab === "isPending") {
      navigate("/my-request?detail=pending", { replace: true });
    }
    if (tab === "isOnEvent") {
      navigate("/my-request?detail=onEvent", { replace: true });
    }
    if (tab === "isDone") {
      navigate("/my-request?detail=isDone", { replace: true });
    }
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

  const resetData = () => {
    if (tabValue === "all") {
      registerData && setRegisterDataFilter([...registerData.registerData, ...registerData.supportData]);
    } else {
      if (tabValue === "isConfirmed") {
        setRegisterDataFilter(registerData?.supportData);
      }
      if (tabValue === "isPending") {
        setRegisterDataFilter(registerData?.registerData);
      }
    }
  };

  React.useEffect(() => {
    if (tabValue && registerData) {
      resetData();
    }
  }, [tabValue, registerData]);

  React.useEffect(() => {
    const allHashtag = map(registerDataFilter, (item: any) => {
      if (item.hashtag) {
        return JSON.parse(item.hashtag);
      } else return [];
    });
    const hashTagGroup = countBy(flattenDeep(allHashtag));
    setHashtagLabels(hashTagGroup);
  }, [registerDataFilter]);

  React.useEffect(() => {
    if (tabRequestValue && myRequestData) {
      switch (tabRequestValue) {
        case "isConfirmed": {
          setMyRequestFilter(myRequestData.postHasSupporter);
          return;
        }
        case "isActive": {
          setMyRequestFilter(myRequestData.postHasRegister);
          return;
        }
        case "isPending": {
          setMyRequestFilter(myRequestData.postHasNoRegister);
          return;
        }
        case "isOnEvent": {
          setMyRequestFilter(myRequestData.postOnEvent);
          return;
        }
        case "isDone": {
          setMyRequestFilter(myRequestData.postDone);
          return;
        }
      }
    }
  }, [tabRequestValue, myRequestData]);

  const getRegisteredData = async (filters: any) => {
    setLoading(true);
    const res = await Post.getListRegisteredPost(filters);
    setRegisterData(res);
    const nbOfAllPost = res.registerData.length + res.supportData.length;
    const nbOfActivePost = res.registerData.filter((item: any) => item.isActive === 1).length;
    const nbOfConfirmedPost = res.supportData.length;
    const nbOfPendingPost = res.registerData.length;
    const nbOfDonePost = res.registerData.filter((item: any) => item.isDone === 1).length;
    setPostCount({ nbOfAllPost, nbOfActivePost, nbOfConfirmedPost, nbOfPendingPost, nbOfDonePost });
    setHashtagLabels(res?.hashTagGroup);
    setLoading(false);
  };

  const getListMyRequestData = async (filters: any) => {
    const res = await Post.getListMyRequest(filters);
    setMyRequestData(res);
  };

  React.useEffect(() => {
    isRegistered && getRegisteredData(filters);
    isMyRequest && getListMyRequestData(filters);
  }, [isMyRequest, isRegistered, filters]);

  React.useEffect(() => {
    registerData && setTabRegisterData(registerData);
  }, [registerData]);

  React.useEffect(() => {
    if (detail) {
      if (detail === "active") {
        setTabRequestValue("isActive");
      }
      if (detail === "processing") {
        setTabRequestValue("isConfirmed");
      }
      if (detail === "pending") {
        setTabRequestValue("isPending");
      }
      if (detail === "onEvent") {
        setTabRequestValue("isOnEvent");
      }
      if (detail === "isDone") {
        setTabRequestValue("isDone");
      }
    }
  }, [detail]);

  return (
    <Page>
      <Box sx={{ pb: 3 }}>
        <BreadcrumbsTab
          history={[{ title: "Trang chủ", href: "/" }]}
          current={{ title: isMyRequest ? "Vấn đề của tôi" : isRegistered ? "Vấn đề đi hỗ trợ" : "" }}
        />
      </Box>
      <Box sx={{ pb: 3, mr: 1 }}>
        <FilterAndSearch
          isMyRequest={isMyRequest}
          isSelectedHashtag={isSelectedHashtag}
          tabValue={isRegistered ? tabValue : tabRequestValue}
          onChangeTab={isRegistered ? onChangeTab : onChangeRequestTab}
          onClickHashtag={onClickHashtag}
          setRegisterDataFilter={setRegisterDataFilter}
          setMyRequestFilter={setMyRequestFilter}
          setSortBy={setSortDataBy}
          resetData={resetData}
          sortBy={sortDataBy}
          setFilters={setFilters}
          filters={filters}
          data={isRegistered ? registerDataFilter : myRequestFilter}
          hashtagCount={hashtagLabels}
          postCount={postCount}
        />
        {isRegistered ? (
          <RegisterContent loading={loading} data={registerDataFilter} tab={tabValue} />
        ) : (
          <MyRequestContent
            loading={loading}
            tabValue={tabRequestValue}
            data={myRequestFilter}
            setData={setTabRequestData}
          />
        )}
      </Box>
    </Page>
  );
};
