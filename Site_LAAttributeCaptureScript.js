(function anonymous(scriptName, applier) {
    function Site_LAAttributeCaptureScript() {
        function inner_Site_LAAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getSC = function(time) {
                var fetchSegment = Deferred();
                var timedOut = false;
                var timer = time || 10000;

                setTimeout(function() {
                    timedOut = true;
                }, timer);

                when(function() {
                        return window.SC && window.SC.s && window.SC.s.eVar40;
                    }, function() {
                        return timedOut;
                    })
                    .done(function() {

                        var lifeStatus = "NA";



                        if (window.SC.s.eVar43 == "true") {
                            lifeStatus = "Y";
                        } else if (window.SC.s.eVar43 == "false") {
                            lifeStatus = "N";
                        }



                        if (!lifeStatus.includes("NA")) {
                            visitor.storeAttr("LA", lifeStatus);
                        }

                        fetchSegment.resolve();
                    })
                    .fail(function() {
                        fetchSegment.reject();
                    });

                return fetchSegment;
            };

            site.scope.getSC();
        }
        try {
            applier(inner_Site_LAAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_LAAttributeCaptureScript(); //# sourceURL=Site_LAAttributeCaptureScript.js
})