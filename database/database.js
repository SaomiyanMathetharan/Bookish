import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://bookish:bookish@localhost:5432/bookish', {define: {timestamps: false, freezeTableName: true}});

export const books = sequelize.define('books', {
    bookid: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    isbn: {type: DataTypes.STRING(13), allowNull: false},
    booktitle: {type: DataTypes.STRING(100), allowNull: false},
    author:{type: DataTypes.STRING(100), allowNull: false},
    genre: DataTypes.STRING(50),
});

export const copiesofbook = sequelize.define('copiesofbook', {
    barcodenumber: {type: DataTypes.STRING(13), allowNull: false, primaryKey: true},
    bookid: {type: DataTypes.INTEGER, allowNull: false}
});

export const loans = sequelize.define('loans', {
    loanid:{type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    duedate: {type: DataTypes.DATE, allowNull: false},
    loanstatus: {type: DataTypes.STRING(50), allowNull: false},
    barcodenumber: {type: DataTypes.STRING(13), allowNull: false},
    username: {type: DataTypes.STRING(50), allowNull: false}
});

export const users = sequelize.define('users', {
    username: {type: DataTypes.STRING(50), allowNull: false, primaryKey: true},
    first_name: {type: DataTypes.STRING(50), allowNull: false},
    last_name: {type: DataTypes.STRING(50), allowNull: false},
    email: {type: DataTypes.STRING(50), allowNull: false},
    hashedpassword:{type: DataTypes.STRING(32), allowNull: false}
});