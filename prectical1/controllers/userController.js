const express = require('express')

// // const bcrypt = require('bcryptjs')

const router = express.Router()

const userService = require("../services/userService");

const getUser = async (req, res) => {
    await userService.getUser(req, res);
};

const getUserById = async (req, res) => {
    await userService.getUserById(req, res);
};


const createStudent = async (req, res) => {
    await userService.createStudent(req, res,io);
};


const updateStudent = async (req, res) => {
    await userService.updateStudent(req, res);
};
const deleteStudent = async (req, res) => {
    await userService.deleteStudent(req, res);
};
const getMarks = async (req, res) => {
    await userService.getMarks(req, res);
};

const getMarksById = async (req, res) => {
    await userService.getMarksById(req, res);
};
const createMarks = async (req, res) => {
    await userService.createMarks(req, res);
};
const updateMarks = async (req, res) => {
    await userService.updateMarks(req, res);
};
const deleteMarks = async (req, res) => {
    await userService.deleteMarks(req, res);
};

// const db = require('../config/db/mySqlConfig.js')

const auth = require("../middleware/requestFilter.js")

// const {validEmail,validName,validRno,validPhno,validCity,validDob}=require("../Utility/validationUtility.js")


// // get all student
// const getUser = async (req, res) => {
//     console.log(req.userId)
//     try {
//         const data = await db.query("select * from studentInfo");
//         console.log(data)
//         if (!data) {
//             return res.status(404).send({
//                 success: false,
//                 message: "No data found"
//             })
//         }
//         return res.status(200).send({
//             success: true,
//             message: "Record are fetched",
//             data: data[0]
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(404).send({
//             success: false,
//             message: "Error in get all data of student ",
//             error:error.message||error
//         })
//     }
// }

// // get student by id

// const getUserById = async (req, res) => {
//     try {

//         const roll = req.params.id
//         if (!roll) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Invalid or provide student id"
//             })
//         }
//         const data = await db.query("select * from studentInfo where rno=?", [roll]);
//         console.log(data)
//         if (!data) {
//             return res.status(404).send({
//                 success: false,
//                 message: "No  found"
//             })
//         }
//         return res.status(200).send({
//             success: true,
//             message: "Record are fetched",
//             data: data[0]
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(404).send({
//             success: false,
//             message: "Error in get all data of student ",
//             error
//         })
//     }
// }



// // create student

// const createStudent = async (req, res) => {
//     try {
//         const { rno, name, email, phno, city, dob } = req.body;


//         if (!rno || !name || !email || !phno || !city || !dob) {
//             return res.status(500).send({
//                 success: false,
//                 message: "Please enter all fields"
//             })
//         }

//         if(!validRno(rno)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Rno contain only numbers..."
//             })
//         }

//         if(!validName(name)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Name contain only alpha..."
//             })
//         }

//         if(!validEmail(email)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Email enter in valid format"
//             })
//         }

//         if(!validPhno(phno)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Phone number enter in standard format like 1234567890, 123-456-7890..."
//             })
//         }

//         if(!validCity(city)){
//             return res.status(400).send({
//                 success:false,
//                 message:"City contain only alpha..."
//             })
//         }

//         if(!validDob(dob)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Date enter in correct format like yyyy-mm-dd..."
//             })
//         }

//         const data = await db.query("Insert into studentInfo (rno,name,email,phno,city,dob) values (?,?,?,?,?,?)", [rno, name, email, phno, city, dob]);
//         console.log(data)
//         if (!data) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Error in insert query"
//             })
//         }
//         return res.status(200).send({
//             success: true,
//             message: "Student are added",
//             data: data[0]
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(404).send({
//             success: false,
//             message: "Error in create student Api",
//             error
//         })
//     }
// }


// // update student

// const updateStudent = async (req, res) => {
//     try {

//         const roll = req.params.id
//         if (!roll) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Invalid or provide student id"
//             })
//         }
//         const { rno, name, email, phno, city, dob } = req.body;
//         if (!rno || !name || !email || !phno || !city || !dob) {
//             return res.status(500).send({
//                 success: false,
//                 message: "Please enter all fields"
//             })
//         }
//         if(!validRno(rno)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Rno contain only numbers..."
//             })
//         }

//         if(!validName(name)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Name contain only alpha..."
//             })
//         }

//         if(!validEmail(email)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Email enter in valid format"
//             })
//         }

//         if(!validPhno(phno)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Phone number enter in standard format like 1234567890, 123-456-7890..."
//             })
//         }

//         if(!validCity(city)){
//             return res.status(400).send({
//                 success:false,
//                 message:"City contain only alpha..."
//             })
//         }

//         if(!validDob(dob)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Date enter in correct format like yyyy-mm-dd..."
//             })
//         }

//         const data = await db.query("update studentInfo set rno = ?,name = ?,email = ?,phno = ?,city = ?,dob = ? where rno = ? ", [rno, name, email, phno, city, dob, roll]);
//         console.log(data)
//         if (!data) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Error in update query"
//             })
//         }
//         return res.status(200).send({
//             success: true,
//             message: "Student are updated",
//             data: data[0]
//         })


//     } catch (error) {
//         console.log(error)
//         return res.status(404).send({
//             success: false,
//             message: "Error in update data of student ",
//             error
//         })
//     }
// }

// // delete student

// const deleteStudent = async (req, res) => {
//     try {

//         const roll = req.params.id
//         if (!roll) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Invalid or provide student id"
//             })
//         }
//         const data = await db.query("delete from studentInfo where rno=?", [roll]);
//         console.log(data)
//         if (!data) {
//             return res.status(404).send({
//                 success: false,
//                 message: "No  found"
//             })
//         }
//         return res.status(200).send({
//             success: true,
//             message: "Record are Deleted",
//             data: data[0]
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(404).send({
//             success: false,
//             message: "Error in delete data of student ",
//             error
//         })
//     }
// }




// // get mark

// const getMarks = async (req, res) => {
//     try {
//         const result = await db.query("select * from marks");
//         if (!result) {
//             return res.status(404).send({
//                 success: false,
//                 message: "No data found"
//             })
//         }
//         return res.status(200).send({
//             success: true,
//             message: "Data display",
//             result: result[0]
//         })
//     } catch (error) {
//         return res.status(404).send({
//             success: false,
//             message: "Error in data fetching",
//             error
//         })
//     }
// }

// // create marks

// const createMarks = async (req, res) => {
//     try {
//         const { rno, sub1, sub2, sub3 } = req.body;
//         if (!rno || !sub1 || !sub2 || !sub3) {
//             return res.status(500).send({
//                 success: false,
//                 message: "Please enter all fields"
//             })
//         }

//         if(!validRno(rno)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Rno contain only numbers..."
//             })
//         }


//         if(!validRno(sub1)){
//             return res.status(400).send({
//                 success:false,
//                 message:"sub1 contain only numbers..."
//             })
//         }

//         if(!validRno(sub2)){
//             return res.status(400).send({
//                 success:false,
//                 message:"sub2 contain only numbers..."
//             })
//         }

//         if(!validRno(sub3)){
//             return res.status(400).send({
//                 success:false,
//                 message:"sub3 contain only numbers..."
//             })
//         }


//         const data = await db.query("Insert into marks (rno,sub1,sub2,sub3) values (?,?,?,?)", [rno, sub1, sub2, sub3]);
//         console.log(data)
//         if (!data) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Error in insert query"
//             })
//         }
//         return res.status(200).send({
//             success: true,
//             message: "Mark are added",
//             data: data[0]
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(404).send({
//             success: false,
//             message: "Error in create Mark Api",
//             error
//         })
//     }
// }

// //update marks
// const updateMarks = async (req, res) => {
//     try {

//         const roll = req.params.id
//         if (!roll) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Invalid or provide marks id"
//             })
//         }
//         const { rno, sub1, sub2, sub3 } = req.body;
//         if (!rno || !sub1 || !sub2 || !sub3) {
//             return res.status(500).send({
//                 success: false,
//                 message: "Please enter all fields"
//             })
//         }


//         if(!validRno(rno)){
//             return res.status(400).send({
//                 success:false,
//                 message:"Rno contain only numbers..."
//             })
//         }


//         if(!validRno(sub1)){
//             return res.status(400).send({
//                 success:false,
//                 message:"sub1 contain only numbers..."
//             })
//         }

//         if(!validRno(sub2)){
//             return res.status(400).send({
//                 success:false,
//                 message:"sub2 contain only numbers..."
//             })
//         }

//         if(!validRno(sub3)){
//             return res.status(400).send({
//                 success:false,
//                 message:"sub3 contain only numbers..."
//             })
//         }


//         const data = await db.query("update marks set rno = ?,sub1 = ?,sub2 = ?,sub3 = ? where rno = ? ", [rno, sub1, sub2, sub3]);
//         console.log(data)
//         if (!data) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Error in update query"
//             })
//         }
//         return res.status(200).send({
//             success: true,
//             message: "marks are updated",
//             data: data[0]
//         })


//     } catch (error) {
//         console.log(error)
//         return res.status(404).send({
//             success: false,
//             message: "Error in update data of marks ",
//             error
//         })
//     }
// }

// // delete marks
// const deleteMarks = async (req, res) => {
//     try {

//         const roll = req.params.id
//         if (!roll) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Invalid or provide marks id"
//             })
//         }
//         const data = await db.query("delete from marks where rno=?", [roll]);
//         console.log(data)
//         if (!data) {
//             return res.status(404).send({
//                 success: false,
//                 message: "No  found"
//             })
//         }
//         return res.status(200).send({
//             success: true,
//             message: "Record are Deleted",
//             data: data[0]
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(404).send({
//             success: false,
//             message: "Error in delete data of marks ",
//             error
//         })
//     }
// }


/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags:
 *       - Student
 *     responses:
 *       200:
 *         description: List of all student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rno:
 *                     type: int
 *                   name:
 *                     type: varchar
 *                   email:
 *                     type: varchar
 *                   phno:
 *                     type: int
 *                   city:
 *                     type: varchar
 *                   dob:
 *                     type: date                 
 *       404:
 *         description: No student found
 */

router.get('/students', auth, getUser);



/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: Get student details by id
 *     tags:
 *       - Student
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: fetch student details
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   rno:
 *                     type: int
 *                   name:
 *                     type: varchar
 *                   email:
 *                     type: varchar
 *                   phno:
 *                     type: int
 *                   city:
 *                     type: varchar
 *                   dob:
 *                     type: date 
 *       404:
 *         description: Student not found
 */
router.get('/student/:id', auth, getUserById);


/**
 * @swagger
 * /student:
 *   post:
 *     summary: Create a new student
 *     tags:
 *       - Student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rno:
 *                 type: int
 *               name:
 *                 type: varchar
 *               email:
 *                 type: varchar
 *               phno:
 *                 type: int
 *               city:
 *                 type: varchar
 *               dob:
 *                 type: date      
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *               rno:
 *                 type: int
 *               name:
 *                 type: varchar
 *               email:
 *                 type: varchar
 *               phno:
 *                 type: int
 *               city:
 *                 type: varchar
 *               dob:
 *                 type: date   
 *       400:
 *         description: Bad request
 */

router.post('/student', auth, createStudent);

/**
 * @swagger
 * /student/{id}:
 *   put:
 *     summary: Update student by ID
 *     tags:
 *       - Student
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the student to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rno:
 *                 type: int
 *               name:
 *                 type: varchar
 *               email:
 *                 type: varchar
 *               phno:
 *                 type: int
 *               city:
 *                 type: varchar
 *               dob:
 *                 type: date  
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 */

router.put('/student/:id', auth, updateStudent);


/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete student by ID
 *     tags:
 *       - Student
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the student to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete('/student/:id', auth, deleteStudent);



/**
 * @swagger
 * /mark:
 *   get:
 *     summary: Get all marks details
 *     tags:
 *       - Mark
 *     responses:
 *       200:
 *         description: List of all mark details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: int
 *                   rno:
 *                     type: int
 *                   subject:
 *                     type: varchar
 *                   marks_obtained:
 *                     type: float
 *                   max_marks:
 *                     type: int
 *                   exam_date:
 *                     type: date                 
 *       404:
 *         description: No mark found
 */
router.get('/mark', auth, getMarks);


/**
 * @swagger
 * /mark/{id}:
 *   get:
 *     summary: Get mark details by id
 *     tags:
 *       - Mark
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: fetch mark details
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mark details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: int
 *                   rno:
 *                     type: int
 *                   subject:
 *                     type: varchar
 *                   marks_obtained:
 *                     type: float
 *                   max_marks:
 *                     type: int
 *                   exam_date:
 *                     type: date     
 *       404:
 *         description: Mark not found
 */
router.get('/mark/:id', auth, getMarksById);


/**
 * @swagger
 * /mark:
 *   post:
 *     summary: Create a new mark
 *     tags:
 *       - Mark
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: int
 *               rno:
 *                 type: int
 *               subject:
 *                 type: varchar
 *               marks_obtained:
 *                 type: float
 *               max_marks:
 *                 type: int
 *               exam_date:
 *                 type: date     
 *     responses:
 *       201:
 *         description: Mark created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: int
 *                   rno:
 *                     type: int
 *                   subject:
 *                     type: varchar
 *                   marks_obtained:
 *                     type: float
 *                   max_marks:
 *                     type: int
 *                   exam_date:
 *                     type: date    
 *       400:
 *         description: Bad request
 */
router.post('/mark', auth, createMarks);


/**
 * @swagger
 * /mark/{id}:
 *   put:
 *     summary: Update mark by ID
 *     tags:
 *       - Mark
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the mark to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
  *                   id:
 *                     type: int
 *                   rno:
 *                     type: int
 *                   subject:
 *                     type: varchar
 *                   marks_obtained:
 *                     type: float
 *                   max_marks:
 *                     type: int
 *                   exam_date:
 *                     type: date 
 *     responses:
 *       200:
 *         description: mark updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: mark not found
 */

router.put('/mark/:id', auth, updateMarks);

/**
 * @swagger
 * /mark/{id}:
 *   delete:
 *     summary: Delete mark by ID
 *     tags:
 *       - Mark
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the mark to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mark deleted successfully
 *       404:
 *         description: Mark not found
 */
router.delete('/mark/:id', auth, deleteMarks);

module.exports = router;

