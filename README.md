# This is a tool that can mix filter to gif, then create a new gif dataURL.

> ## 这是一个可以把滤镜图片混合进 gif 的库，它会返回一个新的 gif dataURL

## Demo preview([access](https://hiwayne.github.io/colorful_gif/site))

\* The size of demo's gif-resource below is about 10.5MB, maybe load very slow. You can also access [online-website](https://hiwayne.github.io/colorful_gif/site), that's faster and can test effect whatever you want. Or git clone this project and run `npm i && npm run start`

`* 演示的动图大小大约有10.5MB，可能加载的很慢。你还可以访问在线站点，它可以更快打开并且可以任意测试效果，或者git clone本项目然后运行npm i && npm run start`

![Demo GIF](https://user-images.githubusercontent.com/42726028/150064941-2ec4e27a-67cc-4005-bbb1-9fdac163e1d6.gif)

## Usage

<br />

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
  // this will output new gif dataURL 这里将打印出一个新的gif dataURL
  console.log(newGIFDataURL);

  // give this url to an image element
  const resultImage = document.querySelector("#result");
  resultImage.src = newGIFDataURL;
});
```

<br />

In the end, the `img` element what's id is `result` will show a new gif with filter.

> 最终，`id` 为 `result` 的 `img` 元素会展示新的带有滤镜的 gif。
