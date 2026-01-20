import { requireAuth } from "@clerk/express";
import User from '../models/User.js'

export const protectRoute = [
  requireAuth({signInUrl:"sign-in"}),
  async (req, res, next) => {
    try {
      const clerkId = req.auth.userId;
      if (!clerkId)
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid Token" });

      const user = await User.findOne({ clerkId });
      if (!user) return res.status(404).json({ message: "User Not Found" });
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
