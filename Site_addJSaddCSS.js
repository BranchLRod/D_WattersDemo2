(function anonymous(scriptName, applier) {
    function Site_addJSaddCSS() {
        function inner_Site_addJSaddCSS(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            site.scope.addScript = function(link) {
                var newJs = document.createElement('script');
                newJs.type = 'text/javascript';
                newJs.setAttribute('language', 'javascript');
                newJs.src = link;
                document.querySelector('body').appendChild(newJs);
                return newJs;
            }
            site.scope.addCSS = function(link) {
                var newSS = document.createElement('link');
                newSS.setAttribute('rel', 'stylesheet');
                newSS.type = 'text/css';
                newSS.href = link;
                document.querySelector('head').appendChild(newSS);
                return newSS;
            }
        }
        try {
            applier(inner_Site_addJSaddCSS);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_addJSaddCSS(); //# sourceURL=Site_addJSaddCSS.js
})