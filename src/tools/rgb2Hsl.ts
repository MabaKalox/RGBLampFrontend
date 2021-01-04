/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @return  {Array}           The RGB representation
 * @param rgbArr
 */
const rgb2Hsl = (rgbArr: number[]) => {
    const r1 = rgbArr[0] / 255;
    const g1 = rgbArr[1] / 255;
    const b1 = rgbArr[2] / 255;

    const maxColor = Math.max(r1, g1, b1);
    const minColor = Math.min(r1, g1, b1);
    //Calculate L:
    let L = (maxColor + minColor) / 2;
    let S = 0;
    let H = 0;
    if (maxColor !== minColor) {
        //Calculate S:
        if (L < 0.5) {
            S = (maxColor - minColor) / (maxColor + minColor);
        } else {
            S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }
        //Calculate H:
        if (r1 === maxColor) {
            H = (g1 - b1) / (maxColor - minColor);
        } else if (g1 === maxColor) {
            H = 2.0 + (b1 - r1) / (maxColor - minColor);
        } else {
            H = 4.0 + (r1 - g1) / (maxColor - minColor);
        }
    }

    L = L * 100;
    S = S * 100;
    H = H * 60;
    if (H < 0) {
        H += 360;
    }
    return [H, S, L].map(a => Math.round(a));
}

export default rgb2Hsl