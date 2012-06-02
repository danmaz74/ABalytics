ABalytics.js: pure js + Google Analytics A/B testing
====================================================================

This pure javascript library allows you to do simple A/B testing **without having to set anything up server-side**. All data is registered as custom variables in your website Google Analytics profile.

Features
--------

*  Easy to set up
   * You just list the possible variants, the randomization is handled automatically
   * You just mark the html elements you want to test on with a class, the substitution is automatic
   * No need to set anything up server side, the data is stored on Google Analytics
* Consistent experience: The selected variant is stored in a cookie, so the user will see the same one when coming back
* No external dependencies: Pure javascript, you just need to include GA
* Flexible: You can conduct multiple, independent experiments at the same time. Each experiment will use a custom variable slot

Usage
-----

### 1. Include abalytics.js
```html
<script type="text/javascript" src="abalytics.js"></script>
```
### 2. Define your tests and configure GA
```javascript
var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-XXXXXXXX-XX']);
      _gaq.push(['_trackPageview']);

      _gaq = _gaq.concat(ABalytics.init({
        experiment1_name: [
          {
            name: 'variant1_name',
            "experiment1_class1_name": "<strong>Html content for variant 1 class 1</strong>",
            "experiment1_class2_name": "Html content for variant 1 class 2"
          },
          {
            name: 'variant2_name',
            "experiment1_class1_name": "<strong>Html content for variant 2 class 1</strong>",
            "experiment1_class2_name": "Html content for variant 2 class 2"
          }
        ],
        experiment2_name: [ ...
      }));
```
### 3. Apply the experiment classes to your html content
```html
<div class="experiment1_class1_name">
  This content will be replaced by ABalytics
</div>

<span class="experiment1_class2_name">This text will be replaced too</span>
```

### 4. Call applyHtml() on load

```html
<script type="text/javascript">
  window.onload = function() {
    ABalytics.applyHtml();
  };
</script>
```

### 5. Run your experiment

Publish your code, wait for some visitors to come...

### 6. Analyze your data

ABalytics works best if you defined some goals on Google Analytics.

In GA, go to Audience->Custom->Custom Variables. You will find your experiements names in the available slots.

Click on the experiment name you want to analyze to see how many visits where recorded for each variant. Then click on "Goal set 1" to see the goal conversion rate for each variant. Simple and easy!

Advanced options
----------------

If you are already using some custom variables, you can have ABalytics start from a slot > 1 using
```javascript
ABalytics.init({...}, YOUR_FIRST_FREE_SLOT);
```
License
-------

The MIT License (MIT)
Copyright (c) 2012 Daniele Mazzini

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Softwareis furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.