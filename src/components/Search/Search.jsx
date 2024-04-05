import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { topMeals } from "../Home/TopMeals";
import { searchMenuItem } from "../State/Menu/Action";
import { useDispatch, useSelector } from "react-redux";
import SearchItem from "./SearchItem";

const Search = () => {
    const [query, setQuery] = useState("");
    const [typingTimer, setTypingTimer] = useState(null);
    const doneTypingInterval = 1000; // milliseconds
    const dispatch = useDispatch();
    const { menu } = useSelector((store) => store);
    const onSearch = (keyword) => {
        dispatch(searchMenuItem(keyword));
    };
    const handleInputChange = (event) => {
        const input = event.target.value;
        setQuery(input);
        clearTimeout(typingTimer);
        setTypingTimer(
            setTimeout(() => {
                if (input.trim() !== "") {
                    console.log("searching... ", input);
                    onSearch(input);
                }
            }, doneTypingInterval)
        );
    };

    const handleClick = (keyword) => {
        setQuery(keyword);
        onSearch(keyword);
    };

    

    return (
        <div className="flex flex-col items-start justify-start h-[92vh] px-72">
            <div className="w-full mt-10 mb-5">
                <TextField
                    onFocus={(e) => e.target.select()}
                    value={query}
                    fullWidth
                    id="search"
                    name="search"
                    label="Search Food"
                    variant="outlined"
                    onChange={handleInputChange}
                ></TextField>
            </div>
            <div className="mt-5 font-bold">
                <h1 className="p-2 font-bold">Popular Cuisines</h1>
                <div className="flex flex-row gap-3">
                    {topMeals.slice(0, 8).map((meal, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center cursor-pointer"
                            onClick={() => handleClick(meal.title)}
                        >
                            <img
                                className="w-24 h-24 lg:h-[5rem] lg:w-[5rem] rounded-full object-cover object-center"
                                src={meal.image}
                                alt=""
                            />

                            <div className="flex flex-row flex-wrap items-center justify-center py-2 font-semibold text-xs">
                                <div>{meal.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-5 w-full lg:py-5 lg:pb-10">
                {menu.search.map((item, index) => {
                    return <SearchItem key={index} item={item} />;
                })}
            </div>
        </div>
    );
};

export default Search;
