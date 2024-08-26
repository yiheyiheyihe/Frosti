---
title: test2
description: Modify the code box style
pubDate: 07 18 2024
image: https://saroprock.oss-cn-hangzhou.aliyuncs.com/img/diary-968592_1280.jpg
categories:
  - life
  - study
tags:
  - Frosti
  - Blog
  - 随笔
---


## 添加行号

<Warning>
  此方法仅在 `Shiki` 中可用， `Prism` 无法通过 CSS 直接生成行号。
</Warning>

<Info>在 `v2.2.1` 更新后默认添加行号。</Info>

在 `src\styles\global.scss` 中添加以下内容：

```scss
pre .line {
  counter-increment: line;
  padding-left: 2.5em;
}

pre :not(:last-child).line::before {
  content: counter(line);
  position: absolute;
  left: 0;
  width: 3em;
  text-align: right;
  margin-right: 10px;
  color: #888;
}
```

## 改变主题

Frosti 使用 `Shiki` 来渲染代码框， `Shiki` 已经提供了足够多的主题，不推荐使用 `Prism`。

有关于 `Shiki` 的主题详见：https://shiki.style/themes

在 `astro.config.mjs` 中修改内容：

```js
markdown: {
  shikiConfig: {
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
},
```
