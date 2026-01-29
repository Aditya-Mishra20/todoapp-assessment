import admin from "../config/firebase.js";
import {User} from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing token" });
    }

    const token = header.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

//     if (decoded.firebase.sign_in_provider === "password" && !decoded.email_verified) {
//     return res.status(403).json({ message: "Email not verified" });
// }      //fix this later email not verify error
  

    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
