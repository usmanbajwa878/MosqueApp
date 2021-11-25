import i18next from 'i18next'
import english from './english.json';
import german from './german.json';
import arabic from './arabic.json';
import dutch from './dutch.json';
import urdu from './urdu.json';
import spanish from './spanish.json';
import italian from './Italian.json';
import french from './french.json';
import { initReactI18next } from 'react-i18next';


i18next.use(initReactI18next).init({
    lng:'en',
    resources:{
        en:english,
        it:italian,
        es:spanish,
        ar:arabic,
        ur:urdu,
        fr:french,
        du:dutch,
        gr:german
    },
    react:{
        useSuspense:false
    }
});

export default i18next;