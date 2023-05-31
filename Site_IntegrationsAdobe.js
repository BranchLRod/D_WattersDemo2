(function anonymous(scriptName, applier) {
    function Site_IntegrationsAdobe() {
        function inner_Site_IntegrationsAdobe(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules, Integrations) {
            (function() {
                var Adobe = {
                    version: '1.3.0',
                    oncePerSession: true,
                    campaignRequired: true,
                    render: false,
                    append: false,
                    timeout: 7000,

                    validate: function(integration) {
                        if (integration.eVar && !helpers.isNumber(integration.eVar)) {
                            return helpers.errors.invalidEvar(integration.eVar);
                        }
                        if (integration.prop && !helpers.isNumber(integration.prop)) {
                            return helpers.errors.invalidProp(integration.prop);
                        }
                        if (integration.sVariable && !helpers.isSVariable(integration.sVariable)) {
                            return helpers.errors.invalidSVariable(integration.sVariable);
                        }
                        if (!helpers.getParams(integration).length) {
                            return helpers.errors.missingParameters;
                        }
                        if (!integration.trackingServer && !integration.ignoreTrackingServer) {
                            return helpers.errors.missingTrackingServer;
                        }
                        if (integration.render && !helpers.checkValidRenderFormat(integration.campaign.getName())) {
                            return helpers.errors.invalidRenderFormat(integration.campaign.getName());
                        }
                        if (integration.additionalParams && !helpers.checkAdditionalParams(integration.additionalParams)) {
                            return helpers.errors.invalidAdditionalParams(integration.additionalParams);
                        }
                        return true;
                    },
                    check: function(integration) {
                        var s = helpers.getSVariable(integration.sVariable);
                        if (integration.ignoreTrackingServer) {
                            return s; // whatever, I do what I want
                        } else {
                            return s && s.trackingServer === integration.trackingServer;
                        }
                    },
                    exec: function(integration) {
                        // if synchronous integration, populate variables and resolve
                        if (integration.sync) {
                            helpers.populateSyncData(integration);
                            return true;
                        }
                        // asynchronous integration sends s.tl()
                        return helpers.send(integration);
                    }
                };
                var helpers = {
                    errors: {
                        missingParameters: 'The `eVar` and/or `prop` option are required and missing',
                        invalidEvar: function(eVar) {
                            return 'Invalid eVar provided [' + (eVar || '').toString() + ']';
                        },
                        invalidProp: function(prop) {
                            return 'Invalid prop provided [' + (prop || '').toString() + ']';
                        },
                        invalidSVariable: function(variable) {
                            return 'Invalid sVariable provided [' + (variable || '').toString() + '] (must be `string` or `s object`)';
                        },
                        missingTrackingServer: function() {
                            return 'Missing trackingServer option';
                        },
                        invalidRenderFormat: function(name) {
                            return 'Campaign name is in an invalid format to utilize the Render flag: ' + name;
                        },
                        invalidAdditionalParams: function(params) {
                            return 'additionalParams are not formatted correctly: ' + params;
                        }
                    },
                    checkAdditionalParams: function(params) {
                        if (!Array.isArray(params)) {
                            return false;
                        }
                        return true;
                    },
                    filterAdditionalParams: function(params, s) {
                        return params.filter(function(value) { // filters out empty or non-existent values
                            if (s[value]) {
                                return value;
                            }
                        }).join();
                    },
                    checkValidRenderFormat: function(name) {
                        if (name.indexOf('_') === -1) {
                            return false;
                        }
                        return true;
                    },
                    renderFormat: function(name) { //we use this stub of a function for now to allow for easier extension to configurable naming formats in the future
                        return name.split('_')[0];
                    },
                    isSVariable: function(variable) {
                        if (typeof variable === 'string') {
                            return /^[A-Za-z0-9_\-\$]+$/.test(variable);
                        }
                        if (typeof variable === 'object') {
                            return helpers.isSObject(variable);
                        }
                        return false;
                    },
                    isSObject: function(object) {
                        return typeof object === 'object' && typeof object.t === 'function';
                    },
                    getSVariable: function(variable) {
                        if (!variable || typeof variable === 'string') {
                            return helpers.isSObject(window[variable || 's']) ?
                                window[variable || 's'] : false;
                        }
                        if (helpers.isSObject(variable)) {
                            return variable;
                        }
                        return false;
                    },
                    isNumber: function(number) {
                        return number && (+number).toFixed(0) > 0;
                    },
                    send: function(integration) {
                        var params = helpers.getParams(integration);
                        var s = helpers.getSVariable(integration.sVariable);
                        var name = integration.campaign.getName();
                        var additionalParams, val, prev = '';
                        s.linkTrackVars = params.join();

                        if (integration.render) {
                            // we use a unique format if the render flag is set since we don't need full experience information
                            name = helpers.renderFormat(name);
                        } else {
                            // we use the standard format of name=experience if the campaign isn't a render
                            name = name + '=' + integration.campaignExperience;
                        }

                        // if the append flag is set, we need to grab additional campaign info from storage
                        // append combines information from multiple campaigns into one evar or prop rather than the standard one campaign per evar 
                        if (integration.append) {
                            // when appending, we need to know if the evar is scoped to the page or session
                            // page level scope is stored in a variable
                            if (integration.append === 'page') {
                                prev = window.mmsystem.AdobeAppendData || '';
                                val = prev ? (prev + '~' + name) : name;
                                window.mmsystem.AdobeAppendData = val;
                            }
                            // session level scope data is managed via CDAPI
                            else if (integration.append === 'session') {
                                prev = visitor.getData('AdobeAppendData') || '';
                                val = prev ? (prev + '~' + name) : name;
                                visitor.setData('AdobeAppendData', val);
                            }
                        } else {
                            val = name;
                        }

                        for (var i = 0; i < params.length; i++) {
                            s[params[i]] = val;
                        }

                        if (integration.additionalParams) {
                            additionalParams = helpers.filterAdditionalParams(integration.additionalParams, s);
                            s.linkTrackVars = s.linkTrackVars + ',' + additionalParams;
                        }

                        s.tl(true, 'o', 'Maxymiser ' + (integration.isProduction ? 'Live' : 'QA'));

                        return true;
                    },
                    getParams: function(integration) {
                        var params = [];
                        if (integration.eVar) {
                            params.push('eVar' + integration.eVar);
                        }
                        if (integration.prop) {
                            params.push('prop' + integration.prop);
                        }
                        return params;
                    },
                    populateSyncData: function(integration) {
                        var params = helpers.getParams(integration);
                        window.mm_adobe_data = window.mm_adobe_data || {};
                        for (var i = params.length; i--;) {
                            window.mm_adobe_data[params[i]] = integration.campaignExperience;
                        }
                    }
                };
                // Register and export
                if (typeof modules === 'object' && typeof modules.define === 'function') {
                    modules.require('Integrations').register('Adobe Analytics', Adobe);
                }
            })();
        }
        try {
            applier(inner_Site_IntegrationsAdobe);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_IntegrationsAdobe(); //# sourceURL=Site_IntegrationsAdobe.js
})