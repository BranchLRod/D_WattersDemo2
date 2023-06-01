(function anonymous(scriptName, applier) {
    function Site_Glassbox() {
        function inner_Site_Glassbox(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.glassbox = function(val) {
                const gb = document.createComment('****' + val + '****');
                document.body.insertBefore(gb, document.body.firstChild);
            }

            site.scope.glassboxNW = function(testNum) {
                let gbDiv = document.createElement('div');
                gbDiv.innerHTML = '<!--****' + testNum + '****-->';
                gbDiv.className = 'gb_' + testNum;

                if (!document.querySelector('.gb_' + testNum)) {
                    document.body.insertBefore(gbDiv, document.body.firstChild);
                }
            }
        }
        try {
            applier(inner_Site_Glassbox);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_Glassbox(); //# sourceURL=Site_Glassbox.js
})