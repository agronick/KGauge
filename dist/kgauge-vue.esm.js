var t=0;function e(t,e,n,i,a){var r=(new Date).getTime(),o=!0,s=e-t,u=function(){var e=(new Date).getTime()-r,l=Math.min(e/n,1),h=l;a&&(h=a(l)),i(t+h*s),l<1&&o&&window.requestAnimationFrame(u)};return window.requestAnimationFrame(u),function(){o=!1}}var n=function(t,e,n,i,a,r,o,s,u,l){"boolean"!=typeof o&&(u=s,s=o,o=!1);var h,d="function"==typeof n?n.options:n;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,a&&(d.functional=!0)),i&&(d._scopeId=i),r?(h=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,u(t)),t&&t._registeredComponents&&t._registeredComponents.add(r)},d._ssrRegister=h):e&&(h=o?function(){e.call(this,l(this.$root.$options.shadowRoot))}:function(t){e.call(this,s(t))}),h)if(d.functional){var m=d.render;d.render=function(t,e){return h.call(e),m(t,e)}}else{var f=d.beforeCreate;d.beforeCreate=f?[].concat(f,h):[h]}return n},i={name:"k-gauge",props:{title:{type:String},titleStyle:{type:String,default:"fill: #999999; font-size: 20px; font-weight: bold"},width:{type:[Number,String],default:200},height:{type:[Number,String],default:150},value:{default:10},min:{type:Number,default:0},max:{type:Number,default:100},animationDuration:{type:Number,default:1e3},doughnut:{type:Boolean},formatFunction:{type:Function,default:Math.round},colorSteps:{type:Array,default:function(){return["#a9d70b","#f9c802","#ff0000"]}},valueFontStyle:{type:String,default:'font-size: 35px; fill: #010101; font-weight: bold; font-family: "Arial"'},labelFontStyle:{type:String,default:"font: 16px Arial; fill: #b3b3b3"},minMaxFontStyle:{type:String,default:"font: 16px Arial; fill: #b4b4b4"},animateOnLoad:{type:Boolean,default:!0},labelText:{type:String,default:""},showMinMax:{type:Boolean,default:!0},gaugeSize:{type:Number,default:1},shadowOpacity:{type:Number,default:.2},backgroundColor:{type:String,default:"#edebeb"},easingFunction:{type:Function,default:function(t){return t*(2-t)}},maxTextFormatFn:{type:Function,default:function(t){return t}},minTextFormatFn:{type:Function,default:function(t){return t}}},data:function(){var e=this.colorSteps.map(function(t){for(var e=[],n=1;n<t.length;n+=2)e.push(parseInt("0x"+t.substr(n,2)));return e});return{shownValue:this.animateOnLoad?this.min:this.value,printValue:this.animateOnLoad?this.min:this.formatFunction(this.value),backgroundPath:"",gaugeColor:"",builtColorSteps:e,animationCanceler:null,renderId:"k-gauge-filter-"+ ++t,minTextX:0,maxTextX:0}},mounted:function(){if(this.min===this.max)throw Error("Min and max can not be equal");this.$watch(function(t){return[t.height,t.width,t.doughnut,t.gaugeSize]},this.resetBgArc),this.resetBgArc()},methods:{reverseValue:function(t){var e=this.max-this.min,n=(t-this.min)/e;return this.max-e*n},makeArc:function(t){var e=this.gaugeSize,n=this.doughnut?220:250,i=this.doughnut?250:150;if(this.doughnut){var a,r;this.isReversed?(t=this.reverseValue(t),r=this.min-this.max,a=t-this.max):(r=this.max-this.min,a=t-this.min);var o=(1-2*a/r)*Math.PI,s=.5*n-n/20,u=s-n/6.666666666666667*e,l=.5*n+0,h=.5*i+0,d="M"+(l-u)+","+h+" ";return d+="L"+(l-s)+","+h+" ",a>.5*r&&(d+="A"+s+","+s+" 0 0 1 "+(l+s)+","+h+" "),d+="A"+s+","+s+" 0 0 1 "+(l+s*Math.cos(o))+","+(h-s*Math.sin(o))+" ",d+="L"+(l+u*Math.cos(o))+","+(h-u*Math.sin(o))+" ",a>.5*r&&(d+="A"+u+","+u+" 0 0 0 "+(l+u)+","+h+" "),{path:d+="A"+u+","+u+" 0 0 0 "+(l-u)+","+h+" ",minTextX:60,maxTextX:190}}var m=(1-(t-this.min)/(this.max-this.min))*Math.PI,f=n/2-n/10,c=f-n/6.666666666666667*e,p=n/2+0,x=i/1.5+0,g=p+f*Math.cos(m),v=x-f*Math.sin(m),y=p+c*Math.cos(m),_=p-f,b=p-c,S="M"+b+","+x+" ";return S+="L"+_+","+x+" ",S+="A"+f+","+f+" 0 0 1 "+g+","+v+" ",S+="L"+y+","+(x-c*Math.sin(m))+" ",S+="A"+c+","+c+" 0 0 0 "+b+","+x+" ",{path:S+="Z ",minTextX:_+.5*(b-_),maxTextX:y+.5*(g-y)}},resetBgArc:function(){var t=this.makeArc(this.max);this.backgroundPath=t.path,this.minTextX=t.minTextX,this.maxTextX=t.maxTextX},getColorForValue:function(t){var e=this,n=this.builtColorSteps.length;if(t===this.max)return this.builtColorSteps[n-1];var i=(t-this.min)/(this.max-this.min)*(n-1),a=Math.floor(i),r=i%1;return this.builtColorSteps[a].map(function(t,n){var i=e.builtColorSteps[a+1][n]-t;return Math.round(t+i*r)})},checkLimits:function(t){return Math.max(this.isReversed?this.max:this.min,Math.min(this.isReversed?this.min:this.max,t))}},computed:{gaugePath:function(){return this.makeArc(this.shownValue)},strokeStyle:function(){return this.doughnut?"transform: rotate(90deg); transform-origin: 125px 125px":""},isReversed:function(){return this.min>this.max}},watch:{value:{handler:function(t){var n=this;this.animationCanceler&&this.animationCanceler(),this.animationCanceler=e(this.shownValue,this.checkLimits(t),this.animationDuration,function(t){n.shownValue=n.checkLimits(t),n.printValue=n.formatFunction(n.shownValue)},this.easingFunction)},immediate:!0},shownValue:{handler:function(t){var e=this.getColorForValue(t).join(",");this.gaugeColor="rgb("+e+")"},immediate:!0}}},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",{attrs:{height:t.height,version:"1.1",width:t.width,viewBox:"0 0 250 "+(t.doughnut?280:150),xmlns:"http://www.w3.org/2000/svg"}},[t.shadowOpacity?n("filter",{attrs:{id:t.renderId}},[n("feOffset",{attrs:{dx:"0",dy:"3"}}),t._v(" "),n("feGaussianBlur",{attrs:{result:"offset-blur",stdDeviation:"5"}}),t._v(" "),n("feComposite",{attrs:{operator:"out",in:"SourceGraphic",in2:"offset-blur",result:"inverse"}}),t._v(" "),n("feFlood",{attrs:{"flood-color":"black","flood-opacity":t.shadowOpacity,result:"color"}}),t._v(" "),n("feComposite",{attrs:{operator:"in",in:"color",in2:"inverse",result:"shadow"}}),t._v(" "),n("feComposite",{attrs:{operator:"over",in:"shadow",in2:"SourceGraphic"}})],1):t._e(),t._v(" "),t.title?n("text",{style:t.titleStyle,attrs:{y:"15",x:"125","text-anchor":"middle"}},[n("tspan",{domProps:{innerHTML:t._s(t.title)}})]):t._e(),t._v(" "),n("g",{attrs:{transform:"translate(0 20)"}},[n("path",{style:t.strokeStyle,attrs:{fill:t.backgroundColor,stroke:"none",d:t.backgroundPath,filter:"url(#"+t.renderId+")"}}),t._v(" "),n("path",{style:t.strokeStyle,attrs:{fill:t.gaugeColor,stroke:"none",d:t.gaugePath.path,filter:"url(#"+t.renderId+")"}}),t._v(" "),n("text",{style:t.valueFontStyle,attrs:{x:"125",y:t.doughnut?118:100,"text-anchor":"middle"}},[n("tspan",{domProps:{innerHTML:t._s(t.printValue)}})]),t._v(" "),n("text",{style:t.labelFontStyle,attrs:{x:"125",y:t.doughnut?142:120,"text-anchor":"middle"},domProps:{innerHTML:t._s(t.labelText)}},[n("tspan",{domProps:{innerHTML:t._s(t.labelText)}})]),t._v(" "),t.showMinMax&&!t.doughnut?n("text",{style:t.minMaxFontStyle,attrs:{x:t.minTextX,y:120,"text-anchor":"middle"}},[n("tspan",{domProps:{innerHTML:t._s(t.minTextFormatFn(t.min))}})]):t._e(),t._v(" "),t.showMinMax&&!t.doughnut?n("text",{style:t.minMaxFontStyle,attrs:{x:t.maxTextX,y:120,"text-anchor":"middle"}},[n("tspan",{domProps:{innerHTML:t._s(t.maxTextFormatFn(t.max))}})]):t._e(),t._v(" "),t.showMinMax&&t.doughnut?n("text",{style:t.minMaxFontStyle,attrs:{x:125,y:240,"text-anchor":"middle"}},[n("tspan",[t._v(t._s(t.max)+" "+t._s(t.labelText))])]):t._e()])])};a._withStripped=!0;export default n({render:a,staticRenderFns:[]},void 0,i,void 0,!1,void 0,void 0,void 0);export{e as animateCalc};
