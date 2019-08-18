<template>
  <div class="category_frame">
    <div class="tab_ctn">
      <div class="tab_title">商品類別</div>
      <div class="tab_search">
        <el-input placeholder="輸入關鍵字" v-model="input" prefix-icon="el-icon-search"></el-input>
      </div>
    </div>
    <div class="category_ctn">
      <div class="category_list">
        <div class="list" v-for="(item, index) in list" :key="index">
          <div class="catalogue_img">
            <img src="@img/category/screw1.png">
            <Hambuger/>
            <div class="catalogue_name">{{item.title}}</div>
            <div class="catalogue_stoock warrning">庫存:缺貨</div>
            <div class="catalogue_stoock stock">庫存:880</div>
          </div>
        </div>
      </div>
    </div>
    <div class="add_box">
      <i class="el-icon-circle-plus btn1" @click="$router.push(`${$route.path}/create/create/create/create`)"></i>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Hambuger from '@c/hambuger';

export default {
  components: {
    Hambuger
  },
  data() {
    return {
      input: '',
      list: [
        {
          item: 'screw1',
          title: '牙根'
        }, {
          img: 'screw2',
          title: '機車'
        }, {
          img: 'screw3',
          title: '汽車'
        },
        {
          item: 'screw1',
          title: '牙根'
        }, {
          img: 'screw2',
          title: '機車'
        }, {
          img: 'screw3',
          title: '汽車'
        }, {
          item: 'screw1',
          title: '牙根'
        }, {
          img: 'screw2',
          title: '機車'
        }, {
          img: 'screw3',
          title: '汽車'
        }, {
          item: 'screw1',
          title: '牙根'
        }, {
          img: 'screw2',
          title: '機車'
        }, {
          img: 'screw3',
          title: '汽車'
        }
      ]
    }
  }
}
</script>