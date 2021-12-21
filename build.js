import { build } from 'vite';
import { writeFileSync } from 'fs';

(async () => {
  const { output } = await build();

  const { source } = output.find(({ name }) => name === 'index.css') || {};
  if (!source) return;

  const webflowCSS = source
    .replaceAll('.\\3', '._')
    .replaceAll('\\:', '-')
    .replaceAll('\\/', '-');

  writeFileSync('dist/webflow.css', webflowCSS);
})();
