<template>
  <footer
    :style="{
      width: `${width}px`
    }"
    class="BaseFooter">
    <div class="customerServe">
      <ol class="colume_list">
        <li
          v-for="(item, index) in customerServeList"
          :key="index"
          class="item">
          <h3>
            <span>
              {{ item.title }}
            </span>
          </h3>
          <ol
            v-for="(item2, index2) in item.children"
            :key="index2">
            <li class="item2">
              <span class="iconfont icon-dian" /> <span>{{ item2.title }}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>
    <hr>
    <div class="licence">
      <p>
        <span class="licenceText">{{ licenceText }}</span>
      </p>
      <p>
        <span class="copyRight">{{ copyRight }}</span>
      </p>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 1200
    }
  },
  data() {
    return {
      customerServeList: [
        {
          title: '获取更新',
          children: [
            {
              title: 'iPhone/Android'
            }
          ]
        },
        {
          title: '商务合作',
          children: [
            {
              title: '商家入驻'
            }
          ]
        },
        {
          title: '公司信息',
          children: [
            {
              title: '关于我们'
            }
          ]
        },
        {
          title: '帮助中心',
          children: [
            {
              title: '新手上路'
            }
          ]
        }
      ],
      licenceText: '',
      // licenceText: 'XXX 科技有限公司 | ICP许可证号：1234567899 | 公网安备 42018502000390 号 | 食品流通许可证 SP4201991510041000',
      copyRight: 'Copyright © 169 2010 -2019 JuanPi.com All Rights Reserved'
    }
  }
}
</script>
<style lang="less" scoped>
@graycolor3 : #333;
@graycolor9 :#999999;
.BaseFooter {
  margin: auto;
  .customerServe {
    // height: 140px;
    .colume_list {
      display: flex;
      .item {
        margin-right: 100px;
        h3 {
          font-weight: 600;
          color: @graycolor3;
          font-size: 14px;
          line-height: 20px;
        }
      }
      .item2 {
        margin-right: 100px;
        span {
          color: #666666;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
  .licence {
    p {
      text-align: center;
      margin: 20px 0;
      .licenceText,
      .copyRight {
        font-size: 12px;
        color: @graycolor9;
      }
    }
  }
}
</style>
