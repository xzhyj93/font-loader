import {isSupportFontDisplay, watchFontLoaded} from './node_modules/font-loader/lib/index.js'

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