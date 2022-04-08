import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { async } from "q";
import Joke from "./Joke";
import React, { useEffect, useState, useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  jokesList: {
    display: "flex",
    width: "80%",
    height: "80%",
    // backgroundColor: "red",
  },
  jokesListSidebar: {
    backgroundColor: "#9575cd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    zIndex: 2,
    borderRadius: 7,
  },
  jokelistTitle: {
    fontSize: "25px",
    color: "white",
    fontWeight: 700,
    margin: 60,
    letterSpacing: 0,
  },
  sidebarImg: {
    width: "50%",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "40%",
  },
  jokeslistJokes: {
    height: "90%",
    backgroundColor: "white",
    width: "70%",
    alignSelf: "center",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    overflow: "scroll",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
}));

export default function JokeLists() {
  const classes = useStyles();
  const [jokes, setJokes] = useState(null);
  async function getJokes() {
    let newJokes = [];
    let id = 1;
    for (var i = 1; i < 7; i++) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      newJokes.push({ id: i, text: res.data.joke, votes: 0 });
    }
    setJokes(newJokes);
  }
  useEffect(() => {
    getJokes();
  }, []);

  const handleVote = useCallback(
    (id, offset) => {
      let filteredJokes = jokes.filter((joke) => joke.id !== id);
      let joke = jokes.find((joke) => joke.id === id);
      joke.votes += offset;
      filteredJokes.push(joke);
      filteredJokes.sort((a, b) => b.votes - a.votes);
      setJokes(filteredJokes);
    },
    [jokes, setJokes]
  );

  if (jokes) {
    return (
      <Box className={classes.jokesList}>
        <Box className={classes.jokesListSidebar}>
          <Typography className={classes.jokelistTitle}>
            Dad
            <br />
            Jokes
          </Typography>
          <img
            className={classes.sidebarImg}
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="emoji"
          />
        </Box>
        <Box className={classes.jokeslistJokes}>
          {jokes.map((joke) => {
            return (
              <Joke
                votes={joke.votes}
                text={joke.text}
                key={joke.id}
                upvote={() => {
                  handleVote(joke.id, 1);
                }}
                downvote={() => {
                  handleVote(joke.id, -1);
                }}
              />
            );
          })}
        </Box>
      </Box>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
