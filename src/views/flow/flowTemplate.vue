<template>
  <div v-if="$P&&$P.$SD">
    <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="$P.submit_show&&$P.submit">
      <template slot="body">
        <div class="modal_box">
          <div class="modal_ttl">{{$P.title}}</div>
          <template v-if="$P.step_show">
            <el-steps :active="$P.step" finish-status="success">
              <el-step :title="item" v-for="(item, index) in $P.stepList"></el-step>
            </el-steps>
          </template>
          <div class="modal_box fx">
            <div class="modal_item _600 _H575" v-perfect-scroll:100>
              <div class="focus_img">
                <el-avatar shape="square" :src="(($P.$SD.product||{}).imageUrl||[])[$P.sd_imageUrl]" :size="200"></el-avatar>
              </div>
              <div class="img_slider" v-dragscroll.x="true">
                <div class="img_box" v-for="(item,index) in ($P.$SD.product||{}).imageUrl" :key="index" @click="$parent.sd_imageUrl = index;">
                  <el-avatar shape="square" :src="item" :size="90"></el-avatar>
                </div>
              </div>
              <div v-if="$P.orderStatus_show" class="modal_item _300">
                <p class="ttl">訂單 :</p>
                <el-radio-group v-model="sd_orderStatus">
                  <el-radio-button :label="item" v-for="(item,index) in orderStatusList"></el-radio-button>
                  <!-- <el-radio-button label="要求出貨"></el-radio-button>
                  <el-radio-button label="準備中"></el-radio-button>
                  <el-radio-button label="出貨中"></el-radio-button>-->
                </el-radio-group>
              </div>
              <div class="modal_item _300">
                <p class="ttl">產品規格</p>
                <p v-if="!(($P.$SD.product||{}).specList||[]).length">無</p>
                <p class="ttl" v-for="(item,index) in ($P.$SD.product||{}).specList">
                  <span>{{index+1}}.</span>
                  {{item}}
                </p>
              </div>
              <div class="modal_item _300">
                <p class="ttl _type">需求數量 :</p>
                <p class="ttl _type">{{$P.$SD.number.toPrice()}}</p>
              </div>
              <div v-if="$P.select_supplier_show" class="modal_item _600 order_gap">
                <el-select v-model="sd_select_supplier" multiple filterable allow-create default-first-option placeholder="請選擇詢價的供應商" style="display: block" @change="$parent.sd_select_supplier = sd_select_supplier;">
                  <el-option v-for="(item,index) in $P.$P.supplierList" :key="index" :label="item.name" :value="item._id"></el-option>
                </el-select>
              </div>
              <div v-if="$P.choose_supplier_show" class="modal_item _600">
                <el-radio-group v-model="sd_choose_supplier" @change="$parent.sd_choose_supplier = sd_choose_supplier;">
                  <el-radio :label="item._id" v-for="(item,index) in $P.choose_supplierList">{{item.label}}</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="modal_box">
              <div class="modal_item _600" v-if="$P.isStaff">
                <div class="modal_item">
                  <p class="ttl text-center">報價紀錄</p>
                </div>
              </div>
              <div class="modal_item _300" v-if="$P.bidPrice_supplier_show">
                <p class="ttl _type">{{$P.bidPrice_supplier_title}}：</p>
                <p class="ttl _type">
                  <template v-if="$P.bidPrice_supplier_edit">
                    <el-input v-model="bidPrice_supplier" @blur="bidPrice_supplier = bidPrice_supplier.replace(/[^0-9\.]/g,'');"></el-input>
                  </template>
                  <template v-else>
                    <p>{{bidPrice_supplier}}</p>
                  </template>
                </p>
              </div>
              <div class="modal_item _300" v-if="$P.bidPrice_sales_show">
                <p class="ttl _type">{{$P.bidPrice_sales_title}}：</p>
                <p class="ttl _type">
                  <template v-if="$P.bidPrice_sales_edit">
                    <el-input v-model="bidPrice_sales" @blur="bidPrice_sales = bidPrice_sales.replace(/[^0-9\.]/g,'');"></el-input>
                  </template>
                  <template v-else>
                    <p>{{bidPrice_sales}}</p>
                  </template>
                </p>
              </div>
              <div class="modal_item _300" v-if="$P.bidPrice_retailer_show">
                <p class="ttl _type">{{$P.bidPrice_retailer_title}}：</p>
                <p class="ttl _type">
                  <template v-if="$P.bidPrice_retailer_edit">
                    <el-input v-model="bidPrice_retailer" @blur="bidPrice_retailer = bidPrice_retailer.replace(/[^0-9\.]/g,'');"></el-input>
                  </template>
                  <template v-else>
                    <p>{{bidPrice_retailer}}</p>
                  </template>
                </p>
              </div>
              <div v-if="$P.confirmbtn_show" class="modal_item _300">
                <el-button @click.native="$P.confirmbtn_accept" type="success" icon="el-icon-success">確認</el-button>
                <el-button @click.native="$P.confirmbtn_reject" type="danger" icon="el-icon-error">拒絕</el-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Shield>
  </div>
</template>
<script>
import Shield from '@/slot/shield';
//mixins
import scrollBar from '@mix/scrollBar'

export default {
  mixins: [scrollBar],
  components: { Shield },
  data() {
    return {
      //供應商詢價
      sd_select_supplier: [],
      //選擇供應商
      sd_choose_supplier: "",
      //報價流程
      bidPrice_supplier: "",
      bidPrice_sales: "",
      bidPrice_retailer: ""
    }
  },
  computed: {
    $P() {
      return this.$parent || undefined;
    }
  },
  mounted() {
    this.sd_select_supplier.push(...this.$P.sd_select_supplier);
    if (this.$P.bidPrice_supplier) this.bidPrice_supplier = this.$P.bidPrice_supplier;
    if (this.$P.bidPrice_sales) this.bidPrice_sales = this.$P.bidPrice_sales;
    if (this.$P.bidPrice_retailer) this.bidPrice_retailer = this.$P.bidPrice_retailer;
  },
  methods: {

  },
  watch: {
    bidPrice_supplier: {
      handler() {
        this.$parent.bidPrice_supplier = this.bidPrice_supplier;
      }
    },
    bidPrice_sales: {
      handler() {
        this.$parent.bidPrice_sales = this.bidPrice_sales;
      }
    },
    bidPrice_retailer: {
      handler() {
        this.$parent.bidPrice_retailer = this.bidPrice_retailer;
      }
    }
  }
}
</script>
