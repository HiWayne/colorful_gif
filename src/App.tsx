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

  const download = useCallback(() => {
    if (handledGifURL) {
      const downloadDom = document.createElement("a");
      // 此属性的值就是下载时图片的名称，注意，名称中不能有半角点，否则下载时后缀名会错误
      downloadDom.setAttribute("download", "transformed_gif.gif");
      downloadDom.href = handledGifURL;
      downloadDom.click();
    } else {
      alert("not found transformed gif");
    }
  }, [handledGifURL]);

  return (
    <>
      <header className="header">
        <h3>滤镜gif Demo，点击『生成』按钮试试吧</h3>
        <p>你也可以自己上传gif和滤镜图片</p>
        <p className="tip">* 第一张图片必须是gif</p>
        <p className="tip">* 滤镜图片必须是带有透明度的png</p>
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
          <div className="bottom">
            输出结果
            <button
              className="button"
              style={{ marginLeft: "10px" }}
              onClick={download}
            >
              下载至本地
            </button>
          </div>
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
