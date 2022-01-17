import { useEffect, useRef, useState } from "react";
import "./App.css";
import { mixFilterToGIF } from "./colorfulGif/index";
import gif from "./assets/test.gif";

function App() {
  const gifImgRef = useRef<HTMLImageElement>(null);
  const filterImgRef = useRef<HTMLImageElement>(null);

  const [handledGifURL, setHandledGifURL] = useState("");

  useEffect(() => {
    if (gifImgRef.current !== null && filterImgRef.current !== null) {
      mixFilterToGIF(gifImgRef.current, filterImgRef.current).then((newGIF) => {
        setHandledGifURL(newGIF);
      });
    }
  }, []);

  return (
    <main>
      <img
        ref={gifImgRef}
        src={gif}
        className="App-logo image"
        alt="gif"
        width={(window.innerWidth / 1920) * 400}
        // height={(window.innerWidth / 1920) * 600}
      />
      <img
        ref={filterImgRef}
        src="https://c-ssl.duitang.com/uploads/ops/202111/01/20211101171357_e1d6a.png"
        alt="filter"
        className="image"
        width={(window.innerWidth / 1920) * 400}
        // height={(window.innerWidth / 1920) * 600}
      />
      <img
        src={handledGifURL}
        className="image"
        alt="handled-gif"
        width={(window.innerWidth / 1920) * 400}
        // height={(window.innerWidth / 1920) * 600}
      />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </main>
  );
}

export default App;
