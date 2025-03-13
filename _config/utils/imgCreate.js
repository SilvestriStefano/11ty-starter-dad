import path from 'path';
import Image from '@11ty/eleventy-img';
import presets from './imgPresets.js';

export const imgCreate = async (src, opts) => {
    let metadata = await Image(path.join('./src', src), {
      outputDir:"public/assets/img/",
      urlPath: "/assets/img/",
      formats: presets[opts.preset].formats,
      widths: presets[opts.preset].widths,
      filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src)
				const name = path.basename(src, extension)
				return `${name}-${width}w.${format}`
			}
    });

  const pictureOut = Image.generateHTML(metadata, {
    alt: opts.alt || '',
    ...(opts.classes && { class: opts.classes }),
    decoding: opts.decoding,
    loading: opts.loading,
    ...(presets[opts.preset].sizes && { sizes: presets[opts.preset].sizes }),
    });

  return pictureOut;
};
