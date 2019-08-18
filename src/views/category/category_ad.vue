<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
      <div class="modal_ttl">- 新增 商品 -</div>
      <div class="modal_box">
        <div class="modal_item _200">
          <el-input v-model.trim="name" placeholder="商品名稱"></el-input>
        </div>
        <div class="modal_item _200">
          <el-input v-model.trim="type" placeholder="商品型號"></el-input>
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
      <div class="modal_box">
        <div class="modal_item _600">
          <el-tag :key="tag" v-for="tag in elTags" closable :disable-transitions="false" type="info" @close="delTag(tag)">{{tag}}</el-tag>
          <el-input class="input-new-tag" v-if="elShowInput" v-model="elTagVal" ref="saveTagInput" size="small" @keyup.enter.native="inputConfirm" @blur="inputConfirm"></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">輸入規格名稱</el-button>
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