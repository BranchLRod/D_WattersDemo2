(function anonymous(scriptName, applier) {
    function Site_GAttributeCaptureScript() {
        function inner_Site_GAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getGen = function() {
                when(function() {
                        return window.USAA && USAA.ent && USAA.ent.digitalData && USAA.ent.digitalData.user && USAA.ent.digitalData.user.attributes && USAA.ent.digitalData.user.attributes.yearOfBirth;
                    })
                    .done(function() {
                        var year = Number(USAA.ent.digitalData.user.attributes.yearOfBirth);
                        var gen;
                        if (year >= 1997) {
                            gen = 'Z';
                        } else if (year >= 1980) {
                            gen = 'M';
                        } else if (year >= 1965) {
                            gen = 'X';
                        } else if (year >= 1946) {
                            gen = 'B';
                        } else if (year >= 1921) {
                            gen = 'S';
                        } else {
                            gen = 'O';
                        }
                        visitor.storeAttr('G', gen);
                    });
            }
            site.scope.getGen();

        }
        try {
            applier(inner_Site_GAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_GAttributeCaptureScript(); //# sourceURL=Site_GAttributeCaptureScript.js
})