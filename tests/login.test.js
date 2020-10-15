const db = require("../db");
const fetch = require("node-fetch");
const { insertUser, deleteUser } = require("./helpers/functions");
const { user } = require("./helpers/dummies");

describe("Login", () => {
  test("Receive token", async () => {
    expect.assertions(2);

    // Insert the user, so the test can request a token.
    const userId = await insertUser(user);

    // Request an auth token.
    const request = await fetch("http://localhost:5003/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // Parse the response to JSON and remove the inserted user.
    const response = await request.json();
    await deleteUser(userId);

    expect(response.status).toBe(200);
    expect(response.token).not.toBeUndefined();
  });
});
