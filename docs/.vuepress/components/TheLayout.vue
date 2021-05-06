<template>
  <div class="sw-layout">
    <div class="sw-layout__header">header</div>
    <div class="sw-layout__main">
      <div class="sw-layout__aside">
        aside <span class="sw-layout--waring">警告</span>
      </div>
      <div class="sw-layout__content">
        content
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheLayout"
}
</script>

<style scoped lang="scss">
@import '/docs/.vuepress/styles/mixins/mixins';

%basePanel {
  box-sizing: border-box;
  border-radius: 5px;
  padding: 16px;
}

@include b(layout) {
  @extend %basePanel;

  height: 150px;

  @include e(header) {
    @extend %basePanel;

    height: 50px;
    background: antiquewhite;
  }

  @include e(main) {
    height: 100px;

    display: flex;
    flex-flow: row nowrap;
  }

  @include e(aside) {
    @extend %basePanel;

    width: 30%;
    background: cadetblue;
  }

  @include e(content) {
    @extend %basePanel;

    width: 70%;
    background: #b4bccc;
  }

  @include m(waring) {
    color: red;
  }
}
</style>
