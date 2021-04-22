import Vue from "vue"
import VueRouter from "vue-router";

// 引入主面板组件
import Layout from "../views/layout/LayOut"
Vue.use(VueRouter);

let routes = [
    {path:"/login",name:"login",component:()=>import('@/views/login/index')},
    {
        path:"/",
        name:"LayOut",
        component:Layout,
        redirect:"/home",
        children:[
            {path:"home",name:"home",component:()=>import("@/views/home/index")}
        ]
    },
    {
        path:"/pm",
        component:Layout,
        redirect:"/pm/product",
        children: [
            {path: "product",name:"product",component:()=>import("@/views/pm/product/index")},
            {path: "addProduct",name:"addProduct",component:()=>import("@/views/pm/product/add")},
            {path: "updateProduct",name:"updateProduct",component:()=>import("@/views/pm/product/update")},
            {path: "productCategory",name:"productCategory",component:()=>import("@/views/pm/productCategory/index")},
            {path: "productCateAdd",name:"productCateAdd",component:()=>import("@/views/pm/productCategory/add")},
            {path: "productCateUpdate",name:"productCateUpdate",component:()=>import("@/views/pm/productCategory/update")},
        ]
    },
    {
        path:"/om",
        component:Layout,
        redirect:"/om/order",
        children: [
            {path: "order",name:"order",component:()=>import("@/views/om/index")},
            {path: "setting",name:"setting",component:()=>import("@/views/om/setting")},
            {path: "deliver",name:"deliver",component:()=>import("@/views/om/deliverList")},
            {path: 'detail', name: 'detail', component: () => import('@/views/om/detail')},
        ]
    },
    {
        path:"/um",
        component:Layout,
        redirect:"/um/admin",
        children: [
            {path: 'admin', name: 'admin', component: () => import('@/views/um/admin/index')},
            {path: 'role', name: 'role', component: () => import('@/views/um/role/index')},
            {path: 'allocMenu', name: 'allocMenu', component: () => import('@/views/um/role/allocMenu')},
            {path: 'menu', name: 'menu', component: () => import('@/views/um/menu/index')}
        ]
    },
    {path:"*",name:"notFound",component:()=>import('@/views/NotFound')},
]

let router = new VueRouter({
    routes
})

// 解决vue-router重复点击报错  push方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// replace方法
const originalrePlace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalrePlace.call(this, location).catch(err => err)
}

// 全局路由守卫
router.beforeEach((to,form,next)=>{
    if(to.path === "/login"){
       return  next();
    }
    let token = window.sessionStorage.getItem("token");
    if(!token){
        return  next("/login");
    }
    next();
})
export default router;







































