const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "cricketMatchDetails.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

const convertPlayerDetailsDbObject = (dbObject) => {
  return {
    playerId: dbObject.player_id,
    playerName: dbObject.player_name,
  };
};
const convertMatchDetailsDbObject = (dbObject) => {
  return {
    matchId: dbObject.match_id,
    match: dbObject.match,
    year: dbObject.year,
  };
};
const convertPlayerMatchScoreDbObject = (dbObject) => {
  return {
    playerMatchId: dbObject.player_match_id,
    playerId: dbObject.player_id,
    matchId: dbObject.match_id,
    score: dbObject.score,
    fours: dbObject.fours,
    sixes: dbObject.sixes,
  };
};

//API 1 GET

app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
    SELECT player_id,player_name FROM player_details;`;
  const playerArray = await database.all(getPlayersQuery);
  response.send(
    playerArray.map((eachPlayer) => ({
      playerId: eachPlayer.player_id,
      playerName: eachPlayer.player_name,
    }))
  );
});

//API 2 GET
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
        SELECT player_id,player_name FROM player_details
        WHERE player_id = ${playerId};`;
  const player = await database.get(getPlayerQuery);
  response.send(convertPlayerDetailsDbObject(player));
});

//API 3 PUT
app.put("/players/:playerId", async (request, response) => {
  const { playerName } = request.body;
  const { playerId } = request.params;
  const updatePlayerQuery = `
    UPDATE player_details
    SET 
    player_name = '${playerName}'
    WHERE 
    player_id = ${playerId};`;
  await database.run(updatePlayerQuery);
  response.send("Player Details Updated");
});

//API 4 GET
app.get("/matches/:matchId/", async (request, response) => {
  const { matchId } = request.params;
  const getMatchQuery = `
        SELECT * FROM match_details
        WHERE match_id = ${matchId};`;
  const match = await database.get(getMatchQuery);
  response.send(convertMatchDetailsDbObject(match));
});

//API 5 GET
app.get("/players/:playerId/matches/", async (request, response) => {
  const { playerId } = request.params;
  const getMatchesQuery = `
    SELECT * FROM player_match_score
    NATURAL JOIN match_details
    WHERE 
    player_id = ${playerId};`;
  const playerMatches = await database.all(getMatchesQuery);
  response.send(
    playerMatches.map((eachMatch) => convertMatchDetailsDbObject(eachMatch))
  );
});

//API 6 GET
app.get("/matches/:matchId/players/", async (request, response) => {
  const { matchId } = request.params;
  const getMatch = `
    SELECT * FROM player_match_score
    NATURAL JOIN player_details
    WHERE match_id = ${matchId};`;
  const matches = await database.all(getMatch);
  response.send(
    matches.map((eachPlayer) => convertPlayerDetailsDbObject(eachPlayer))
  );
});

//API 7 GET
app.get("/players/:playerId/playerScores/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerScore = `
    SELECT 
    player_id AS playerId,
    player_name AS playerName,
    SUM(player_match_score.score) AS totalScore,
    SUM(fours) AS totalFours,
    SUM(sixes) AS totalSixes 
    FROM player_match_score NATURAL JOIN player_details 
    WHERE player_id = ${playerId};`;
  const playerScore = await database.get(getPlayerScore);
  response.send(playerScore);
});
module.exports = app;
