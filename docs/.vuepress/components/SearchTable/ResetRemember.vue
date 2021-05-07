<template>
  <ly-search-table
      is-index
      is-paging
      :data-function="_initUsers"
      :table-props="tableProps"
      :query-params.sync="queryParams"
      class="sw-reset-remember"
  >
    <template #search>
      <el-form-item label="姓名">
        <el-input v-model="queryParams.name"/>
      </el-form-item>
      <el-form-item label="行吧">
        <el-select v-model="queryParams.sex">
          <el-option label="全部" :value="null"></el-option>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
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
  name: "ResetRemember",

  data() {
    return {
      tableProps: [
        { name: '姓名', prop: 'name' },
        { name: '账号', prop: 'account' },
        { name: '描述', prop: 'describtion' },
        { name: '性别', prop: 'sex' }
      ],

      queryParams: {
        name: null,
        sex: '男'
      }
    }
  },

  methods: {
    _initUsers: userPaging,
  }
}
</script>

<style lang="scss">
@import "/docs/.vuepress/styles/mixins/mixins";

@include b(reset-remember) {
  padding: 0;

  table {
    margin: 0;
  }

  th, td {
    border: none;
  }
}
</style>
