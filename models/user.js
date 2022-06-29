import {DataTypes} from "sequelize";

export default {
    username: {type: DataTypes.STRING(50), allowNull: false, primaryKey: true},
    first_name: {type: DataTypes.STRING(50), allowNull: false},
    last_name: {type: DataTypes.STRING(50), allowNull: false},
    email: {type: DataTypes.STRING(50), allowNull: false},
    hashedpassword: {type: DataTypes.STRING(32), allowNull: false}
}