/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @return  {Array}           The RGB representation
 * @param h
 * @param s
 * @param l
 */

const hsl2Rgb = (h: number, s: number, l: number) => {
    s = s / 100;
    l = l / 100;
    let c;
    let x;
    let rgb;
    c = (1 - Math.abs(2 * l - 1)) * s;
    x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - c / 2;
    if (h >= 0 && h < 60) {
        rgb = [c, x, 0]
    }
    else if (h >= 60 && h < 120) {
        rgb = [x, c, 0]
    }
    else if (h >= 120 && h < 180) {
        rgb = [0, c, x]
    }
    else if (h >= 180 && h < 240) {
        rgb = [0, x, c]
    }
    else if (h >= 240 && h < 300) {
        rgb = [x, 0, c]
    }
    else {
        rgb = [c, 0, x]
    }
    return rgb.map(v => 255 * (v + m) | 0);
}

export default hsl2Rgb