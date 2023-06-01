(function anonymous(scriptName, applier) {
    function Site_logForSiteCatalyst() {
        function inner_Site_logForSiteCatalyst(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.sitecat = function(propertyValue) {
                when(function() {
                        return window.USAA && USAA.ent && USAA.ent.digitalData && USAA.ent.digitalData.component && USAA.ent.DigitalAnalytics.trackLink;
                    })
                    .done(function() {
                        USAA.ent.digitalData.component.attributes.customprop73 = propertyValue;
                        USAA.ent.DigitalAnalytics.trackLink();
                    });
            }


        }
        try {
            applier(inner_Site_logForSiteCatalyst);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_logForSiteCatalyst(); //# sourceURL=Site_logForSiteCatalyst.js
})