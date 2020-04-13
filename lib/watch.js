import tpl from './tpl.js';

function nop() {}

function watchFontLoaded(fontFamily, options) {
    options = options || {};

    var $test,
        $wrapper,
        $content,
        $innerWrapper,
        $innerContent,
        $testText,
        $referText,
        callback = options.callback || nop,
        failed = options.failed || nop,
        timeout = options.timeout || 3000,
        defaultFont = options.defaultFont || '',
        referText = options.referText || "!\"\\#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~",
        origWidth,
        origHeight,
        fontLoaded,
        supportNativeFontLoader = !!document.fonts,
        timeoutTimer = setTimeout(_loadTimeout, timeout),
        fontLoadFailed;

    function _init() {
        if (supportNativeFontLoader) {
            _fontLoad();
        } else {
            _fakeFontLoad();
        }
    }

    function _fontLoad() {
        document.fonts.load('12px ' + fontFamily, referText).then(function() {
            if (fontLoadFailed) {
                failed();
            } else {
                clearTimeout(timeoutTimer);
                callback();
            }
        }, failed);
    }

    function _fakeFontLoad() {
        $test = document.createElement('div');
        $test.style.cssText = 'position:absolute;top:-10000px;left:-10000px;visibility:hidden;';
        $test.innerHTML = tpl(referText);
        document.body.appendChild($test);

        $wrapper = $test.querySelector('.Font-loader__wrapper');
        $content = $wrapper.querySelector('.Font-loader__content');
        $innerWrapper = $content.querySelector('.Font-loader__inner-wrapper');
        $innerContent = $innerWrapper.querySelector('.Font-loader__inner-content');
        $testText = $test.querySelector('.Font-loader__test');
        $referText = $test.querySelector('.Font-loader__refer');
        origHeight = $content.offsetHeight;
        origWidth = $content.offsetWidth;

        $wrapper.style.width = (origWidth - 1) + 'px';
        $wrapper.style.height = (origHeight - 1) + 'px';
        $wrapper.scrollTop = $wrapper.scrollHeight - $wrapper.clientHeight;
        $wrapper.scrollLeft = $wrapper.scrollWidth - $wrapper.clientWidth;

        $innerContent.style.width = (origWidth + 1) + 'px';
        $innerContent.style.height = (origHeight + 1) + 'px';
        $innerWrapper.scrollTop = $innerWrapper.scrollHeight - $innerWrapper.clientHeight;
        $innerWrapper.scrollLeft = $innerWrapper.scrollWidth - $innerWrapper.clientWidth;

        setTimeout(function() {
            $wrapper.addEventListener('scroll', _checkFont);
            $innerWrapper.addEventListener('scroll', _checkFont);
        });

        $content.style.fontFamily = fontFamily;
        $testText.style.fontFamily = fontFamily;
        $referText.style.fontFamily = defaultFont;
    }

    function _checkFont() {
        if (!fontLoaded && !fontLoadFailed && $testText.offsetWidth !== $referText.offsetWidth) {

            if ($test) {
                $test.parentNode.removeChild($test);
            }

            if (timeoutTimer) {
                clearTimeout(timeoutTimer);
            }

            fontLoaded = true;
            callback();
        }
    }

    function _loadTimeout() {
        if (!fontLoaded) {
            fontLoadFailed = true;

            if ($test) {
                $test.parentNode.removeChild($test);
            }

            failed();
        }
    }

    _init();
}

export default watchFontLoaded
