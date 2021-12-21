import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { writeFileSync } from 'fs';
import { BREAKPOINTS } from '../utils/breakpoints.js';

const base = 'https://tailwindcss.com';
const urls = [
  '/docs/aspect-ratio',
  '/docs/columns',
  '/docs/break-after',
  '/docs/break-before',
  '/docs/break-inside',
  '/docs/box-decoration-break',
  '/docs/box-sizing',
  '/docs/display',
  '/docs/float',
  '/docs/clear',
  '/docs/isolation',
  '/docs/object-fit',
  '/docs/object-position',
  '/docs/overflow',
  '/docs/overscroll-behavior',
  '/docs/position',
  '/docs/top-right-bottom-left',
  '/docs/visibility',
  '/docs/z-index',
  '/docs/flex-basis',
  '/docs/flex-direction',
  '/docs/flex-wrap',
  '/docs/flex',
  '/docs/flex-grow',
  '/docs/flex-shrink',
  '/docs/order',
  '/docs/grid-template-columns',
  '/docs/grid-column',
  '/docs/grid-template-rows',
  '/docs/grid-row',
  '/docs/grid-auto-flow',
  '/docs/grid-auto-columns',
  '/docs/grid-auto-rows',
  '/docs/gap',
  '/docs/justify-content',
  '/docs/justify-items',
  '/docs/justify-self',
  '/docs/align-content',
  '/docs/align-items',
  '/docs/align-self',
  '/docs/place-content',
  '/docs/place-items',
  '/docs/place-self',
  '/docs/padding',
  '/docs/margin',
  '/docs/space',
  '/docs/width',
  '/docs/min-width',
  '/docs/max-width',
  '/docs/height',
  '/docs/min-height',
  '/docs/max-height',
  '/docs/font-family',
  '/docs/font-size',
  '/docs/font-smoothing',
  '/docs/font-style',
  '/docs/font-weight',
  '/docs/font-variant-numeric',
  '/docs/letter-spacing',
  '/docs/line-height',
  '/docs/list-style-type',
  '/docs/list-style-position',
  '/docs/text-align',
  '/docs/text-color',
  '/docs/text-decoration',
  '/docs/text-decoration-color',
  '/docs/text-decoration-style',
  '/docs/text-decoration-thickness',
  '/docs/text-underline-offset',
  '/docs/text-transform',
  '/docs/text-overflow',
  '/docs/text-indent',
  '/docs/vertical-align',
  '/docs/whitespace',
  '/docs/word-break',
  '/docs/content',
  '/docs/background-attachment',
  '/docs/background-clip',
  '/docs/background-color',
  '/docs/background-origin',
  '/docs/background-position',
  '/docs/background-repeat',
  '/docs/background-size',
  '/docs/background-image',
  '/docs/gradient-color-stops',
  '/docs/border-radius',
  '/docs/border-width',
  '/docs/border-color',
  '/docs/border-style',
  '/docs/divide-width',
  '/docs/divide-color',
  '/docs/divide-style',
  '/docs/outline-width',
  '/docs/outline-color',
  '/docs/outline-style',
  '/docs/outline-offset',
  '/docs/ring-width',
  '/docs/ring-color',
  '/docs/ring-offset-width',
  '/docs/ring-offset-color',
  '/docs/box-shadow',
  '/docs/box-shadow-color',
  '/docs/opacity',
  '/docs/mix-blend-mode',
  '/docs/background-blend-mode',
  '/docs/blur',
  '/docs/brightness',
  '/docs/contrast',
  '/docs/drop-shadow',
  '/docs/grayscale',
  '/docs/hue-rotate',
  '/docs/invert',
  '/docs/saturate',
  '/docs/sepia',
  '/docs/backdrop-blur',
  '/docs/backdrop-brightness',
  '/docs/backdrop-contrast',
  '/docs/backdrop-grayscale',
  '/docs/backdrop-hue-rotate',
  '/docs/backdrop-invert',
  '/docs/backdrop-opacity',
  '/docs/backdrop-saturate',
  '/docs/backdrop-sepia',
  '/docs/border-collapse',
  '/docs/table-layout',
  '/docs/transition-property',
  '/docs/transition-duration',
  '/docs/transition-timing-function',
  '/docs/transition-delay',
  '/docs/animation',
  '/docs/scale',
  '/docs/rotate',
  '/docs/translate',
  '/docs/skew',
  '/docs/transform-origin',
  '/docs/accent-color',
  '/docs/appearance',
  '/docs/cursor',
  '/docs/caret-color',
  '/docs/pointer-events',
  '/docs/resize',
  '/docs/scroll-behavior',
  '/docs/scroll-margin',
  '/docs/scroll-padding',
  '/docs/scroll-snap-align',
  '/docs/scroll-snap-stop',
  '/docs/scroll-snap-type',
  '/docs/touch-action',
  '/docs/user-select',
  '/docs/will-change',
  '/docs/fill',
  '/docs/stroke',
  '/docs/stroke-width',
  '/docs/screen-readers',
];

/**
 * Fetches all CSS Classes from the docs.
 * Generates a `classes.json` file.
 */
const fetchAllClasses = async () => {
  const classes = [];

  for (const url of urls) {
    console.log(`Scraping ${url}`);

    try {
      const response = await fetch(`${base}${url}`);
      const data = await response.text();

      const dom = new JSDOM(data);
      const rows = dom.window.document.querySelectorAll(
        'tbody tr td:first-child'
      );

      for (const { textContent } of rows) {
        const [className] = textContent.split(' ');

        classes.push(className);

        for (const breakpoint of BREAKPOINTS) {
          classes.push(`${breakpoint}:${className}`);
        }
      }
    } catch (error) {
      console.log(`Scraping ${url} failed: `, error);
    }
  }

  writeFileSync('./scraping/classes.txt', classes.join(' '));
};

fetchAllClasses();
