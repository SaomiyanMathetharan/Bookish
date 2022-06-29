import {DataTypes} from "sequelize";

export default {
    bookid: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    isbn: {type: DataTypes.STRING(13), allowNull: false},
    booktitle: {type: DataTypes.STRING(100), allowNull: false},
    author:{type: DataTypes.STRING(100), allowNull: false},
    genre: DataTypes.STRING(50),
}