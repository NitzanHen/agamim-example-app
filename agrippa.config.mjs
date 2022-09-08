// @ts-check
import { PostCommandPlugin, Styling, defineConfig } from 'agrippa';

export default defineConfig({
  options: {
    styling: Styling.SCSS,
    baseDir: 'src/components'
  },
  plugins: [
    new PostCommandPlugin('code -r <componentPath>')
  ]
});