const {DataTypes}=require('sequelize')
const sequelize =require('../config/db/mySqlConfig');
const register = sequelize.define(
    'registers',
    {
        // Model attributes are defined here
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        email: {
            type: DataTypes.STRING
        }
    },
    {

        tableName:'registers',
        createdAt:false,
        updatedAt:false //create update column are deleted 
        // Other model options go here
    },
);

// `sequelize.define` also returns the model
console.log(register === sequelize.models.register); // true


module.exports=register;