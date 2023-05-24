const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const databasePath = path.join(__dirname, "cricketTeam.db");
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

const convertCricketDbObject = (dbObject) => {
  return {
    playerId: dbObject.player_id,
    playerName: dbObject.player_name,
    jerseyNumber: dbObject.jersey_number,
    role: dbObject.role,
  };
};

//API 1 GET
app.get("/players/", async (request, response) => {
  const getCricketQuery = `
    SELECT * FROM cricket_team;`;
  const cricketArray = await database.all(getCricketQuery);
  response.send(
    cricketArray.map((eachPlayer) => ({
      playerId: eachPlayer.player_id,
      playerName: eachPlayer.player_name,
      jerseyNumber: eachPlayer.jersey_number,
      role: eachPlayer.role,
    }))
  );
});

//API 2 POST
app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const postCricketQuery = `
    INSERT INTO
    cricket_team(player_name,jersey_number,role)
    VALUES
    ('${playerName}',${jerseyNumber},'${role}');`;
  await database.run(postCricketQuery);
  response.send("Player Added to Team");
});

//API 3 GET
app.get("/players/:playerId", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
    SELECT * FROM cricket_team
    WHERE player_id = ${playerId};`;
  const cricket_team = await database.get(getPlayerQuery);
  response.send(convertCricketDbObject(cricket_team));
});

//API 4 PUT
app.put("/players/:playerId", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body;
  const { playerId } = request.params;
  const updatePlayer = `
    UPDATE cricket_team
    SET 
    player_name = '${playerName}',
    jersey_number = ${jerseyNumber},
    role = '${role}'
    WHERE
    player_id = ${playerId};`;
  await database.run(updatePlayer);
  response.send("Player Details Updated");
});

//API 5 DELETE
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deletePlayerQuery = `
    DELETE FROM cricket_team 
    WHERE player_id = ${playerId};`;
  await database.run(deletePlayerQuery);
  response.send("Player Removed");
});
module.exports = app;
