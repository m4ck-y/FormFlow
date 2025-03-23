//https://fireship.io/snippets/use-media-query-hook/


import { useState, useEffect } from "react";

const useMediaQuery = (query:string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

export default useMediaQuery;


/**
 * 
import React from "react";
import "./index.css";
import useMediaQuery from "./hooks/useMediaQuery";

function App() {
  // You can use any @media property
  const isDesktop = useMediaQuery('(min-width: 500)');

  return (
    <div className="App">
      {isDesktop ? <h1>Desktop</h1> : <h1>Mobile</h1>}
      <Navbar isDesktop={isDesktop}/>
    </div>
  );
}

// Navbar component
const Navbar = ({isDesktop}) => (
  <nav className={`base ${isDesktop ? "desktop" : "mobile"}`}>
    <Icon />
    <Icon />
    <Icon />
    <Icon />
  </nav>
);
 */