const {DataTypes}=require('sequelize')
const sequelize =require('../config/db/mySqlConfig');
const studentInfo=require('../models/userModel')
const mark = sequelize.define(
    'mark',
    {
        // Model attributes are defined here
        rno: {
            type: DataTypes.INTEGER,
            references:{
                model:studentInfo,
                key:'rno'
            },onDelete:'CASCADE'
        },
        subject: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        marks_obtained: {
            type: DataTypes.FLOAT
        },

        max_marks: {
            type: DataTypes.INTEGER,
        },
        exam_date:{
            type:DataTypes.DATE
        }
    },
    {

        tableName:'mark',
        createdAt:false,
        updatedAt:false //create update column are deleted 
        // Other model options go here
    },
);

// `sequelize.define` also returns the model
console.log(mark === sequelize.models.mark); // true


module.exports=mark;