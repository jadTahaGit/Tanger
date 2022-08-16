emitter.on("translationsLoaded", () => {
    var tokens = ['aboutUs', 'founder', 'goals', 'protocol', 'certification', 'packages', 'contactUs',
                  'aboutUsDescription', 'ahmadSlieman', 'founderAndCEO', 'founderAndCEODescription',
                  'aimsAndGoals', 'aimsAndGoalsDescription', 'protocolTitle', 'protocolDescription',
                  'certificationAndOutcome', 'certificationAndOutcomeDescription', 'silverPackage',
                  'goldPackage', 'diamondPackage', 'VIPPackage', 'contactSectionDescription'];
    applyTranslations(tokens);
});