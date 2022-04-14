import React, { useState } from "react";
import { Grid, Card, Typography, TextField, Box, Divider, Button } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
// import moment from "moment";
import BreadcrumbsTab from "../../Common/Breadcrumbs/Breadcrumbs";

// icon
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SaveIcon from "@mui/icons-material/Save";

const CreateEvent = () => {
  const [valueFilterStartDate, setValueFilterStartDate] = useState<Date | null>(null);
  const [valueFilterEndDate, setValueFilterEndDate] = useState<Date | null>(null);

  return (
    <>
      <BreadcrumbsTab
        history={[{ title: "Quản lí sự kiện ", href: "/dashboard/admin/manage-event" }]}
        current={{ title: "Tạo sự kiện" }}
      />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8} lg={8}>
          <Card sx={{ p: 2 }}>
            <Grid container sx={{ mt: 1 }} spacing={2}>
              <Grid item xs={8} md={8} lg={8}>
                <Typography variant="h6">Tóm tắt sự kiện</Typography>
                <TextField
                  id="short-description"
                  label="Nội dung tóm tắt"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <Typography variant="h6">Thời gian</Typography>
                <Box sx={{ mb: 1.7 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày bắt đầu"
                      inputFormat="dd/MM/yyyy"
                      value={valueFilterStartDate}
                      onChange={(newValue) => {
                        setValueFilterStartDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày kết thúc"
                      inputFormat="dd/MM/yyyy"
                      value={valueFilterEndDate}
                      onChange={(newValue) => {
                        setValueFilterEndDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Divider />
              <Grid item xs={12} md={12} lg={12}>
                <Typography variant="h6">Nội dung sự kiện</Typography>
                <TextField id="short-description" label="Nội dung" variant="outlined" fullWidth multiline rows={4} />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Button variant="contained" color="primary">
                  Thêm ảnh
                </Button>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Button variant="contained" color="primary">
                  Tạo hashtag
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ p: 2 }}>
            <Button variant="contained" color="primary" startIcon={<SendIcon />} fullWidth sx={{ mb: 2 }}>
              Gửi yêu cầu phê duyệt
            </Button>
            <Button variant="outlined" startIcon={<VisibilityIcon />} fullWidth sx={{ mb: 2 }}>
              Xem trước
            </Button>
            <Button variant="outlined" startIcon={<SaveIcon />} fullWidth sx={{ mb: 2 }}>
              Lưu nháp
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default CreateEvent;
