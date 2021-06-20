# 关于老版本项目从Vue1.0升级到Vue2.0的过程和注意事项

:::tip
本次项目的升级时间为：`2021/16/19`。时间周期为**一周**。截至日期：`2021/6/25`。
:::

## 目的 & 需求

* 提高代码开发规范和开发者使用规范（严格设置限制）。

* 降低部分组件的可复用，从而减低组件的耦合度。

## 重构前的思考

### 有哪些规范需要限制

老版本没有通过`eslint + premitter`严格限制代码格式，导致项目上存在很多弊端，如：

1. 代码结构丑陋，具有代码洁癖的用户难以接受！

2. 代码参数命名随心所欲，且没有详细的注释！

3. `git commit`无法控制属于自己的样式规则，导致用户修改错乱！

基于此，也为了更好的后续维护和扩展，样式lint的规范已经箭在弦上，不得不做了。

### 如何总体的完成迁移

这里不阐述这套方案的原因，只说明操作的方向！

利用`vue-cli`生成一个最新的纯净项目，将需要的配置都配置完善。

将整个src目录复制到新项目中来。此时，整体的迁移就算完成了。

但此时的项目是无法正产运行的，那么该如何让项目跑起来呢？接着往下看。

### 大量原有代码的`lint`

现有的代码已存在一定的量级，此时去执行`npm run lint`，不仅不能够顺利执行，还会导致项目处于阻塞的状态。因此，需要另辟蹊径。

好在，如果我们对原生的eslint足够熟悉话，就可以知道通过指定特定的文件进行eslint。

那么，可以通过将项目拆分成数个小的文件，从而进行有效而快速的lint。同时，也会带来一个新的好处——更精细化的处理每一个文件！

具体操作步骤如下：

1. 将项目按文件夹分成若干个lint块。在这个过程中，可以将不需要lint的文件或文件夹放入到`.eslintignore.js`文件进行忽略。

2. 将需要的lint的文件，按照顺序进行`eslint --fix`。同时检查每一处报错并处理。

	* 在`package.json`编写`"lint:ext": "eslint --ext *.js,.vue src/views/acceptance/** --fix"`脚本。

	* 陆续将`src/views/acceptance/**`换成自己的eslint目录，逐个lint即可。

	<img :src="$withBase('/images/updateVueOneToVueTwo/eslint-script.png')" alt="error">

3. 修复的所剩无几时，直接执行`npm run lint`，对全局eslint一次，如果没有报错，那么修改完成！。

:::tip
解决`eslint --fix`报错的方式有多种多样，在现阶段只要能够清除报错就算抓到老鼠的好猫。
:::

### 如何减少`main.js`的代码量？如何让插件使用更美观？

在原本的`main.js`中，大量的不同逻辑代码都放在其中，造成阅读上的困难。

同时也减少了二次添加的稳定性，让后续的扩展变得难上更难。

为此，将插件的引入拆分独立成小单元是个不错的选择。拆分的规则指定如下：

基本的目录结构

```txt
|- src
|-- install
|--- index.js
|--- modules
|---- common.js
|---- components.js
|---- other.js

```

1. 新建一个的install目录，表示该文件的目的为安装插件。

2. `index.js`用于收集`modules`中所有不同模块的包含`install`的对象。

3. `common.js`包含第三方或自己写的插件——想要直接引用或是增加到原型链，插件可以是css、js、特殊情况的component等等。

4. `components`为全局组件注册。

5. 如果上述两个`module`无法满足你的需求，你需要对插件进行更多操作，或者插件本身就包含了很多自身需要引入的部分。 那么，你可以自己建立起一个`module`并暴露出对应的install即可。

下面为修改后的实例：

`common.js`:

```js
/* css
------------------------------
* */
import "normalize.css";
import "@ast/css/common.less";
import "@ast/icon/icon.css";
import "@ast/icon/am/iconfont.css";
import "@ast/icon/lobbyIcon/iconfont.js";

/* js
------------------------------
* */
import lodash from "lodash";
import axios from "axios";
import config from "@/config";
import Print from "@/plugins/Print";
import dictionaries, { getNameByDic } from "@uts/dictionaries";
import formatDate from "@uts/date";
import tools from "@uts/tools";

/* component
------------------------------
* */
import message from "@cps/message";
import loading from "@cps/loading";

// part of third
const partOfThird = Object.freeze({
  prefix: "$",

  $ld: lodash,
});

// part of self
const partOfSelf = Object.freeze({
  prefix: "",

  Print,

  dictionaries,

  getNameByDic,

  $config: config,

  $formatDate: formatDate,

  $message: message,

  $mloading: loading,

  $tools: tools,

  axios, // 临时放在这，因为没有$前缀
});

const ejectCollections = [];

export default {
  ejectPrototype(Vue) {
    const partOfEjects = [partOfSelf, partOfThird];

    partOfEjects.forEach((l) => {
      const prefix = l.prefix || "";

      Object.keys(l).forEach((_) => {
        // 过滤掉不需要的字段属性 TODO 可用filter改写
        if (_ !== "prefix") {
          let [_name, _firstChar] = [_, _[0]];

          if (/[a-z]/i.test(_firstChar)) {
            _name = prefix + _name;
          }

          Vue.prototype[_name] = l[_];

          ejectCollections.push(_name);
        }
      });
    });

    console.log(`全局注入的prototype：[ ${ejectCollections} ]`);
  },

  install(Vue) {
    this.ejectPrototype(Vue);
  },
};
```

`index.js`:

```js
import Vue from "vue";
import common from "@/install/modules/common";
import elementUi from "@/install/modules/elementUi";
import components from "@/install/modules/components";

// import requestsToInstall from "@/requests";

const installs = [elementUi, common, components];

installs.forEach((install) => {
  Vue.use(install);
});
```

最后，我们只需要`import '../install'`即可完成插件的配置！

### 多环境 & 多服务接口

一个项目往往存在多个环境，例如，测试环境、生产环境等等。不同的环境配置又不尽相同。

这就造成我们需要保存多个不同的环境一次来应对打包！现在项目的解决方案为：不同环境对应不同的分支，每个分支有自己独立的的配置文件,从而达到配置隔离的目的。

上述方案存在一些重大隐患：

1. 需要来回的进行分支切换和合并操作。操作复杂的同时浪费开发者时间。

2. 合并的过程可能发生冲突，没有经验的开发者容易导致配置错乱。

为了解决这些隐患和问题：

新的方案如下：

* **利用vue-cli提供的不同node环境进行针对性配置**

* **提供一个可供用户频繁操作的配置文件，但改配置文件在生产环境始终无效**

---

项目中现如今`axios、httpClient、request`被不同的开发者随意使用，没有正确的语义，且大量重复。

有的请求经过了统一过滤，有的又没有。从而导致开发者需要去思考这个接口我最终到底对得到怎样的值！

思考的过程中又需要进行`debug`或`console.log`，严重拖慢了开发者的时间，也加大了开发者的难度和代码的量。

因此，我们需要重新设计：

首先，明确目标：

* 无论开发者的水平如何，在写完接口的后能最先想到的值，就应该是该接口返回的值。

* 提供用户额外处理接口的能力，`meta`源控制。

具体的看下文的介绍

<!-- 项目中存在三个服务——个性化服务、通用层、适配器。这三者也对应了后台的设计架构，配合着这三个部分，将 -->

### 可被拆分的组件

### 如何同步持续推进的旧项目

## 开始重构

### 重复劳动的eslint

### 统一的环境、数据处理

### 细分组件 & 降低耦合

## 注意点