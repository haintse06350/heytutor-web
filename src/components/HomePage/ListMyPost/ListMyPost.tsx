import React from "react";
import BreadcrumbsTab from "../../Common/Breadcrumbs/Breadcrumbs";

const ListMyPost = () => {
  return <BreadcrumbsTab history={[{ title: "Home", href: "/" }]} current={{ title: "My posts" }} />;
};

export default ListMyPost;
