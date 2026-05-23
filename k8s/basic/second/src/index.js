const fastify = require("fastify")({ logger: true });
const mysql = require("@fastify/mysql");

fastify.register(mysql, {
  promise: true,
  connectionString: `mysql://root:root@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`,
});

const setupTables = async function () {
  try {
    await fastify.mysql.query(`
        CREATE TABLE IF NOT EXISTS users(
          id INT AUTO_INCREMENT PRIMARY KEY,
          userName VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("users table created..");
  } catch (error) {
    fastify.log.error(error);
  }
};

fastify.get("/", async (request, reply) => {
  try {
    const connection = fastify.mysql;
    const [rows] = await connection.query("SELECT * FROM users");
    reply.status(200).send(rows);
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
});

fastify.post("/create-user", async (request, reply) => {
  const { userName, email } = request.body;
  try {
    const connection = fastify.mysql;
    await connection.query(`INSERT INTO users(userName, email) VALUES(?,?)`, [
      userName,
      email,
    ]);
    console.log("User added...");
  } catch (error) {
    fastify.log.error(error);
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT, host: "0.0.0.0" });
    console.log("Server started");
    // await setupTables();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
