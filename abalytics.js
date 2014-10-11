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
        init: function (config, __gaq, startSlot) {
            var experiment,
                variants,
                variant,
                variantId,
                change;

            if (typeof (startSlot) === 'undefined') {
                startSlot = 1;
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

                // ga.js changes _gaq into an object with a custom push() method but no concat,
                // so we have to push each _setCustomVar individually
                __gaq.push(['_setCustomVar',
                    startSlot,
                    experiment, // The name of the custom variable = name of the experiment
                    variant.name, // The value of the custom variable = variant shown
                    2 // Sets the scope to session-level
                ]);
                startSlot++;

                for (change in variant) {
                    if (change !== 'name') {
                        this.changes.push([change, variant[change]]);
                    }
                }
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
