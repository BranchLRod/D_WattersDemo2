(function anonymous(scriptName, applier) {
    function Site_IntegrationsModule() {
        function inner_Site_IntegrationsModule(site, Deferred, when, events, actions, visitor, dom, widgets, dlp, cookies, spa, recommendations, modules) {
            ! function() {
                function a() {
                    function a(a, b) {
                        function i(b) {
                            return a = a || "", g("Integrations.register(" + a + "): " + (b || "").toString())
                        }
                        var j, k;
                        return b = e(b) ? b : {}, (a = ("string" == typeof a ? a : "").toLowerCase().replace(/^\s+|\s+$/g, "")) ? l[a] ? (i(m.errors.alreadyRegistered), null) : (b.name = a, j = h(b, {}), k = {
                            validate: c(j.validate) ? j.validate : f,
                            check: c(j.check) ? j.check : f,
                            interval: d(j.interval) ? j.interval : 50,
                            timeout: d(j.timeout) ? j.timeout : 2e3,
                            exec: c(j.exec) ? j.exec : f,
                            options: j
                        }, j = h(k, j), l[a] = j) : (i(m.errors.missingRegisterName), null)
                    }

                    function i(a, b) {
                        b = e(b) ? b : {};
                        var c, d, f, g, i = new Deferred;
                        if (a = (a || "").toLowerCase(), i.integrationName = a, !l[a]) return m.reject(i, m.errors.unregisteredIntegration);
                        if (c = h(l[a], {}), c = h(b, c), (f = c.validate(c)) !== !0) return m.reject(i, f);
                        if (d = c.campaign, (g = m.validateCampaignRequired(c, i)) !== !0) return m.reject(i, g);
                        if (c.isProduction = m.isProduction(), c.attributeMapRequired) {
                            var j = m.isValidAttributeMap(c.attributeMap);
                            if (j !== !0) return m.reject(i, j)
                        }
                        return "pending" !== i.state() ? i.promise() : ("never" !== c.timeout && m.setFailTimeout(c, i), m.check(c).then(function(a) {
                            return m.exec(c)
                        }).then(function(a) {
                            return c.result = a, m.resolve(i, c)
                        }).fail(function(a) {
                            return m.reject(i, a)
                        }), i.promise())
                    }

                    function j(a, b) {
                        a = (a || "").toLowerCase();
                        var c = l[a];
                        return !!c && (b = e(b) ? b : {}, l[a] = h(b, c), this)
                    }

                    function k(a) {
                        if (!a) return l;
                        var b = (a || "").toLowerCase();
                        return l[b]
                    }
                    var l = {},
                        m = {
                            errors: {
                                missingRegisterName: "Invalid integration reigstration. Name argument is required.",
                                missingRegisterExec: "Missing `exec` for integration registration",
                                alreadyRegistered: "Integration has already been registered",
                                missingRunName: "Missing `name` for `integration.run`",
                                unregisteredIntegration: "Unknown integration name",
                                noCampaignExperience: "Integration was run before the campaign has generated",
                                noRedirectCampaign: "Redirect Integration is not in a valid campaign scope",
                                noRedirectCampaignData: "Redirect Integration is not on a generation page",
                                campaignRequired: "Integration must be deployed within a campaign script",
                                failedToSaveRedirectData: "Failed to save redirect data"
                            },
                            HALFHOUR: 1 / 48,
                            isProduction: function() {
                                function a(a) {
                                    for (var c, d = {}, e = "", f = 0; c = b(a + f++);) e += c;
                                    e = decodeURIComponent(e);
                                    try {
                                        d = JSON.parse(e)
                                    } catch (g) {}
                                    return d
                                }

                                function b(a) {
                                    var b = new RegExp("(?:^|; )" + encodeURIComponent(a).replace(/([.$?*|{}()\[\]\\\/+^])/g, "\\$1") + "=([^;]+)"),
                                        c = (document.cookie.match(b) || ["", ""])[1];
                                    return c
                                }
                                var c = mmsystem.getConfig().storageType;
                                if ("cookie-key-value" === c || "cookie-key-value-secure" === c) return !/mmapi.p.cfgid/i.test(document.cookie) && !/mmapi.p.un/i.test(document.cookie);
                                for (var d = a("mmcore.store.p.") || {}, e = a("mmcore.store.s.") || {}, f = a("mmapi.store.p.") || {}, g = a("mmapi.store.s.") || {}, h = [d, e, f, g], i = {
                                        "mmparams.p": 1,
                                        "mmparams.d": 1
                                    }, j = {
                                        un: 1,
                                        cfgID: 1,
                                        pruh: 1
                                    }, k = h.length; k--;) {
                                    var l = h[k];
                                    for (var m in i || {})
                                        for (var n in j || {})
                                            if ((l[m] || {})[n]) return !1
                                }
                                return !0
                            },
                            isValidIntegrationName: function(a) {
                                return "string" == typeof a && /^\w+/.test(a)
                            },
                            isCampaignScope: function(a) {
                                return !!(e(a) && a.getName && a.getExperience)
                            },
                            getCampaignExperience: function(a) {
                                var b = {};
                                return m.isCampaignScope(a) && (b = a.getExperience && a.getExperience() || {}), !!Object.keys(b) && m.formatCampaignExperience(b)
                            },
                            formatCampaignExperience: function(a) {
                                a = e(a) ? a : {};
                                var b = [];
                                for (var c in a) b.push(c + ":" + a[c]);
                                return b.join("|")
                            },
                            getData: function(a) {
                                a = (a || "").toLowerCase();
                                var b = visitor.getData("Integrations");
                                return b = e(b) ? b : {}, a && (b[a] = b[a] || {}), b
                            },
                            setRedirectData: function(a, b) {
                                if (a = (a || "").toLowerCase(), !m.isCampaignScope(b)) return !1;
                                var c = m.getData(a),
                                    d = b.getName();
                                return c[a][d] = c[a][d] || {}, c[a][d].redirectData = b.getExperience(), visitor.setData("Integrations", c, m.HALFHOUR), !0
                            },
                            removeRedirectData: function(a, b) {
                                if (a = (a || "").toLowerCase(), !m.isCampaignScope(b)) return !1;
                                var c = m.getData(a),
                                    d = b.getName();
                                return c[a][d] = c[a][d] || {}, c[a][d].redirectData = null, visitor.setData("Integrations", c, m.HALFHOUR), !0
                            },
                            getRedirectData: function(a, b) {
                                if (a = (a || "").toLowerCase(), !m.isCampaignScope(b)) return !1;
                                var c = m.getData(a),
                                    d = b.getName();
                                if (c[a][d] = c[a][d] || {}, !c[a] || !c[a][d]) return c[a] = c[a] || {}, c[a][d] = c[a][d] || {}, c[a][d].redirectData = null, visitor.setData("Integrations", c, m.HALFHOUR), !1;
                                for (var e in c[a])
                                    if (e === d) return c[a][e].redirectData;
                                return !1
                            },
                            getSessionDate: function(a, b) {
                                var c = m.getData(a),
                                    d = c[a][b.getName()] || {},
                                    e = d.sessionDate;
                                return e
                            },
                            setSessionDate: function(a, b) {
                                var c = m.getData(a),
                                    d = b.getName();
                                c[a][d] = c[a][d] || {}, c[a][d].sessionDate = (new Date).getTime(), visitor.setData("Integrations", c, m.HALFHOUR)
                            },
                            resolve: function(a, b) {
                                return a.resolve(b), a.promise()
                            },
                            reject: function(a, b) {
                                var c = a.integrationName || "unknown name";
                                return b = b || "unknown reason", g("Integration [" + c + "]: " + b.toString()), a.reject(b), a.promise()
                            },
                            validateCampaignRequired: function(a, b) {
                                if (!a.campaignRequired) return a.oncePerSession ? "campaign option is required when using the oncePerSession option" : !a.redirect || "campaign option is required when using the redirect option";
                                var c = a.campaign,
                                    d = "",
                                    e = m.isCampaignScope(c);
                                if (e !== !0) return m.errors.campaignRequired;
                                if (a.campaignExperience = m.getCampaignExperience(c), a.campaignExperience === !1 && !a.redirect) return m.errors.noCampaignExperience(a.name);
                                if (a.oncePerSession && !a.redirect && a.oncePerSession && (d = m.getSessionDate(a.name, c), m.setSessionDate(a.name, c), (new Date).getTime() - m.HALFHOUR > d)) return g("Integration [" + a.name + "]: data has already been sent this session"), m.resolve(b, a), !0;
                                if (a.redirect) {
                                    var f = function() {
                                        var a = c.getElements();
                                        for (var b in a) return !0;
                                        return !1
                                    }();
                                    return f ? c.isDefault() ? !(a.oncePerSession && (d = m.getSessionDate(a.name, c), m.setSessionDate(a.name, c), (new Date).getTime() - m.HALFHOUR > d)) || (g("Integration [" + a.name + "]: data has already been sent this session"), m.resolve(b, a), !0) : m.setRedirectData(a.name, c) ? (m.resolve(b, a), !0) : m.errors.failedToSaveRedirectData : a.oncePerSession && (d = m.getSessionDate(a.name, c), m.setSessionDate(a.name, c), (new Date).getTime() - m.HALFHOUR > d) ? (g("Integration [" + a.name + "]: data has already been sent this session"), m.resolve(b, a), !0) : (a.campaignExperience = m.getRedirectData(a.name, c), a.campaignExperience = m.formatCampaignExperience(a.campaignExperience), m.removeRedirectData(a.name, c), !!a.campaignExperience || m.errors.noRedirectCampaignData)
                                }
                                return !0
                            },
                            setFailTimeout: function(a, b) {
                                ! function(b) {
                                    setTimeout(function() {
                                        setTimeout(function() {
                                            if ("pending" === b.state()) return m.reject(b, "Integration timed out after " + a.timeout + "ms")
                                        }, 0)
                                    }, a.timeout + 1)
                                }(b)
                            },
                            isValidAttributeMap: function(a) {
                                if (!a) return "Missing required attributeMap parameter";
                                if (!e(a) || !Object.keys(a).length) return "The attributeMap parameter is empty or not an object";
                                for (var b in a) {
                                    var c = a[b];
                                    if ("string" != typeof b || !/^[a-zA-Z]+/.test(b)) return "Invalid attribute name in the attributeMap";
                                    if (!e(c)) return "attributeMap values must be stored in an object";
                                    if (!Object.keys(c).length) return "attributeMap attribute object is empty";
                                    for (var d in c)
                                        if (!/^\w+$/.test(d) && "default" !== d) return "Invalid attribute ID in attributeMap"
                                }
                                return !0
                            },
                            check: function(a) {
                                var c = new Deferred,
                                    d = !1;
                                return function e() {
                                    var f = a.check.call(this, a);
                                    return b(f) ? void setTimeout(function() {
                                        f.done(function() {
                                            return c.resolve()
                                        }).fail(function(a) {
                                            return c.reject(a)
                                        })
                                    }, 0) : f ? void setTimeout(function() {
                                        c.resolve()
                                    }, 0) : void(d || setTimeout(e, a.interval))
                                }(), setTimeout(function() {
                                    d = !0
                                }, a.timeout), c.promise()
                            },
                            exec: function(a) {
                                var c = new Deferred,
                                    d = a.exec.call(this, a);
                                return b(d) ? (setTimeout(function() {
                                    d.done(function(a) {
                                        return c.resolve(a)
                                    }).fail(function(a) {
                                        return c.reject(a)
                                    })
                                }, 0), c.promise()) : (d === !0 ? m.resolve(c, a.result) : m.reject(c, d), c.promise())
                            }
                        };
                    return {
                        register: a,
                        run: i,
                        setDefaults: j,
                        get: k
                    }
                }

                function b(a) {
                    return e(a) && c(a.then)
                }

                function c(a) {
                    return "function" == typeof a
                }

                function d(a) {
                    return "number" == typeof a && a > 0
                }

                function e(a) {
                    return "object" == typeof a && !!a
                }

                function f() {
                    return !0
                }

                function g(a) {
                    window.mm_error = window.mm_error || "", window.mm_error += a + "\n"
                }

                function h(a, b) {
                    a = e(a) ? a : {}, b = e(b) ? b : {};
                    var c = {};
                    for (var d in b) c[d] = b[d];
                    for (var f in a) c[f] = a[f];
                    return c
                }
                if ("object" == typeof modules && "function" == typeof modules.define) {
                    var i = {
                        autoDefine: !0,
                        singleton: !0
                    };
                    modules.define("Integrations", i, a)
                } else modules = {
                    require: function() {
                        return new a
                    }
                }
            }();
        }
        try {
            applier(inner_Site_IntegrationsModule);
        } catch (e) {
            e.message = 'Error in ' + scriptName + ': ' + e.message;
            console.error(e);
        };
    };
    Site_IntegrationsModule(); //# sourceURL=Site_IntegrationsModule.js
})