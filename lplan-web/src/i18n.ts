import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
//import HttpApi  from "i18next-http-backend";
import translationEN from "../src/languages/en/translation.json"
import translationES from "../src/languages/es/translation.json"
import translationPT from "../src/languages/pt/translation.json"
import translationDE from "../src/languages/de/translation.json"

/**/

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    
    fallbackLng: "en",
    debug:true,
    resources:{
        en:{
            translation:translationEN,
        },
        es:{
            translation:translationES,
        },
        pt:{
          translation:translationPT,
        },
        de:{
          translation:translationDE,
        }

    }
    
  });
export default i18next;
