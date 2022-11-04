import React, { useEffect, useState } from "react";
import Axios, { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
interface DisplayMoviesProps {
    user: any;
}
function DisplayMovies({ user }: DisplayMoviesProps) {
    let [loading, setLoading] = useState(true);
    let [randomized, setRandomized] = useState(false);
    let [avg, setAvg] = useState<number | string>("NA");
    // let [hide, setHide] = useState(true);
    const [listOfRatings, setListOfRatings] = useState<any>([{}]);
    useEffect(() => {
        Axios.post("http://localhost:8080/ratings", {
            postUser: user,
        })
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    setListOfRatings(res.data);
                    // console.log("data: ", res.data);
                    setLoading(false);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);
    let showComment = (e: any) => {
        let comment = document.getElementById(e.target.value);
        if (comment?.classList.contains("hidden")) {
            comment?.classList.remove("hidden");
        } else {
            comment?.classList.add("hidden");
        }
    };

    let ratingArray = listOfRatings;
    let newRatingArr: any = [];
    let displayMovieArr: any = [];

    ratingArray.forEach((rating: any) => {
        if (rating.postUserId === user._id) {
            newRatingArr.push(rating.userRating);
            // Getting user rating and comment of each movie
            displayMovieArr.push(
                <div key={uuidv4()}>
                    <div>
                        {rating.movieName} - {rating.userRating}
                    </div>
                    {rating.comment !== "No comment" && rating.comment !== "" && (
                        <div style={{ overflowWrap: "break-word" }}>
                            <button
                                className="bg-black/20 px-1 rounded text-sm"
                                value={rating.comment + rating.movieName}
                                onClick={showComment}
                            >
                                Toggle Comment
                            </button>{" "}
                            <div
                                className="hidden"
                                id={rating.comment + rating.movieName}
                            >
                                {rating.comment}
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    });

    useEffect(() => {
        // Averaging out all the users scores
        if (newRatingArr.length !== 0) {
            let finalVal =
                Math.round(
                    (newRatingArr.reduce((a: number, b: number) => a + b) /
                        newRatingArr.length) *
                        100
                ) / 100;
            setAvg(finalVal);
        }
    }, [newRatingArr]);

    return (
        <>
            {loading && <>Loading....</>}
            {!loading && (
                <div
                    key={user._id}
                    className=" bg-blue-200/50 text-lg rounded m-1 p-2"
                >
                    <div className="text-center pseudo">
                        {user.username} Avg rating: {avg}
                    </div>
                    <div>{displayMovieArr}</div>
                </div>
            )}
        </>
    );
}

export default DisplayMovies;
