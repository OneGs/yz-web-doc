# 命名规范

命名规范，包括了组件命名、变量命名、样式命名等规范，遵循下列规范在项目中是必须的。

## 组件命名

### 组件名为多个单词

**组件名应该始终是多个单词的，根组件 App 以及 `<transition>、<component>` 之类的 Vue 内置组件除外。**

这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。

### 组件文件

**只要有能够拼接文件的构建系统，就把每个组件单独分成文件。**

当你需要编辑一个组件或查阅一个组件的用法时，可以更快速的找到它。


### 单文件组件文件的大小写

**单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)。**

单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能地一致。然而，混用文件命名方式有的时候会导致大小写不敏感的文件系统的问题，这也是横线连接命名同样完全可取的原因。


### 基础组件名

**应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。**

项目基础组件一律使用Bs开头。例如：

```text
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

### 单例组件名

**只应该拥有单个活跃实例的组件应该以 `The` 前缀命名，以示其唯一性。**

这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。

反例：
```text
components/
|- Heading.vue
|- MySidebar.vue
```

好例子：
```text
components/
|- TheHeading.vue
|- TheSidebar.vue
```

### 紧密耦合的组件名

**和父组件紧密耦合的子组件应该以父组件名作为前缀命名。如果是非基础组件且应该放在同级别的components文件夹中。**

如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。

好例子：
```text
views/someView/
|- index.vue
|- Components
   |- TodoList.vue
   |- TodoListItem.vue
   |- TodoListItemButton.vue
```

### 组件名中的单词顺序

**组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。**

好例子：
```text
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

### 模板中的组件名大小写

**对于绝大多数项目来说，在单文件组件和字符串模板中组件名应该总是 PascalCase 的——但是在 DOM 模板中总是 kebab-case 的。**

PascalCase 相比 kebab-case 有一些优势：

* 编辑器可以在模板里自动补全组件名，因为 PascalCase 同样适用于 JavaScript。
* `<MyComponent>` 视觉上比 `<my-component>` 更能够和单个单词的 HTML 元素区别开来，因为前者的不同之处有两个大写字母，后者只有一个横线。
* 如果你在模板中使用任何非 Vue 的自定义元素，比如一个 Web Component，PascalCase 确保了你的 Vue 组件在视觉上仍然是易识别的。
不幸的是，由于 HTML 是大小写不敏感的，在 DOM 模板中必须仍使用 kebab-case。

还请注意，如果你已经是 kebab-case 的重度用户，那么与 HTML 保持一致的命名约定且在多个项目中保持相同的大小写规则就可能比上述优势更为重要了。在这些情况下，在所有的地方都使用 kebab-case 同样是可以接受的。

统一采用：`<MyComponent>`形式。

### 完整单词的组件名

**组件名应该倾向于完整单词而不是缩写。**

编辑器中的自动补全已经让书写长命名的代价非常之低了，而其带来的明确性却是非常宝贵的。不常用的缩写尤其应该避免。

好例子：
```text
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

## 变量命名

**统一采用单驼峰命名规则。**

### Prop 名大小写

**在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。**

我们单纯的遵循每个语言的约定。在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。

好例子：
```js
props: {
    greetingText: String
}
```
```html
<WelcomeMessage greeting-text="hi"/>
```

### _下划线表示私有变量

**如果认为某变量需要隐藏起来，`_someValue`下划线被默认遵循为私有**

### 全部大写的魔法值

**魔法值为只读、不可修改的值，统一全部大写标识**

好例子：
```js
const MAX_HEIGHT = '30px'

const ORIGIN_OBJECT = Object.freeze({
    name: 'onegs'
})
```


## css命名

### css变量命名

**`$--`开头标识css变量名**

和elementUI的变量保持一直，但需要注意覆盖问题。

```scss
$--color-black: #000;

$--color-primary-light-1: mix($--color-white, $--color-primary, 10%);

/* 53a8ff */
$--color-primary-light-2: mix($--color-white, $--color-primary, 20%);

/* 66b1ff */
$--color-primary-light-3: mix($--color-white, $--color-primary, 30%);
```

### BEM在项目中的运用

使用BEM需要使用带项目中的`sass`预编译器，和相关混入。

```text
|- styles
    |- mixins
        |- config.scss
        |- function.scss
        |- mixins.scss
```

config.scss
```scss
$namespace: 'sw'; // 命名空间
$element-separator: '__'; // block分隔符
$modifier-separator: '--'; // modify分隔符
$state-prefix: 'is-'; // status描述符
```

mixins.scss
```scss
@import "config";
@import "function";

/* BEM
 -------------------------------------*/

// Block - B
@mixin b($block) {
  $B: $namespace + '-' + $block !global;

  .#{$B} {
    @content
  }
}

// Element - E
@mixin e($element) {
  $E: $element !global;;
  $selector: &;
  $currentSelector: "";
  @each $unit in $element {
    $currentSelector: #{$currentSelector + '.' + $B + $element-separator + $unit + ','};
  }

  @if hitAllSpecialNestRule($selector) {
    @at-root {
      #{$selector} {
        #{$currentSelector} {
          @content
        }
      }
    }
  } @else {
    @at-root {
      #{$currentSelector} {
        @content
      }
    }
  }
}

// modify - M
@mixin m($modify) {
  $selector: &;
  $current-selector: "";
  @each $unit in $modify {
    $current-selector: #{$current-selector + & + $modifier-separator + $unit + ','}
  }

  @at-root {
    #{$current-selector} {
      @content
    }
  }
}

// when - A
@mixin when($state) {
  @at-root {
    &.#{$state-prefix + $state} {
      @content;
    }
  }
}

/* El BEM 用于修改elementUI的默认样式
--------------------------------------*/
$el-namespace: 'el';

@mixin elb($block) {
  $ELB: $el-namespace + '-' + $block !global;

  .#{$ELB} {
    @content
  }
}

@mixin ele($element) {
  $E: $element;
  $selector: &;
  $currentSelector: "";
  @each $unit in $element {
    $currentSelector: #{$currentSelector + '.' + $ELB + $element-separator + $unit + ','};
  }

  @at-root {
    #{$selector} {
      #{$currentSelector} {
        @content
      }
    }
  }
}
```

上述为BEM在项目中的重要代码块，也是之后所需要用到的重要混入。

<TheLayout />
