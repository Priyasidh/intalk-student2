const { DataTypes } = require('sequelize');
const sequelize =require('../config/db/mySqlConfig');

const studentinfo = sequelize.define(
    'studentinfo',
    {
        
        rno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
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
        updatedAt:false 
    },
);


console.log(studentinfo === sequelize.models.studentinfo); // true


module.exports=studentinfo;