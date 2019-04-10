<template>
  <div id="app">
    <div class="info">
      <h3>KGuage for Vue &mdash; Based off JustGage.js &mdash; Only 8kb unminified</h3>
      <a href="https://github.com/agronick/KGauge">https://github.com/agronick/KGauge</a>
    </div>
    <div>
      <k-guage
        :value="guage1"
        :width="500"
        :height="300"
        :max="300"
        label-text="GB"
        title="Default Style"
      />
      <input type="range" min="0" max="300" v-model="guage1" />
      <div class="desc">Normal Setup (slider input is seperate component)</div>
    </div>
    <div>
      <k-guage
        title="Doughnut Style"
        :value="guage2"
        :width="500"
        :height="300"
        :max="100"
        label-text="CPU"
        :guage-size="1"
        :animate-duration="3000"
        :shadow-opacity="0.8"
        :formatFunction="formatPct"
        :easing-function="easeOutBounce"
        :show-min-max="true"
        :doughnut="true"
      />
      <input type="range" min="0" max="100" v-model="guage2" />
      <div class="desc">
        Doughnut mode with a custom easing function, formatting function,
        changed animation duration and custom shadow.
      </div>
    </div>
    <div>
      <k-guage
        title="Skinny Style"
        :value="guage4"
        :width="500"
        :height="300"
        :max="5000"
        label-text="Visitors"
        :guage-size="0.3"
        :animate-duration="3000"
        :shadow-opacity="0.3"
        :color-steps="['#ff0004', '#ffff00', '#22ff29']"
        :show-min-max="false"
        :doughnut="false"
      />
      <input type="range" min="0" max="5000" v-model="guage4" />
      <div class="desc">Change size, shadow opacity, and hide mix and max.</div>
    </div>
    <div>
      <k-guage
        title="Styled Style"
        :value="guage3"
        :width="500"
        :height="300"
        :max="200"
        label-text="Funds Raised"
        :guage-size="0.5"
        :shadow-opacity="0.8"
        :formatFunction="formatDollar"
        :color-steps="['#ff080c', '#ff54c9', '#8161ff', '#83ffb7', '#18ff27']"
        :show-min-max="true"
        :doughnut="false"
      />
      <input type="range" min="0" max="200" v-model="guage3" />
      <div class="desc">
        Custom colors and formatting function. All font styles can be
        overridden.
      </div>
    </div>
    <div>
      <k-guage></k-guage>
      <div class="desc">
        Super simple to use. Default config with just
        &lt;k-guage&gt;&lt;/k-guage&gt;
      </div>
    </div>
  </div>
</template>

<script>
import KGuage from "./KGuage.vue";

export default {
  name: "app",
  components: {
    KGuage
  },
  data() {
    return {
      guage1: 60,
      guage2: 20,
      guage3: 40,
      guage4: 2000
    };
  },
  methods: {
    formatPct(v) {
      return `${Math.round(v)}%`;
    },
    formatDollar(v) {
      return `$${v.toFixed(2)}`;
    },
    easeOutBounce(pos) {
      if (pos < 1 / 2.75) {
        return 7.5625 * pos * pos;
      } else if (pos < 2 / 2.75) {
        return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75);
      } else if (pos < 2.5 / 2.75) {
        return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375);
      } else {
        return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375);
      }
    }
  },
  computed: {
    valInt() {
      return parseInt(this.theVal);
    }
  }
};
</script>

<style>
#app {
	text-align: center;
}

#app input {
	display: block;
	margin: 50px auto 0 auto;
	width: 400px;
}

* {
  font-family: sans-serif;
}

h3 {
  color: #333;
}

#app .desc {
	font-style: italic;
	color: #AAA;
	font-size: 15px;
	margin: 5px 0 123px;
	font-family: sans-serif;
}

body {
	background: #FFF;
}

.info {
  margin-bottom: 50px;
}
</style>
