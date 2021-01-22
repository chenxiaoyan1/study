<template>
    <div class="tableBox">
        <voTable @search="search" :table="tableAll" :pageParam="getTable"
                 @action="action"></voTable>
    </div>
</template>
<script>
    import voTable from './table2'
    // import axios from 'axios'
    export default {
        name: "user-list",
        components:{ voTable },
        data:()=>({
            tableAll:{
                defaultSort:{prop:'createdTime',order:'descending'},
                status:{disabled:true},
                tableLabel:[
                    {prop:'username',title:'USER_ID',width:'150',fixed:true},
                    {prop:'email',title:'ACCOUNT_EMAIL_ADDRESS',width:'200'},
                    {prop:'roleName',title:'ACCOUNT_ROLE_GROUP',width:'200'},
                    {prop:'createdTime',title:'CREATED_TIME',width:'200'}
                ],
                tableData: [],
                tableOption:{
                    width:'100',
                    buttons:[
                        {label:'BTN_DETAIL',methods:'detail'},
                        {label:'BTN_DELETE',methods:'delete'}
                    ]
                },
                total:0
            },
            /*你的请求参数*/
            getTable:{
                pageSize: 10,
                pageNo: 1,
                username: '',
                roleId: null,
                orderBy:''
            }
        }),
        methods:{
            action(obj){
                if(obj.methods === 'detail'){
                    console.log('这里添加详情函数')
                }
                if(obj.methods === 'delete'){
                    console.log('这里添加删除函数')
                }
            },
            search(obj){
                this.getTable.pageSize = obj.pageSize;
                this.getTable.pageNo = obj.pageNo;
                this.getTable.orderBy = obj.orderBy;
                // this.$post(‘你的后台API地址’,this.getTable).then((res) => {
                //     this.tableAll.tableData = res.data.result;
                //     this.tableAll.total = res.data.total
                // })
            }
        },
        mounted:function(){
            // axios.post(‘你的后台API地址’,this.getTable).then((res) => {
            //     this.tableAll.tableData = res.data.result;
            //     this.tableAll.total = res.data.total
            // })
        }
    }
</script>

