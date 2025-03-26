import { GoogleUser } from "../model/user.model.js";  // ✅ Use Google schema
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
 
 


const configurePassport = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL, // Must match Google Cloud URI
          },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    console.log("Google Profile:", profile);

                    if (!profile.emails || !profile.emails[0]) {
                        console.log("No email found!");
                        return done(null, false);
                    }

                    // ✅ Use `GoogleUser` schema for Google-authenticated users
                    const newGoogleUser = {
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value
                    };

                    let user = await GoogleUser.findOne({ googleId: profile.id });

                    if (!user) {
                        user = await GoogleUser.create(newGoogleUser);
                        console.log("New Google User Created:", user);
                    } else {
                        console.log("Google User Found:", user);
                    }

                    done(null, user);
                } catch (err) {
                    console.error("Error in Google Auth:", err);
                    done(err, null);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await GoogleUser.findById(id);  // ✅ Use `GoogleUser` for deserialization
            done(null, user);
        } catch (err) {
            console.error("Error in deserializing user:", err);
            done(err, null);
        }
    });
};

export default configurePassport;
