<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
      <div class="modal_box">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :stretch="true">
          <el-tab-pane :label="item" :name="item" :key="item" v-for="item in tabs" slot="content"></el-tab-pane>
        </el-tabs>
        <!-- <template name="content">
          <div class="modal_item _600">
            <div class="focus_img"></div>
            <div class="img_slider" v-dragscroll.x="true">
              <img v-for="item in 10" src="https://img.4gamers.com.tw/ckfinder/images/TangBao/1812/25-project-bbq.jpg?versionId=Y_i9lLxLZyuAw9zqBmfkzIBrl1c5LwGH" />
            </div>
          </div>
        </template>-->
        <!--  <div class="modal_box">
          <div class="modal_item">
            <div class="modal_box">
              <div class="modal_item _200">
                <p class="ttl _type">尺寸 :</p>
                <p class="ttl _type">3*3mm</p>
              </div>
              <div class="modal_item _200">
                <p class="ttl _type">顏色:</p>
                <p class="ttl _type">紅色</p>
              </div>
              <div class="modal_item _200">
                <p class="ttl _type">顏色:</p>
                <p class="ttl _type">紅色</p>
              </div>
              <div class="modal_item _200">
                <p class="ttl _type">顏色:</p>
                <p class="ttl _type">紅色</p>
              </div>
              <div class="modal_item _200">
                <p class="ttl _type">顏色:</p>
                <p class="ttl _type">紅色</p>
              </div>
              <div class="modal_item _200">
                <p class="ttl _type">顏色:</p>
                <p class="ttl _type">紅色</p>
              </div>
              <div class="modal_item _200">
                <p class="ttl _type">顏色:</p>
                <p class="ttl _type">紅色</p>
              </div>
              <div class="modal_item _200">
                <p class="ttl _type">顏色:</p>
                <p class="ttl _type">紅色</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal_box" v-show="orderStep === 1">
          <div class="modal_item _600">
            <el-input placeholder="詳細說明" type="textarea" v-model="description"></el-input>
          </div>
        </div>
        <div class="modal_box" v-show="orderStep === 0">
          <div class="modal_item _200">
            <p class="ttl">數量</p>
            <el-input v-model="elOrderNum"></el-input>
          </div>
        </div>
        <div class="modal_box" v-show="orderStep === 1">
          <div class="modal_item _200">
            <p class="ttl">數量</p>
            <el-input-number v-model="elnum" @change="numberChange" :min="1" label="描述文字"></el-input-number>
          </div>
        </div>
        <div class="modal_box">
          <div class="modal_item _200">
            <el-button type="danger" v-show="orderStep === 0" @click="orderStep = orderStep + 1 ">建立訂單</el-button>
            <el-button type="danger" v-show="orderStep === 1" @click="orderStep = orderStep + 1 ">下單</el-button>
          </div>
        </div>-->
      </div>
    </template>
  </Shield>
</template>
<script>
import Shield from '@/slot/shield';

import categoryImg from '@c/category_img';

import modal from './mixins/modal'

import category from './mixins/category'

import scrollBar from '@mix/scrollBar'

export default {
  components: { Shield, categoryImg },
  mixins: [category, modal, scrollBar],
  data() {
    return {
      activeName: '商品庫',
      tabs: {
        stock: '商品庫',
        order: '建立訂單',
        replenishment: '補貨單'
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
