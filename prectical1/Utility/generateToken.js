const jwt=require('jsonwebtoken')
const userTokenModel=require("../models/userTokenModel")

const generateToken = async (user) => {
        try {
        console.log("User Object:", user); 
        if (!user || !user.id) {
            throw new Error("Invalid user object.");
        }

        const payload = { _id: user.id };

        console.log("payload:", payload);
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "1m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "30d" }
        );


        const userTokens = await userTokenModel.findOne({ where: { userId: user.id } });
        if (userTokens) await userTokens.destroy();

        await userTokenModel.create({ userId: user.id, token: refreshToken });

        return { accessToken, refreshToken };
    } catch (err) {
        console.error("Error in generate token:", err);
        throw err;
    }
};

module.exports=generateToken
