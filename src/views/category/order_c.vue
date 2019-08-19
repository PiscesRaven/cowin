<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
      <div class="modal_box">
        <div class="modal_item _600" v-perfect-scroll:100>
          <el-avatar v-for="item in 3" shape="square" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" :size="180"></el-avatar>
        </div>
        <div class="modal_box">
          <div class="modal_item _600 _H150" v-perfect-scroll:100>
            <el-collapse @change="collapseChange">
              <el-collapse-item title="規格" name="1">
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
                </div>
              </el-collapse-item>
            </el-collapse>
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
        </div>
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
  mixins: [category, modal ,scrollBar]
}
</script>
