const express = require('express')

const router = express.Router()

const db = require('../config/db/mySqlConfig.js')

const { validEmail, validName, validRno, validPhno, validCity, validDob } = require("../Utility/validationUtility.js")

const logger = require('../logger.js')


const userModel = require('../models/userModel.js')

const markModel = require("../models/markModel.js")
const { exists } = require('validation')
// const { use } = require('../controllers/userController.js')

// const {io}=require("../app.js")

// console.log("io",io)
// get all student


const getUser = async (req, res) => {

    const t = req.t;
    logger.logger.log("info", "Received request to fetch all student data");
    // console.log(req.userId)
    try {
        const data = await userModel.findAll();
        console.log(data)
        if (!data) {
            logger.logger.log("info", "No data available for all student");
            return res.status(404).send({
                success: false,
                message: "No data found"
            })
        }
        logger.logger.log("info", "Fetched student records successfully");
        return res.status(200).send({
            success: true,
            message: t("success"),
            data: data
        })

    } catch (error) {
        logger.logger.log("error", "Error in get student details");
        return res.status(404).send({
            success: false,
            message:  t("error"),
            error: error.message || error
        })
    }
}

// get student by id

const getUserById = async (req, res) => {

    const t= req.t;

    logger.logger.log("info", "Received request to fetch by id student data");
    try {
        const rno = req.params.id
        if (!rno) {
            logger.logger.log("info", "Invalid or missing student id")
            return res.status(404).send({
                success: false,
                message: "Invalid or provide student id"
            })
        }
        const data = await userModel.findOne({ where: { rno } });
        console.log(data)
        if (!data) {
            logger.logger.log("info", "No data available of this student with this stud id")
            return res.status(404).send({
                success: false,
                message: "No  found",
                exists:false
            })
        }
        logger.logger.log("info", "Fetched student with id records successfully");
        return res.status(200).send({
            success: true,
            message: t("success"),
            data: data,
            exists:true
        })

    } catch (error) {
        logger.logger.log("error", "Error in get student details with id");
        return res.status(404).send({
            success: false,
            message:  t("error"),
            error
        })
    }
}



// create student

const createStudent = async (req, res,io) => {

    console.log(" Incoming Student Data:", req.body);
    console.log(" Authenticated User:", req.user); 

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user found in request" });
    }

    const t= req.t;
    try {
        const { name, email, phno, city, dob } = req.body;
        if (!name || !email || !phno || !city || !dob) {
            return res.status(500).send({
                success: false,
                message: "Please enter all fields"
            })
        }

        // if (!validRno(rno)) {
        //     return res.status(400).send({
        //         success: false,
        //         message: "Rno contain only numbers..."
        //     })
        // }

        if (!validName(name)) {
            return res.status(400).send({
                success: false,
                message: "Name contain only alpha..."
            })
        }

        if (!validEmail(email)) {
            return res.status(400).send({
                success: false,
                message: "Email enter in valid format"
            })
        }

        if (!validPhno(phno)) {
            return res.status(400).send({
                success: false,
                message: "Phone number enter in standard format like 1234567890, 123-456-7890..."
            })
        }

        if (!validCity(city)) {
            return res.status(400).send({
                success: false,
                message: "City contain only alpha..."
            })
        }

        if (!validDob(dob)) {
            return res.status(400).send({
                success: false,
                message: "Date enter in correct format like yyyy-mm-dd..."
            })
        }

        const data = await userModel.create({ name, email, phno, city, dob });
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Error in insert query",
            })
        }

        io.emit("newStudentAdded",data);
        
        return res.status(200).send({
            success: true,
            message: t("success"),
            data: data
        })
    } catch (error) {
        console.log(error)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ success: false, message: 'Student with this roll number or email already exists.' });
          }
        
        // return res.status(404).send({
        //     success: false,
        //     message: t("error"),
        //     error
        // })
    }
}


// update student

const updateStudent = async (req, res) => {

    const t=req.t;
    try {

        const roll = req.params.id
        if (!roll) {
            return res.status(404).send({
                success: false,
                message: "Invalid or provide student id"
            })
        }
        const { rno, name, email, phno, city, dob } = req.body;
        if (!name || !email || !phno || !city || !dob) {
            return res.status(500).send({
                success: false,
                message: "Please enter all fields"
            })
        }
        // if (!validRno(rno)) {
        //     return res.status(400).send({
        //         success: false,
        //         message: "Rno contain only numbers..."
        //     })
        // }

        if (!validName(name)) {
            return res.status(400).send({
                success: false,
                message: "Name contain only alpha..."
            })
        }

        if (!validEmail(email)) {
            return res.status(400).send({
                success: false,
                message: "Email enter in valid format"
            })
        }

        if (!validPhno(phno)) {
            return res.status(400).send({
                success: false,
                message: "Phone number enter in standard format like 1234567890, 123-456-7890..."
            })
        }

        if (!validCity(city)) {
            return res.status(400).send({
                success: false,
                message: "City contain only alpha..."
            })
        }

        if (!validDob(dob)) {
            return res.status(400).send({
                success: false,
                message: "Date enter in correct format like yyyy-mm-dd..."
            })
        }
        const [data] = await userModel.update({
            name,
            email,
            phno,
            city,
            dob,
        }, {
            where: { rno: roll }
        });
        console.log(data)
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Error in update query"
            })
        }
        return res.status(200).send({
            success: true,
            message: t("success"),
            data: data[0]
        })


    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            message: t("error"),
            error
        })
    }
}

// delete student

const deleteStudent = async (req, res) => {
    const t = req.t;
    try {

        const roll = req.params.id
        if (!roll) {
            return res.status(404).send({
                success: false,
                message: "Invalid or provide student id"
            })
        }
        const data = await userModel.destroy({ where: { rno: roll } });
        console.log(data)
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No  found"
            })
        }
        return res.status(200).send({
            success: true,
            message: t("success"),
            data: data[0]
        })

    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            message: t("error"),
            error
        })
    }
}




// get mark

const getMarks = async (req, res) => {
    const t = req.t;
    try {
        const result = await markModel.findAll();
        if (!result) {
            return res.status(404).send({
                success: false,
                message: "No data found"
            })
        }
        return res.status(200).send({
            success: true,
            message: t("success"),
            result: result
        })
    } catch (error) {
        return res.status(404).send({
            success: false,
            message: t("error"),
            error
        })
    }
}

// get by id mark

const getMarksById = async (req, res) => {

    const t = req.t;
    logger.logger.log("info", "Received request to fetch by id mark data");
    try {
        const id = req.params.id
        if (!id) {
            logger.logger.log("info", "Invalid or missing mark id")
            return res.status(404).send({
                success: false,
                message: "Invalid or provide mark id"
            })
        }
        const result = await markModel.findOne({ where: { id } });
        console.log(result)
        if (!result) {
            logger.logger.log("info", "No data available of this mark with this mark id")
            return res.status(404).send({
                success: false,
                message: "No  found"
            })
        }
        logger.logger.log("info", "Fetched marks with id records successfully");
        return res.status(200).send({
            success: true,
            message: t("success"),
            result: result
        })

    } catch (error) {
        logger.logger.log("error", "Error in get marks details with id");
        return res.status(404).send({
            success: false,
            message: t("error"),
            error
        })
    }
}
// create marks

const createMarks = async (req, res) => {
    const t = req.t;
    try {
        const { rno, subject, marks_obtained, max_marks, exam_date } = req.body;
        const studentExists = await userModel.findOne({ where: { rno: rno } });

    if (!studentExists) {
      return res.status(400).json({ message: "Roll number does not exist!" });
    }

        if ( !rno || !subject || !marks_obtained || !max_marks || !exam_date) {
            return res.status(500).send({
                success: false,
                message: "Please enter all fields"
            })
        }

        if (!validRno(rno)) {
            return res.status(400).send({
                success: false,
                message: "Rno contain only numbers..."
            })
        }


        if (!validName(subject)) {
            return res.status(400).send({
                success: false,
                message: "subject name must be alpha..."
            })
        }

        if (!validRno(marks_obtained)) {
            return res.status(400).send({
                success: false,
                message: "marks obtained contain only numbers..."
            })
        }

        if (!validRno(max_marks)) {
            return res.status(400).send({
                success: false,
                message: "max marks contain only numbers..."
            })
        }
        
        if (!validDob(exam_date)) {
            return res.status(400).send({
                success: false,
                message: "Date enter in correct format like yyyy-mm-dd..."
            })
        }


        const result = await markModel.create({ rno, subject, marks_obtained, max_marks, exam_date });
        console.log(result)
        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Error in insert query"
            })
        }
        return res.status(200).send({
            success: true,
            message: t("success"),
            result: result
        })

    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            message: t("error"),
            error
        })
    }
}

//update marks
const updateMarks = async (req, res) => {
    const t = req.t;
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid or provide marks id"
            })
        }
        const { rno, subject, marks_obtained, max_marks, exam_date } = req.body;
        if ( !rno || !subject || !marks_obtained || !max_marks || !exam_date) {
            return res.status(500).send({
                success: false,
                message: "Please enter all fields"
            })
        }


        if (!validRno(rno)) {
            return res.status(400).send({
                success: false,
                message: "Rno contain only numbers..."
            })
        }


        if (!validName(subject)) {
            return res.status(400).send({
                success: false,
                message: "subject name must be alpha..."
            })
        }

        if (!validRno(marks_obtained)) {
            return res.status(400).send({
                success: false,
                message: "marks obtained contain only numbers..."
            })
        }

        if (!validRno(max_marks)) {
            return res.status(400).send({
                success: false,
                message: "max marks contain only numbers..."
            })
        }
        
        if (!validDob(exam_date)) {
            return res.status(400).send({
                success: false,
                message: "Date enter in correct format like yyyy-mm-dd..."
            })
        }

        const result = await markModel.update({
            rno, 
            subject, 
            marks_obtained, 
            max_marks, 
            exam_date
        }, {
            where: { id: id }
        });
        console.log(result)
        if (!result) {
            return res.status(404).send({
                success: false,
                message: "Error in update query"
            })
        }
        return res.status(200).send({
            success: true,
            message: t("success"),
            result: result
        })


    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            message: t("error"),
            error
        })
    }
}

// delete marks
const deleteMarks = async (req, res) => {
    const t = req.t;
    try {

        const id = req.params.id
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Invalid or provide marks id"
            })
        }
        const result = await markModel.destroy({ where: { id: id } });
        console.log(result)
        if (!result) {
            return res.status(404).send({
                success: false,
                message: "No  found"
            })
        }
        return res.status(200).send({
            success: true,
            message: t("success"),
            result: result
        })

    } catch (error) {
        console.log(error)
        return res.status(404).send({
            success: false,
            message: t("error"),
            error
        })
    }
}

module.exports = { getUser, getUserById, createStudent, updateStudent, deleteStudent, getMarks, getMarksById,createMarks, updateMarks, deleteMarks }