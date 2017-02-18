[English Doc](./README-en.md)

# vue docs

更简单快速markdown文档，生成一个基于vue的单页应用

## 用法

### 下载

$ npm install

### 启动应用和监听文件

$ npm run start

### 写文档

在 `src/markdown` 文件中, 创建/删除/修改 markdown文件，访问 `http://127.0.0.1:8080/filename` 可实时查看效果

**举个例子：**

创建 `button.md`, 访问 `http://127.0.0.1:8080/button` ，修改button.md， 直接看效果

### 写文档更快更简单

查看 [markdown/button.md](./src/markdown/button.md)

### 更多自定义

查看 [vue-marked-loader](https://github.com/Jerret321/vue-marked-loader)

由于文档中的 `interface`借助 `vuikit docs`，参数请查阅[vuikit docs](https://vuikit.github.io/vuikit-docs/)， 为了更好的体验采用`yaml`书写。

## 快速发布

$ npm run ghpage "commit msg"

执行命令 快速发布到github `gh-pages`分支， 可供用户快速查看

## 感谢

- [vuikit docs](https://vuikit.github.io/vuikit-docs/)