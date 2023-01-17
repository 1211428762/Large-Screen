<template>
  <div class="smart-produce">
    <section class="wrap">
      <p class="card-title">智能生产线</p>
      <div class="title-detail table-item"><span>操作人员</span> <span>操作事项</span> <span>时间</span></div>
      <vue-seamless-scroll :data="listData" class="scroll-wrap" :classOption="defaultOption">
        <ul>
          <li class="table-item" v-for="(item, index) in listData" :key="index">
            <span> {{ item.name }} </span>
            <span>{{ item.operate }}</span>
            <span>{{ item.time }}</span>
          </li>
        </ul>
      </vue-seamless-scroll>
    </section>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'smart-produce',
  data() {
    return {
      listData: [
        {
          name: '张三',
          operate: '视频修复',
          time: '09:31',
        },
        {
          name: '李四',
          operate: '自动写稿调用',
          time: '09:31',
        },
        {
          name: '王五',
          operate: '图片无损放大',
          time: '09:31',
        },
        {
          name: '赵六',
          operate: '自动写稿调用',
          time: '09:31',
        },
        {
          name: '钱七',
          operate: '自动写稿调用',
          time: '09:31',
        },
      ],
    }
  },
  created() {
    // this.$api.jinan_module.smartProductionLine().then(({ data }) => {
    //   if (data) {
    //     console.log(data);
    //     this.listData = data;
    //     // let list = data.data.dataList;
    //     // list = list.sort((a, b) => parseInt(a.time) - parseInt(b.time));
    //     // this.listData = list;
    //     // console.log(this.listData, list);
    //   }
    // });
  },
  components: {
    vueSeamlessScroll,
  },
  computed: {
    defaultOption() {
      return {
        step: 7,
        singleHeight: 164,
        waitTime: 3000, // 单步运动停止的时间(默认值1000ms)
        hoverStop: false,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.table-item {
  display: flex;
  justify-content: flex-start;

  > span {
    @for $i from 1 through 3 {
      &:nth-of-type(#{$i}) {
        width: calc(100% - #{$i} * 20%);
      }
    }
    &:nth-of-type(1) {
      text-indent: 2em;
    }
    &:nth-of-type(3) {
      text-align: center;
    }
  }
}
li.table-item {
  border-bottom: 3px dashed #004f6e;
  span {
    font-size: 64px;
    color: white;
    opacity: 0.8;
    height: 160px;
    line-height: 160px;
  }
}
.scroll-wrap {
  height: 800px;
  overflow: hidden;
}
.title-detail {
  padding-left: unset;
}
</style>
