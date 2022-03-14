/* eslint-disable no-unused-vars */
import React from "react";
import {
  Box,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import moment from "moment";
import { map } from "lodash";
import { stringAvatar } from "../UserProfile/helper";
import { useNavigate } from "react-router-dom";

type Order = "asc" | "desc";

interface Post {
  id: number;
  title: string;
  hashtag: string;
  registeredCount: number;
  commentCount: number;
  createdAt: string;
}

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Tiêu đề",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    id: "registeredUser",
    numeric: true,
    disablePadding: false,
    label: "Người đăng kí",
  },
  {
    id: "hashtag",
    numeric: false,
    disablePadding: false,
    label: "Hashtag",
  },
  {
    id: "event",
    numeric: true,
    disablePadding: false,
    label: "Sự kiện",
  },
  {
    id: "registerCount",
    numeric: true,
    disablePadding: false,
    label: "Số người đăng kí",
  },
  {
    id: "time",
    numeric: false,
    disablePadding: false,
    label: "Thời gian",
  },
];

export const TableContent = ({ data, status }: any) => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Post>("createdAt");
  const navigate = useNavigate();

  const EnhancedTableHead = (props: any) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof Post) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell: any) => (
            <TableCell
              key={headCell.id}
              align={"center"}
              padding={"normal"}
              sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // const newSelecteds = rows.map((n) => n.name);
      // setSelected(newSelecteds);
      // return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Post) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleViewDetail = (eventId: any) => {
    navigate(`/event-detail?eventid=${eventId}`);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const renderAvatarGroup = (users: any) => {
    return (
      <AvatarGroup max={3}>
        {map(users, (user: any) => (
          <Avatar alt="Remy Sharp" {...stringAvatar(user?.name)} />
        ))}
      </AvatarGroup>
    );
  };

  const renderPostStatus = (status: string) => {
    switch (status) {
      case "Active": {
        return {
          color: "#5569ff",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          fontWeight: 700,
        };
      }
      case "Pending": {
        return {
          color: "#ffa319",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          fontWeight: 700,
        };
      }
      case "Done": {
        return {
          color: "rgb(87, 202, 34)",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          fontWeight: 700,
        };
      }
      case "Confirmed": {
        return {
          color: "#33c2ff",
          textTransform: "uppercase",
          fontSize: "0.75rem",
          fontWeight: 700,
        };
      }
    }
  };
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data?.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
            {data?.map((row: any, index: number) => {
              const isItemSelected = isSelected(row.postId);
              const itemStatus =
                row.isActive === 1
                  ? "Active"
                  : row.isPending === 1
                  ? "Pending"
                  : row.isConfirmed === 1
                  ? "Confirmed"
                  : row.isDone === 1
                  ? "Done"
                  : "";
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}>
                  <TableCell size="medium" align="center">
                    {row["Post.title"]}
                  </TableCell>
                  <TableCell sx={renderPostStatus(itemStatus)} align="center">
                    {itemStatus}
                  </TableCell>
                  <TableCell sx={{ display: "flex", justifyContent: "center" }} align="center">
                    {renderAvatarGroup(row.registerUsers)}
                  </TableCell>
                  <TableCell sx={{ textDecoration: "underline", cursor: "pointer" }} align="center">
                    {map(JSON.parse(row["Post.hashtag"]), (item: any) => item)}
                  </TableCell>
                  <TableCell
                    onClick={() => handleViewDetail(row.eventId)}
                    sx={{ textDecoration: "underline", cursor: "pointer", fontWeight: 500 }}
                    align="center">
                    {row.eventId}
                  </TableCell>
                  <TableCell align="center">{row.registerUsers.length}</TableCell>
                  <TableCell align="center">{moment().from(row["Post.createdAt"])}</TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
