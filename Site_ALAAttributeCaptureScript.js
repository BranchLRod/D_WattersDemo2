(function anonymous(scriptName, applier) {
    function Site_ALAAttributeCaptureScript() {
        function inner_Site_ALAAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getALAS = function(time) {
                var fetchSegment = Deferred();
                var timedOut = false;
                var timer = time || 10000;

                setTimeout(function() {
                    timedOut = true;
                }, timer);

                when(function() {
                        return window.SC && window.SC.s && window.SC.s.eVar33;
                    }, function() {
                        return timedOut;
                    })
                    .done(function() {

                        var autoloanStatus = "NA";




                        if (window.SC.s.eVar33 == "true") {
                            autoloanStatus = "Y";
                        } else if (window.SC.s.eVar33 == "false") {
                            autoloanStatus = "N";
                        }


                        var autoloanActiveStatus = autoloanStatus;

                        if (!autoloanActiveStatus.includes("NA")) {
                            visitor.storeAttr("ALA", autoloanActiveStatus);
                        }

                        fetchSegment.resolve();
                    })
                    .fail(function() {
                        fetchSegment.reject();
                    });

                return fetchSegment;
            };

            site.scope.getALAS();
        }
        try {
            applier(inner_Site_ALAAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_ALAAttributeCaptureScript(); //# sourceURL=Site_ALAAttributeCaptureScript.js
})