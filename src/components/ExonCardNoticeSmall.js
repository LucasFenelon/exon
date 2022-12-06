import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';

const useStyles = makeStyles((theme) => ({
  newsBox: {
    borderRadius: '8px',
    boxShadow: 'none',
    margin: '0px',
    borderColor: 'white',
    backgroundColor: 'white',
    // minHeight: '200px',
    // minWidth: '300px',
    maxHeight: '200px',
    boxShadow: '2px 2px 2px #187EDC', //#888888
    '& .MuiCardContent-root': { padding: '8px' },
    [theme.breakpoints.only('xs', 'sm', 'md')]: {
      //   margin: '0px 8px',
      '& .MuiCardContent-root': { padding: '8px 0px' },
      maxHeight: '500px',
      justifyContent: 'center',
    },
  },
  newsContent: {
    height: '100%',
    // minHeight: '340px',
  },
  newsContentBox: {
    display: 'flex',
    alignContent: 'center',
    [theme.breakpoints.only('xs', 'sm')]: {
      display: 'block',
    },
  },
  newsContentImg: {
    display: 'grid',
    alignContent: 'center',
    [theme.breakpoints.only('xs', 'sm')]: {
      justifyContent: 'center',
    },
  },
  newsContentTextBox: {
    display: 'grid',
    alignContent: 'center',
    padding: '24px',
  },
  newsImg: {
    maxWidth: '250px',
    maxHeight: '200px',
    backgroundColor: 'white',
    borderRadius: '8px',
    [theme.breakpoints.only('xs', 'sm')]: {
      maxWidth: '250px',
      maxHeight: '200px',
    },
  },
  primaryText: { color: '#899BA8', display: 'flex', alignItems: 'center' },
}));

export default function ExonCardNotice({ content }) {
  const classes = useStyles();
  const article = content.articles[1];
  const articleIndexTitleFont = article.title.indexOf('-');
  const articleTitle =
    articleIndexTitleFont > 0
      ? article.title.substring(0, articleIndexTitleFont - 1)
      : article.title;

  const articleIndexPublishedAtT = article.publishedAt.indexOf('T');
  const articlePublishedAtDate =
    articleIndexPublishedAtT > 0
      ? article.publishedAt.substring(0, articleIndexPublishedAtT)
      : article.publishedAt;

  return (
    <Card variant="outlined" className={classes.newsBox}>
      <CardContent>
        <Box className={classes.newsContentBox}>
          <Box className={classes.newsContentImg}>
            <img src={article.urlToImage} className={classes.newsImg} />
          </Box>
          <Box className={classes.newsContentTextBox}>
            <Typography variant="h6">
              <span className={classes.primaryText}>
                <b>{articlePublishedAtDate}&nbsp;&nbsp;</b>
                <VisibilityIcon />
              </span>
            </Typography>
            <br />
            <Typography variant="h6" gutterBottom>
              {articleTitle}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
