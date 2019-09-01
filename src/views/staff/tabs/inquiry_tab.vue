<template>
  <div>
    <div class="table_ctn">
      <el-table :data="tabData" stripe style="width: 100%" max-height="650" highlight-current-row fit border>
        <el-table-column label="#" width="50px;" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column property="name" label="商品"></el-table-column>
        <el-table-column property="quantity" label="最低價"></el-table-column>
        <el-table-column property="quantity" label="加盟店"></el-table-column>
        <el-table-column property="type" label="經銷商"></el-table-column>
        <el-table-column property="quantity" label="數量"></el-table-column>
        <el-table-column property="type" label="負責採購員工"></el-table-column>
        <el-table-column property="type" label="規格"></el-table-column>
        <el-table-column property="updatedTime" label="時間"></el-table-column>
        <el-table-column width="50px;">
          <template slot-scope="scope">
            <optionItem :inquiry="[sp_user,'inquiry',scope.row.i]" :del="[sp_user,'delete',scope.row.i]"></optionItem>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import tabs from '@v/staff/mixins/tabs'

export default {
  name: 'order_tab',
  mixins: [tabs]

}
</script>