<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit_show&&submit" :submitLabel="submitLabel">
    <template slot="body">
      <div class="modal_box">
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
            <div class="modal_box fx" style="flex-direction: column;">
              <div class="modal_item _600" style="flex-grow: 1;">
                <div class="modal_item _300">
                  <p class="ttl" style="font-size: 25px; font-weight: bold;">{{current.product.name}}</p>
                </div>
                <div class="modal_item _300">
                  <p class="ttl">產品規格</p>
                  <p v-if="!current.product.specList.length">無</p>
                  <p class="ttl" v-for="(item,index) in current.product.specList">
                    <span>{{index+1}}.</span>
                    {{item}}
                  </p>
                </div>
                <div class="modal_item _300 order_gap">
                  <p class="ttl">數量</p>
                  <el-input-number v-model="orderNumber" v-show="sd_tab === 0" :min="1" :disabled="isFranchiser&&isOutOfStock"></el-input-number>
                  <el-input-number v-model="current.number" v-show="sd_tab === 1" :min="0"></el-input-number>
                  <span :class="{isOutOfStock: isOutOfStock}" style="margin-left: 20px;">
                    庫存:
                    <template v-if="isOutOfStock">缺貨</template>
                    <template v-else>{{current.number}}</template>
                  </span>
                </div>
                <div class="modal_item _300 order_gap" v-show="sd_tab === 0">
                  <p class="ttl">詳細說明</p>
                  <div>{{current.product.description||"無"}}</div>
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
              <div v-show="sd_tab === 1" style="text-align: right;">
                <el-button type="danger" @click.native="sd_tab = 0;">建立訂單</el-button>
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
      sd_imageUrl: 0,
      current: undefined,
      orderNumber: 0,//訂單數量
      isOutOfStock: false,//是否缺貨
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
    },
    submitLabel() {
      if (this.sd_tab === 0) return "下單";
      else if (this.sd_tab === 1) return "修改庫存";
    },
    submit_show() {
      return this.user.role.has(USER_ROLE.franchiser) ? !this.isOutOfStock : true;
    }
  },
  mounted() {
    const { productList, sd_product } = this.getVue("category");
    if (GO_isUdf(productList) || GO_isUdf(sd_product)) {
      this.GO.R_backfrom("pmode");
      return false;
    };
    if (this.user.role === USER_ROLE.retailer) {
      this.sd_tab = 1;
    }
    this.current = GO_DClone(productList[sd_product]);
    this.current.product.number = this.current.product.number || 0;
    this.isOutOfStock = (this.current.number === 0);
  },
  methods: {
    updateProductNumber() {//修改庫存
      const { productId, number } = this.current;
      this.$api.getRetailerService().updateProductNumber(productId, this.user._id, number).then(res => {
        if (GO_isScs(res.status)) {
          this.getVue("category").getData("category");
          this.getVue("category").getData("product", this.$route.params.cid);
          this.GO.R_back();
          this.$root.m_scs("修改成功");
        }
        else this.$root.m_scs("修改失敗");
      }).catch(ex => { this.GO.catch(ex, "修改失敗"); });
    },
    createOrder() {
      const params = {
        product: this.current.product,
        productItemId: this.current.product._id,
        number: this.orderNumber,
        creator: {
          _id: this.user._id,
          email: this.user.email,
          name: this.user.name,
          role: this.user.role,
        }
      }
      if (this.isRetailer) {
        params.retailerId = this.user._id;
        this.$api.getRetailerService().createReplenishingOrder(params).then(res => {
          if (GO_isScs(res.status)) {
            this.getVue("category").getData("category");
            this.getVue("category").getData("product", this.$route.params.cid);
            this.GO.R_back();
            this.$root.m_scs("送出成功");
          }
          else this.$root.m_eooro("送出失敗");
        }).catch(ex => { this.GO.catch(ex, "送出失敗"); });
      }
      else if (this.isFranchiser) {
        params.retailerId = this.user.retailerId;
        this.$api.getFranchiserService().createNormalOrder(params).then(res => {
          if (GO_isScs(res.status)) {
            this.getVue("category").getData("category");
            this.getVue("category").getData("product", this.$route.params.cid);
            this.GO.R_back();
            this.$root.m_scs("送出成功");
          }
          else this.$root.m_eooro("送出失敗");
        }).catch(ex => { this.GO.catch(ex, "送出失敗"); });
      }
    },
    submit() {
      if (this.sd_tab === 0) {//訂貨
        this.createOrder();
      }
      else if (this.sd_tab === 1) {//修改庫存
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