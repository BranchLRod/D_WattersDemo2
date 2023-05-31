(function anonymous(scriptName, applier) {
    function Site_CAAttributeCaptureScript() {
        function inner_Site_CAAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getCAS = function(time) {
                var fetchSegment = Deferred();
                var timedOut = false;
                var timer = time || 10000;

                setTimeout(function() {
                    timedOut = true;
                }, timer);

                when(function() {
                        return window.SC && window.SC.s && window.SC.s.eVar31;
                    }, function() {
                        return timedOut;
                    })
                    .done(function() {
                        var checkStatus = "NA";



                        if (window.SC.s.eVar31 == "true") {
                            checkStatus = "Y";
                        } else if (window.SC.s.eVar31 == "false") {
                            checkStatus = "N";
                        }




                        var checkActiveStatus = checkStatus;

                        if (!checkActiveStatus.includes("NA")) {
                            visitor.storeAttr("CA", checkActiveStatus);
                        }

                        fetchSegment.resolve();
                    })
                    .fail(function() {
                        fetchSegment.reject();
                    });

                return fetchSegment;
            };

            site.scope.getCAS();
        }
        try {
            applier(inner_Site_CAAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_CAAttributeCaptureScript(); //# sourceURL=Site_CAAttributeCaptureScript.js
})