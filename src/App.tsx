import { useCallback, useRef, useState } from "react";
import "./App.less";
import { mixFilterToGIF } from "./colorfulGif/index";
import { Upload, Loading } from "./components/index";
import { default as DEFAULT_GIF } from "./assets/default_gif.gif";
import { default as DEFAULT_FILTER } from "./assets/default_filter.png";

function App() {
  const [gif, setGif] = useState(DEFAULT_GIF);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [handledGifURL, setHandledGifURL] = useState("");
  const [isLoading, setLoading] = useState(false);
  const gifImgRef = useRef<HTMLImageElement>(null);
  const filterImgRef = useRef<HTMLImageElement>(null);

  const handleCreateClick = useCallback(() => {
    if (gifImgRef.current !== null && filterImgRef.current !== null) {
      setLoading(true);
      mixFilterToGIF(gifImgRef.current, filterImgRef.current).then((newGIF) => {
        setHandledGifURL(newGIF);
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      <header className="header">
        <h3>滤镜gif Demo，点击『生成』按钮试试吧</h3>
        <p>你也可以自己上传gif和滤镜图片</p>
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
          {isLoading ? (
            <div className="loading-wrapper">
              <Loading type="ring" text="生成中" />
            </div>
          ) : handledGifURL ? (
            <>
              <img src={handledGifURL} className="image" alt="handled-gif" />
            </>
          ) : (
            <div className="loading-wrapper"></div>
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
