import preact from 'preact';
import SearchBar from "./SearchBar";
import { IntlProvider, Text } from 'preact-i18n';
import t from 'i18n';

/* modified after https://codepen.io/danielgroen/pen/VeRPOq */
const hero_rights = [ t("data-access", "home"), t("data-erasure", "home"), t("data-rectification", "home"), t("objection", "home"), t("privacy", "home") ];
/* TODO: Create a proper repository of suggested companies and use that here. */
const search_suggested_companies = [ "Schufa", "Amazon", "Creditreform Boniversum", "infoscore", "ARD ZDF Deutschlandradio Beitragsservice", "CRIF Bürgel", "PayPal" ];


preact.render(
    (
        <IntlProvider scope="home" definition={I18N_DEFINITION}>
            <SearchBar id="aa-search-input" algolia_appId='M90RBUHW3U' algolia_apiKey='a306a2fc33ccc9aaf8cbe34948cf97ed' index='companies'
                       onAutocompleteSelected={(event, suggestion, dataset) => {
                           location.href = '/company/' + suggestion.slug;
                       }} placeholder={t('how-about', 'home', { 'name': 'Schufa' })} debug={false} setupPlaceholderChange={setupPlaceholderChange} />
        </IntlProvider>
    ), null, document.getElementById('home-search'));

function typewriter(text, i, fnCallback) {
    if (text && i < (text.length)) {
        document.getElementById("home-hero-word").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

        setTimeout(function() {
            typewriter(text, i + 1, fnCallback)
        }, 150);
    }
    else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}
function startTextAnimation(i) {
    if (i < hero_rights.length) {
        typewriter(hero_rights[i], 0, () => {
            startTextAnimation(i + 1);
        });
    } else {
        setTimeout(function() {
            startTextAnimation(0);
        }, 20000);
    }
}
function setupPlaceholderChange(element) {
    setInterval(() => {
        let index = Math.floor(Math.random() * (search_suggested_companies.length-1));
        element.placeholder = t('how-about', 'home', { 'name': search_suggested_companies[index] });
    }, 2000);
}

window.onload = () => {
    startTextAnimation(0);
};
