const lang = localStorage.getItem("language") || "en";
const emitter = mitt();
var translations = [];

const translate = token => {
    return translations.find((val) => val.token === token).translations[lang] === ""
        ? translations.find((val) => val.token === token).translations["en"]
        : translations.find((val) => val.token === token).translations[lang];
}

async function getTranslationsLocal() {
    return localStorage.getItem("translations") 
        ? Promise.resolve(JSON.parse(localStorage.getItem("translations")))
        : Promise.reject("Not Found");
}

async function getTranslationsRemote() {
    return await fetch("./assets/json/translations.json")
        .then(res => res.json())
        .catch(err => console.error(err));
}

function applyTranslations(ids) {
    ids.forEach(val => {
        $(`#${val}`).text(translate(val));
    });
}

$(async () => {
    translations = await Promise.any([getTranslationsLocal(), getTranslationsRemote()]);
    if(translations)
        localStorage.translations = JSON.stringify(translations);

    emitter.emit("translationsLoaded");
});