(function anonymous(scriptName, applier) {
    function Site_HAAttributeCaptureScript() {
        function inner_Site_HAAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getHAS = function(time) {
                var fetchSegment = Deferred();
                var timedOut = false;
                var timer = time || 10000;

                setTimeout(function() {
                    timedOut = true;
                }, timer);

                when(function() {
                        return window.SC && window.SC.s && window.SC.s.eVar35;
                    }, function() {
                        return timedOut;
                    })
                    .done(function() {

                        var homeStatus = "NA";





                        if (window.SC.s.eVar35 == "true") {
                            homeStatus = "Y";
                        } else if (window.SC.s.eVar35 == "false") {
                            homeStatus = "N";
                        }



                        var homeActiveStatus = homeStatus;

                        if (!homeActiveStatus.includes("NA")) {
                            visitor.storeAttr("HA", homeActiveStatus);
                        }

                        fetchSegment.resolve();
                    })
                    .fail(function() {
                        fetchSegment.reject();
                    });

                return fetchSegment;
            };

            site.scope.getHAS();

        }
        try {
            applier(inner_Site_HAAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_HAAttributeCaptureScript(); //# sourceURL=Site_HAAttributeCaptureScript.js
})