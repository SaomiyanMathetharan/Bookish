import passportJwt, {ExtractJwt, Strategy} from 'passport-jwt';
import passport from "passport";
import {fetchUser} from "../api.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretBookishKey"
};

export default function configurePassport() {
    // The JWT payload is passed into the verify callback
    passport.use(new passportJwt.Strategy(options, function(jwt_payload, done) {

        //console.log(jwt_payload);

        return fetchUser({username: jwt_payload.username})
            .then((user) => {
                if(!user) {
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch((err) => {return done(err, false)})
    }));
}