const db = require("../db");
const fs = require("fs");
const ash = require("../wrap-async");
const jwt = require("jsonwebtoken");
const path = require("path");
const express = require("express");
const router = express.Router();

const privateKeyFile = path.join(process.cwd(), "private.key");
const privateKey = fs.readFileSync(privateKeyFile);

router.post(
  "/",
  ash(async (req, res) => {
    const { username, password } = req.body;

    const query = await db.query(
      `
      SELECT *
      FROM user_info
      WHERE username = $1
            AND password = crypt($2, password);
      `,
      [username, password]
    );

    if (query.rows.length === 1) {
      const user = query.rows[0];

      // Generate the payload (this is public).
      const payload = {
        id: user.id,
        username: user.username,
      };

      // Sign the token with the previously generated payload.
      const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });

      res.status(200).json({
        status: 200,
        token: token,
      });
    } else {
      res.status(403).json({
        status: 403,
        message: "Authentication failed",
      });
    }
  })
);

module.exports = router;
