<template>
  <div class="category_frame">
    <div class="tab_ctn">
      <div class="tab_title">商品類別</div>
      <div class="tab_search">
        <el-input placeholder="輸入關鍵字" v-model="input" prefix-icon="el-icon-search"></el-input>
      </div>
    </div>
    <div class="category_ctn">
      <div class="category_list">
        <div class="list" v-for="(item, index) in list" :key="index">
          <div class="catalogue_img">
            <img src="@img/category/screw1.png" />
            <template v-if="hambuger_show">
              <el-dropdown trigger="click" class="hambuger">
                <span class="el-dropdown-link vtc cp">
                  <img src="@as/img/menu.png" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <div @click="sp_category('edit', '')">
                    <el-dropdown-item>編輯</el-dropdown-item>
                  </div>
                  <div @click="sp_category('delete', '')">
                    <el-dropdown-item>刪除</el-dropdown-item>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <div class="catalogue_name">{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="add_box">
      <i class="el-icon-circle-plus btn1" @click="sp_category('create')"></i>
    </div>
    <router-view />
  </div>
</template>
<script>
//components
import { mapState } from "vuex";

// mixins
import GO from "@mix/GO_mixins";

import Hambuger from '@c/hambuger';
//model
import { USER_ROLE } from "@js/model";
const mixins = [GO];
const pathname = location.pathname;
if (pathname.has([USER_ROLE.retailer, USER_ROLE.franchiser])) {
  mixins.push(require("@v/category/mixins/order").default);
}
export default {
  components: { Hambuger },
  mixins,
  data() {
    return {
      input: '',
      sd_role: "",
      sd_category: '',
      hambuger_show: true,
      list: [
        {
          item: 'screw1',
          title: '牙根'
        }, {
          img: 'screw2',
          title: '機車'
        }, {
          img: 'screw3',
          title: '汽車'
        },
        {
          item: 'screw1',
          title: '牙根'
        }, {
          img: 'screw2',
          title: '機車'
        }, {
          img: 'screw3',
          title: '汽車'
        }, {
          item: 'screw1',
          title: '牙根'
        }, {
          img: 'screw2',
          title: '機車'
        }, {
          img: 'screw3',
          title: '汽車'
        }, {
          item: 'screw1',
          title: '牙根'
        }, {
          img: 'screw2',
          title: '機車'
        }, {
          img: 'screw3',
          title: '汽車'
        }
      ]
    }
  },
  computed: {
    ...mapState(["R2R"])
  },
  created() {
    this.toPublic("category");
    this.init();
  },
  mounted() {
  },
  methods: {
    init() {
      const { role } = this.$route.params;
      if (!role) this.$router.replace({ path: `${this.$route.path}/${this.R2R[0]}` });
      else this.sd_role = role;
    },
    getData() {
      this.$api.getAdminService().getUserList().then(res => {
        if (res.length) {
          res.forEach((el, i) => {
            el.i = i;
          });
          this.userList = res;
        };
      }).catch(ex => { this.GO.catch(ex); });
    },
    handleRole() {
      if (this.sd_role === this.$route.params.role) return false;
      this.$router.push({ path: `${this.$route.meta.parentPath}/${this.sd_role}` });
    },
    sp_category(mode, index) {
      if (typeof index === "number") this.sd_category = index;
      if (/^(create|edit)$/.test(mode)) this.GO.R_toMode(mode);

      else if (mode === "delete") {
        this.$confirm('確定要刪除嗎?', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { })
      }
    }
  },
  watch: {
    "$route": {
      handler() {
        this.init();
      }
    }
  }
}
</script>