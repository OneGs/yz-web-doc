# 搜索表格

::: tip
该组件依赖于`ElementUI`。
:::

## 基础用法

`LySearchTable`分为三个重要组成部分：search搜索、content内容、paging分页。

search搜索，默认包含查询和充值按钮。点击查询，会根据查询`queryParams`查询数据。重置则会将`queryParams`置为初始值。

content内容：支持在`slot = 'table'`自定义，也支持通过属性`tableProps`为对象的形式指定。

paging：自定翻页，提供了符合响应数据结构的请求数据`responseProps = { data, pageIndex, pageSize, pageTotal }`，则可以正常翻页。

<SearchTable-ThreeStructs />

```html
<template>
  <ly-search-table
      is-index
      is-paging
      :data-function="_initUsers"
      :table-props="tableProps"
      class="sw-three-structs"
  >
      <template #search>
          <el-form-item label="姓名">
              <el-input />
          </el-form-item>
      </template>
      <template #table>
          <el-table-column label="测试(name)" prop="name" />
      </template> 
  </ly-search-table>
</template>
```

```js
<script>
import {userPaging} from "../../mocks/user";

export default {
  name: "ThreeStructs",

  data() {
    return {
      tableProps: [ // 提供渲染列表
        { name: '姓名', prop: 'name' },
        { name: '账号', prop: 'account' },
        { name: '描述', prop: 'describtion' },
      ]
    }
  },

  methods: {
    _initUsers: userPaging,
  }
}
</script>
```

```js
// userPaging返回的数据结构
{
    data: (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, __ob__: Observer],
    err: {message: "nice"},
    ok: true,
    pageIndex: 1,
    pageSize: 10,
    pageTotal: 65,
}
```

属性`data-function`用于指定服务器数据来源，一般为`promise`对象。组件会自动解析数据并挂载。 解析完成的数据结构最终应该如上。

如果不希望自动解析数据，可以通过`isAutoRequest = false`禁止。

拿到数据后，组件会对数据进行解析。data对应content内容，pageIndex、pageSize、pageTotal则对应的翻页数据。

如果你的数据和上述保持一直，那么你可以直接开箱即用，直接渲染数据，但，万事总不能尽人意，数据结构不完全统一。因此，组件提供了`responseProps`允许你对现有结构进行映射。

`responseProps`的映射关系为：
```json
{
  "value": "data", // 返回的数据 可以是 array、 content等
  "index": "pageIndex", // 当前页索引， 可以改为index
  "size": "pageSize", // 当前页大小，可以改为size
  "total": "pageTotal" // 查询总数 可以改为total
}
```

通过映射关系，可以将你的数据结构转化为有效结构。

解析完数据后，需要展示渲染数据。组件提供了两种方式渲染列表。

1. 利用`tableProps`属性。
2. `<template #table></template>`。

两者可同时存在。同时存在时template渲染永远在相对后方。上例可以显示。

:::tip
tableProps是一个对象数组，其对象可支持`prop name align width formatter`属性。这些属性由elementUI提供。
:::

## 初始化搜索条件

有时候，需求不仅仅是根据查询条件获取值，
