import passportJwt, {ExtractJwt, Strategy} from 'passport-jwt';
import passport from "passport";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretBookishKey"
};

export default function configurePassport(api) {
    // The JWT payload is passed into the verify callback
    passport.use(new passportJwt.Strategy(options, function(jwt_payload, done) {

        //console.log(jwt_payload);

        // We will assign the `sub` property on the JWT to the database ID of user
        return api.fetchUser({username: jwt_payload.username})
            .then((user) => {
                if(!user) {
                    return done(null, false);
                }
                return done(null, user);
            })
            .catch((err) => {return done(err, false)})
    }));
}