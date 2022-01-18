import { useCallback, useEffect, useRef, useState } from "react";
import "./App.less";
import { mixFilterToGIF } from "./colorfulGif/index";
import { Upload, Loading } from "./components/index";
import default_gif from "./assets/default_gif.gif";
import default_filter from "./assets/default_filter.png";

const DEFAULT_GIF = default_gif;
const DEFAULT_FILTER = default_filter;

function App() {
  const [gif, setGif] = useState(DEFAULT_GIF);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [handledGifURL, setHandledGifURL] = useState("");
  const gifImgRef = useRef<HTMLImageElement>(null);
  const filterImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (gifImgRef.current !== null && filterImgRef.current !== null) {
      mixFilterToGIF(gifImgRef.current, filterImgRef.current).then((newGIF) => {
        setHandledGifURL(newGIF);
      });
    }
  }, []);

  const handleCreateClick = useCallback(() => {
    if (gifImgRef.current !== null && filterImgRef.current !== null) {
      setHandledGifURL("");
      mixFilterToGIF(gifImgRef.current, filterImgRef.current).then((newGIF) => {
        setHandledGifURL(newGIF);
      });
    }
  }, []);

  return (
    <>
      <header className="header">
        <h3>滤镜gif Demo</h3>
        <p>也可以自己上传gif和滤镜图片，然后点击『生成』按钮试试</p>
        <p className="tip">* 滤镜图片必须带有透明度</p>
      </header>
      <main className="main">
        <section className="section">
          <img
            ref={gifImgRef}
            src={gif}
            className="App-logo image"
            alt="gif"
            width={(window.innerWidth / 1920) * 400}
          />
          <div className="bottom">
            <span>gif: </span>
            <Upload
              style={{ width: "calc(100% - 30px)" }}
              accept="image/gif"
              onChange={(dataURL) => {
                setGif(dataURL);
              }}
            />
          </div>
        </section>
        <section className="section">
          <img ref={filterImgRef} src={filter} alt="filter" className="image" />
          <div className="bottom">
            <span>png: </span>
            <Upload
              style={{ width: "calc(100% - 40px)" }}
              accept="image/png"
              onChange={(dataURL) => {
                setFilter(dataURL);
              }}
            />
          </div>
        </section>
        <section className="section">
          {handledGifURL ? (
            <>
              <img src={handledGifURL} className="image" alt="handled-gif" />
            </>
          ) : (
            <div className="loading-wrapper">
              <Loading type="ring" text="生成中" />
            </div>
          )}
          <p className="bottom">输出结果</p>
        </section>
      </main>
      <footer className="footer">
        <button className="button" onClick={handleCreateClick}>
          生成
        </button>
      </footer>
    </>
  );
}

export default App;
