<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
      <div class="modal_box">
        <div class="modal_item _600">
          <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 4"></el-step>
            <el-step title="步骤5"></el-step>
          </el-steps>
        </div>
      </div>

      <div class="modal_box">
        <div class="modal_item _600">
          <p class="ttl">補貨單</p>
        </div>
      </div>
      <!-- <div class="modal_box">
        <div class="modal_ttl">
          補貨單
          <div class="modal_ttl">訂單: xxxx</div>
          <div class="modal_subtitle">補貨單</div>
          <div class="modal_subtitle">商品名稱</div>
        </div>
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
          <el-step title="步骤 4"></el-step>
          <el-step title="步骤5"></el-step>
        </el-steps>
        <div class="modal_form">
          <div class="status">
            <p>狀態</p>
            <ul class="status_list cus">
              <li class="active">要求出貨</li>
              <li>準備</li>
              <li>出貨中</li>
            </ul>
          </div>
          <div class="modal_img">
            <el-avatar shape="square" :size="150" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
            <el-avatar shape="square" :size="150" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
            <el-avatar shape="square" :size="150" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
          </div>
          <ul class="type_list decimal">
            <li>
              <div class="type">尺寸</div>:
              <div class="content">14x8</div>
            </li>
            <li>
              <div class="type">尺寸</div>:
              <div class="content">14x8</div>
            </li>
            <div class="num">數量:</div>
          </ul>
          <div class="vendor">
            <ul class="list cus">
              <li>
                <i class="el-icon-circle-plus-outline"></i>
              </li>
              <li>供應商B</li>
              <li>供應商C</li>
            </ul>
          </div>
        </div>
        <div class="modal_panels">
          <div class="quote_container">
            <div class="title">報價紀錄</div>
            <div class="title">我的報價</div>
            <div class="title">報價</div>
            <div class="quote">1000</div>
            <div class="textareaContent">
              <el-input type="textarea" placeholder="詳細說明"></el-input>
            </div>
            <ul class="quote_list cus">
              <li>
                <div class="title">供應商c</div>:
                <div class="content">12300</div>
              </li>
              <li>
                <div class="title">我們的報價</div>:
                <div class="content">1,100</div>
              </li>
              <li>
                <div class="title sub" :data-vendor="'oooo'">經銷商</div>:
                <div class="content">1,100</div>
              </li>
              <li>
                <div class="title sub" :data-vendor="'oooo'">加盟店</div>
                <div class="btn-group">
                  <el-button type="success">接受</el-button>
                  <el-button type="danger">拒絕</el-button>
                </div>
              </li>
            </ul>
            <div class="btn-group">
              <el-button type="success">接受</el-button>
              <el-button type="danger">拒絕</el-button>
            </div>
          </div>
          <div class="msg">
            <p>餘額不足 $250</p>
            <a href="#">+充值</a>
          </div>
          <div class="btn-group">
            <el-button type="primary">成功按钮</el-button>
            <el-button type="primary">確定</el-button>
            <el-button type="primary">出貨標籤</el-button>
          </div>
        </div>
      </div>-->
    </template>
  </Shield>
</template>
<script>
import Shield from '@/slot/shield';

export default {
  components: { Shield },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    submit() {
    },
  }
}
</script>
