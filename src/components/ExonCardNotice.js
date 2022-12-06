import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  newsBox: {
    borderRadius: '8px',
    boxShadow: 'none',
    margin: '0px',
    borderColor: 'white',
    backgroundColor: 'white',
    minHeight: '340px',
    minWidth: '300px',
    color: '#187EDC',
    boxShadow: '2px 2px 2px #187EDC', //#888888
    '& .MuiCardContent-root': { padding: '8px' },
    [theme.breakpoints.only('xs', 'sm')]: {
      //   margin: '0px 8px',
      '& .MuiCardContent-root': { padding: '8px 0px' },
    },
  },
  newsContent: {
    height: '100%',
    // minHeight: '340px',
  },
  newsContentBox: {
    display: 'flex',
    alignContent: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  newsContentImg: {
    display: 'grid',
    alignContent: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  newsContentTextBox: {
    display: 'grid',
    alignContent: 'center',
    padding: '24px',
    [theme.breakpoints.down('md')]: {
      padding: '12px',
    },
  },
  newsImg: {
    maxWidth: '600px',
    maxHeight: '340px',
    backgroundColor: 'white',
    borderRadius: '8px',
    [theme.breakpoints.only('xs', 'sm')]: {
      maxWidth: '300px',
      maxHeight: '200px',
    },
    [theme.breakpoints.only('md')]: {
      maxWidth: '240px',
    },
  },
  primaryText: { color: '#899BA8' },
  typographyTitle: {
    [theme.breakpoints.down('md')]: {
      fontSize: '0.85rem',
    },
  },
  typographyAuthor: {
    [theme.breakpoints.down('md')]: {
      fontSize: '0.5rem',
    },
  },
  typographyDate: {
    [theme.breakpoints.down('md')]: {
      fontSize: '0.65rem',
    },
  },
  spaceTitle: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
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
  var articleAuthor = 'Desconhecido';

  if (article.author != null) {
    const articleIndexAuthorFont = article.author.indexOf('-');
    articleAuthor =
      articleIndexAuthorFont > 0
        ? article.author
            .substring(0, articleIndexAuthorFont - 1)
            .replace(';', '')
        : article.author.replace(';', '');
  }

  return (
    <Card variant="outlined" className={classes.newsBox}>
      <CardContent>
        <Box className={classes.newsContentBox}>
          <Box className={classes.newsContentImg}>
            <img src={article.urlToImage} className={classes.newsImg} />
          </Box>
          <Box className={classes.newsContentTextBox}>
            <Typography variant="h6" className={classes.typographyTitle}>
              <span className={classes.primaryText}>
                <b> {articleTitle} </b>
              </span>
            </Typography>
            <br className={classes.spaceTitle} />
            <Typography variant="h6" gutterBottom>
              {article.description}
            </Typography>
            <br />
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.typographyAuthor}
            >
              <i>{articleAuthor}</i>
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              className={classes.typographyDate}
            >
              {articlePublishedAtDate}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
