(function anonymous(scriptName, applier) {
    function Site_EAttributeCaptureScript() {
        function inner_Site_EAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getElig = function() {
                when(function() {
                        return window.USAA && USAA.ent && USAA.ent.digitalData && USAA.ent.digitalData.user && USAA.ent.digitalData.user.attributes && USAA.ent.digitalData.user.attributes.eligibility;
                    })
                    .done(function() {
                        var elig = (USAA.ent.digitalData.user.attributes.eligibility).toLowerCase();
                        var status;
                        if (elig.match(/ex-dependent|enlisted|officer|dependent/i)) {
                            if (elig.match(/ex-dependent/i)) {
                                status = "ED";
                            } else if (elig.match(/enlisted/i)) {
                                status = "EN";
                            } else if (elig.match(/officer/i)) {
                                status = "OF";
                            } else if (elig.match(/dependent/i)) {
                                status = "D";
                            }

                        } else if (elig.match(/non-commissioned officer/i)) {
                            status = 'NCO';
                        } else if (elig.match(/all but casualty/i)) {
                            status = 'ABC';
                        } else {
                            status = 'O';
                        }
                        visitor.storeAttr('E', status);
                    })
            }
            site.scope.getElig();
        }
        try {
            applier(inner_Site_EAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_EAttributeCaptureScript(); //# sourceURL=Site_EAttributeCaptureScript.js
})