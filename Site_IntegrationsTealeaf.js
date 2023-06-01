(function anonymous(scriptName, applier) {
    function Site_IntegrationsTealeaf() {
        function inner_Site_IntegrationsTealeaf(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            ! function() {
                function a(a) {
                    var b = [];
                    for (var c in a) b.push(a[c]);
                    return b
                }
                var b = {
                    version: "1.1.0",
                    campaignRequired: !0,
                    check: function(a) {
                        return window.TLT && "function" == typeof window.TLT.logCustomEvent
                    },
                    timeout: 5e3,
                    exec: function(b) {
                        return window.TLT.logCustomEvent("Maxymiser", {
                            campaignName: b.campaign.getName(),
                            elementID: Object.keys(b.campaign.getExperience()).join(" | "),
                            variant: a(b.campaign.getExperience()).join(" | "),
                            campaignExperience: b.campaignExperience
                        }), !0
                    }
                };
                "object" == typeof modules && "function" == typeof modules.define && modules.require("Integrations").register("Tealeaf", b)
            }();
        }
        try {
            applier(inner_Site_IntegrationsTealeaf);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_IntegrationsTealeaf(); //# sourceURL=Site_IntegrationsTealeaf.js
})