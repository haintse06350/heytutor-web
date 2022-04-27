/* eslint-disable react/jsx-key */
import * as React from "react";
import { useAutocomplete, AutocompleteGetTagProps } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Suggest } from "../../models/suggest";

const Root = styled("div")(
  ({ theme }) => `
  color: ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"};
  font-size: 14px;
  width: 50%;
`
);

const Label = styled("label")`
  line-height: 1.5;
  display: block;
  font-size: 14px;
  font-weight: 700;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  margin-top: 8px;
  width: 100%;
  dispaly: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 8px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  padding: 4px;
  
  &:hover {
    border-color: #00AB55;
  }

  &.focused {
    border-color: #00AB55;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: #fff;
    color: rgba(0,0,0,.85);
    font-size: 14px;
    font-weight: 500;
    height: 42px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
    ::placeholder { 
      font-size: 14;
      font-weight: 500;
      color: #919eab;
    }
  }
`
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  label: string;
}

const Tag = (props: TagProps) => {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
};

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #dee1e5;
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
    font-size: 14px;
  }

  & svg {
    font-size: 20px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 50%;
  margin: 4px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #dee1e5;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export const CustomizedAutoCompleteHashTag = ({ hashTag, setSelectedHashTag }: any) => {
  const [listCoutse, setListCoutse] = React.useState<any>([]);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: listCoutse,
    getOptionLabel: (option: any) => option.courseName,
  });

  React.useEffect(() => {
    Suggest.listCourses().then((res: any) => {
      setListCoutse(res);
    });
  }, []);

  React.useEffect(() => {
    setSelectedHashTag(value);
  }, [value]);

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>
          Chọn hashtag
          <span style={{ color: "red" }}>*</span>
        </Label>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((option: CourseOptionType, index: number) => (
            <StyledTag label={option.courseCode} {...getTagProps({ index })} />
          ))}
          <input placeholder={hashTag?.length > 0 ? "" : "Gắn thẻ cho bài đăng của bạn"} {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof listCoutse).map((option: any, index: number) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.courseName}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
};

interface CourseOptionType {
  courseId: number;
  courseName: string;
  courseCode: string;
}
