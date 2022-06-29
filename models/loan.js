import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const Loan = sequelize.define('User', {
    loanid: DataTypes.INTEGER,
    duedate: DataTypes.DATE,
    loanstatus: DataTypes.STRING(50),
    barcodenumber: DataTypes.STRING(13),
    username: DataTypes.STRING(50)
});