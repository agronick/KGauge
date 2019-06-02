## KGague - A Gauge Library for Vue

KGague is the JustGage JavaScript library remade for Vue.js. It does not use any dependencies including JustGage or Raphael. All rendering is done using the Vue rendering engine using SVGs.

KGauge is 7% of the size of Just Gage with Raphael and covers most of the features. The whole library is only 8kb minified. Compare that to JustGage which is 20kb for JustGage minified and 90kb for Raphael minified. Even if you only use Vue for KGauge your page will still be smaller. 



## Demo
*[View an interactive demo](https://agronick.github.io/KGauge/)*


![Examples](https://raw.githubusercontent.com/agronick/KGauge/master/gauge.png)
## How to use

```bash
npm i @kagronick/kgauge-vue
```

```js
import KGauge from "@kagronick/kgauge-vue";
export default {
  components: {
    KGauge
  },
}
```

```html
<k-gauge 
  :value="30"
  :width="500"
  :height="300"
  :max="300"
  label-text="GB" />
```
Or just download and add
```html
<script src="dist/kgauge-vue.min.js"></script>
```


## API

No properties are required but you'll probably want to set value, min, and max to get started.

| Attr. Name        | Description                                                                                                                 | Default Value                                                           |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| width             | Width of component                                                                                                          | 200                                                                     |
| height            | Height of component                                                                                                         | 150                                                                     |
| value             | The value to display                                                                                                        | 10                                                                      |
| min               | The minimum value                                                                                                           | 0                                                                       |
| max               | The maximum value                                                                                                           | 100                                                                     |
| animationDuration | How long to animate in miliseconds. Set to 0 to disable animation.                                                          | 1000                                                                    |
| doughnut          | Enable doughnut mode                                                                                                        | false                                                                   |
| formatFunction    | A function to format the value for display. Use to add dollar signs, percent, or display values that are not whole numbers. | `Math.round`                                                            |
| colorSteps        | An array of colors to fade between                                                                                          | `["#a9d70b", "#f9c802", "#ff0000"]`                                     |
| valueFontStyle    | Font style for the value text                                                                                               | `font-size: 35px; fill: #010101; font-weight: bold; font-family: "Arial"` |
| labelFontStyle    | The font style for the label under the value                                                                                | `font: 10px Arial; fill: #b3b3b3`                                         |
| minMaxFontStyle   | The font style for the min and max labels                                                                                   | `font: 11px Arial; fill: #b4b4b4`                                        |
| animateOnLoad     | Animate to initial value                                                                                                    | true                                                                    |
| labelText         | Text to show under value                                                                                                    | `''`                                                                    |
| showMinMax        | Show the min and max labels                                                                                                 | true                                                                    |
| minTextFormatFn   | Format the min text value                                                                                                   | `(v) => v`                                                                 |
| maxTextFormatFn   | Format the max text value                                                                                                   | `(v) => v`                                                                 |
| gaugeSize         | Scaling of the gauge. Can be made negative to draw the gauge outwards from the center.                                      | 1                                                                       |
| shadowOpacity     | Amount of shadow. Set to 0 to disable.                                                                                      | .2                                                                      |
| backgroundColor   | Color of background                                                                                                         | #edebeb                                                                 |
| easingFunction    | Easing function for animations. Can be used to bounce the gauge into position.                                              | `(t)=> t*(2-t) /* Ease out quad */`                                     |
| title             | Title string                                                                                                                |                                                                         |
| titleStyle        | Style for the title                                                                                                         | `fill: #999999; font-size: 24px; font-weight: bold`                     |


# Changelog
06-02-2019 (1.0.5)
Allows min value to be larger than max value.
Fixed issue with non-zero min value in doughnut gauges.
Added min and max text format functions.

05-18-2019 (1.0.4)
Fixed issue with rounding color values to show up correctly on IE.

04-15-2019 (1.0.3)
Fixed spelling, allow strings for width and height, added title style, changed default sizing and positioning.


Made by Kyle Agronick with code from the original JustGage project. http://justgage.com/
