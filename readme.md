ABalytics.js: pure js + Universal Analytics A/B testing
====================================================================

This pure javascript library allows you to do simple A/B testing working only on your client-side code. All of the experiment data is registered as custom variables/dimensions in your Google Analytics profile, so **you don't need to configure anything server side**.

Features
--------

*  Easy to set up
   * You just list the possible variants, randomization is handled automatically
   * You just mark the html elements you want to test on with a class, substitution happens automatically
   * No need to set anything up server side, the data is stored in Google Analytics
* Consistent user experience: The selected variant is stored in a cookie, so the user will see the same one when coming back
* No external dependencies: Pure javascript, you just need to include the *GA* or *UA* tracking code
* Flexible: You can conduct multiple, independent experiments at the same time. Each experiment will use a different custom variable/dimension
* Supports universal and classic analytics

Usage
-----

### 1. Include abalytics.js
```html
<script type="text/javascript" src="abalytics.js"></script>
```
### 2. Define your tests and configure GA
```javascript
// Initialize GA or UA trackers

      ABalytics.init({
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
            });

// Send pageview tracking call
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

NB: If you're using jQuery in your website, it's even better to call ```applyHtml``` in the ```$(document).ready(...)``` handler

### 5. Run your experiment

Publish your code, wait for some visitors to come...

### 6. Analyze your data

ABalytics works best if you defined some goals on Google Analytics.

For GA, go to Audience->Custom->Custom Variables. You will find your experiements names in the available slots.

Click on the experiment name you want to analyze to see how many visits were recorded for each variant. Then click on "Goal set 1" to see the goal conversion rate for each variant. Simple and easy!

![GA screenshot](https://raw.github.com/danmaz74/ABalytics/master/screenshots/abalytics.png "Results on Google Analytics")

In UA,  assuming that you have created a custom dimension in
Admin->Custom Definitions->Custom Dimensions, you can view the data related to your experiment in a *Custom Report*.

Advanced options
----------------

If you are already using some custom variables/dimensions, you can have ABalytics start from a slot > 1 using
```javascript
ABalytics.init({...}, SLOT);
```
Caveats
-------
* In order for the custom variables/dimensions to be pushed to the *Google Analytics* servers, it's necessary for the *pageview* tracking call to be sent after the ***Abalytics.init()*** method has been invoked. Otherwise you will need to create a custom nonInteractive *event* tracking call to send the data.

License
-------

The MIT License (MIT)
Copyright (c) 2012 Daniele Mazzini

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Softwareis furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Donated by [hashtagify.me](http://hashtagify.me/)
