import React, { useEffect, useState } from "react";
import Axios, { AxiosError } from "axios";
import placeholder from "../img/download.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ArticleContainer from "./ArticleContainer";
import LoadingMany from "./mini-components/LoadingMany";
function SecondaryContent() {
    let [articles, setArticles] = useState([{}]);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        // Axios.get("https://inshorts.deta.dev/news?category=entertainment")
        //     .then((res) => {
        //         setArticles(res.data.data);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         if (axios.isAxiosError(err)) {
        //             // Access to config, request, and response
        //         } else {
        //             // Just a stock error
        //         }
        //     });
    }, []);
    return (
        <div className="flex-grow flex gap-2 m-2 mt-0 flex-col sm:flex-row">
            <div className="sm:w-[50%] rounded flex flex-col">
                <div className="bg-blue-200 rounded">
                    <p className="p-2 text-center">
                        People with similar ratings
                    </p>
                    <div className="flex flex-col p-2 rounded">
                        <a href="#" className="hover:underline">
                            user - movie ? - content ?
                        </a>{" "}
                        <a href="#" className="hover:underline">
                            user - movie ? - content ?
                        </a>{" "}
                        <a href="#" className="hover:underline">
                            user - movie ? - content ?
                        </a>{" "}
                        <a href="#" className="hover:underline">
                            user - movie ? - content ?
                        </a>
                    </div>
                </div>
                <div className="bg-blue-200 p-2 mt-2 rounded overflow-y-scroll">
                    More thingsMore thingsMore thingsMore thingsMore things More
                    things More things More things More things More things More
                </div>
            </div>
            <></>
            <div className="flex-grow sm:w-[50%]">
                <p className="text-center border-l-4 border-red-400 bg-white w-full">
                    Pop Culture News
                </p>
                <div className="overflow-y-scroll last:pb-4">
                    {!loading && (
                        <>
                            {articles.map((post: any) => {
                                const obj = {
                                    author: post.author,
                                    content: post.content,
                                    imageUrl: post.imageUrl,
                                    readMoreUrl: post.readMoreUrl,
                                    title: post.title,
                                };
                                return (
                                    <div>
                                        <ArticleContainer {...obj} />
                                    </div>
                                );
                            })}
                        </>
                    )}
                    {loading && (
                        <div className="max-h-[59vh]">
                            <LoadingMany />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SecondaryContent;
