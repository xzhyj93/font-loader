export default function tpl(referText) {
    return '<div class="Font-loader__wrapper" style="position:absolute; top:0; left:0; overflow:hidden;"><div class="Font-loader__content" style="position:relative; white-space:nowrap;"><div class="Font-loader__inner-wrapper" style="position:absolute; width:100%; height:100%; overflow:hidden;"><div class="Font-loader__inner-content"></div></div>' + referText + '</div></div><span class="Font-loader__test" style="white-space:nowrap">' + referText + '</span><span class="Font-loader__refer" style="white-space:nowrap">' + referText + "</span>";
}
