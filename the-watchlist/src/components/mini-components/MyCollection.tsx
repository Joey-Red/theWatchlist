import React, { useState } from "react";
import Axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencilAlt,
    faCheck,
    faEraser,
    faX,
    faPlus,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
interface MyCollectionProps {
    setUserRating: Function;
    userRating: number;
    rating: any;
    disabled: boolean;
    setDisabled: Function;
    user: any;
}

function MyCollection({
    setUserRating,
    userRating,
    rating,
    disabled,
    setDisabled,
    user,
}: MyCollectionProps) {
    let [editing, setEditing] = useState(false);
    let [deleting, setDeleting] = useState(false);
    let [success, setSuccess] = useState(false);
    let handleEdit = (e: any) => {
        setUserRating(e.userRating);
        setEditing(true);
        setDisabled(true);
    };
    let cancelEdit = () => {
        setEditing(false);
        setDisabled(false);
    };

    let updateRating = () => {
        Axios.put("http://localhost:8080/update-rating", {
            id: rating._id,
            rating: userRating,
        })
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    // YO IT WAS UPDATED
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    // const params = {
    //         id: rating._id,
    //         user: user,
    // };
    let deleteMovie = () => {
        Axios.delete("http://localhost:8080/delete-movie", {
            data: {
                id: rating._id,
                user: user,
            },
        })
            .then((res) => {
                if (res.data === 403) {
                    // no users found?
                } else {
                    console.log(res);
                    setSuccess(true);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    return (
        <>
            {success && null}
            {!success && (
                <>
                    {editing && (
                        <div className="my-1 bg-blue-400 p-2 rounded w-full">
                            <div>{rating.movieName}</div>
                            <div className="flex items-center">
                                <div className="w-full flex justify-between">
                                    <div className="flex items-center mr-2">
                                        <div>
                                            <label htmlFor="userRating">
                                                Rating (1-10)
                                            </label>
                                        </div>
                                        <div className="flex">
                                            <input
                                                type="range"
                                                min="0"
                                                max="10"
                                                className="mx-2"
                                                id="myRange"
                                                onChange={(e) =>
                                                    setUserRating(
                                                        e.target.valueAsNumber
                                                    )
                                                }
                                                value={userRating}
                                            />
                                            <div>{userRating}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-between flex items-center">
                                        <div
                                            onClick={cancelEdit}
                                            className="hover:cursor-pointer hover:bg-red-900 bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white"
                                        >
                                            <FontAwesomeIcon icon={faX} />
                                        </div>
                                        <div
                                            onClick={updateRating}
                                            className="hover:cursor-pointer hover:bg-green-900 bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white"
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!editing && (
                        <div
                            key={rating._id}
                            className="my-1 bg-blue-400 p-2 rounded w-full justify-between flex items-center"
                        >
                            {rating.movieName} - {rating.userRating}
                            <div className="flex gap-2 items-center">
                                <div className="flex gap-2 items-center flex-col sm:flex-row">
                                    <div
                                        onClick={() => setDeleting(true)}
                                        className="hover:cursor-pointer hover:bg-red-900  bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white"
                                    >
                                        <FontAwesomeIcon icon={faEraser} />
                                    </div>
                                    {!disabled && (
                                        <div
                                            onClick={(e) => handleEdit(rating)}
                                            className="hover:cursor-pointer hover:bg-green-900  bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white"
                                        >
                                            <FontAwesomeIcon
                                                icon={faPencilAlt}
                                            />
                                        </div>
                                    )}
                                </div>
                                {disabled && (
                                    <div className="hover:cursor-pointer bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white">
                                        <FontAwesomeIcon icon={faSpinner} />
                                    </div>
                                )}
                                {deleting && (
                                    <div className="my-1 bg-red-400 p-2 rounded w-full flex items-center">
                                        <div className="w-full flex justify-between">
                                            <div className="flex items-center mr-2">
                                                <span className="mr-2">
                                                    Are you sure you would like
                                                    to remove{" "}
                                                    <span className="font-bold">
                                                        {rating.movieName}
                                                    </span>{" "}
                                                    from your list?
                                                </span>
                                            </div>
                                            <div className="flex gap-2 justify-center flex items-center flex-col sm:flex-row">
                                                <div
                                                    onClick={() =>
                                                        setDeleting(false)
                                                    }
                                                    className="hover:cursor-pointer hover:bg-red-900 bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faX}
                                                    />
                                                </div>
                                                <div
                                                    onClick={deleteMovie}
                                                    className="hover:cursor-pointer hover:bg-green-900 bg-blue-900/20 rounded h-8 w-8 flex items-center justify-center text-white"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default MyCollection;
