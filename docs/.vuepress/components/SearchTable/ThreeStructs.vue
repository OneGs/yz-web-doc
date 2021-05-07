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

<script>
import {userPaging} from "../../mocks/user";

export default {
  name: "ThreeStructs",

  data() {
    return {
      tableProps: [
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

<style lang="scss">
@import "/docs/.vuepress/styles/mixins/mixins";

@include b(three-structs) {
  padding: 0;

  table {
    margin: 0;
  }

  th, td {
    border: none;
  }
}
</style>
