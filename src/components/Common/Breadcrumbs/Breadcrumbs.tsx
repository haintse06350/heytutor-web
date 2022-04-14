import * as React from "react";
import { Typography, Box, Breadcrumbs, Link } from "@mui/material";
import { map } from "lodash";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import { styled } from "@mui/material/styles";

const BreadcrumbsTab = (props: any) => {
  const { history, current } = props;

  const renderIcon = (title: string) => {
    switch (title) {
      case "Trang chủ": {
        return <HomeOutlinedIcon sx={{ width: 18, mr: 1 }} />;
      }
      case "Vấn đề của tôi": {
        return <ArticleOutlinedIcon sx={{ width: 18, mr: 1 }} />;
      }
      case "Vấn đề đi hỗ trợ": {
        return <AppRegistrationOutlinedIcon sx={{ width: 18, mr: 1 }} />;
      }
    }
  };

  const linkStyles = {
    display: "flex",
    alignItems: "center",
    "& > a > svg": {
      marginRight: "4px",
    },
  };

  const FixBreadScrumbsStyle = styled("div")(({ theme }: any) => ({
    "& > nav": {
      boxShadow: "none",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
      backgroundColor: "white",
      borderRadius: 8,
      padding: 8,
    },
  }));

  return (
    <FixBreadScrumbsStyle>
      <Breadcrumbs aria-label="breadcrumb">
        {map(history, (historyPage: any, index: number) => (
          <Link
            key={index}
            underline="hover"
            sx={linkStyles}
            color="inherit"
            variant="subtitle1"
            href={historyPage.href}>
            {renderIcon(historyPage.title)}
            {historyPage.title}
          </Link>
        ))}
        <Box sx={{ display: "flex", alignItems: "center" }} color="primary.main">
          {renderIcon(current.title)}
          <Typography ml={0.5} variant="subtitle1">
            {current.title}
          </Typography>
        </Box>
      </Breadcrumbs>
    </FixBreadScrumbsStyle>
  );
};

export default BreadcrumbsTab;
