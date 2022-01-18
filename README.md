# This is a tool that can mix filter to gif, then create a new gif dataURL.

> ## 这是一个可以把滤镜图片混合进 gif 的库，它会返回一个新的 gif dataURL

## Demo preview

## Usage 使用

#### First 第一步

```shell
npm i colorful_gif
```

#### Second 第二步

You just need pass `gif_url`(such as `https://xxx.gif`) and `filter_url`(such as `https://yyy.png`) to `mixFilterToGIF` function ( It is important to note that the url must allow cross-origin! ).

> 你只需要向 `mixFilterToGIF` 函数分别传 gif url 和 滤镜 url 就可以了（务必注意 url 必须允许跨域！）

```js
import { mixFilterToGIF } from "colorful_gif";

mixFilterToGIF("xxx.gif", "yyy.png").then((newGIFDataURL) => {
  // this will output new gif dataURL 这里将打印出一个新的gif dataURL
  console.log(newGIFDataURL);
});
```

Also you can pass HTMLImageElement to `mixFilterToGIF` function. Look at example below:

> 或者你可以给 `mixFilterToGIF` 函数传入 image 元素，请看下面的例子：

Assume you have a html file like this:

> 假设你有一个像下面这样的 HTML：

```html
<img id="gif" src="https://xxx.gif" />

<img id="filter" src="https://xxx.png" />

<img id="result" src="" />
```

You can do this in JavaScript file:

> 你可以在 JavaScript 里面这样做：

```js
import { mixFilterToGIF } from "colorful_gif";

mixFilterToGIF(
  document.querySelector("#gif"),
  document.querySelector("#filter")
).then((newGIFDataURL) => {
  // this will output new gif dataURL 这里将打印出一个新的gif dataURL
  console.log(newGIFDataURL);

  const resultImage = document.querySelector("#result");
  resultImage.src = newGIFDataURL;
});
```

Finally, the `img` element what's id is `result` will show a new gif with filter.

> 最终，`id` 为 `result` 的 `img` 元素会展示新的带有滤镜的 gif。
