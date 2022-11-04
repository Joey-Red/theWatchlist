import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowAltCircleDown,
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
function MainContent() {
    let [index, setIndex] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            changeCount(1);
        }, 5000);
        return () => clearInterval(interval);
    }, [index]);

    let changeCount = (number) => {
        if (index === 3 && number === 1) {
            return setIndex(1);
        } else if (index === 1 && number === -1) {
            return setIndex(3);
        } else {
            setIndex((index) => {
                return index + number;
            });
        }
    };
    return (
        <div className="h-min relative h-2/6 flex flex-col bg-slate-50 rounded group m-2">
            <div className="rounded-tr rounded-tl flex bg-slate-900/90 text-white py-2 min-w-full max-w-full absolute hidden sm:flex">
                <p className="min-w-fit px-2"> Trending on The Watchlist</p>
                {/* <div className="justify-evenly flex truncate w-full">
                    <a
                        href="#"
                        className="hover:text-red-900 hover:underline truncate"
                    >
                        Step Brothers
                    </a>
                    <a
                        href="#"
                        className="hover:text-red-900 hover:underline truncate"
                    >
                        Smile
                    </a>
                    <a
                        href="#"
                        className="hover:text-red-900 hover:underline truncate"
                    >
                        Journey to the Center of the Earth
                    </a>
                </div> */}
            </div>
            <div className="h-full flex sm:mt-10 bg-stone-50 gap-2 md:flex hidden">
                <div className="min-h-[143px] w-full sm:w-1/3 rounded sm:rounded-tr-[0px] sm:rounded-tl-[0px] flex justify-center items-center bg-blue-200 ">
                    <p>content</p>
                </div>
                <div className="min-h-[143px] sm:w-1/3 rounded sm:rounded-tr-[0px] sm:rounded-tl-[0px] flex justify-center items-center bg-blue-200 ">
                    content1
                </div>
                <div className="min-h-[143px] sm:w-1/3 rounded sm:rounded-tr-[0px] sm:rounded-tl-[0px] flex justify-center items-center bg-blue-200 ">
                    content1
                </div>
            </div>
            <div className="h-full flex sm:mt-10 bg-stone-50 gap-2 sm:flex hidden md:hidden">
                <div className="min-h-[143px] w-full sm:w-1/2 rounded sm:rounded-tr-[0px] sm:rounded-tl-[0px] flex justify-center items-center bg-blue-200 ">
                    <p>content</p>
                </div>
                <div className="min-h-[143px] sm:w-1/2 rounded sm:rounded-tr-[0px] sm:rounded-tl-[0px] flex justify-center items-center bg-blue-200 ">
                    content1
                </div>
            </div>
            <div className="h-full flex sm:mt-10 bg-stone-50 gap-2 sm:hidden">
                <button
                    onClick={() => changeCount(-1)}
                    className="hover:bg-white hover:text-black text-white absolute left-0 top-0 bottom-0 w-8 bg-slate-900/60 rounded-tl rounded-bl"
                >
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                </button>
                {index === 1 && (
                    <div className="min-h-[143px] w-full sm:w-1/3 rounded sm:rounded-tr-[0px] sm:rounded-tl-[0px] flex justify-center items-center bg-blue-200">
                        <p>content one</p>
                    </div>
                )}

                {index === 2 && (
                    <div className="min-h-[143px] w-full sm:w-1/3 rounded sm:rounded-tr-[0px] sm:rounded-tl-[0px] flex justify-center items-center bg-blue-200 ">
                        content two
                    </div>
                )}

                {index === 3 && (
                    <div className="min-h-[143px] w-full sm:w-1/3 rounded sm:rounded-tr-[0px] sm:rounded-tl-[0px] flex justify-center items-center bg-blue-200 ">
                        content three
                    </div>
                )}
                <button
                    onClick={() => changeCount(1)}
                    className="hover:bg-white hover:text-black text-white absolute right-0 top-0 bottom-0 w-8 bg-slate-900/60 rounded-tr rounded-br"
                >
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </button>
            </div>
        </div>
    );
}

export default MainContent;
