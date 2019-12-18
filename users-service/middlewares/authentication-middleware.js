import passport from 'passport';
import {ExtractJwt,Strategy} from 'passport-jwt';
import UsersController from "../controllers/UsersController";
import type {UserModelInterface} from "../models/users/DBModel";

const authStrategy = new Strategy({
    secretOrKey:process.env.AUTH_SECRET,
    algorithms:['HS256'],
    issuer: process.env.TOKEN_ISSUER,
    jwtFromRequest:ExtractJwt.fromAuthHeaderWithScheme('Bearer') //Authorization : Bearer <TOKEN>
},async(payload,done)=>{
    const id = payload.userid;
    if(id){
        done(null,id);
    }else{
        done(null,false);
    }
});

passport.use(authStrategy);

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/users/signup/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
    const user : UserModelInterface = {
        name: profile.name.givenName,
        family: profile.name.familyName,
        email: profile.emails[0].value,
        password: profile.id
    };
       UsersController.create(user).then((res)=>{
           cb(null,res);
       }).catch((err)=>{
           cb(err,null);
       });
        /*User.findOrCreate({ googleId:  }, function (err, user) {
                return cb(err, user);
            });*/
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

export default passport.initialize();
