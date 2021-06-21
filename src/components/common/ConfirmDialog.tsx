import {FC} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  dialogWidth:{
    minWidth: 500
  },
  dialogContent:{
    marginBottom: theme.spacing(3)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

type Props = {
 onConfirm: () => Promise<void>;
 show: boolean;
 handleOnClose: () => void;
 text: string;
}

const ConfirmDialog: FC<Props> = ({
  onConfirm, show,  handleOnClose, text
}) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={show}
        fullWidth
        onClose={handleOnClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >
          {`Are you sure you want to delete entry: ${text} ?`}
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleOnClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            WARNING! This cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleOnClose();
              onConfirm();
             }}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
);
};
export default ConfirmDialog;
