<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'">
    <template slot="body">
      <div class="modal_box">
        <div class="modal_ttl">補貨單</div>
        <el-steps :active="stepActive" finish-status="success">
          <el-step title="詢價"></el-step>
          <el-step title="報價: 1000"></el-step>
          <el-step title="價格確認"></el-step>
          <el-step title="商品準備中"></el-step>
          <el-step title="出貨中"></el-step>
        </el-steps>
        <div class="modal_box fx">
          <div class="modal_item _600 _H575" v-perfect-scroll:100>
            <div class="focus_img">
              <el-avatar shape="square" :src="imageUrl[sd_imageUrl]" :size="200"></el-avatar>
            </div>
            <div class="img_slider" v-dragscroll.x="true">
              <div class="img_box" v-for="(item,index) in imageUrl" :key="index" @click="sd_imageUrl = index;">
                <el-avatar shape="square" :src="item" :size="90"></el-avatar>
              </div>
            </div>

            <div class="modal_item _300">
              <p class="ttl">訂單 :</p>
              <el-radio-group v-model="radio1">
                <el-radio-button label="要求出貨"></el-radio-button>
                <el-radio-button label="準備中"></el-radio-button>
                <el-radio-button label="出貨中"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="modal_item _300">
              <p class="ttl">規格</p>
            </div>
            <div class="modal_item _300">
              <p class="ttl _type">尺寸 :</p>
              <p class="ttl _type">15*15</p>
            </div>
            <div class="modal_item _300">
              <p class="ttl _type">顏色 :</p>
              <p class="ttl _type">紅色</p>
            </div>
            <div class="modal_item _300">
              <p class="ttl _type">需求數量 :</p>
              <p class="ttl _type">998</p>
            </div>
            <div class="modal_item _600 order_gap">
              <el-select v-model="checked" multiple filterable allow-create default-first-option placeholder="請選擇詢價的供應商" style="display: block" @change="addList">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>

            <div class="modal_item _600">
              <el-radio-group v-model="checkList">
                <el-radio :label="label" v-for="label in checked"></el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="modal_box" v-show="tem == 0">
            <div class="modal_item _600">
              <div class="modal_item">
                <p class="ttl text-center">報價紀錄</p>
              </div>
            </div>
            <div class="modal_item _300" v-show="checkList">
              <p class="ttl _type">{{checkList}} : &nbsp;</p>
              <p class="ttl _type">998</p>
            </div>
            <div class="modal_item _300">
              <p class="ttl _type">我們的報價 : &nbsp;</p>
              <p class="ttl _type">
                <el-input v-model="money" placeholder="我們的報價"></el-input>
              </p>
            </div>
            <div class="modal_item _300">
              <p class="ttl _type">經銷商 : &nbsp;</p>
              <p class="ttl _type">998</p>
            </div>
            <div class="modal_item _300">
              <el-button type="primary">確定</el-button>
            </div>
          </div>
          <div class="modal_box" v-show="tem == 1">
            <div class="modal_item _600">
              <div class="modal_item">
                <p class="ttl text-center">我的報價</p>
              </div>
              <div class="modal_item _300">
                <p class="ttl _type">報價 : &nbsp;</p>
                <p class="ttl _type">998</p>
              </div>
            </div>
            <div class="modal_item _300">
              <el-button type="primary">確定</el-button>
            </div>
          </div>
          <div class="modal_box" v-show="tem == 2">
            <div class="modal_item _600">
              <div class="modal_item">
                <p class="ttl text-center">我的報價</p>
              </div>
              <div class="modal_item _300">
                <p class="ttl _type">報價 : &nbsp;</p>
                <p class="ttl _type">998</p>
              </div>
            </div>
            <div class="modal_item _300">
              <el-button type="primary">確定</el-button>
            </div>
          </div>
          <div class="modal_box" v-show="tem == 3">
            <div class="modal_item _600">
              <div class="modal_item">
                <p class="ttl text-center">報價</p>
              </div>
              <div class="modal_item _300">
                <p class="ttl _type">公司價 : &nbsp;</p>
                <p class="ttl _type">998</p>
              </div>
              <div class="modal_item _300">
                <p class="ttl _type">我的出價 : &nbsp;</p>
                <p class="ttl _type">998</p>
              </div>
              <div class="modal_item _300">
                <p class="ttl _type">加盟店 : &nbsp;</p>
                <el-button type="success" icon="el-icon-success">確認</el-button>
                <el-button type="danger" icon="el-icon-error">拒絕</el-button>
              </div>
            </div>
            <div class="modal_item _300">
              <el-button type="primary">確定</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Shield>
</template>
<script>
import Shield from '@/slot/shield';

import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isScs, GO_isUdf, GO_inject, GO_fetch, GO_DClone } from "@js/GO_methods";

import scrollBar from '@mix/scrollBar'

export default {
  mixins: [GO, scrollBar],
  components: { Shield },
  data() {
    return {
      tem: 1, // 0 = p33  1 = p39 2 = p41 3 = pp44
      radio1: '要求出貨',
      stepActive: 0,
      sd_imageUrl: 0,
      imageUrl: [],
      options: [{
        value: '供應商A',
        label: '供應商A',
        quote: true
      }, {
        value: '供應商B',
        label: '供應商B',
        quote: true
      }, {
        value: '供應商C',
        label: '供應商C',
        quote: false
      }],
      checked: [],
      checkList: '',
      money: 0
    }
  },
  mounted() {
    // test
    this.imageUrl = [
      "http://34.80.214.97:12345/common/getImage?fileName=96f747fb-579e-48f4-831e-7242abd3eaac.png",
      "http://34.80.214.97:12345/common/getImage?fileName=6bf9210b-01ac-4a7a-b33a-24b151741ce1.png",
      "http://34.80.214.97:12345/common/getImage?fileName=57ebf5e6-10c7-4eb2-9d5b-957f9b579dc2.png",
      "http://34.80.214.97:12345/common/getImage?fileName=96f747fb-579e-48f4-831e-7242abd3eaac.png",
      "http://34.80.214.97:12345/common/getImage?fileName=6bf9210b-01ac-4a7a-b33a-24b151741ce1.png",
      "http://34.80.214.97:12345/common/getImage?fileName=57ebf5e6-10c7-4eb2-9d5b-957f9b579dc2.png"
    ]
  },
  computed: {

  },
  methods: {
    addList() {

    }
  }
}
</script>
