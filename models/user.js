import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('User', {
    username: DataTypes.STRING(50),
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    hashedpassword: DataTypes.STRING(32)
});