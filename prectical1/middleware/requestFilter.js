const jwt = require("jsonwebtoken");
const userTokenModel = require("../models/userTokenModel");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log(" Checking Access Token:", token);

  if (!token) {
    return res.status(403).json({ message: "Unauthorized: No token provided" });
  }
jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY,async(err,decodedUser)=>{
    if(err){
      console.log(" Access Token Expired or Invalid:", err);
      return res.status(403).json({ message: "Invalid token" });
    }
      req.user = decodedUser;
    next();
  })



  // const token = req.headers.authorization?.split(" ")[1];
  // const refreshToken = req.cookies.refreshToken; // Read refresh token from cookies

  // console.log(" Checking Access Token:", token);
  // console.log(" Checking Refresh Token:", refreshToken);

  // if (!token) {
  //   return res.status(401).json({ message: "Unauthorized: No token provided" });
  // }

  // jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, async (err, decodedUser) => {
  //   if (err) {
  //     console.log(" Access Token Expired or Invalid:", err);

  //     if (err.name === "TokenExpiredError" && refreshToken) {
  //       try {
  //         console.log(" Verifying Refresh Token...");
  //         const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);

  //         const userId = decodedRefreshToken._id;

  //         console.log("Refresh Token Decoded:", decodedRefreshToken);

  //         const user = await userTokenModel.findOne({ where: { userId } });

  //         if (!user) {
  //           console.log(" User Not Found in Database");
  //           return res.status(403).json({ message: "User not found" });
  //         }

  //         // Generate new access token
  //         const newAccessToken = jwt.sign(
  //           { id: user.uid },
  //           process.env.ACCESS_TOKEN_PRIVATE_KEY,
  //           { expiresIn: "1m" }
  //         );

  //         console.log(" NEW ACCESS TOKEN GENERATED:", newAccessToken);

  //         // Return new access token in the response body
  //         // res.setHeader("Authorization", `Bearer ${newAccessToken}`);
  //         return res.status(200).json({ accessToken: newAccessToken });
  //       } catch (refreshError) {
  //         console.log(" Refresh Token Verification Failed:", refreshError);
  //         return res.status(403).json({ message: "Invalid or expired refresh token" });
  //       }
  //     }

  //     return res.status(403).json({ message: "Invalid token" });
  //   }

  //   req.user = decodedUser;
  //   next();
  // });

  // next();
};

module.exports = auth;
