# 选择不同的IDE

## VSCode

### Theme

一个赏心悦目的开发环境，能促进打工人打工时的工作效率。因此，首先让我们的VsCode支楞起来。

推荐插件: 

* **material theme**：应用最广泛的主题样式之一，具有跨平台统一主题的优势。

* **material icon theme**：跟随material theme 配套的icon主题，让icon也焕发生机。

根据官方文档（非本文档）配置完成后，示例：

<img :src="$withBase('/images/specification/vs-theme.png')" alt="error">

### 自动闭合标签 & 括号闭合颜色

在写Html时，你可能想要IDE自定帮你完成闭合标签的书写。

当项目单个文件中的代码量越来越多，嵌套的`{}`逐渐会变得具有困惑性。因此，你需要工具来帮助我们更好分清楚，闭合括号的开始在哪！

那么下面的插件能够帮助到你，推荐插件：

* **Auto Close Tag**：当你输入完`<div`，输入`>`时将自动帮你完成闭合标签。

* **Bracket Pair Colorizer**：不同的`{}, ()`会被用不同的颜色区分。

<img :src="$withBase('/images/specification/vs-auto.png')" alt="foo">

### 其它的功能性插件

* **Auto Rename Tag**：当你修改闭合标签中任意标签内容时，另一个标签会自动更新。

* **Viw**：将Linux上Vim的操作习惯带到VsCode上来。如果你是一个Vim重度用户，该插件一定能让你事半功倍！

---

除了属于IED上功能性插件外，还有用于管理代码，格式内容，智能提示等功能的插件。

这类插件服务于Coding过程，帮助用户快速、便捷、精准的开发项目!

让我们来看看这类插件！

### 智能化提示

### 代码格式化

这里推荐使用`eslint`以及自身带的代码格式工具。如果你不知道什么是`eslint`，[请点击这里](https://eslint.org/)

在使用该插件时，在项目中必须有`eslint`编译器作为依赖条件。当然如果你的项目已经包含了`eslint`

你可以直接进行配置即可！

* **eslint**： 基于插件的代码格式化插件（服务于vsCode）。

:::tip
在package.json中的eslint指编译器，此处的eslint指vsCode的插件，两者不要混淆。
:::

**配置**：

vsCode对于eslint的支持非开箱即用，还需要进行一些配置：

1. 设置eslint编译器：`ctrl + shrift + p`调出执行命名框，输入`elsint: manager Library execution`。弹出下框：

    <img :src="$withBase('/images/specification/eslint-execution.png')" alt="foo">

    选择Allow EveyWhere即可配置完成。

2. 此时已经可以通过在命令框中执行`Eslint: Fix all auto-fixable Problmes`修复问题。如果需要无感知的完成自动修复，那就还需要另行配置：

    打开设置文件，进入编辑器选项。 搜索” code action on a save “。 找到匹配项点击”在setting.json中编辑“进入配置文件。
    
    添加如下代码：
    
    ```javascript
   "editor.codeActionsOnSave": {
       "source.fixAll": true
   }
    ```
   
   点击保存，至此。已经可以做到点击保存`ctrl + s`自动修复。

## webStorm
