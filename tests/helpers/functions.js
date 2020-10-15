const db = require("../../db");

module.exports = {
  insertUser: async (user) => {
    const query = await db.query(
      `
      INSERT INTO user_info (username, password)
      VALUES ($1, crypt($2, gen_salt('bf')))
      RETURNING id;
      `,
      [user.username, user.password]
    );

    return query.rows[0]?.id;
  },

  deleteUser: async (userId) => {
    await db.query(
      `
      DELETE FROM user_info
      WHERE id = $1;
      `,
      [userId]
    );
  },
};
