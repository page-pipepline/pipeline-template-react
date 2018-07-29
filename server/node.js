const fs = require('fs');
const path = require('path');

// const renderMode = process.argv[2] || 'release';

const render = require('react-dom/server');
const App = require('./dist/server.js');

const SSR_string = render.renderToString(App.default);
const markup = `<div id="root">\n${SSR_string}\n</div>`;

// 在 webpack.server.config.js 中
// 页面中的 <%= htmlWebpackPlugin.options.xxx %> 占位符, 替换为 <!--baseConfig-xxx-->
const insertBaseConfigToHtml = (htmlStr, config) => {
  const newHtmlStr = Object.keys(config).reduce((accumulator, key) => accumulator.replace(new RegExp(`<!--baseConfig\\-${key}-->`, 'g'), config[key]), htmlStr);
  return newHtmlStr;
};

const baseConfig = require('./config/base-config.json');

const template = fs.readFileSync(path.join(__dirname, './dist/index-origin.html'), 'utf-8');
const initdata = fs.readFileSync(path.join(__dirname, './config/components.json'), 'utf-8');
const initdataScript = `<script type="text/javascript">
window.INIT_DATA = ${initdata.replace(/\n+$/, '')};
</script>`;

let html = insertBaseConfigToHtml(template, baseConfig);
html = html.replace(/<!--react-ssr-outlet-->/, `${markup}\n${initdataScript}`);

fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html, 'utf-8');
console.log('server side render success.');

