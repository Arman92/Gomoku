import styled from "styled-components";
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

export const StyledDialogContent = styled(DialogContent)`
  margin-top: 2rem;
  text-align: center;
`;

export const StyledButton = styled(Button)`
  &.MuiButton-textSizeLarge {
    font-size: 1.6rem;
  }
`;
