import { Sequelize } from "sequelize";

const db = new Sequelize('paa','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;