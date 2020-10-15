const db = require("../db");
const ash = require("../wrap-async");
const express = require("express");
const router = express.Router();

router.post(
  "/",
  ash(async (req, res) => {
    const { username, password } = req.body;

    const query = await db.query(
      `
      SELECT *
      FROM user
      WHERE username = $1
            AND password = crypt($2, password);
      `,
      [username, password]
    );

    if (query.rows.length === 1) {
      const user = query.rows[0];

      const payload = {
        id: user.id,
        username: user.username,
      };

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
