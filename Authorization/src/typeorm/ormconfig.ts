import "dotenv/config";
import { ConnectionOptions } from "typeorm";

interface DBConnectionOptions {
  [env: string]: ConnectionOptions;
}

const connectionOptions: DBConnectionOptions = {
  development: {
    type: "mysql",
    host: process.env.DEVELOPMENT_DATABASE_HOST,
    port: +process.env.DEVELOPMENT_DATABASE_PORT,
    username: process.env.DEVELOPMENT_DATABASE_USER,
    password: process.env.DEVELOPMENT_DATABASE_PASSWORD,
    database: process.env.DEVELOPMENT_DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: ["./dist/**/*.entity.js"],
  },
  production: {
    type: "mysql",
    host: process.env.PRODUCTION_DATABASE_HOST,
    port: +process.env.PRODUCTION_DATABASE_PORT,
    username: process.env.PRODUCTION_DATABASE_USER,
    password: process.env.PRODUCTION_DATABASE_PASSWORD,
    database: process.env.PRODUCTION_DATABASE_NAME,
    synchronize: false,
    logging: true,
    entities: ["./dist/**/*.entity.js"],
  },
};

export { connectionOptions };
