const { DataTypes } = require("sequelize")
const sequelize=require("../config/db/mySqlConfig")
const userTokenModel = sequelize.define("userToken", {
    userId: {
        type: DataTypes.UUID,
        allowNull: false, 
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "userToken",
});

module.exports=userTokenModel