import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  joke: {
    display: "flex",
    borderBottom: "2px solid #eeeeee",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 400,
    padding: "1rem",
  },
  jokeButtons: {
    display: "flex",
    marginRight: "1rem",
    justifyContent: "center",
    width: "15%",
    alignItems: "center",
  },
  arrowIcons: {
    fonrSize: "2rem",
    margin: 10,
    cursor: "pointer",
  },
  votesLabel: {
    fontSize: 20,
  },
  joketext: {
    width: "75%",
    fontSize: "1.2rem",
  },
  jokeImoji: {
    fontSize: "28px",
    margin: "auto",
    borderRadius: "50%",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
  },
}));

export default function Joke(props) {
  const { votes, text, upvote, downvote } = props;
  const classes = useStyles();
  const getEmojis = useCallback((votes) => {
    if (votes >= 9) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (votes >= 6) {
      return "em em-laughing";
    } else if (votes >= 3) {
      return "em em-slightly_smiling_face";
    } else if (votes >= 0) {
      return "em em-neutral_face";
    } else {
      return "em em-angry";
    }
  }, []);

  return (
    <Box className={classes.joke}>
      <Box className={classes.jokeButtons}>
        <ArrowUpward
          className={classes.arrowIcons}
          onClick={() => {
            upvote();
          }}
        />
        <Typography className={classes.votesLabel}>{votes}</Typography>
        <ArrowDownward
          className={classes.arrowIcons}
          onClick={() => {
            downvote();
          }}
        />
      </Box>
      <Box className={classes.joketext}>{text}</Box>
      <Box className={classes.jokeImoji}>
        <i className={getEmojis(votes)} />
      </Box>
    </Box>
  );
}
