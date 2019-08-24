<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
      <div class="modal_box">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :stretch="true">
          <el-tab-pane :label="item" :name="item" :key="item" v-for="item in tabs" > 
            <slot="content"></slot></el-tab-pane>
        </el-tabs>
        <template name="content">
          <div class="modal_box fx">
            <div class="modal_item _600">
              <div class="focus_img" >
                <el-avatar shape="square" :src="imgUrl[imgId]" :size="300" ></el-avatar>
              </div>
              <div class="img_slider" v-dragscroll.x="true">
                <div class="img_box"  v-for="(item,index) in imgUrl" :key="index" @click="focusImg(index)">
                <el-avatar shape="square" :src="item" :size="90" ></el-avatar>
                </div>
              </div>
            </div>
            <div class="modal_box">
              <div class="modal_item _600">
                <div class="modal_item _300">
                  <p class="ttl">植牙專用</p>
                  <p class="ttl _type">尺寸 :</p>
                  <p class="ttl _type">3*3mm</p>
                </div>
                <div class="modal_item _300">
                  <p class="ttl _type">尺寸 :</p>
                  <p class="ttl _type">3*3mm</p>
                </div>
                <div class="modal_item _300">
                  <p class="ttl _type">尺寸 :</p>
                  <p class="ttl _type">3*3mm</p>
                </div>            
                <div class="modal_item _300">
                  <p class="ttl _type">尺寸 :</p>
                  <p class="ttl _type">3*3mm</p>
                </div>
                <div class="modal_item _300 order_gap"   v-show="[USER_ROLE.franchiser].has(role)">
                  <p class="ttl">數量</p>
                  <el-input-number v-model="elnum" @change="numberChange" :min="1" label="描述文字"></el-input-number>
                </div>
                <div class="modal_item _300 order_gap"  v-show="[USER_ROLE.franchiser].has(role) && activeName === '建立訂單'">
                  <el-input placeholder="詳細說明" type="textarea" v-model="description"></el-input>
                </div>
                <div class="modal_box">
                  <div class="modal_item _200 order_gap" v-show="[USER_ROLE.franchiser].has(role) && activeName === '商品庫存'">
                    <el-button type="primary">確認</el-button>
                  </div>
                  <div class="modal_item _200 order_gap" v-show="[USER_ROLE.franchiser].has(role) && activeName === '建立訂單'">
                  <el-button type="danger">下單</el-button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </Shield>
</template>
<script>
import Shield from '@/slot/shield';

import modal from './mixins/modal'

import category from './mixins/category'

import { USER_ROL } from "@js/model";

import { E2C, USER, USER_ROLE, REGION } from "@js/model";

// mixins
import GO from "@mix/GO_mixins";

export default {
  components: { Shield },
  mixins: [category, modal ,GO],
  data() {
    return {
      activeName: '商品庫存',
      tabs: {
        stock: '商品庫存',
        order: '建立訂單',
      },
      imgId: 0,
      imgUrl:['https://img.4gamers.com.tw/ckfinder/images/TangBao/1812/25-project-bbq.jpg?versionId=Y_i9lLxLZyuAw9zqBmfkzIBrl1c5LwGH','https://i.gbc.tw/gb_img/3618083l.jpg','https://img.4gamers.com.tw/ckfinder/images/TangBao/1812/25-project-bbq.jpg?versionId=Y_i9lLxLZyuAw9zqBmfkzIBrl1c5LwGH','https://i.gbc.tw/gb_img/3618083l.jpg','https://img.4gamers.com.tw/ckfinder/images/TangBao/1812/25-project-bbq.jpg?versionId=Y_i9lLxLZyuAw9zqBmfkzIBrl1c5LwGH','https://i.gbc.tw/gb_img/3618083l.jpg','https://img.4gamers.com.tw/ckfinder/images/TangBao/1812/25-project-bbq.jpg?versionId=Y_i9lLxLZyuAw9zqBmfkzIBrl1c5LwGH','https://i.gbc.tw/gb_img/3618083l.jpg']
    }
  },
   computed: {
   E2C() {
      return E2C;
    },
    USER_ROLE() {
      return USER_ROLE;
    },
    REGION() {
      return REGION;
    },
  },
  mounted(){
  const { role } = this.$route.params;
  this.role = role;
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    focusImg(index){
      this.imgId = index
    }
  }
}
</script>
