(function anonymous(scriptName, applier) {
    function T173EduLifeLIFWWWMMReveilleButtonOrderLifeInsQuote_Qualifying() {
        function inner_T173EduLifeLIFWWWMMReveilleButtonOrderLifeInsQuote_Qualifying(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, campaign, renderer, Integrations) {
            function isQualified() {
                const def = new Deferred();
                if (window.innerWidth >= 768) {
                    def.resolve();
                } else {
                    def.reject();
                }
                return def.promise();
            }

            campaign.scope.qualificationRules = campaign.scope.qualificationRules || [];
            campaign.scope.qualificationRules.push(isQualified);
        }
        try {
            applier(inner_T173EduLifeLIFWWWMMReveilleButtonOrderLifeInsQuote_Qualifying);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    T173EduLifeLIFWWWMMReveilleButtonOrderLifeInsQuote_Qualifying(); //# sourceURL=T173EduLifeLIFWWWMMReveilleButtonOrderLifeInsQuote_Qualifying.js
})