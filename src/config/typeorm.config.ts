import { createConnection } from "typeorm";

export async function connectDatabase() {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "recipes",
    entities: [__dirname + "/../**/*.entity.*"],
    synchronize: true,
    logging: true,
  });
  console.log("Connected to database");
}
