const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Ikigai",
  password: "admin",
  port: 5432,
});

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) {
        reject(err);
      } else {
        console.log("Connected to PostgreSQL database");
        resolve({ client, release });
      }
    });
  });
};

module.exports = connectToDatabase;
