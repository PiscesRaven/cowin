<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit_show&&submit">
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
                  <p class="ttl" style="font-size: 25px; font-weight: bold;">{{current.product.name}}</p>
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
                  <el-input-number v-model="orderNumber" v-show="sd_tab === '0'" :min="1" :disabled="isOutOfStock"></el-input-number>
                  <el-input-number v-model="current.number" v-show="sd_tab === '1'" :min="0"></el-input-number>
                  <span :class="{isOutOfStock: isOutOfStock}" style="margin-left: 20px;">
                    庫存:
                    <template v-if="isOutOfStock">缺貨</template>
                    <template v-else>{{current.number}}</template>
                  </span>
                </div>
                <div class="modal_item _300 order_gap" v-show="sd_tab === '0'">
                  <el-input class="minh_100" type="textarea" v-model="current.product.description"></el-input>
                </div>
                <template v-if="isFranchiser&&isOutOfStock">
                  <div class="modal_box">
                    <div class="modal_item order_gap">
                      <!-- ////test 無API -->
                      <el-button type="danger" style="width: 100%;">通知經銷商</el-button>
                    </div>
                  </div>
                </template>
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
      sd_tab: '0',
      tabs: ['建立訂單'],
      sd_imageUrl: 0,
      current: undefined,
      orderNumber: 0,//訂單數量
      isOutOfStock: false,//是否缺貨
      submit_show: true
    }
  },
  computed: {
    ...mapState(["user"]),
    E2C() {
      return E2C;
    },
    USER_ROLE() {
      return USER_ROLE;
    },
    isRetailer() {
      return this.user.role === USER_ROLE.retailer;
    },
    isFranchiser() {
      return this.user.role === USER_ROLE.franchiser;
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
    this.current = GO_DClone(productList[sd_product]);
    this.current.product.number = this.current.product.number || 0;
    this.isOutOfStock = (this.current.number === 0);
    this.submit_show = !this.isOutOfStock;
  },
  methods: {
    updateProductNumber() {//修改庫存
      const { _id, number } = this.current;
      this.$api.getRetailerService().updateProductNumber(_id, number).then(res => {
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
      if (this.isRetailer) {
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
      else if (this.isFranchiser) {
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
    },
    submit() {
      if (this.sd_tab === '0') {//訂貨
        this.createOrder();
      }
      else if (this.sd_tab === '1') {//修改庫存
        this.updateProductNumber();
      }
    }
  }
}
</script>
<style lang="less">
span.isOutOfStock {
  color: red;
}
</style>