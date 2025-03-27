import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import i18n from "@/i18n";
import SelectionComp from "@/components/SelectionComp.vue";
import GatewayPage from "@/views/GatewayPage.vue";
import App from "@/App.vue";
import CompletePage from "@/views/CompletePage.vue";
import TransactionPage from "@/views/TransactionPage.vue";

const routes: Array<RouteRecordRaw> = [
	//default routes
	{
		path: "/",
		redirect: "/en",
	},
	{
		path: "/:lang",
		component: App,
		children: [
			{
				path: "",
				name: "home",
				component: HomePage,
			},
			{
				path: "origin",
				name: "origin",
				component: SelectionComp,
				props: { selectionType: "origin", to: "destination" },
				meta: {step: 1}
			},
			{
				path: "destination",
				name: "destination",
				component: SelectionComp,
				props: { selectionType: "destination", to: "payment" },
				beforeEnter: (to) => {
					if (Object.keys(to.query).length === 0) {
						return false;
					}
				},
				meta: {step: 2}
			},
			{
				path: "payment",
				name: "payment",
				component: GatewayPage,
				beforeEnter: (to) => {
					if (!to.query.destination) {
						return false;
					}
				},
				meta: {step: 3}
			},
			{
				path: "transaction",
				name: "transaction",
				component: TransactionPage,
				meta: {step: 4}
			},
			{
				path: "complete",
				name: "complete",
				component: CompletePage
			},
		],
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
	console.log(to.params.lang, from.params.lang)
	next();
});



export default router;
