# 知其所为 · 研究展示网页

纯静态网站。包含两项研究、18 页交互叙事及研究数据说明；两项研究开场已补充人的角色与任务分工。无需安装依赖或构建，字体使用设备上的系统字体，不依赖 Google Fonts 或其他外部资源。

## 发布到 GitHub Pages

1. 在 GitHub 新建用于展示此网页的仓库。GitHub Free 账户使用公开仓库。
2. 上传本文件夹内的文件到仓库根目录，确保根目录直接包含 `index.html`，而不是把整个文件夹作为子目录上传。保留其余 CSS、JS 和 SVG 文件；不需要上传 PDF 论文、`.git` 或 `.openai`。
3. 在仓库 **Settings → Pages → Build and deployment** 中，选择 **Deploy from a branch**，分支选择 `main`，目录选择 **/(root)**，保存。
4. 等待 Pages 部署完成，使用 Settings → Pages 显示的访问链接。一般为 `https://用户名.github.io/仓库名/`。

网站资源均使用相对路径，可放在项目仓库的子路径下。GitHub Pages 在不同网络下的可达性可能不同，请使用实际访问网络测试。

GitHub 官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 局部播放与视线控制

播放只作用于当前页，结束后不自动翻页。家庭机器人演示中，点击四种条件之一即从头播放 24 秒的完整简化任务；鼠标在画面内移动或触屏拖动可改变视线，聚焦画面后也可用方向键转动。暂停会停止任务计时和播报；背景音乐开关独立于任务播放，翻页和暂停不会自动关音乐。家庭任务使用内置中文语音。朝向触发在每次重新看向机器人时立即播报，朝向抑制立即中断正在播报的语音；这是网页交互改编，原研究规则保留在研究与依据中。

## 本地使用

直接双击 `index.html`。另提供独立的“知其所为-离线版.html”，不需要解压或启动服务器。中文语音已随网页内置，离线也可播放，不依赖设备上安装的中文语音。音乐与数据浏览同样无需联网。

## 编辑内容

- `app.js`：分镜文案、动画、交互与人物角色。
- `speech-audio.js`：内置中文语音。
- `research-data.js`：数据和统计详情。
- `research-visuals.js`：研究图表与采用意愿矩阵。
- `style.css`：样式。
- `index.html`：页面结构与研究依据。

动画为概念重绘，不是原始实验录像。两份研究稿件的全文未包含在文件包中。
