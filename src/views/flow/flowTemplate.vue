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
                <el-avatar shape="square" :src="$P.$SD.product.imageUrl[$P.sd_imageUrl]" :size="200"></el-avatar>
              </div>
              <div class="img_slider" v-dragscroll.x="true">
                <div class="img_box" v-for="(item,index) in $P.$SD.product.imageUrl" :key="index" @click="$parent.sd_imageUrl = index;">
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
                <p v-if="!$P.$SD.product.specList.length">無</p>
                <p class="ttl" v-for="(item,index) in $P.$SD.product.specList">
                  <span>{{index+1}}.</span>
                  {{item}}
                </p>
              </div>
              <div class="modal_item _300">
                <p class="ttl _type">需求數量 :</p>
                <p class="ttl _type">{{$P.$SD.number.toString().replace(/\B(?=(\d{3})+$)/g,',')}}</p>
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
            <div class="modal_box" v-if="$P.priceStep === 0">
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
            <div class="modal_box" v-if="$P.priceStep === 1">
              <div class="modal_item _600">
                <div class="modal_item">
                  <p class="ttl text-center">我的報價</p>
                </div>
                <div class="modal_item _300">
                  <p class="ttl _type">報價 : &nbsp;</p>
                  <el-input v-model="bidPrice_supplier" @blur="bidPrice_supplier = bidPrice_supplier.replace(/[^0-9\.]/g,'');"></el-input>
                </div>
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
  computed: {
    $P() {
      return this.$parent || undefined;
    }
  },
  mounted() {
    this.sd_select_supplier.push(...this.$P.sd_select_supplier);
    this.bidPrice_supplier = this.$P.bidPrice_supplier;
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
  methods: {

  },
  watch: {
    bidPrice_supplier: {
      handler() {
        this.$parent.bidPrice_supplier = this.bidPrice_supplier;
      }
    }
  }
}
</script>
