(function anonymous(scriptName, applier) {
    function Site_LIAttributeCaptureScript() {
        function inner_Site_LIAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            events.domReady(function() {
                if (window.location.href.indexOf("iframe_gadget") == -1) {
                    var val;

                    if (document.getElementById('consolidated-pri') || (!document.querySelector('.logoff-button') && !document.getElementById('consolidated-pub'))) {
                        visitor.setData('loggedIn', true, 365);
                        val = 'MI';
                    } else if ((visitor.getData('loggedIn') || cookies.get('UsaaMbWebMemberLoggedIn')) && (document.getElementById('consolidated-pub') || document.querySelector('.logoff-button'))) {
                        val = 'MO';
                    } else if (document.getElementById('consolidated-pub') || document.querySelector('.logoff-button')) {
                        val = 'P';
                    }
                    visitor.storeAttr('LI', val);
                }

            });


        }
        try {
            applier(inner_Site_LIAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_LIAttributeCaptureScript(); //# sourceURL=Site_LIAttributeCaptureScript.js
})