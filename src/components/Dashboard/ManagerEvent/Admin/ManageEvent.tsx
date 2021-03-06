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
      setNotificationSuccess("Duy???t b??i th??nh c??ng");
      handleClosePreview();
    } else {
      setNotificationError("Duy???t b??i th???t b???i");
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
          T???o s??? ki???n
        </Button>
      </Box>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="S??? ki???n ??ang di???n ra" value="1" />
            <Tab label="S??? ki???n ????ng k??" value="2" />
          </TabList>
        </Box>
        {/* th??ng tin CTV */}

        {/* S??? ki???n ??ang qu???n l?? */}
        <TabPanel value="1">
          {/*  */}

          {/* title / time-deadline / nbOfJoined / nbOfReported / manager */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Ti??u ?????</TableCell>
                  <TableCell>Th???i gian h???t h???n</TableCell>
                  <TableCell>S??? ng?????i tham gia</TableCell>
                  <TableCell>S??? b??o c??o x???u</TableCell>
                  <TableCell>Qu???n l?? s??? ki???n</TableCell>
                  <TableCell>Tr???ng th??i</TableCell>
                  <TableCell>Qu???n l??</TableCell>
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
                          <Chip color="primary" label="??ang di???n ra" />
                        ) : (
                          <Chip color="error" label="???? ????ng" />
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
        {/* S??? ki???n ????ng k?? */}
        <TabPanel value="2">
          <Box sx={{ mb: 2 }}>
            <Grid container>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="ctv table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Ti??u ?????</TableCell>
                        <TableCell>Th???i gian</TableCell>

                        <TableCell>Qu???n l??</TableCell>
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
                                <Tooltip title="Xem hi???n th???">
                                  <VisibilityIcon color="primary" />
                                </Tooltip>
                              </IconButton>
                              {user.role.includes("admin") && (
                                <>
                                  <IconButton onClick={() => onApproveEvent(row?.id)}>
                                    <Tooltip title="Ph?? duy???t">
                                      <CheckCircleIcon color="success" />
                                    </Tooltip>
                                  </IconButton>
                                  <IconButton>
                                    <Tooltip title="T??? ch???i">
                                      <BlockIcon color="error" />
                                    </Tooltip>
                                  </IconButton>
                                  <IconButton>
                                    <Tooltip title="B??nh lu???n">
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
