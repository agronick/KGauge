<template>
  <svg
    :height="height"
    version="1.1"
    :width="width"
    :viewBox="`0 0 250 ${doughnut ? 250 : 150}`"
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter v-if="shadowOpacity" :id="renderId">
      <feOffset dx="0" dy="3"></feOffset>
      <feGaussianBlur result="offset-blur" stdDeviation="5"></feGaussianBlur>
      <feComposite
        operator="out"
        in="SourceGraphic"
        in2="offset-blur"
        result="inverse"
      ></feComposite>
      <feFlood
        flood-color="black"
        :flood-opacity="shadowOpacity"
        result="color"
      ></feFlood>
      <feComposite
        operator="in"
        in="color"
        in2="inverse"
        result="shadow"
      ></feComposite>
      <feComposite
        operator="over"
        in="shadow"
        in2="SourceGraphic"
      ></feComposite>
    </filter>
    <path
      :fill="backgroundColor"
      stroke="none"
      :d="backgroundPath"
      :style="strokeStyle"
      :filter="`url(#${renderId})`"
    ></path>
    <path
      :fill="guageColor"
      stroke="none"
      :d="guagePath.path"
      :style="strokeStyle"
      :filter="`url(#${renderId})`"
    ></path>
    <text
      x="125"
      y="128"
      text-anchor="middle"
      :style="valueFontStyle"
      v-html="printValue"
    ></text>
    <text
      x="125"
      y="140"
      text-anchor="middle"
      :style="labelFontStyle"
      v-html="labelText"
    >
      <tspan v-html="labelText"></tspan>
    </text>
    <text
      :x="minTextX"
      :y="doughnut ? 133 : 140"
      v-if="showMinMax"
      text-anchor="middle"
      :style="minMaxFontStyle"
    >
      <tspan v-html="min"></tspan>
    </text>
    <text
      :x="maxTextX"
      :y="doughnut ? 133 : 140"
      v-if="showMinMax"
      text-anchor="middle"
      :style="minMaxFontStyle"
      v-html="max"
    >
      <tspan v-html="max"></tspan>
    </text>
  </svg>
</template>

<script>
/* Used to give each SVG a unique ID */
let renderId = 0;

/* Useful function for doing the calculations for animations without a massive Tween library */
export function animateCalc(
  oldVal,
  newVal,
  duration,
  callback,
  easingFunction
) {
  const curTime = new Date().getTime();
  let continueUpdating = true;
  const oldValDiff = newVal - oldVal;

  const doUpdate = () => {
    const timeDiff = new Date().getTime() - curTime;
    /* Math.min makes it so when we're over the time 
    limit we become equal to the new value and can stop updating. */
    let ratio = Math.min(timeDiff / duration, 1);
    let calcRatio = ratio;
    if (easingFunction) {
      calcRatio = easingFunction(ratio);
    }

    callback(oldVal + calcRatio * oldValDiff);

    if (ratio < 1 && continueUpdating) {
      window.requestAnimationFrame(() => doUpdate());
    }
  };
  window.requestAnimationFrame(() => doUpdate());

  return function() {
    continueUpdating = false;
  };
}

export default {
  name: "k-guage",
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 150
    },
    value: {
      default: 10
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    animationDuration: {
      type: Number,
      default: 1000
    },
    doughnut: {
      type: Boolean
    },
    formatFunction: {
      type: Function,
      default: Math.round
    },
    colorSteps: {
      type: Array,
      default: () => ["#a9d70b", "#f9c802", "#ff0000"]
    },
    valueFontStyle: {
      type: String,
      default:
        'font-size: 35px; fill: #010101; font-weight: bold; font-family: "Arial"'
    },
    labelFontStyle: {
      type: String,
      default: "font: 10px Arial; fill: #b3b3b3"
    },
    minMaxFontStyle: {
      type: String,
      default: "font: 11px Arial; fill: #b4b4b4"
    },
    animateOnLoad: {
      type: Boolean,
      default: true
    },
    labelText: {
      type: String,
      default: ""
    },
    showMinMax: {
      type: Boolean,
      default: true
    },
    guageSize: {
      type: Number,
      default: 1
    },
    shadowOpacity: {
      type: Number,
      default: 0.2
    },
    backgroundColor: {
      type: String,
      default: "#edebeb"
    },
    easingFunction: {
      type: Function,
      default: t => t * (2 - t) /* Ease out quad */
    }
  },
  data() {
    const intColors = this.colorSteps.map(color => {
      const asInt = [];
      for (let i = 1; i < color.length; i += 2) {
        asInt.push(parseInt(`0x${color.substr(i, 2)}`));
      }
      return asInt;
    });

    return {
      shownValue: this.animateOnLoad ? this.min : this.value,
      printValue: this.animateOnLoad
        ? this.min
        : this.formatFunction(this.value),
      backgroundPath: "",
      guageColor: "",
      builtColorSteps: intColors,
      animationCanceler: null,
      renderId: `k-guage-filter-${++renderId}`,
      minTextX: 0,
      maxTextX: 0
    };
  },
  mounted() {
    this.$watch(
      vm => [vm.height, vm.width, vm.doughnut, vm.guageSize],
      this.resetBgArc
    );
    this.resetBgArc();
  },
  methods: {
    makeArc(value) {
      /* Code used from JustGage http://justgage.com/ */

      const gws = this.guageSize;
      const dx = 0;
      const dy = this.doughnut ? 0 : 30;

      const w = 250;
      const h = this.doughnut ? 250 : 150;

      if (this.doughnut) {
        const alpha =
          (1 - (2 * (value - this.min)) / (this.max - this.min)) * Math.PI;
        const Ro = w * 0.5 - w / 30;
        const Ri = Ro - (w / 6.666666666666667) * gws;

        const Cx = w * 0.5 + dx;
        const Cy = h * 0.5 + dy;

        const maxTextX2 = Cx + Ro * Math.cos(alpha);
        const Yo = Cy - Ro * Math.sin(alpha);
        const maxTextX1 = Cx + Ri * Math.cos(alpha);
        const Yi = Cy - Ri * Math.sin(alpha);

        let path = "M" + (Cx - Ri) + "," + Cy + " ";
        path += "L" + (Cx - Ro) + "," + Cy + " ";
        if (value > (this.max - this.min) / 2) {
          path += "A" + Ro + "," + Ro + " 0 0 1 " + (Cx + Ro) + "," + Cy + " ";
        }
        path += "A" + Ro + "," + Ro + " 0 0 1 " + maxTextX2 + "," + Yo + " ";
        path += "L" + maxTextX1 + "," + Yi + " ";
        if (value > (this.max - this.min) / 2) {
          path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx + Ri) + "," + Cy + " ";
        }
        path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";

        return {
          path: path,
          minTextX: 60,
          maxTextX: 190
        };
      }

      const alpha = (1 - (value - this.min) / (this.max - this.min)) * Math.PI;
      const Ro = w / 2 - w / 10;
      const Ri = Ro - (w / 6.666666666666667) * gws;

      const Cx = w / 2 + dx;
      const Cy = h / 1.5 + dy;

      const maxTextX2 = Cx + Ro * Math.cos(alpha);
      const Yo = Cy - Ro * Math.sin(alpha);
      const maxTextX1 = Cx + Ri * Math.cos(alpha);
      const Yi = Cy - Ri * Math.sin(alpha);

      const minTextX1 = Cx - Ro;
      const minTextX2 = Cx - Ri;
      let path = "M" + minTextX2 + "," + Cy + " ";
      path += "L" + minTextX1 + "," + Cy + " ";
      path += "A" + Ro + "," + Ro + " 0 0 1 " + maxTextX2 + "," + Yo + " ";
      path += "L" + maxTextX1 + "," + Yi + " ";
      path += "A" + Ri + "," + Ri + " 0 0 0 " + minTextX2 + "," + Cy + " ";
      path += "Z ";

      const minTextX = minTextX1 + (minTextX2 - minTextX1) * 0.5;
      const maxTextX = maxTextX1 + (maxTextX2 - maxTextX1) * 0.5;

      return { path, minTextX, maxTextX };
    },
    resetBgArc() {
      const pathProps = this.makeArc(this.max);
      this.backgroundPath = pathProps.path;
      this.minTextX = pathProps.minTextX;
      this.maxTextX = pathProps.maxTextX;
    },
    getColorForValue(val) {
      const stepCount = this.builtColorSteps.length;
      if (val === this.max) {
        return this.builtColorSteps[stepCount - 1];
      }

      const ratio = val / this.max;
      const stepPosition = ratio * (stepCount - 1);
      const placement = Math.floor(stepPosition);
      const placementInStep = stepPosition % 1;

      const newColor = this.builtColorSteps[placement].map((color, i) => {
        const compareTo = this.builtColorSteps[placement + 1][i];
        const diff = compareTo - color;
        return color + diff * placementInStep;
      });

      return newColor;
    },
    checkLimits(val) {
      return Math.max(this.min, Math.min(this.max, val));
    }
  },
  computed: {
    guagePath() {
      return this.makeArc(this.shownValue);
    },
    strokeStyle() {
      if (!this.doughnut) {
        return "";
      } else {
        return "transform: rotate(90deg); transform-origin: 50% 50%";
      }
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.animationCanceler) {
          this.animationCanceler();
        }

        this.animationCanceler = animateCalc(
          this.shownValue,
          this.checkLimits(newVal),
          this.animationDuration,
          val => {
            this.shownValue = this.checkLimits(val);
            this.printValue = this.formatFunction(this.shownValue);
          },
          this.easingFunction
        );
      },
      immediate: true
    },
    shownValue: {
      handler(val) {
        let color = this.getColorForValue(val).join(",");
        this.guageColor = `rgb(${color})`;
      },
      immediate: true
    }
  }
};
</script>
