import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw,  } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import OriginPage from '@/views/OriginPage.vue';
import i18n from "@/i18n"; 

const routes: Array<RouteRecordRaw> = [

  //default routes
  {
    path: "/",
    redirect: "/en/home",
  },
  {
    path: "/home",
    redirect: "/en/home",
  },
  {
    path: "/origin",
    redirect: "/en/origin",
  },

  
  {
    path: "/:lang/home",
    name: "home",
    component: HomePage,
    props: true, 
  },
  {
    path: "/:lang/origin",
    name: "origin",
    component: OriginPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

type SupportedLocale = keyof typeof i18n.global.messages.value; 
router.beforeEach((to, from, next) => {
  const supportedLocales = Object.keys(i18n.global.messages.value) as SupportedLocale[];
  const lang = to.params.lang as string;

  // If lang is not valid, redirect to default `/en/home`
  if (!supportedLocales.includes(lang as SupportedLocale)) {
    return next("/en/home");
  }

  if (i18n.global.locale.value !== lang) {
    i18n.global.locale.value = lang as SupportedLocale;
  }
  
  next();
});


export default router
