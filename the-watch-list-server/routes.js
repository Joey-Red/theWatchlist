const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("./Schematics/User");
const Post = require("./Schematics/Post");
const MovieComment = require("./Schematics/MovieComment");
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
router.post("/ratings", (req, res, next) => {
    MovieComment.find(
        { $match: { _id: req.body.postUser._id } },
        // dateAdded: new Date(),
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            res.json(docs);
        }
    );
});
router.put("/update-rating", (req, res, next) => {
    // console.log(req.body);
    MovieComment.findOneAndUpdate(
        { _id: req.body.id },
        { userRating: req.body.rating },
        function (err, docs) {
            if (err) {
                res.json(err);
            }
            res.json(docs);
        }
    );
});
router.delete("/delete-movie", (req, res, next) => {
    MovieComment.findByIdAndDelete({ _id: req.body.id }, function (err, docs) {
        if (err) {
            res.json(err);
        }
        res.json(docs);
    });
});
router.put("/update-movies", (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.body.postUser._id },
        { $addToSet: { movieList: req.body.movieList } },
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
router.post("/movie-comment", (req, res, next) => {
    const movieComment = new MovieComment({
        postUser: req.body.postUser.username,
        postUserId: req.body.postUser._id,
        movieName: req.body.movieName,
        seen: req.body.seen,
        planSee: req.body.planSee,
        comment: req.body.comment,
        userRating: req.body.userRating,
        moviePoster: req.body.moviePoster,
        dateAdded: new Date(),
    }).save((err) => {
        if (err) {
            return next(err);
        }
        res.json(req.body);
    });
});
router.get("/user-list", (req, res) => {
    User.find({ "movieList.1": { $exists: true } }, (err, result) => {
        if (err) {
            res.json(err);
        }
        res.json(result);
    });
});
router.get("/trending", (req, res) => {
    // MovieComment.find({ $query: {}, $orderby: { $dateAdded: -1 } }).limit(3),
    MovieComment.find({})
        .sort({ $natural: -1 })
        .limit(3)
        .exec(function (err, result) {
            if (err) {
                res.json(err);
            }
            res.json(result);
        });
});
router.get("/rankings", (req, res) => {
    MovieComment.find({}, (err, result) => {
        if (err) {
            res.json(err);
        }
        let comparisonArr = [];
        let tallyArray = [];
        let avgArray = [];
        result.forEach((film) => {
            // console.log("resForEach: ", film);
            comparisonArr.push({
                movieName: film.movieName,
                movieRating: film.userRating,
                totalCount: 1,
                poster: film.moviePoster,
            });
        });
        // Sort Movies and add up scores
        const reducer = comparisonArr.reduce((acc, curr) => {
            const index = acc.findIndex(
                (item) => item.movieName === curr.movieName
            );
            // Check to see if a dupe exists
            index > -1
                ? // true or false
                  (acc[index].movieRating +=
                      curr.movieRating &&
                      (acc[index].totalCount += curr.totalCount))
                : //   console.log(acc[index].totalCount + curr.totalCount))
                  // if true, add it up, if false, push it in
                  //   console.log("acc: ", acc);
                  acc.push({
                      movieName: curr.movieName,
                      movieRating: curr.movieRating,
                      totalCount: curr.totalCount,
                      poster: curr.poster,
                  });
            acc = tallyArray;
            return acc;
        }, []);
        tallyArray.forEach((film) => {
            // console.log("top3: ", film);
            avgArray.push({
                // name: film.movieName,
                // avgRating: film.movieRating / film.totalCount,
                // poster: film.poster,
                film,
            });
        });
        let sortArray = avgArray.sort((a, b) =>
            a.avgRating > b.avgRating ? -1 : 1
        );
        let topThree = sortArray.slice(0, 3);
        // console.log(sortArray);
        res.json(topThree);
    });
});
router.post("/my-list", (req, res) => {
    User.findOne({ _id: req.body.user._id }, (err, result) => {
        if (err) {
            res.json(err);
        }
        res.json(result);
    });
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
