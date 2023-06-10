import i18next from "i18next";
import {eng} from "./en";
import {esp} from './es';

i18next.init({
    interpolation:{
        //Al estar esto en falso nos exponemos a ataques SXX
        escapeValue:true,
    },
    lng: window.location.pathname.substring(1,2)=== 'es' ? 'en':'en',
    resources:{
        en:{
            translation:eng,
        },
        es:{
            translation:esp,
        },
    },
});
export default i18next;