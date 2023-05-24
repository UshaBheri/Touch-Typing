const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "covid19India.db");
const app = express();
app.use(express.json());
let database = null;
const initializeDBAndServer = async () => {
  try {
    database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server is running at http://localhost:3001/");
    });
  } catch (e) {
    console.log(`DB error:${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

const convertStateDbObject = (dbObject) => {
  return {
    stateId: dbObject.state_id,
    stateName: dbObject.state_name,
    population: dbObject.population,
  };
};

const convertDistrictDbObject = (dbObject) => {
  return {
    districtId: dbObject.district_id,
    districtName: dbObject.district_name,
    stateId: dbObject.state_id,
    cases: dbObject.cases,
    cured: dbObject.cured,
    active: dbObject.active,
    deaths: dbObject.deaths,
  };
};

//API 1
app.get("/states/", async (request, response) => {
  const getStateQuery = `
    SELECT state_id,state_name,population FROM state;`;
  const stateArray = await database.all(getStateQuery);
  response.send(
    stateArray.map((eachState) => ({
      stateId: eachState.state_id,
      stateName: eachState.state_name,
      population: eachState.population,
    }))
  );
});

//API 2 get
app.get("/states/:stateId/", async (request, response) => {
  const { stateId } = request.params;
  const getState = `
    SELECT * FROM state
    WHERE state_id = ${stateId};`;
  const state = await database.get(getState);
  response.send(convertStateDbObject(state));
});

//API 3 POST
app.post("/districts/", async (request, response) => {
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
  const postQuery = `
  INSERT INTO 
  district(district_name, state_id, cases, cured, active, deaths)
  VALUES
  ('${districtName}', ${stateId}, ${cases}, ${cured}, ${active}, ${deaths});`;
  await database.run(postQuery);
  response.send("District Successfully Added");
});

//API 4 GET
app.get("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const getDistrict = `
  SELECT * FROM district
  WHERE district_id=${districtId};`;
  const district = await database.get(getDistrict);
  response.send(convertDistrictDbObject(district));
});

//API 5 DELETE
app.delete("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const deleteQuery = `
    DELETE FROM district
    WHERE district_id = ${districtId};`;
  await database.run(deleteQuery);
  response.send("District Removed");
});

//API 6 PUT
app.put("/districts/:districtId/", async (request, response) => {
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
  const { districtId } = request.params;
  const updateQuery = `
  UPDATE district
  SET
  district_name='${districtName}',
  state_id=${stateId},
  cases=${cases},
  cured=${cured},
  active=${active},
  deaths=${deaths}
  WHERE district_id=${districtId};`;
  await database.run(updateQuery);
  response.send("District Details Updated");
});

//API7 GET
app.get("/states/:stateId/stats/", async (request, response) => {
  const { stateId } = request.params;
  const getTotal = `
    SELECT 
      SUM(cases),
      SUM(cured),
      SUM(active),
      SUM(deaths)
    FROM district
    WHERE state_id=${stateId};`;
  const total = await database.get(getTotal);
  response.send({
    totalCases: total["SUM(cases)"],
    totalCured: total["SUM(cured)"],
    totalActive: total["SUM(active)"],
    totalDeaths: total["SUM(deaths)"],
  });
});

//API 8
app.get("/districts/:districtId/details/", async (request, response) => {
  const { districtId } = request.params;
  const getDistrictIdQuery = `
        SELECT state_id FROM district
        WHERE district_id = ${districtId};`;
  const getDistrictIdQueryResponse = await database.get(getDistrictIdQuery);

  const getStateNameQuery = `
     SELECT state_name AS stateName FROM state
     WHERE state_id = ${getDistrictIdQueryResponse.state_id};`;
  const getStateNameQueryResponse = await database.get(getStateNameQuery);
  response.send(getStateNameQueryResponse);
});
module.exports = app;
