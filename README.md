# This is a tool that can mix filter to gif, then create a new gif dataURL. Provides an [online site](https://hiwayne.github.io/colorful_gif/site) to try. You can also convert some pictures, videos, or even computer camera live recordings into gif using the exported createGIF method!

> ## 这是一个可以把滤镜图片混合进 gif 的库，它会返回一个新的 gif dataURL。提供了一个[在线站点](https://hiwayne.github.io/colorful_gif/site)可以试用。你还可以利用导出的 createGIF 方法把多张图片、视频、甚至电脑摄像头的实时录制转换成 gif！

<br />

## Application scenarios

You can generate a lot of nice or meaningful gif with it. For example, in the demo, I let a person walking with an umbrella become a walk in the clouds. You can also realize your own inspiration. For example, if the icon position in the filter is appropriate, you can watermark the gif, etc...

> 你可以通过它生成很多好看或有意义的 gif。比如在 Demo 中我就让一个撑伞走路的人，变成了在云中漫步。你也可以实现自己的灵感。比如如果滤镜中的 icon 位置合适的话，就可以做到给 gif 打水印等等……

<br />

## Demo preview([access](https://hiwayne.github.io/colorful_gif/site))

\* The size of demo's gif-resource below is about 10.5MB, maybe load very slow. You can also access [operational-website](https://hiwayne.github.io/colorful_gif/site), that's faster and can test image whatever you want and download. Or git clone this project and run `npm i && npm run start`

`* 演示的动图大小大约有10.5MB，可能加载的很慢。你还可以访问可操作的站点https://hiwayne.github.io/colorful_gif/site，它可以更快打开并且可以任意测试上传的图片然后下载，或者git clone本项目然后运行npm i && npm run start`

![Demo GIF](https://user-images.githubusercontent.com/42726028/150064941-2ec4e27a-67cc-4005-bbb1-9fdac163e1d6.gif)

<br />

## Usage

> support esm 、commonjs and umd

<br />

#### First

```shell
npm i colorful_gif
```

<br />

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

---

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

<br />

---

<br />

You can convert some pictures, videos, or even computer camera recordings into gif using the `createGIF` function. `createGIF` comes from `gifshot.createGIF`. Please refer to [https://github.com/yahoo/gifshot](https://github.com/yahoo/gifshot) for specific usage

> 你还可以利用 `createGIF` 函数把多张图片、视频、甚至电脑摄像头的录制转换成 gif。`createGIF` 来源于 `gifshot.createGIF`。具体用法请参考 [https://github.com/yahoo/gifshot](https://github.com/yahoo/gifshot)

```js
import { createGIF } from "colorful_gif";

// createGIF comes from gifshot.createGIF
// About gifshot, you can view https://github.com/yahoo/gifshot
```

<br />

---

<br />

Finally thanks for **[gifshot](https://github.com/yahoo/gifshot)** and **[libgif](https://github.com/kelyvin/libgif-js)**(forked from https://github.com/buzzfeed/libgif-js)
