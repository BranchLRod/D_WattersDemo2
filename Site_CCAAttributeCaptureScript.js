(function anonymous(scriptName, applier) {
    function Site_CCAAttributeCaptureScript() {
        function inner_Site_CCAAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getCCAS = function(time) {
                var fetchSegment = Deferred();
                var timedOut = false;
                var timer = time || 10000;

                setTimeout(function() {
                    timedOut = true;
                }, timer);

                when(function() {
                        return window.SC && window.SC.s && window.SC.s.eVar32;
                    }, function() {
                        return timedOut;
                    })
                    .done(function() {

                        var creditStatus = "NA";





                        if (window.SC.s.eVar32 == "true") {
                            creditStatus = "Y";
                        } else if (window.SC.s.eVar32 == "false") {
                            creditStatus = "N";
                        }



                        var ccActiveStatus = creditStatus;

                        if (!ccActiveStatus.includes("NA")) {
                            visitor.storeAttr("CCA", ccActiveStatus);
                        }

                        fetchSegment.resolve();
                    })
                    .fail(function() {
                        fetchSegment.reject();
                    });

                return fetchSegment;
            };

            site.scope.getCCAS();
        }
        try {
            applier(inner_Site_CCAAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_CCAAttributeCaptureScript(); //# sourceURL=Site_CCAAttributeCaptureScript.js
})