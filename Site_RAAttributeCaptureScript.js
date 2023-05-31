(function anonymous(scriptName, applier) {
    function Site_RAAttributeCaptureScript() {
        function inner_Site_RAAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getRAS = function(time) {
                var fetchSegment = Deferred();
                var timedOut = false;
                var timer = time || 10000;

                setTimeout(function() {
                    timedOut = true;
                }, timer);

                when(function() {
                        return window.SC && window.SC.s && window.SC.s.eVar36;
                    }, function() {
                        return timedOut;
                    })
                    .done(function() {

                        var renterStatus = "NA";




                        if (window.SC.s.eVar36 == "true") {
                            renterStatus = "Y";
                        } else if (window.SC.s.eVar36 == "false") {
                            renterStatus = "N";
                        }


                        var renterActiveStatus = renterStatus;

                        if (!renterActiveStatus.includes("NA")) {
                            visitor.storeAttr("RA", renterActiveStatus);
                        }

                        fetchSegment.resolve();
                    })
                    .fail(function() {
                        fetchSegment.reject();
                    });

                return fetchSegment;
            };

            site.scope.getRAS();

        }
        try {
            applier(inner_Site_RAAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_RAAttributeCaptureScript(); //# sourceURL=Site_RAAttributeCaptureScript.js
})