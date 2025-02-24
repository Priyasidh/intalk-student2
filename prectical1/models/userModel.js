const { DataTypes } = require('sequelize');
const sequelize =require('../config/db/mySqlConfig');

const studentinfo = sequelize.define(
    'studentinfo',
    {
        // Model attributes are defined here
        rno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        email: {
            type: DataTypes.STRING,
        },

        phno: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.DATE,
        },
    },
    {

        tableName:'studentinfo',
        createdAt:false,
        updatedAt:false //create update column are deleted 
        // Other model options go here
    },
);

// `sequelize.define` also returns the model
console.log(studentinfo === sequelize.models.studentinfo); // true


module.exports=studentinfo;