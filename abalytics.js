// Open Source Initiative OSI - The MIT License (MIT):Licensing
//
// The MIT License (MIT)
// Copyright (c) 2012 Daniele Mazzini - https://github.com/danmaz74
//
// Version: 1.1
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
// is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
// BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF
// OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var ABalytics = (function (window, document, undefined) {
    /* exported ABalytics */

    // Returns a classic or universal analytics wrapper object
    var analyticsWrapper = function (ga, gaq) {
        if (!ga && !gaq) {
            throw new ReferenceError('ABalytics - ga or _gaq not found.');
        }
        this.ga = ga;
        this.gaq = gaq;
    };

    analyticsWrapper.prototype.push = function (experimentName, variantName, slot) {
        // prefer ga to _gaq if both are defined
        if (this.ga) {
            // https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets
            this.ga('set', 'dimension' + slot, variantName);
        } else {
            // https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingCustomVariables
            this.gaq.push(['_setCustomVar', slot, experimentName, variantName, 2]);
        }
    };

    var readCookie = function (name) {
        var nameEQ = name + '=',
            ca = document.cookie.split(';'),
            i,
            c;
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    };

    var getElementsByClassName = function (className) {
        var hasClassName = new RegExp('(?:^|\\s)' + className + '(?:$|\\s)'),
            allElements = document.getElementsByTagName('*'),
            results = [],
            element,
            elementClass,
            i = 0;

        for (i = 0;
            ((element = allElements[i]) !== null) && (element !== undefined); i++) {
            elementClass = element.className;
            if (elementClass && elementClass.indexOf(className) !== -1 && hasClassName.test(
                elementClass)) {
                results.push(element);
            }
        }

        return results;
    };

    return {
        changes: [],
        // for each experiment, load a variant if already saved for this session, or pick a random one
        // slot can either be a dimension or a custom variable
        init: function (config, slot) {
            var gaWrapper = new analyticsWrapper(window.ga, window._gaq),
                experiment,
                variants,
                variant,
                variantId,
                change;

            if (typeof (slot) === 'undefined') {
                slot = 1;
            }

            for (experiment in config) {
                variants = config[experiment];

                // read the saved variant for this experiment in this session, or pick a random one and save it
                variantId = readCookie('ABalytics_' + experiment);
                if (!variantId || !variants[variantId]) {
                    // pick a random variant
                    variantId = Math.floor(Math.random() * variants.length);
                    document.cookie = 'ABalytics_' + experiment + '=' + variantId + '; path=/';
                }

                variant = variants[variantId];

                gaWrapper.push(experiment, variant.name, slot);

                for (change in variant) {
                    if (change !== 'name') {
                        this.changes.push([change, variant[change]]);
                    }
                }
                slot++;
            }
        },
        // apply the selected variants for each experiment
        applyHtml: function () {
            var elements,
                change,
                i,
                j;

            for (i = 0; i < this.changes.length; i++) {
                change = this.changes[i];
                elements = document.getElementsByClassName ? document.getElementsByClassName(
                    change[0]) : getElementsByClassName(change[0]);

                for (j = 0; j < elements.length; j++) {
                    elements[j].innerHTML = change[1];
                }
            }
        }
    };
})(window, document);
