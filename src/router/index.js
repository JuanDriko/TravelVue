import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import sourceData from "@/data.json";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/protected", name: "protected", component: () => import("@/views/Protected.vue"),
    meta:{
        requestAuth: true,
    }
    },
    {
        path: "/login", name: "login", component: () => import("@/views/Login.vue"),
    },
    {
      path: "/invoices", name: "invoices", component: () => import("@/views/Invoices.vue"),
    },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () => import("@/views/destinationShow.vue"),
    props: (route) => ({ ...route.params, id: parseInt(route.params.id)}),
    beforeEnter: (to, from) => {
        const exists = sourceData.destinations.find(destination => destination.id === parseInt(to.params.id))
        if(!exists) return {name: 'NotFound',
        params: {pathMatch: to.path.split('/').slice(1)},
        query: to.query,
        hash: to,hash    
    }
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () => import("@/views/ExperienceShow.vue"),
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "travel-active-link",
  scrollBehavior (to, from, savedPosition){
    return savedPosition || new Promise((resolve)=>{
        setTimeout(()=>resolve({top:0, behavior:'smooth'},3000))
    })
  }
});
router.beforeEach((to, from)=>{
    if(to.meta.requestAuth && !window.user){
        return {name: 'login', query:{redirect: to.fullPath}}
    }
})

export default router;
