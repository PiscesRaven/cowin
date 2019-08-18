<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
      <div class="modal_ttl">- 建立特殊規格訂單 -</div>
      <div class="modal_box">
        <categoryImg />
      </div>
      <div class="modal_box">
        <div class="modal_item _600 _H150" v-perfect-scroll:100>
          <el-collapse @change="collapseChange">
            <el-collapse-item title="規格" name="1">
              <div class="modal_box">
                <div class="modal_item _200">
                  <p class="ttl">尺寸</p>
                  <el-input type="test" v-model.trim="size"></el-input>
                </div>
                <div class="modal_item _200">
                  <p class="ttl">顏色</p>
                  <el-input type="test" v-model.trim="color"></el-input>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div class="modal_box">
        <div class="modal_item _200">
          <p class="ttl">數量</p>
          <el-input-number v-model="elnum" @change="numberChange" :min="1" label="描述文字"></el-input-number>
        </div>
      </div>
      <div class="modal_box">
        <div class="modal_item _600">
          <el-input placeholder="詳細說明" type="textarea" v-model="description"></el-input>
        </div>
      </div>
      <Hambuger />
    </template>
  </Shield>
</template>
<script>
import Shield from '@/slot/shield';

import Hambuger from '@c/hambuger';

import categoryImg from '@c/category_img';

import category from './mixins/category'


export default {
  components: { Shield, Hambuger, categoryImg },
  mixins: [category]
}
</script>
