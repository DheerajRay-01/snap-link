import dotenv from 'dotenv';
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

dotenv.config();

// Initialize Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
        console.log("hello");
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email: email,
            fullName: profile.displayName,
            avatar: profile.photos[0].value 
          });
        }

        return done(null, user); // ✅ Pass full user, not just profile 
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
