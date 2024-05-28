// project-root/utils/db.ts
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  'gif_maker',
  'gif_maker',
  'Z@VFcy1rhyQlD7R8',
  {
    host: 'database.devcodeth.com',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    define: {
      timestamps: false,
    },
    logging: (msg: any) => console.log(msg)
  },
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((err: any) =>
    console.error(`Unable to connect to the database: ${err}`),
  );

export default sequelize;
