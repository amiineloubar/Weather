import React, { useState } from "react";
import MainContainer from "./MainContainer";
import { gsap } from "gsap";

function SearchBar() {
  const [value, setValue] = useState();
  function getValue() {
    const input = document.querySelector(".search-bar").value;
    const mainContainer = document.querySelector(".main-container");
    gsap.to(mainContainer, {
      duration: 1,
      display: "flex",
      opacity: 1,
    });

    return setValue(input);
  }
  return (
    <>
      <div className="input-container">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          name="search"
          placeholder="Enter your location..."
          className="search-bar"
        />
        <button className="search-btn" onClick={getValue}>
          Search
        </button>
      </div>
      <MainContainer location={value} />
    </>
  );
}

export default SearchBar;
