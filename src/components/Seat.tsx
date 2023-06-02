import React from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { CSSObject } from "@mui/system";

interface ClickableBoxProps {
  isSeatAvailable: boolean;
  isBooked: boolean;
  onClick?: () => void;
}


const StyledClickableBox = styled(Box)<ClickableBoxProps>`
  width: 60px;
  height: 60px;
  background-color: ${(props) => (props.isBooked ?'blue' :props.isSeatAvailable ? "green" : "gray")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: ${(props) => (props.isSeatAvailable ? "pointer" : "default")};

  &:hover {
    opacity: ${(props) => (props.isSeatAvailable ? 0.8 : 1)};
  }
` as React.FC<ClickableBoxProps & { styles?: CSSObject }>;

const ClickableBox: React.FC<ClickableBoxProps> = ({
  isSeatAvailable,
  isBooked,
  onClick,
}) => {
  return (
    <StyledClickableBox isBooked={isBooked} isSeatAvailable={isSeatAvailable} onClick={onClick} />
  );
};
 export default ClickableBox;