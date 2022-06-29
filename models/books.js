import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
export const Loan = sequelize.define('User', {
    bookid: DataTypes.INTEGER,
    isbn: DataTypes.STRING(13),
    booktitle: DataTypes.STRING(100),
    author: DataTypes.STRING(100),
    genre: DataTypes.STRING(50)
});