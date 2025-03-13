import path from 'path';
import { imgCreate as createPicture } from '../../utils/imgCreate.js';


function wrapFigure(output, caption, id) {
    return `<figure role="figure" aria-labelledby="${id}">${output}<figcaption id="${id}">${caption}</figcaption></figure>`;
}

export const image = async (src, opts) => {
    if (opts) {
        if (!Object.hasOwn(opts, "alt")) opts.alt = "";
        if (!Object.hasOwn(opts, "caption")) opts.caption = "";
        if (!Object.hasOwn(opts, "classes")) opts.classes = "";
        if (!Object.hasOwn(opts, "preset")) opts.preset = "default";
        if (!Object.hasOwn(opts, "loading")) opts.loading = "lazy";
        if (!Object.hasOwn(opts, "decoding")) opts.decoding = "async";
    } else {
        opts = { "alt": "", "caption": "", "classes": "", "preset": "default", "loading": "lazy", "decoding": "async" };
    }
    const extension = path.extname(src)
    const name = path.basename(src, extension)
    let picHTML = await createPicture(src, opts);
    return opts.caption ? wrapFigure(picHTML, opts.caption, name) : picHTML;
}
