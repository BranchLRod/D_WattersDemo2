(function anonymous(scriptName, applier) {
    function Site_VAAttributeCaptureScript() {
        function inner_Site_VAAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getVPPAS = function(time) {
                var fetchSegment = Deferred();
                var timedOut = false;
                var timer = time || 10000;

                setTimeout(function() {
                    timedOut = true;
                }, timer);

                when(function() {
                        return window.SC && window.SC.s && window.SC.s.eVar37;
                    }, function() {
                        return timedOut;
                    })
                    .done(function() {

                        var vppStatus = "NA";




                        if (window.SC.s.eVar37 == "true") {
                            vppStatus = "Y";
                        } else if (window.SC.s.eVar37 == "false") {
                            vppStatus = "N";
                        }

                        var vppActiveStatus = vppStatus;

                        if (!vppActiveStatus.includes("NA")) {
                            visitor.storeAttr("VA", vppActiveStatus);
                        }

                        fetchSegment.resolve();
                    })
                    .fail(function() {
                        fetchSegment.reject();
                    });

                return fetchSegment;
            };

            site.scope.getVPPAS();

        }
        try {
            applier(inner_Site_VAAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_VAAttributeCaptureScript(); //# sourceURL=Site_VAAttributeCaptureScript.js
})