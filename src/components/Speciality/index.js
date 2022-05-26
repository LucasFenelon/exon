import { makeStyles } from '@material-ui/core';
import TopButtons from './TopButtons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    // overflow: 'hidden',
    width: '100%',
    padding: '64px 32px 8px 8px',
  },
}));

function Speciality({ list }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <TopButtons listButton={list} />
      </div>
    </>
  );
}

export default Speciality;
