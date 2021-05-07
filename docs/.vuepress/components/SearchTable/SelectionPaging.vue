<template>
  <ly-search-table
      ref="searchTable"
      is-index
      is-paging
      is-selection
      v-bind="$attrs"
      row-key="index"
      :data-function="_initUsers"
      :table-props="tableProps"
      class="sw-selection-paging"
  >
    <template #search>
      <el-form-item class="ly-search-table__search--right">
        <el-button type="warning" @click="handleClear">取消选择</el-button>
        <el-button type="primary" @click="handleShow">选择</el-button>
      </el-form-item>
    </template>
  </ly-search-table>
</template>

<script>
import {userPaging} from "../../mocks/user";

export default {
  inheritAttrs: true,

  name: "AutoHeight",

  data() {
    return {
      tableProps: [
        { name: '姓名', prop: 'name' },
        { name: '账号', prop: 'account' },
        { name: '描述', prop: 'describtion' },
        { name: '性别', prop: 'sex' }
      ]
    }
  },

  methods: {
    _initUsers: userPaging,

    handleClear() {
      this.$refs.searchTable && this.$refs.searchTable.clearSelectionData()
    },

    handleShow() {
      console.log(this.$refs.searchTable.lineListSelections)
    }
  }
}
</script>

<style lang="scss">
@import "/docs/.vuepress/styles/mixins/mixins";

@include b(selection-paging) {
  padding: 0;

  table {
    margin: 0;
  }

  th, td {
    border: none;
  }
}
</style>
