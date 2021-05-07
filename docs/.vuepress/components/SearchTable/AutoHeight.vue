<template>
  <ly-search-table
      is-index
      is-paging
      v-bind="$attrs"
      :data-function="_initUsers"
      :table-props="tableProps"
      class="sw-auto-height"
  />
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
  }
}
</script>

<style lang="scss">
@import "/docs/.vuepress/styles/mixins/mixins";

@include b(auto-height) {
  padding: 0;
  height: 700px;

  table {
    margin: 0;
  }

  th, td {
    border: none;
  }
}
</style>
