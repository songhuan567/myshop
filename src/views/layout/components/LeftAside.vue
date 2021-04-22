<template>
    <el-aside class="aside" :width="isCollapse ? '64px' : '200px'" style="background-color: rgb(238, 241, 246)">
        <el-menu
                :collapse="isCollapse"
                :collapse-transition="false"
                :default-active="$route.path"
                active-text-color="#E9232C"
        >
            <template v-for="item in menuList">
                <el-menu-item
                        :index="item.key"
                        v-if="item.children.length === 0"
                        @click="dealNavLink(item.key, item.id)"
                >
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
                <el-submenu v-else :index="item.key">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <el-menu-item
                            v-for="subItem in item.children"
                            :index="subItem.key"
                            :key="subItem.key"
                            @click="dealNavLink(subItem.key, subItem.id)"
                    >
                        <template slot="title">
                            <i :class="subItem.icon"></i>
                            <span slot="title">{{subItem.title}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </el-aside>
</template>

<script>
    import {getLeftMenuByRole} from './../../../api/adminApi'
    export default {
        name: "LeftAside",
        props:{
            isCollapse:{
                type:Boolean
            }
        },
        created() {
            this.getLeftMenu();
            this.activeId = window.sessionStorage.getItem("activeId");
        },
        data(){
            return{
                menuList:null,
                activeId:"", // 被激活的ID
            }
        },
        methods: {
            dealNavLink(activePath,activeId){
                // console.log(activeId)
                // 要把activeId持久化
                window.sessionStorage.setItem("activeId",activeId);
                this.activeId = activeId;

                // 再进行跳转
                this.$router.push(activePath)
            },
            getLeftMenu(){
                let  roleId = JSON.parse(window.sessionStorage.getItem("user")).roleid;
                let roleIdArr = [];
                if(roleId){
                    roleIdArr = roleId.split(',');
                }
                getLeftMenuByRole({roleIdArr}).then((response)=>{
                    if(response.status === 1){
                        this.menuList = response.data;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo{
        height: 100%;
    }
    .el-aside{
        height: 100%;
    }
    ul{
        height: 100%;
    }
    i{
        font-size: 20px;
        margin-right: 5px;
    }
</style>
