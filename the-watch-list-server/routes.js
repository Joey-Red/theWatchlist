const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("./Schematics/User");
const Post = require("./Schematics/Post");
const dotenv = require("dotenv");
dotenv.config();
// mongoose.set("debug", true);

// router.use(passport.initialize());
// router.use(passport.session());

router.post("/create-post", (req, res, next) => {
    const post = new Post({
        postUser: req.body.postUser,
        postBody: req.body.postBody,
        dateAdded: new Date(),
    }).save((err) => {
        if (err) {
            return next(err);
        }
        res.json(req.body);
    });
});
router.put("/update-movies", (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.body.userId },
        {
            // postUser: req.body.postUser,
            movieList: req.body.movieList,
            // dateAdded: new Date(),
        },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            res.json(docs);
        }
    );
    // .save((err) => {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.json(req.body);
    // });
});
router.post("/sign-up", (req, res, next) => {
    User.findOne({ username: req.body.username }, function (err, docs) {
        if (docs === null) {
            // username doesnt exist
            if (req.body.password.length < 6) {
                return res.json("Password too short.");
            }
            if (req.body.username.length < 3 || req.body.username.length > 20) {
                return res.json("Username doesn't meet requirements.");
            } else {
                bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                    if (err) {
                        return next(err);
                    }
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                    }).save((err) => {
                        if (err) {
                            return next(err);
                        }
                        // res.redirect("/");
                        // res.json(`${user} created!`);
                        // res.json(req.body); //Pw & username
                        // return res.json(req.body.username);
                        // return res.json(req.user);
                        passport.authenticate("local")(req, res, function () {
                            // res.redirect("/");
                            res.json(req.user);
                        });
                    });
                });
            }
        } else {
            return res.json("Username taken.");
        }
    });
});
router.post(
    "/log-in",
    passport.authenticate("local", { failureMessage: true }),
    function (req, res) {
        res.json(req.user);
    }
);

// router.post("/", (req, res) => {
//     Post.findByIdAndRemove(req.body.deleteMessage, function deleteMessage(err) {
//         if (err) return next(err);
//         res.redirect("/");
//     });
// });
router.get("/log-out", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});
module.exports = router;
