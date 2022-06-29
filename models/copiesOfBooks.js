import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const bookCopy = sequelize.define('User', {
    barcodenumber: DataTypes.STRING(13),
    bookid: DataTypes.INTEGER
});