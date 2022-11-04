import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";
import placeholder from "./img/peepoHey.jpg";
import placeholder2 from "./img/pepejam.png";
import placeholder3 from "./img/SpecsRedBrew.png";
import MainContent from "./components/MainContent";
import SecondaryContent from "./components/SecondaryContent";
import Mylist from "./components/Mylist";
import Otherlist from "./components/Otherlist";
import MemberList from "./components/MemberList";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import DisplayData from "./components/DisplayData";
function App() {
    // Displaying components
    let [mainContent, setMainContent] = useState(true);
    let [myList, setMyList] = useState(false);
    let [otherList, setOtherList] = useState(false);
    let [memberList, setMemberList] = useState(false);
    let [sidebar, setSidebar] = useState(false);
    let [showRegister, setShowRegister] = useState(false);
    let [showLogIn, setShowLogIn] = useState(false);
    let [displayData, setDisplayData] = useState(false);

    // Logged in Status
    let [loggedIn, setLoggedIn] = useState(false);
    let [user, setUser] = useState({});

    // Retrieved Data
    let [loading, setLoading] = useState(true);
    let [currMovie, setCurrMovie] = useState("");
    let [actors, setActors] = useState("");
    let [awards, setAwards] = useState("");
    let [plot, setPlot] = useState("");
    let [boxOffice, setBoxOffice] = useState("");
    let [director, setDirector] = useState("");
    let [genre, setGenre] = useState("");
    let [poster, setPoster] = useState("");
    let [rating, setRating] = useState("");
    let [writers, setWriters] = useState("");
    let [release, setRelease] = useState("");
    let [imdbRating, setImdbRating] = useState("");
    let [title, setTitle] = useState("");
    let [runTime, setRunTime] = useState("");
    let [disabledSearch, setDisabledSearch] = useState(false);

    // console.log(title, runTime, writers, poster);
    // Ctrl + delete Deletes forward word PoG
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        // console.log(loggedInUser);
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            // console.log(foundUser);
            // setUser(loggedInUser);
            setUser(foundUser);
            setLoggedIn(true);
            // console.log("setuser");
        }
        // console.log(user);
    }, []);
    return (
        <div className="bg-stone-100 flex lg:justify-center">
            {displayData && (
                <DisplayData
                    title={title}
                    loading={loading}
                    user={user}
                    setDisplayData={setDisplayData}
                    actors={actors}
                    awards={awards}
                    plot={plot}
                    boxOffice={boxOffice}
                    director={director}
                    genre={genre}
                    poster={poster}
                    rating={rating}
                    writers={writers}
                    release={release}
                    imdbRating={imdbRating}
                    runTime={runTime}
                    setDisabledSearch={setDisabledSearch}
                />
            )}

            {showRegister && (
                <Register
                    setShowRegister={setShowRegister}
                    setShowLogIn={setShowLogIn}
                    setLoggedIn={setLoggedIn}
                    setUser={setUser}
                />
            )}
            {showLogIn && (
                <LogIn
                    setShowRegister={setShowRegister}
                    setShowLogIn={setShowLogIn}
                    setLoggedIn={setLoggedIn}
                    setUser={setUser}
                />
            )}
            <div className="flex w-screen max-w-screen-lg  bg-slate-50  ">
                <div className="h-screen ml-1">
                    {sidebar && (
                        <Sidebar
                            setUser={setUser}
                            setMainContent={setMainContent}
                            setMyList={setMyList}
                            setOtherList={setOtherList}
                            setMemberList={setMemberList}
                            sidebar={sidebar}
                            setSidebar={setSidebar}
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn}
                            showLogIn={showLogIn}
                            setShowLogIn={setShowLogIn}
                            showRegister={showRegister}
                            setShowRegister={setShowRegister}
                        />
                    )}
                </div>
                <div className="flex flex-col w-full h-screen">
                    <Search
                        setTitle={setTitle}
                        setLoading={setLoading}
                        sidebar={sidebar}
                        setSidebar={setSidebar}
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn}
                        showLogIn={showLogIn}
                        setShowLogIn={setShowLogIn}
                        showRegister={showRegister}
                        setShowRegister={setShowRegister}
                        user={user}
                        currMovie={currMovie}
                        setCurrMovie={setCurrMovie}
                        setDisplayData={setDisplayData}
                        setActors={setActors}
                        setAwards={setAwards}
                        setPlot={setPlot}
                        setBoxOffice={setBoxOffice}
                        setDirector={setDirector}
                        setGenre={setGenre}
                        setPoster={setPoster}
                        setRating={setRating}
                        setWriters={setWriters}
                        setRelease={setRelease}
                        setImdbRating={setImdbRating}
                        setRunTime={setRunTime}
                        disabledSearch={disabledSearch}
                        setDisabledSearch={setDisabledSearch}
                    />{" "}
                    {/* Always Active */}
                    {mainContent && (
                        <>
                            <MainContent />
                            <SecondaryContent />
                        </>
                    )}
                    {myList && <Mylist user={user} />}
                    {otherList && <Otherlist />}
                    {memberList && <MemberList />}
                </div>
            </div>
        </div>
    );
}

export default App;
