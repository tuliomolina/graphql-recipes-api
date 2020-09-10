import { createConnection } from "typeorm";

export async function connectDatabase() {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [__dirname + "/../**/*.entity.*"],
    synchronize: true,
    logging: true,
  });
  console.log("Connected to database");
}
