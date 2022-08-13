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

function getTranslationsAnyway() {
    fetch("./assets/json/translations.json")
        .then(res => res.json())
        .then(res => {
            localStorage.translations = JSON.stringify(res);
        })
        .catch(err => console.error(err));
}

function applyTranslations(ids) {
    ids.forEach(val => {
        $(`#${val}`).html(translate(val));
    });
}

$(async () => {
    getTranslationsAnyway();
    translations = await Promise.any([getTranslationsLocal(), getTranslationsRemote()]);
    if(translations)
        localStorage.translations = JSON.stringify(translations);

    emitter.emit("translationsLoaded");
});