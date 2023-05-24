const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "userData.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(4000, () => {
      console.log("Server Running at http://localhost:4000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

//API 1 POST
app.post("/register/", async (request, response) => {
  const { username, name, password, gender, location } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const selectRegisterQuery = `
    SELECT * FROM user
    WHERE username = '${username}'`;
  const dbUser = await db.get(selectRegisterQuery);
  const lengthOfPassword = password.length;
  if (dbUser === undefined) {
    if (lengthOfPassword < 5) {
      response.status(400);
      response.send("Password is too short");
    } else {
      const createUserQuery = `
      INSERT INTO 
      user(username, name, password, gender, location)
      VALUES('${username}','${name}','${hashedPassword}','${gender}','${location}')`;
      const dbResponse = await db.run(createUserQuery);
      response.status(200);
      response.send("User created successfully");
    }
  } else {
    response.status(400);
    response.send("User already exists");
  }
});

//API 2 POST
app.post("/login/", async (request, response) => {
  const { username, password } = request.body;
  const selectLoginQuery = `
    SELECT * FROM user
    WHERE username = '${username}'`;
  const dbUser = await db.get(selectLoginQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid user");
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched === false) {
      response.status(400);
      response.send("Invalid password");
    } else {
      response.status(200);
      response.send("Login success!");
    }
  }
});

//API 3 PUT
app.put("/change-password/", async (request, response) => {
  const { username, oldPassword, newPassword } = request.body;
  const putChangePassword = `
    SELECT * FROM user
    WHERE username = '${username}'`;
  const dbUser = await db.get(putChangePassword);
  const isValidPassword = await bcrypt.compare(oldPassword, dbUser.password);
  if (isValidPassword === true) {
    const newPasswordLength = newPassword.length;
    if (newPasswordLength < 5) {
      response.status(400);
      response.send("Password is too short");
    } else {
      const encryptPassword = await bcrypt.hash(newPassword, 10);
      const updatePassword = `
        UPDATE user
        SET
        password = '${encryptPassword}'
        WHERE username = '${username}';`;
      await db.run(updatePassword);
      response.status(200);
      response.send("Password updated");
    }
  } else {
    response.status(400);
    response.send("Invalid current password");
  }
});

module.exports = app;
