import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import session from "express-session";
import { signIn, generateToken } from "../controller/user.controller.js";

const router = express.Router();

// ✅ Session Middleware
router.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use `true` in production
  })
);

// ✅ Google OAuth routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


// Google Auth Callback
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    // Redirect back to signin page with token in URL
    res.redirect(`http://localhost:3000/?token=${token}&user=${JSON.stringify(req.user)}`);
  }
);







// Server-side route
router.get('/auth/check', (req, res) => {
  // Check authentication status (e.g., via session/JWT)
  if (req.isAuthenticated()) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});
export default router;
