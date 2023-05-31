(function anonymous(scriptName, applier) {
    function Site_AAAttributeCaptureScript() {
        function inner_Site_AAAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getAAS = function(time) {
                var fetchSegment = Deferred();
                var timedOut = false;
                var timer = time || 10000;

                setTimeout(function() {
                    timedOut = true;
                }, timer);

                when(function() {
                        return window.SC && window.SC.s && window.SC.s.eVar34;
                    }, function() {
                        return timedOut;
                    })
                    .done(function() {
                        var autoStatus = "NA";



                        if (window.SC.s.eVar34 == "true") {
                            autoStatus = "Y";
                        } else if (window.SC.s.eVar34 == "false") {
                            autoStatus = "N";
                        }



                        var autoActiveStatus = autoStatus;

                        if (!autoActiveStatus.includes("NA")) {
                            visitor.storeAttr("AA", autoActiveStatus);
                        }

                        fetchSegment.resolve();
                    })
                    .fail(function() {
                        fetchSegment.reject();
                    });

                return fetchSegment;
            };

            site.scope.getAAS();

        }
        try {
            applier(inner_Site_AAAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_AAAttributeCaptureScript(); //# sourceURL=Site_AAAttributeCaptureScript.js
})