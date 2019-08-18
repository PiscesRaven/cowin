<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
      <div class="modal_ttl">- 新增/編輯商品類別 -</div>
      <div class="modal_box">
        <div class="modal_item _600">
          <el-input v-model.trim="name" placeholder="请输入商品類別名稱"></el-input>
        </div>
      </div>
      <div class="modal_box">
        <div class="modal_item _600">
          <el-input placeholder="詳細說明" type="textarea" v-model="description"></el-input>
        </div>
      </div>
      <div class="modal_box">
        <categoryImg />
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
