import React from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const StyledCountBox = styled(Box)`
  width: 200px;
  height: 200px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  margin-right: 20px;
`;

interface CountBoxProps {
  title: string;
  count: number;
}

const CountBox: React.FC<CountBoxProps> = ({ title, count }) => {
  return (
    <StyledCountBox>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h3">{count}</Typography>
    </StyledCountBox>
  );
};

export default CountBox;

