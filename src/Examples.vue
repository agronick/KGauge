<template>
  <div id="app">
    <div class="info">
      <h3>
        KGauge for Vue &mdash; Based off JustGage.js &mdash; Only 8kb minified uncompressed 
      </h3>
      <a href="https://github.com/agronick/KGauge"
        >https://github.com/agronick/KGauge</a
      >
    </div>
    <div>
      <k-gauge
        :value="gauge1"
        :width="500"
        :height="300"
        :max="300"
        label-text="GB"
        title="Default Gauge"
      />
      <input type="range" min="0" max="300" v-model="gauge1" />
      <div class="desc">Normal Setup (slider input is seperate component)</div>
    </div>
    <div>
      <k-gauge
        title="Doughnut Gauge"
        :value="gauge2"
        :width="500"
        :height="300"
        :max="100"
        label-text="CPU"
        :gauge-size="1"
        :animate-duration="3000"
        :shadow-opacity="0.8"
        :formatFunction="formatPct"
        :easing-function="easeOutBounce"
        :show-min-max="false"
        :doughnut="true"
      />
      <input type="range" min="0" max="100" v-model="gauge2" />
      <div class="desc">
        Doughnut mode with a custom easing function, formatting function,
        changed animation duration and custom shadow.
      </div>
    </div>
    <div>
      <k-gauge
        title="Skinny Gauge"
        :value="gauge4"
        :width="500"
        :height="300"
        :max="5000"
        label-text="Visitors"
        :gauge-size="0.3"
        :animate-duration="3000"
        :shadow-opacity="0.3"
        :color-steps="['#ff0004', '#ffff00', '#22ff29']"
        :show-min-max="false"
        :doughnut="false"
        title-style="fill: #999999; font-size: 12px; font-weight: 600; transform: translateY(-5px)"
      />
      <input type="range" min="0" max="5000" v-model="gauge4" />
      <div class="desc">Change size, shadow opacity, and hide mix and max.</div>
    </div>
    <div>
      <k-gauge
        title="Gauge with Custom Styles"
        :value="gauge3"
        :width="500"
        :height="300"
        :max="200"
        label-text="Funds Raised"
        :gauge-size="0.5"
        :shadow-opacity="0.8"
        :format-function="formatDollar"
        :min-text-format-fn="formatDollar"
        :max-text-format-fn="formatDollar"
        title-style="fill: #999999; font-size: 12px; font-weight: 600;  transform: translateY(-5px)"
        min-max-font-style="font: 9px Arial; fill: #b4b4b4; transform: translateY(-10px)"
        :color-steps="['#ff080c', '#ff54c9', '#8161ff', '#83ffb7', '#18ff27']"
        :show-min-max="true"
        :doughnut="false"
      />
      <input type="range" min="0" max="200" v-model="gauge3" />
      <div class="desc">
        Custom colors and formatting function on value and min and max. 
        All font styles can be overridden.
      </div>
    </div>
    <div>
      <k-gauge
        title="Basic Doughnut"
        :value="gauge5"
        :color-steps="['#ffa726']"
        :width="500"
        :height="300"
        :max="100"
        :gauge-size="0.4"
        :formatFunction="(x) => `${x.toFixed(2)}%`"
        :show-min-max="false"
        :doughnut="true"
        :shadow-opacity="0"
      />
      <input type="range" min="0" max="100" v-model="gauge5" />
      <div class="desc">Single color with shadows disabled.</div>
    </div>
    <div>
      <k-gauge></k-gauge>
      <div class="desc">
        Super simple to use. Default config with just
        &lt;k-gauge&gt;&lt;/k-gauge&gt;
      </div>
    </div>
  </div>
</template>

<script>
import KGauge from "./KGauge.vue";

export default {
  name: "app",
  components: {
    KGauge
  },
  data() {
    return {
      gauge1: 60,
      gauge2: 73,
      gauge3: 40,
      gauge4: 3700,
      gauge5: 50
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
  color: #aaa;
  font-size: 15px;
  margin: 5px 0 123px;
  font-family: sans-serif;
}

body {
  background: #fff;
}

.info {
  margin-bottom: 50px;
}
</style>
