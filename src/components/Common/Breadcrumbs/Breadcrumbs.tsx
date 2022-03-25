import * as React from "react";
import { Typography, Box, Breadcrumbs, Link } from "@mui/material";
import { map } from "lodash";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import { styled, alpha } from "@mui/material/styles";

const BreadcrumbsTab = (props: any) => {
  const { history, current } = props;

  const renderIcon = (title: string) => {
    switch (title) {
      case "Trang chủ": {
        return <HomeOutlinedIcon />;
      }
      case "Vấn đề của tôi": {
        return <ArticleOutlinedIcon />;
      }
      case "Vấn đề tôi đăng kí hỗ trợ": {
        return <AppRegistrationOutlinedIcon />;
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
      backgroundColor: alpha(theme.palette.background.default, 0.72),
    },
  }));

  return (
    <FixBreadScrumbsStyle>
      <Breadcrumbs aria-label="breadcrumb">
        {map(history, (historyPage: any, index: number) => (
          <Link key={index} underline="hover" sx={linkStyles} color="inherit" variant="h6" href={historyPage.href}>
            {renderIcon(historyPage.title)}
            {historyPage.title}
          </Link>
        ))}
        <Box sx={{ display: "flex", alignItems: "center" }} color="primary.main">
          {renderIcon(current.title)}
          <Typography ml={0.5} variant="h6">
            {current.title}
          </Typography>
        </Box>
      </Breadcrumbs>
    </FixBreadScrumbsStyle>
  );
};

export default BreadcrumbsTab;
