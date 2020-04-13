<center>检测字体加载状态以及后备方案的工具</center>

## 安装

```
npm install @h2/font-laoder
```

## 使用
1. 检测浏览器是否支持 font-display CSS 属性。如果支持可以直接使用原生 CSS 控制字体加载模式
2. 如果不支持 font-display，则监听字体加载状态

```js
import {isSupportFontDisplay, watchFontLoaded} from '@h2/font-loader'

if (!isSupportFontDisplay()) {
    document.body.classList.add('font_loading');

    watchFontLoaded('test-font', {
        callback: function() {
            console.log('字体加载完成。Font loaded')
            document.body.classList.remove('font_loading');
        },
        defaultFont: 'sans-serif',
    })
} else {
    console.log('This environment supports the font-display property, and font-display can be used to set the font loading behavior directly')
}
```
## [示例](./demo)