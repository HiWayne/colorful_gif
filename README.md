# This is a tool that can mix filter to gif, then create a new gif dataURL.Provides an [online site](https://hiwayne.github.io/colorful_gif/site) to try

> ## 这是一个可以把滤镜图片混合进 gif 的库，它会返回一个新的 gif dataURL。提供了一个[在线站点](https://hiwayne.github.io/colorful_gif/site)可以试用。

## Application scenarios

You can generate a lot of nice or meaningful gifs with it. For example, in the demo, I let a person walking with an umbrella become a walk in the clouds. You can also realize your own inspiration. For example, if the icon position in the filter is appropriate, you can watermark the gif, etc...

> 你可以通过它生成很多好看或有意义的 gif。比如在 Demo 中我就让一个撑伞走路的人，变成了在云中漫步。你也可以实现自己的灵感。比如如果滤镜中的 icon 位置合适的话，就可以做到给 gif 打水印等等……

## Demo preview([access](https://hiwayne.github.io/colorful_gif/site))

\* The size of demo's gif-resource below is about 10.5MB, maybe load very slow. You can also access [operational-website](https://hiwayne.github.io/colorful_gif/site), that's faster and can test image whatever you want and download. Or git clone this project and run `npm i && npm run start`

`* 演示的动图大小大约有10.5MB，可能加载的很慢。你还可以访问可操作的站点https://hiwayne.github.io/colorful_gif/site，它可以更快打开并且可以任意测试上传的图片然后下载，或者git clone本项目然后运行npm i && npm run start`

![Demo GIF](https://user-images.githubusercontent.com/42726028/150064941-2ec4e27a-67cc-4005-bbb1-9fdac163e1d6.gif)

## Usage

> support esm 、commonjs and umd

#### First

```shell
npm i colorful_gif
```

#### Second

method 1:

You just need pass `gif url`(such as `https://xxx.gif`) and `filter url`(such as `https://yyy.png`) to `mixFilterToGIF` function ( It is important to note that the url must allow cross-origin! ).

> 你只需要向 `mixFilterToGIF` 函数分别传 gif url 和 滤镜 url 就可以了（务必注意 url 必须允许跨域！）

<br />

```js
import { mixFilterToGIF } from "colorful_gif";
// if in commonjs, use:
// const { mixFilterToGIF } = require("colorful_gif")
// if import from <script src="**/colorful_gif.min.js" />, use directly:
// window.ColorfulGif.mixFilterToGIF

mixFilterToGIF("xxx.gif", "yyy.png").then((newGIFDataURL) => {
  // this will output new gif dataURL
  console.log(newGIFDataURL);

  // you can use this url to do anything……
});
```

<br />
<br />

method 2:

Also you can pass HTMLImageElements to `mixFilterToGIF` function. Look at example below:

> 或者你可以给 `mixFilterToGIF` 函数传入 image 元素，请看下面的例子：

Assume you have a html file like this:

> 假设你有一个像下面这样的 HTML：

<br />

```html
<img id="gif" src="https://xxx.gif" />

<img id="filter" src="https://xxx.png" />

<img id="result" src="" />
```

<br />

You can do this in JavaScript file:

> 你可以在 JavaScript 里面这样做：

<br />

```js
import { mixFilterToGIF } from "colorful_gif";

mixFilterToGIF(
  document.querySelector("#gif"),
  document.querySelector("#filter")
).then((newGIFDataURL) => {
  // this will output new gif dataURL
  console.log(newGIFDataURL);

  // give this url to an image element
  const resultImage = document.querySelector("#result");
  resultImage.src = newGIFDataURL;
});
```

<br />

In the end, the `img` element what's id is `result` will show a new gif with filter.

> 最终，`id` 为 `result` 的 `img` 元素会展示新的带有滤镜的 gif。
