import {DataTypes} from "sequelize";

export default {
    loanid:{type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    duedate: {type: DataTypes.DATE, allowNull: false},
    loanstatus: {type: DataTypes.STRING(50), allowNull: false},
    barcodenumber: {type: DataTypes.STRING(13), allowNull: false},
    username: {type: DataTypes.STRING(50), allowNull: false}
}