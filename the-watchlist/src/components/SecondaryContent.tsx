import React, { useEffect, useState } from "react";
import Axios, { AxiosError } from "axios";
import placeholder from "../img/download.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ArticleContainer from "./ArticleContainer";
function SecondaryContent() {
    let [articles, setArticles] = useState([{}]);
    let [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     Axios.get("https://inshorts.deta.dev/news?category=entertainment")
    //         .then((res) => {
    //             setArticles(res.data.data);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             if (axios.isAxiosError(err)) {
    //                 // Access to config, request, and response
    //             } else {
    //                 // Just a stock error
    //             }
    //         });
    // }, []);
    // bg-gray-800
    return (
        <div className="flex-grow flex gap-2 m-2 mt-0 overflow-y-hidden">
            <div className="h-full w-[50%] rounded flex flex-col">
                <div className="bg-blue-200 rounded">
                    <p className="p-2 text-center">
                        People with similar ratings
                    </p>
                    <div className="flex flex-col p-2 rounded">
                        <a href="#" className="hover:underline">
                            Eric Jeffery
                        </a>{" "}
                        <a href="#" className="hover:underline">
                            Eric Jeffery
                        </a>{" "}
                        <a href="#" className="hover:underline">
                            Eric Jeffery
                        </a>{" "}
                        <a href="#" className="hover:underline">
                            Eric Jeffery
                        </a>
                    </div>
                </div>
                <div className="bg-blue-200 p-2 flex-grow mt-2 rounded overflow-y-scroll">
                    More thingsMore thingsMore thingsMore thingsMore things More
                    things More things More things More things More things More
                </div>
            </div>
            <div className="flex-grow w-[50%] max-h-full">
                <p className="text-center border-l-4 border-red-400 bg-white w-full">
                    Pop Culture News
                </p>
                <div className="overflow-x-hidden max-h-full overflow-y-scroll last:pb-4">
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
                        <>
                            <div className="flex-grow my-2 p-2 bg-black/90 rounded text-white h-full">
                                <div className="border border-grey-900 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow my-2 p-2 bg-black/90 rounded text-white h-full">
                                <div className="border border-grey-900 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow my-2 p-2 bg-black/90 rounded text-white h-full">
                                <div className="border border-grey-900 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow my-2 p-2 bg-black/90 rounded text-white h-full">
                                <div className="border border-grey-900 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow my-2 p-2 bg-black/90 rounded text-white h-full">
                                <div className="border border-grey-900 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow my-2 p-2 bg-black/90 rounded text-white h-full">
                                <div className="border border-grey-900 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-6 py-1">
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                </div>
                                                <div className="h-2 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SecondaryContent;
