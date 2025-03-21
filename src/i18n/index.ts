import { createI18n } from "vue-i18n";
import messages from "./messages";

const i18n = createI18n({
  // default locale
    legacy: false, 
    locale: "en",
    messages: messages,
});

export default i18n;
