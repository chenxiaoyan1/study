<template>
    <div>
    <button type="button" @click="handleAdd">add</button>
        <el-table
                :data="tableData"
                style="width: 100%"
                @row-dblclick="handleRowDbClick"
                @selection-change="handleCulumnSelectionChange"
                @row-click="handleRowClick"
        >
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                <template slot="header"  >
                    <span class="star">*</span>
                    <span class="starName">日期</span>
                </template>
                <template slot-scope="{row}" >
                    <el-input  v-model="row['date']" v-if="editFlag  == row['id']" >
                    </el-input>
                    <span v-else>{{row['date']}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                <template slot="header" >
                    <span class="star">*</span>
                    <span class="starName">姓名</span>
                </template>
                <template slot-scope="{row}" >
                    <el-input  v-model="row['name']" v-if="editFlag  == row['id']" >
                    </el-input>
                    <span v-else>{{row["name"]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
                <template slot="header"  >
                    <span class="star">*</span>
                    <span class="starName">地址</span>
                </template>
                <template slot-scope="{row}" >
                    <el-input  v-model="row['address']" v-if="editFlag  == row['id']" >
                    </el-input>
                    <span v-else>{{row["address"]}}</span>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>

    export default {
        name: "table",
        data:function () {
            return {
                editFlag:"",
                tableData: [
                    {
                        id:1,
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ]
            }
        },
        methods:{
            handleAdd:function () {
                const idVal= Date.now().valueOf()
                //flag=new表示是新增加的信息项，还没有保存到库表中
                this.tableData.push({id:idVal,date:'',name:'',address:''})
                this.editFlag = idVal
            },
            /** 信息项表格双击行事件*/
            handleRowDbClick(row, column, event){
                console.log(row,column,event)
                this.editFlag = row['id']
            },
            /**复选框选择事件*/
            handleCulumnSelectionChange(val){
                console.log(val)
                this.multipleSelection = val;
            },
            /**目录项行单击事件*/
            handleRowClick(row, column, event){
                console.log(row,column,event)
                //当点击其他行的时候，编辑输入域消失
                if(row['id'] !=  this.editFlag){
                    this.editFlag = ''
                }
            }
        }
    }
</script>

<style scoped>

</style>