import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  IconButton,
  Tooltip,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  TablePagination,
  Typography,
} from "@mui/material";
//icon

// import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import CommentIcon from "@mui/icons-material/Comment";
import { useStyles } from "./ManageEvent.style";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import moment from "moment";
import TabPanel from "@mui/lab/TabPanel";
import DialogPreviewEventDetail from "./DialogPreviewEventDetail";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { Manager } from "../../../../models/manager";
import { NotificationCtx } from "../../../../context/notification/state";
import { UserCtx } from "../../../../context/user/state";

const ManageEvent = () => {
  const { user } = useContext(UserCtx);

  const classes = useStyles();
  const [value, setValue] = useState("1");

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [openPreview, setOpenPreview] = useState(false);
  const [eventPreview, setEventPreview]: any = useState(null);
  const handleClickOpenPreview = (rowSelect: any) => {
    setOpenPreview(true);
    setEventPreview(rowSelect);
  };
  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowsPerPage1, setRowsPerPage1] = React.useState(5);

  const [page, setPage] = React.useState(0);
  const [page1, setPage1] = React.useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage1 = (event: unknown, newPage: number) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage1(+event.target.value);
    setPage1(0);
  };
  // const handleVisible = (event: any) => {
  //   setVisible(event.target.value);
  //   event.target.value === "status" ? setSortBy("isActive") : setSortBy("desc");
  // };

  const handleCreateEvent = () => {
    navigate(`/dashboard/admin/manage-event/create-event`);
  };

  const [dataEventOfCollaborator, setDataEventOfCollaborator]: any = useState(null);
  const [dataEventIsNotApprove, setDataEventIsNotApprove]: any = useState(null);
  const getDataEvent = async () => {
    const res = await Manager.getListEventOfCollaborator();
    setDataEventOfCollaborator(res);
  };
  const getDataEventIsNotApprove = async () => {
    const res = await Manager.getListEventIsNotApproveOfCollaborator();
    setDataEventIsNotApprove(res);
  };
  console.log(dataEventIsNotApprove, "dataEventIsNotApprove");
  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);

  const onApproveEvent = async (eventId: any) => {
    const res = await Manager.approveEvent(eventId);
    if (res) {
      setNotificationSuccess("Duyệt bài thành công");
      handleClosePreview();
    } else {
      setNotificationError("Duyệt bài thất bại");
    }
  };

  useEffect(() => {
    getDataEvent();
    getDataEventIsNotApprove();
  }, []);

  return (
    <div className={classes.wrapManageEvent}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }} className={classes.btnCreateEvent}>
        <Button startIcon={<AddCircleOutlineIcon />} variant="contained" sx={{ mb: 2 }} onClick={handleCreateEvent}>
          Tạo sự kiện
        </Button>
      </Box>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Sự kiện đang diễn ra" value="1" />
            <Tab label="Sự kiện đăng kí" value="2" />
          </TabList>
        </Box>
        {/* thông tin CTV */}

        {/* Sự kiện đang quản lí */}
        <TabPanel value="1">
          {/*  */}

          {/* title / time-deadline / nbOfJoined / nbOfReported / manager */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell>Thời gian hết hạn</TableCell>
                  <TableCell>Số người tham gia</TableCell>
                  <TableCell>Số báo cáo xấu</TableCell>
                  <TableCell>Quản lí sự kiện</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Quản lí</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataEventOfCollaborator
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {row?.eventDetail?.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {row?.eventDetail?.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {moment(row?.eventDetail.endAt).fromNow()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {row?.listUserInEvent.length}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {row?.listReportInEvent.length}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {row?.adminApproved}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {row?.eventDetail.isApproved === 1 ? (
                          <Chip color="primary" label="Đang diễn ra" />
                        ) : (
                          <Chip color="error" label="Đã đóng" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={dataEventOfCollaborator?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TabPanel>
        {/* Sự kiện đăng kí */}
        <TabPanel value="2">
          <Box sx={{ mb: 2 }}>
            <Grid container>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="ctv table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tiêu đề</TableCell>
                        <TableCell>Thời gian</TableCell>

                        <TableCell>Quản lí</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataEventIsNotApprove
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                {row?.id}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                {row?.title}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                {moment(row?.startAt).fromNow()}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <IconButton onClick={() => handleClickOpenPreview(row)}>
                                <Tooltip title="Xem hiển thị">
                                  <VisibilityIcon color="primary" />
                                </Tooltip>
                              </IconButton>
                              {user.role.includes("admin") && (
                                <>
                                  <IconButton onClick={() => onApproveEvent(row?.id)}>
                                    <Tooltip title="Phê duyệt">
                                      <CheckCircleIcon color="success" />
                                    </Tooltip>
                                  </IconButton>
                                  <IconButton>
                                    <Tooltip title="Từ chối">
                                      <BlockIcon color="error" />
                                    </Tooltip>
                                  </IconButton>
                                  <IconButton>
                                    <Tooltip title="Bình luận">
                                      <CommentIcon sx={{ color: "blue" }} />
                                    </Tooltip>
                                  </IconButton>
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                    <DialogPreviewEventDetail open={openPreview} handleClose={handleClosePreview} data={eventPreview} />
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={dataEventOfCollaborator?.length}
                  rowsPerPage={rowsPerPage1}
                  page={page1}
                  onPageChange={handleChangePage1}
                  onRowsPerPageChange={handleChangeRowsPerPage1}
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default ManageEvent;
