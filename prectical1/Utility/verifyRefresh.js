const UserToken =require("../models/userTokenModel") ;
const jwt =require("jsonwebtoken");

const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    console.log("privatekey", privateKey);

    return new Promise(async (resolve, reject) => {
        try {
            const userToken = await UserToken.findOne({ where: { token: refreshToken } });

            if (!userToken) {
                return reject({ error: true, message: "Invalid refresh token" });
            }

            jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err) {
                    return reject({ error: true, message: "Invalid refresh token" });
                }

                resolve({
                    tokenDetails,
                    error: false,
                    message: "Valid refresh token",
                });
            });
        } catch (err) {
            reject({ error: true, message: "Database error", details: err });
        }
    });
};


module.exports=verifyRefreshToken;
