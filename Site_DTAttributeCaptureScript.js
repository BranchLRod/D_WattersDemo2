(function anonymous(scriptName, applier) {
    function Site_DTAttributeCaptureScript() {
        function inner_Site_DTAttributeCaptureScript(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            events.domReady(function() {
                if (window.location.href.indexOf("iframe_gadget") == -1) {
                    var val;
                    var subdomain = window.location.hostname;
                    var attrib;

                    //logged in member
                    if (document.getElementById('consolidated-pri') ||
                        document.querySelector('link[href*="member"]') ||
                        document.querySelector('.profileWidget-button--profile') ||
                        (!(document.querySelector('.logoff-button')) && !(document.querySelector('.profileWidget-button--logon')) && (!document.getElementById('consolidated-pub')))
                    ) {
                        visitor.setData('loggedIn', true, 365);
                        val = 'MI';
                        if (subdomain.match(/www/)) {
                            attrib = 'DM';
                        } else if (subdomain.match(/mobileapps/)) {
                            attrib = 'MAM';
                        } else if (subdomain.match(/mobile/)) {
                            attrib = 'MWM';
                        }

                    }
                    //logged out member
                    else if ((visitor.getData('loggedIn') || cookies.get('UsaaMbWebMemberLoggedIn') || cookies.get('usaa.com.machine.ident')) &&
                        ((document.getElementById('consolidated-pub') || document.querySelector('.logoff-button')) ||
                            document.querySelector('link[href*="member-public"]'))
                    ) {
                        val = 'MO';
                        if (subdomain.match(/www/)) {
                            attrib = 'DM';
                        } else if (subdomain.match(/mobileapps/)) {
                            attrib = 'MAM';
                        } else if (subdomain.match(/mobile/)) {
                            attrib = 'MWM';
                        }
                    }
                    //prospect
                    else if (document.getElementById('consolidated-pub') ||
                        document.querySelector('.logoff-button') ||
                        document.querySelector('link[href*="prospect-public"]')
                    ) {
                        val = 'P';
                        if (subdomain.match(/www/)) {
                            attrib = 'DP';
                        } else if (subdomain.match(/mobileapps/)) {
                            attrib = 'MAP';
                        } else if (subdomain.match(/mobile/)) {
                            attrib = 'MWP';
                        }
                    }
                    visitor.storeAttr('DT', attrib);
                }

            });




        }
        try {
            applier(inner_Site_DTAttributeCaptureScript);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_DTAttributeCaptureScript(); //# sourceURL=Site_DTAttributeCaptureScript.js
})