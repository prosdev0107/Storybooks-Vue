
// Responsive iPhone simulator

export const resizeSimulator = (iPhone, targetedHeight) => {

    var iframe = iPhone.querySelector('iframe');
    var loader = iPhone.querySelector('.loader-over-camera.loader-container');
    var loaderWrapper = iPhone.querySelector('.loader-wrapper');
    var iPhoneSVG = iPhone.querySelector('.iphone-svg');
    var iPhone6 = iPhone.querySelector('.iPhone6');

    // Show loader
    if (loader != null) {
        loader.classList.remove('hidden');
    }

    // So whatever iframe size is, iframe content should always "sees" a width of 325px
    // real width * scale = 325

    // Size of iPhone SVG ?
    var svgWidth = 270;
    var svgHeight = 535;

    // Scale it to target iPhone size
    var sizeFactor = targetedHeight/svgHeight;
    svgWidth *= sizeFactor;
    svgHeight *= sizeFactor;

    // Coords of iframe within the svg
    var viewBoxWidth = 300;
    var viewBoxHeight = 598;
    var iframeTop = Math.floor(svgHeight * 82 / viewBoxHeight);
    var iframeLeft = Math.floor(svgWidth * 21 / viewBoxWidth);
    var iframeWidth = Math.floor(svgWidth * 257 / viewBoxWidth);
    var iframeHeight = Math.floor(svgHeight * 427 / viewBoxHeight);

    // Coords of loader within the svg
    var loaderTop = svgHeight * 11 / viewBoxHeight;
    var loaderWidth = sizeFactor * 28;

    // Now we have everything to scale our simulator

    // Adapt each components to this new height
    iPhoneSVG.style.width = svgWidth + "px";
    iPhoneSVG.style.height = svgHeight + "px";

    iPhone6.style.top = iframeTop + "px";
    iPhone6.style.left = iframeLeft + "px";
    iPhone6.style.width = iframeWidth + "px";
    iPhone6.style.height = iframeHeight + "px";

    if (loader != null) {
        loader.style.top = loaderTop+ "px";
        loaderWrapper.style.width = loaderWidth + "px";
        loaderWrapper.style.height = loaderWidth + "px";
    }

    resizeIframe(iframe, iframeWidth, iframeHeight);
}

export const resizeIframe = (iframe, targetWidth, targetHeight) => {


    // To keep same rendering of clip whatever the size of iframe is,
    // We use css scale property
    // Scale 1 corresponds to iPhone 6S size : 325px x 667px
    var iframeBaseWidth = 361;
    // var iframeBaseHeight = 587;

    // Scale of iframe needed t keep iframe "seen" content at 325px
    var iframeScale = targetWidth / iframeBaseWidth;

    iframe.style.transform = 'scale('+iframeScale+')';
    iframe.style.width = (targetWidth / iframeScale) + "px";
    iframe.style.height = (targetHeight / iframeScale) + "px";

}