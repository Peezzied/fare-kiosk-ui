import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import i18n from "@/i18n";
import SelectionComp from "@/components/SelectionPage.vue";
import GatewayPage from "@/views/GatewayPage.vue";
import App from "@/App.vue";
import CompletePage from "@/views/CompletePage.vue";
import TransactionPage from "@/views/TransactionPage.vue";
import { Network } from '@capacitor/network';
import { useLoadingStore } from "@/stores/loadingStore";

const routes: Array<RouteRecordRaw> = [
	//default routes
	{
		path: "/",
		redirect: "/en",
	},
	{
		path: "/:lang",
		name: "home",
		component: HomePage,
	},
	{
		path: "/:lang/origin",
		name: "origin",
		component: SelectionComp,
		props: { selectionType: "origin", to: "destination" },
		meta: { step: 1 },
		beforeEnter: async (to,from,next)=>{
			const status = await Network.getStatus();
			console.log("Is Connected",status.connected)
			if (status.connected) {
				return next()
			} else {
				const loadingStore = useLoadingStore();
				loadingStore.startLoading()
				console.log(loadingStore.isLoading)
				return false
			}
		}
	},
	{
		path: "/:lang/destination",
		name: "destination",
		component: SelectionComp,
		props: { selectionType: "destination", to: "payment" },
		meta: { step: 2 },
	},
	{
		path: "/:lang/payment",
		name: "payment",
		component: GatewayPage,
		meta: { step: 3 },
	},
	{
		path: "/:lang/transaction",
		name: "transaction",
		component: TransactionPage,
		meta: { step: 4 },
	},
	{
		path: "/:lang/complete",
		name: "complete",
		component: CompletePage,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

type SupportedLocale = keyof typeof i18n.global.messages.value;
router.beforeEach((to, from, next) => {
	const lang = to.params.lang as string;

	if (i18n.global.locale.value !== lang) {
		i18n.global.locale.value = lang as SupportedLocale;
	}
	next();
});

export default router;