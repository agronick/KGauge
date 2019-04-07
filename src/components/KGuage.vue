<template>
  <svg :height="height" version="1.1" :width="width" :viewBox="`0 0 250 ${doughnut ? 250 : 150}`" xmlns="http://www.w3.org/2000/svg">
    <filter id="g14-inner-shadow">
      <feOffset dx="0" dy="3"></feOffset>
      <feGaussianBlur result="offset-blur" stdDeviation="5"></feGaussianBlur>
      <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></feComposite>
      <feFlood flood-color="black" flood-opacity="0.2" result="color"></feFlood>
      <feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite>
      <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite>
    </filter>
    <path fill="#edebeb" stroke="none" :d="backgroundPath" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" filter="url(#g14-inner-shadow)"></path>
    <path :fill="guageColor" stroke="none" :d="guagePath" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" filter="url(#g14-inner-shadow)"></path>
    <text x="125"
          y="128"
          alignment-baseline="baseline"
          text-anchor="middle"
          :style="valueFontStyle"
          v-html="printValue"></text>
    <text x="125"
          y="141"
          text-anchor="middle"
          :style="labelStyle"
          v-html="labelText"></text>
    <text :x="doughnut ? 60 : 43"
          :y="doughnut ? 125 : 145"
          v-if="showMinMax"
          text-anchor="middle"
          :style="minMaxTextStyle"
          v-html="min"></text>
    <text :x="doughnut ? 190 : 205"
          :y="doughnut ? 125 : 145"
          v-if="showMinMax"
          text-anchor="middle"
          :style="minMaxTextStyle"
          v-html="max"></text>
  </svg>
</template>

<script>

const easeOutQuad = (t)=> t*(2-t);

function animate(oldVal, newVal, duration, callback) {
  const curTime = new Date().getTime();
  let continueUpdating = true;

  const doUpdate = ()=> {
    const oldValDiff = Math.max(oldVal, newVal) - Math.min(oldVal, newVal);
    const timeDiff = new Date().getTime() - curTime;
    const ratio =  easeOutQuad(Math.min(timeDiff / duration, 1));
    if (newVal > oldVal) {
      oldVal = oldVal + (ratio * oldValDiff);
    } else {
      oldVal = oldVal - (ratio * oldValDiff);
    }

    callback(oldVal);
    if (newVal !== oldVal && continueUpdating) {
      window.requestAnimationFrame(()=> doUpdate());
    }
  };  
  window.requestAnimationFrame(()=> doUpdate());

  return function() {
    continueUpdating = false;
  }
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
      type: Number,
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
    animateDuration: {
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
    valueFontStyle: {
      type: String,
      default: 'font-size: 35px; fill: #010101; font-weight: bold; font-family: "Arial"' 
    },
    colorSteps: {
      type: Array,
      default:()=> ["#a9d70b", "#f9c802", "#ff0000"]
    },
    animateOnLoad: {
      type: Boolean
    },
    labelText: {
      type: String,
      default: ''
    },
    labelStyle: {
      type: String,
      default: 'font: 10px Arial; fill: #b3b3b3'
    },
    minMaxTextStyle: {
      type: String,
      default: 'font: 11px Arial; fill: #b4b4b4'
    },
    showMinMax: {
      type: Boolean,
      default: true
    }
  },
  data() {

    const intColors = this.colorSteps.map((color)=> {
      const asInt = [];
      for (let i = 1; i < color.length; i+=2) {
        asInt.push(parseInt(`0x${color.substr(i, 2)}`));
      }
      return asInt;
    })

    return {
      shownValue: this.animateOnLoad ? this.min : this.value,
      printValue: this.animateOnLoad ? this.min : this.formatFunction(this.value),
      backgroundPath: '',
      guageColor: '',
      builtColorSteps: intColors,
      animationCanceler: null
    }
  },
  mounted() {
    this.$watch((vm)=> [vm.height, vm.width, vm.doughnut], this.resetBgArc);
    this.resetBgArc();
  },
  methods: {
    makeArc(value) {

      const gws = 1;
      const dx = 0;
      const dy = this.doughnut ? 45 : 30;

      const w = 250;
      const h = 150;

      if (this.doughnut) {

        const alpha = (1 - 2 * (value - this.min) / (this.max - this.min)) * Math.PI;
        const Ro = w / 2 - w / 30;
        const Ri = Ro - w / 6.666666666666667 * gws;

        const Cx = w / 2 + dx;
        const Cy = h / 2 + dy;

        const Xo = Cx + Ro * Math.cos(alpha);
        const Yo = Cy - Ro * Math.sin(alpha);
        const Xi = Cx + Ri * Math.cos(alpha);
        const Yi = Cy - Ri * Math.sin(alpha);

        let path = "M" + (Cx - Ri) + "," + Cy + " ";
        path += "L" + (Cx - Ro) + "," + Cy + " ";
        if (value > ((this.max - this.min) / 2)) {
          path += "A" + Ro + "," + Ro + " 0 0 1 " + (Cx + Ro) + "," + Cy + " ";
        }
        path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
        path += "L" + Xi + "," + Yi + " ";
        if (value > ((this.max - this.min) / 2)) {
          path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx + Ri) + "," + Cy + " ";
        }
        path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";

        return path;

      }

      const alpha = (1 - (value - this.min) / (this.max - this.min)) * Math.PI;
      const Ro = w / 2 - w / 10;
      const Ri = Ro - w / 6.666666666666667 * gws;

      const Cx = w / 2 + dx;
      const Cy = h / 1.5 + dy;

      const Xo = Cx + Ro * Math.cos(alpha);
      const Yo = Cy - Ro * Math.sin(alpha);
      const Xi = Cx + Ri * Math.cos(alpha);
      const Yi = Cy - Ri * Math.sin(alpha);

      let path = "M" + (Cx - Ri) + "," + Cy + " ";
      path += "L" + (Cx - Ro) + "," + Cy + " ";
      path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
      path += "L" + Xi + "," + Yi + " ";
      path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
      path += "Z ";

      return path;
    },
    resetBgArc() {
      this.backgroundPath = this.makeArc(this.max);
    },
    getColorForValue(val) {
      const stepCount = this.builtColorSteps.length;
      if (val === this.max) {
        return this.builtColorSteps[stepCount - 1];
      }
      
      const ratio = (val / this.max);
      const stepPosition = ratio * (stepCount - 1);
      const placement = Math.floor(stepPosition);
      const placementInStep = stepPosition % 1;

      const newColor = this.builtColorSteps[placement].map((color, i)=> {
        const compareTo = this.builtColorSteps[placement + 1][i];
        const diff = compareTo - color;
        return color + (diff * placementInStep);
      })

      return newColor;
    }
  },
  computed: {
    guagePath() {
      return this.makeArc(this.shownValue);
    },
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.animationCanceler) {
          this.animationCanceler();
        }
        this.animationCanceler = animate(this.shownValue, newVal, this.animateDuration, (val)=> {
          this.shownValue = val;
          this.printValue = this.formatFunction(val);
        });
      },
      immediate: true
    },
    shownValue: {
      handler(val) {
        let color = this.getColorForValue(val).join(',');
        this.guageColor = `rgb(${color})`;
      },
      immediate: true
    }
  }
};
</script>

