import {DataTypes} from "sequelize";

export default {
    barcodenumber: {type: DataTypes.STRING(13), allowNull: false, primaryKey: true},
    bookid: {type: DataTypes.INTEGER, allowNull: false}
}