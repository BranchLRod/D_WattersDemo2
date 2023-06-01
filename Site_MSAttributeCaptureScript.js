(function anonymous(scriptName, applier) {
    function Site_MSAttributeCaptureScript() {
        function inner_Site_MSAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.getSC4 = function(time) {
                var fetchSegment = Deferred();
                var timedOut = false;
                var timer = time || 10000;

                setTimeout(function() {
                    timedOut = true;
                }, timer);

                when(function() {
                        return window.SC && window.SC.s && window.SC.s.eVar39;
                    }, function() {
                        return timedOut;
                    })
                    .done(function() {

                        var militaryStatus = window.SC.s.eVar39;

                        visitor.storeAttr("MS", militaryStatus);


                        fetchSegment.resolve();
                    })
                    .fail(function() {
                        fetchSegment.reject();
                    });

                return fetchSegment;
            };

            site.scope.getSC4();
        }
        try {
            applier(inner_Site_MSAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_MSAttributeCaptureScript(); //# sourceURL=Site_MSAttributeCaptureScript.js
})