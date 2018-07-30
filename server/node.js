const fs = require('fs');
const path = require('path');

const renderMode = process.argv[2] || 'release';

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

/*
 * 在服务端脚本渲染预览页面时, 插入到预览页面的脚本
 * 用于增强模板生成页面的交互功能
 * 采用 ES6 语法编写
 */
const previewInsertedScriptStr = fs.readFileSync(path.join(__dirname, './preview-inserted-script.js'), 'utf-8');
const previewInsertedScript = `<script type="text/javascript" defer>
${previewInsertedScriptStr.replace(/\n+$/, '')}
</script>`;

let html = insertBaseConfigToHtml(template, baseConfig);

switch (renderMode) {
  case 'release':
    html = html.replace(/<!--react-ssr-outlet-->/, `${markup}\n${initdataScript}`);
    break;
  case 'preview':
    html = html.replace(/<!--react-ssr-outlet-->/, `${markup}\n${initdataScript}\n${previewInsertedScript}`);
    break;
  default:
    break;
}

fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html, 'utf-8');
console.log('server side render success.');
