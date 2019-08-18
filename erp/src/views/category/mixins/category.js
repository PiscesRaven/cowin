import Shield from '@/slot/shield';

import Hambuger from '@c/hambuger';

import scrollBar from '@mix/scrollBar';

export default {
  components: { Shield, Hambuger },
  mixins: [scrollBar],
  data() {
    return {
      name: '',// product & order
      category: '', // product
      type: '', // product & order
      description: '', // product & order
      size: '', // product & order
      color: '', // product & order
      retailerId: '',  // product & order
      number: 0, // product & order
      soldNumber: 0, // product
      imageUrl: '', // order
      textarea: '',
      elShowFolder: false, // 資料夾開啟狀態
      elTags: ['标签一', '标签二', '标签三'], // 商品 tag
      elTagVal: '', // elTag input
      elnum: 0,
      elShowInput: false,
      spType: [], // 特規
      spInoutType: { type: '', content: '' }, //輸入特規

    }
  },
  methods: {
    submit() {

    },
    addImg(file) {
      console.log(file)
      //新增圖片
      this.imageUrl = file.url;
      this.showFolder = true;
    },
    removeImg(file, fileList) {
      //刪除圖片
      console.log(file, fileList);
    },
    delTag(tag) {
      // 刪除tag
      this.elTags.splice(this.elTags.indexOf(tag), 1);
    },
    inputConfirm() {
      // 確認tag輸入內容
      let elTagVal = this.elTagVal;
      if (elTagVal) {
        this.elTags.push(elTagVal);
      }
      this.elShowInput = false;
      this.elTagVal = '';
    },
    showInput() {
      // 顯示 tag input
      this.elShowInput = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    open() {
      // 刪除談窗
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      });
    },
    addSpList() {
      // 新增特規清單
      if (this.spInoutType.type === '' || this.spInoutType.content === '') return
      let obj = this.spInoutType
      this.spType.push(obj)
      this.clearSpList()
    },
    clearSpList() {
      // 清空表單
      this.spInoutType = {
        type: '',
        content: ''
      }
    },
    delSpList(item) {
      // 刪除特規清單
      this.spType.splice(this.spType.indexOf(item), 1);
    },
    numberChange(value) {
      console.log(value);
    },
    collapseChange(value) {
      console.log(value);
    }
  }
}