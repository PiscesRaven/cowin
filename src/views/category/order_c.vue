<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'">
    <template slot="body">
      <div class="modal_box">
        <el-tabs v-model="sd_tab" type="card">
          <el-tab-pane :label="item" :name="`${index}`" :key="index" v-for="(item,index) in tabs"></el-tab-pane>
        </el-tabs>
        <template v-if="!!current">
          <div class="modal_box fx">
            <div class="modal_item _600">
              <div class="focus_img">
                <el-avatar shape="square" :src="current.product.imageUrl[sd_imageUrl]" :size="300"></el-avatar>
              </div>
              <div class="img_slider" v-dragscroll.x="true">
                <div class="img_box" v-for="(item,index) in current.product.imageUrl" :key="index" @click="sd_imageUrl = index;">
                  <el-avatar shape="square" :src="item" :size="90"></el-avatar>
                </div>
              </div>
            </div>
            <div class="modal_box">
              <div class="modal_item _600">
                <div class="modal_item _300">
                  <p class="ttl">{{current.product.name}}</p>
                </div>
                <div class="modal_item _300">
                  <p class="ttl _type">尺寸 :</p>
                  <p class="ttl _type">{{current.product.size}}</p>
                </div>
                <div class="modal_item _300">
                  <p class="ttl _type">顏色 :</p>
                  <p class="ttl _type">{{current.product.color}}</p>
                </div>
                <div class="modal_item _300 order_gap">
                  <p class="ttl">數量</p>
                  <el-input-number v-model="orderNumber" v-show="sd_tab === '0'" :min="1"></el-input-number>
                  <el-input-number v-model="current.number" v-show="sd_tab === '1'" :min="0"></el-input-number>
                </div>
                <div class="modal_item _300 order_gap" v-show="sd_tab === '0'">
                  <el-input type="textarea" v-model="current.product.description"></el-input>
                </div>
                <div class="modal_box">
                  <div class="modal_item _200 order_gap" v-show="sd_tab === '1'" @click="updateProductNumber">
                    <el-button type="primary">確認</el-button>
                  </div>
                  <div class="modal_item _200 order_gap" v-show="sd_tab === '0'" @click="createOrder">
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
import { mapState } from "vuex";
import Shield from '@/slot/shield';
import { E2C, USER_ROLE } from "@js/model";

// mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isUdf, GO_DClone, GO_isScs } from "@js/GO_methods";
export default {
  components: { Shield },
  mixins: [GO],
  data() {
    return {
      sd_tab: 0,
      tabs: ['建立訂單'],
      sd_imageUrl: 0,
      current: undefined,
      orderNumber: 0//訂單數量
    }
  },
  computed: {
    ...mapState(["user"]),
    E2C() {
      return E2C;
    },
    USER_ROLE() {
      return USER_ROLE;
    }
  },
  mounted() {
    const { productList, sd_product } = this.getVue("category");
    if (GO_isUdf(productList) || GO_isUdf(sd_product)) {
      this.GO.R_backfrom("pmode");
      return false;
    };
    if (this.user.role === USER_ROLE.retailer) {
      this.tabs.push('商品庫存');
    }
    ////test
    // productList[sd_product].product.imageUrl = [
    //   "http://34.80.214.97:12345/common/getImage?fileName=96f747fb-579e-48f4-831e-7242abd3eaac.png",
    //   "http://34.80.214.97:12345/common/getImage?fileName=6bf9210b-01ac-4a7a-b33a-24b151741ce1.png",
    //   "http://34.80.214.97:12345/common/getImage?fileName=57ebf5e6-10c7-4eb2-9d5b-957f9b579dc2.png",
    //   "http://34.80.214.97:12345/common/getImage?fileName=96f747fb-579e-48f4-831e-7242abd3eaac.png",
    //   "http://34.80.214.97:12345/common/getImage?fileName=6bf9210b-01ac-4a7a-b33a-24b151741ce1.png",
    //   "http://34.80.214.97:12345/common/getImage?fileName=57ebf5e6-10c7-4eb2-9d5b-957f9b579dc2.png"
    // ]
    this.current = GO_DClone(productList[sd_product]);
    this.current.product.number = this.current.product.number || 0;
  },
  methods: {
    updateProductNumber() {//修改庫存
      const { _id, number } = this.current;
      this.$api.getRetailerService().updateProductNumber(_id, number).then(res => {
        ////test
        if (GO_isScs(res.status)) {
          this.getVue("category").getData("category");
          this.getVue("category").getData("product");
          this.GO.R_back();
          this.$root.m_scs("修改成功");
        }
        else this.$root.m_scs("修改失敗");
      }).catch(ex => { this.GO.catch(ex, "修改失敗"); });
    },
    createOrder() {
      if (this.user.role === USER_ROLE.retailer) {
        const params = {
          productItemId: this.current.product._id,
          number: this.orderNumber
        }
        this.$api.getRetailerService().createReplenishingOrder(params).then(res => {
          if (GO_isScs(rse.status)) {
            this.getVue("category").getData("category");
            this.getVue("category").getData("product");
            this.GO.R_back();
            this.$root.m_scs("送出成功");
          }
          else this.$root.m_eooro("送出失敗");
        }).catch(ex => { this.GO.catch(ex, "送出失敗"); });
      }
      else if (this.user.role === USER_ROLE.franchiser) {
        const params = {
          productItemId: this.current.product._id,
          retailerId: this.user.retailerId,
          number: this.orderNumber
        }
        this.$api.getFranchiserService().createNormalOrder(params).then(res => {
          if (GO_isScs(rse.status)) {
            this.getVue("category").getData("category");
            this.getVue("category").getData("product");
            this.GO.R_back();
            this.$root.m_scs("送出成功");
          }
          else this.$root.m_eooro("送出失敗");
        }).catch(ex => { this.GO.catch(ex, "送出失敗"); });
      }
    }
  }
}
</script>
