(function anonymous(scriptName, applier) {
    function Site_sc() {
        function inner_Site_sc(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.sc = function(testName, testElements, testExp) {
                var testName = testName();
                testName = "T" + testName.replace(/[^\d]/g, '');

                var campExp = testName + '=[a-z][\\w|-]+:[\\w|-]+';
                var campaignMatch = new RegExp(campExp, 'gi');

                var prevValue = cookies.get('mm_experience') || '';
                var experience = [];

                for (var element in testElements()) {
                    experience.push(element + ':' + testExp()[element]);
                }

                function waitForGB() {
                    when(function() {
                            return window._detector && _detector.triggerABTestingEvent;
                        })
                        .done(function() {
                            _detector.triggerABTestingEvent('Maxymiser', testName, testName, experience.join('|'), experience.join('|'));
                        });
                }
                waitForGB();

                if (cookies.get('mm_experience') && cookies.get('mm_experience').match(campaignMatch)) return;

                if (prevValue) {
                    cookies.set('mm_experience', prevValue + ';' + testName + '=' + experience.join('|'));
                } else {
                    cookies.set('mm_experience', testName + '=' + experience.join('|'));
                }

                function waitFor() {
                    when(function() {
                            return window.USAA && USAA.ent && USAA.ent.DigitalAnalytics && USAA.ent.DigitalAnalytics.trackLink && USAA.ent.digitalData;
                        })
                        .done(function() {
                            if (!USAA.ent.digitalData["cp.mm_experience"] || (!!USAA.ent.digitalData["cp.mm_experience"] && !USAA.ent.digitalData["cp.mm_experience"].match(campaignMatch))) {
                                USAA.ent.DigitalAnalytics.trackLink();
                            }
                        });
                }

                waitFor();

            }
        }
        try {
            applier(inner_Site_sc);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_sc(); //# sourceURL=Site_sc.js
})