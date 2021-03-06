import SuperGif from "libgif";
import gifshot from "gifshot";

enum DataURLTypes {
  PNG = "image/png",
  JPG = "image/jpg",
  JPEG = "image/jpeg",
}

// 将canvas转换成dataURL
const convertCanvasToDataURL = (
  canvas: HTMLCanvasElement,
  type: DataURLTypes,
  quality?: any
): string => {
  return canvas.toDataURL(type, quality);
};

// 创建image对象
const createImageElement = (src: string): Promise<HTMLImageElement> =>
  new Promise<any>((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (e) => {
      reject(e);
    };
    image.onabort = (e) => {
      reject(e);
    };
  });

const waitAllImageLoadingComplete = (
  imageDoms: HTMLImageElement[]
): Promise<any[]> =>
  Promise.all(
    imageDoms.map(
      (imageDom) =>
        new Promise((resolve, reject) => {
          if (imageDom.complete) {
            resolve(imageDom);
            return;
          }
          imageDom.onload = () => {
            resolve(imageDom);
          };
          imageDom.onerror = (e) => {
            reject(e);
          };
          imageDom.onabort = (e) => {
            reject(e);
          };
        })
    )
  );

interface CoverSize {
  width: number;
  height: number;
  topOffset: number;
  leftOffset: number;
}

const computeCoverSize = (
  imageObj1: HTMLImageElement,
  imageObj2: HTMLImageElement
): CoverSize => {
  const { width: width1, height: height1 } = imageObj1;
  const { width: width2, height: height2 } = imageObj2;
  const ratio1 = width1 / height1;
  const ratio2 = width2 / height2;
  if (ratio1 > ratio2) {
    const scaleRatio = Math.abs(width1 - width2) / width2;
    if (width1 > width2) {
      const newWidth = width2 * (1 + scaleRatio);
      const newHeight = height2 * (1 + scaleRatio);
      const topOffset = (height1 - newHeight) / 2;
      return { width: newWidth, height: newHeight, topOffset, leftOffset: 0 };
    } else if (width1 < width2) {
      const newWidth = width2 * (1 - scaleRatio);
      const newHeight = height2 * (1 - scaleRatio);
      const topOffset = (height1 - newHeight) / 2;
      return { width: newWidth, height: newHeight, topOffset, leftOffset: 0 };
    } else {
      const topOffset = (height1 - height2) / 2;
      return { width: width2, height: height2, topOffset, leftOffset: 0 };
    }
  } else if (ratio1 < ratio2) {
    const scaleRatio = Math.abs(height1 - height2) / height2;
    if (height1 > height2) {
      const newHeight = height2 * (1 + scaleRatio);
      const newWidth = width2 * (1 + scaleRatio);
      const leftOffset = (width1 - newWidth) / 2;
      return { width: newWidth, height: newHeight, topOffset: 0, leftOffset };
    } else if (height1 < height2) {
      const newHeight = height2 * (1 - scaleRatio);
      const newWidth = width2 * (1 - scaleRatio);
      const leftOffset = (width1 - newWidth) / 2;
      return { width: newWidth, height: newHeight, topOffset: 0, leftOffset };
    } else {
      const leftOffset = (width1 - width2) / 2;
      return { width: width2, height: height2, topOffset: 0, leftOffset };
    }
  } else {
    return { width: width2, height: height2, topOffset: 0, leftOffset: 0 };
  }
};

/**
 * @description gifshot库的createGIF方法的别名，用来将图片或视频等资源创建成gif，使用请查看gifshot的文档: https://github.com/yahoo/gifshot
 */
export const createGIF = gifshot.createGIF;

/**
 * @description 向gif中添加滤镜，生成一个新的gif
 * @param gif gif的资源地址或带有gif的image元素对象
 * @param filter 滤镜的资源地址或带有滤镜图片的image元素对象
 * @returns Promise<new-gif-dataURL>
 */
export const mixFilterToGIF = (
  gif: string | HTMLImageElement,
  filter: string | HTMLImageElement
): Promise<string | any> => {
  let parentDom: HTMLElement | null;
  let siblingDom: Node | null;
  let gifImageDom: HTMLImageElement;
  let filterImageDom: HTMLImageElement;
  let durationMsTimeTotal = 0;
  const handledImageURLList: string[] = [];
  if (typeof gif === "string") {
    gifImageDom = new Image();
    gifImageDom.src = gif;
  } else if (gif instanceof HTMLImageElement) {
    gifImageDom = gif;
    parentDom = gifImageDom.parentElement;
    siblingDom = gifImageDom.nextSibling;
  } else {
    throw new Error(
      `The parameter 0 of mixFilterToGIF should be a url or HTMLImageElement`
    );
  }
  if (typeof filter === "string") {
    filterImageDom = new Image();
    filterImageDom.src = filter;
  } else if (gif instanceof HTMLImageElement) {
    filterImageDom = filter;
  } else {
    throw new Error(
      `The parameter 1 of mixFilterToGIF should be a url or HTMLImageElement`
    );
  }
  if (gifImageDom !== null && filterImageDom !== null) {
    gifImageDom.crossOrigin = "Anonymous";
    filterImageDom.crossOrigin = "Anonymous";
    return waitAllImageLoadingComplete([gifImageDom, filterImageDom])
      .then((imageDoms) => {
        const filterCoverSize = computeCoverSize(imageDoms[0], imageDoms[1]);
        const { width: gifOriginalWidth, height: gifOriginalHeight } =
          imageDoms[0];
        const styles = window.getComputedStyle(imageDoms[0]);
        const gifWidth = parseFloat(styles.width as string);
        const gifHeight = parseFloat(styles.height as string);
        const {
          width: filterImageWidth,
          height: filterImageHeight,
          topOffset,
          leftOffset,
        } = filterCoverSize;
        const rub: SuperGif = new SuperGif({
          gif: gifImageDom,
          max_width: gifWidth,
        });
        return new Promise((resolve, reject) => {
          rub.load(() => {
            const imageLength = rub.get_length();
            const waitQueue = [];
            durationMsTimeTotal = rub.get_duration_ms();
            // 对每帧图片进行滤镜合成，异步
            for (let i = 0; i < imageLength; i++) {
              rub.move_to(i);
              const imageUrl = convertCanvasToDataURL(
                rub.get_canvas(),
                DataURLTypes.PNG
              );
              waitQueue.push(
                createImageElement(imageUrl)
                  .then((imageDom) => {
                    const canvas = document.createElement("canvas");
                    canvas.width = gifWidth;
                    canvas.height = gifHeight;
                    const context = canvas.getContext("2d");
                    context!.drawImage(
                      imageDom,
                      0,
                      0,
                      gifOriginalWidth,
                      gifOriginalHeight
                    );
                    context!.drawImage(
                      filterImageDom,
                      leftOffset,
                      topOffset,
                      filterImageWidth,
                      filterImageHeight
                    );
                    const dataURL = convertCanvasToDataURL(
                      canvas,
                      DataURLTypes.PNG
                    );
                    handledImageURLList.push(dataURL);
                  })
                  .catch((e) => {
                    console.error(
                      `The ${
                        i + 1
                      }st image of gif when created imageElement occurred error:`
                    );
                    console.error(e);
                    reject(e);
                  })
              );
            }
            // 合成完成后合并成新gif
            Promise.all(waitQueue).then(() => {
              createGIF(
                {
                  images: handledImageURLList,
                  gifWidth,
                  gifHeight,
                  interval:
                    (Math.round(
                      durationMsTimeTotal / handledImageURLList.length / 10
                    ) *
                      10) /
                    1000,
                },
                function (result) {
                  if (!result.error) {
                    resolve(result.image);
                  } else {
                    reject();
                  }
                }
              );
            });
          });
        });
      })
      .catch((e) => {
        console.error(
          "An error occurred when waitAllImageLoadingComplete called:"
        );
        console.error(e);
        return Promise.reject(e);
      })
      .finally(() => {
        // 原来的gifDom会被SuperGif替换为canvas，为了能重复调用本函数，需要在完成后再换回来
        if (parentDom) {
          if (siblingDom) {
            const currentGifCanvasDom = siblingDom.previousSibling;
            if (currentGifCanvasDom) {
              parentDom.removeChild(currentGifCanvasDom);
              parentDom.insertBefore(gifImageDom, siblingDom);
            }
          } else {
            parentDom.appendChild(gifImageDom);
          }
        }
      });
  } else {
    const errorMessage = "The parameters of mixFilterToGIF are not valid type";
    console.error(errorMessage);
    return Promise.reject(errorMessage);
  }
};
