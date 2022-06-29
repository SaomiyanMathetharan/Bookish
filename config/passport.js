import {ExtractJwt, Strategy} from 'passport-jwt';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretBookishKey"
};

export default function configurePassport(passport, api) {
    // The JWT payload is passed into the verify callback
    passport.use(new Strategy(options, function(jwt_payload, done) {

        console.log(jwt_payload);

        // We will assign the `sub` property on the JWT to the database ID of user
        /*
        api.fetchUser({_id: jwt_payload.sub}, function(err, user) {

            // This flow look familiar?  It is the same as when we implemented
            // the `passport-local` strategy
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        }); */

    }));
}