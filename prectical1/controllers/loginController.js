const express = require('express')

const router = express.Router()

const loginService = require("../services/loginService");

const signup = async (req, res) => {
  await loginService.signup(req, res);
};

const signIn = async (req, res) => {
    await loginService.signIn(req, res);
  };

const newAccessToken = async (req, res) => {
  await loginService.newAccessToken(req, res);
};

const logout = async (req, res) => {
  await loginService.logout(req, res);
};

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Register created successfully
 *       400:
 *         description: Bad request
 */
router.post("/api/signup", signup);

/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: login
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post("/api/signin", signIn);


router.post("/api/newAccessToken", newAccessToken);

router.post("/api/logout", logout);

module.exports = router;