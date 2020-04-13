!function(t){var a={};function i(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=a,i.d=function(t,a,e){i.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,a){if(1&a&&(t=i(t)),8&a)return t;if(4&a&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(i.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var s in t)i.d(e,s,function(a){return t[a]}.bind(null,s));return e},i.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(a,"a",a),a},i.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},i.p="",i(i.s=0)}([function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e,s=i(1);document.addEventListener("DOMContentLoaded",(function(){n()}));var n=function(){var t=document.getElementById("resetBtn"),a=document.getElementById("worldCanvas"),i=document.getElementById("grapthCanvas"),n=document.getElementById("population"),r=document.getElementById("healthcareCapacity"),o=document.getElementById("totalHealthcare"),h=document.getElementById("totalInfected"),c=document.getElementById("totalDeaths"),l=document.getElementById("deathrate"),m=document.getElementById("populationRange"),u=document.getElementById("healthcareRange"),d=document.getElementById("gravityRange"),p=document.getElementById("dragRange"),g=function(t){void 0===t&&(t=500),e.stop(),(e=new s.World(t,a,i)).start()};t.onclick=function(){g()},document.getElementById("socialDistancingBtn").onclick=function(){"socialDistancing"===e.getState()?e.setState("default"):e.setState("socialDistancing")},m.onchange=function(){g(Number(m.value)),m.nextElementSibling.innerHTML=m.value},u.onchange=function(){e.simParams.healthcareCapacity=Number(u.value),u.nextElementSibling.innerHTML=u.value},d.onchange=function(){e.simParams.gForce=Number(d.value)},p.onchange=function(){e.simParams.drag=Number(p.value)},(e=new s.World(500,a,i)).start(),setInterval((function(){n.innerHTML=String(e.simParams.population),r.innerHTML=String(e.simParams.healthcareCapacity),h.innerHTML=String(e.totalIll),c.innerHTML=String(e.totalDead),o.innerHTML=String(e.totalIllUsingHealthCare),l.innerHTML=e.totalImmunized?String((e.totalDead/e.totalImmunized*100).toFixed(1))+"%":"-",u.value=String(e.simParams.healthcareCapacity),u.nextElementSibling.innerHTML=String(e.simParams.healthcareCapacity),d.value=String(e.simParams.gForce),d.nextElementSibling.innerHTML=String(e.simParams.gForce),p.value=String(e.simParams.drag),p.nextElementSibling.innerHTML=String(e.simParams.drag)}),500)}},function(t,a,i){"use strict";var e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(a,"__esModule",{value:!0});var s=e(i(2)),n=i(3),r=function(){function t(t,a,i,e){void 0===t&&(t=500),void 0===e&&(e=1),this.simParams=new s.default(t),this.started=!1,this.canvas=a,this.canvas.height=this.simParams.height,this.canvas.width=this.simParams.width,this.ctx=this.canvas.getContext("2d"),this.graphCanvas=i,this.graphCanvas.height=this.simParams.height/2,this.graphCanvas.width=this.simParams.width,this.graphCtx=this.graphCanvas.getContext("2d"),this.pArray=[],this.totalIll=e,this.totalImmunized=0,this.totalDead=0;for(var r=e,o=0;o<this.simParams.population;o++){var h=new n.Person(this.simParams);r>0&&(h.infect(this.simParams.timeStep),r--),h.setRndPosition(),h.setRndVelocity(),this.pArray.push(h)}}return t.prototype.calcInteractions=function(){for(var t=this,a=function(a,i,e){e<t.simParams.distanceInfectRadius&&a.isInfectious()&&i.isUncontaminated()&&i.infectChance(t.simParams.timeStep,e),e<t.simParams.distanceInfectRadius&&i.isInfectious()&&a.isUncontaminated()&&a.infectChance(t.simParams.timeStep,e)},i=function(a,i,e,s,n,r){if(e-1>2){var o=t.simParams.gForce/s,h=o*n/e,c=o*r/e;a.dx+=h,a.dy+=c,i.dx-=h,i.dy-=c}},e=function(a){a.x+2>t.canvas.width?(a.x=t.canvas.width-2,a.dx=a.dx*(-1*t.simParams.boundElasticity)):a.x<2&&(a.x=2,a.dx=a.dx*(-1*t.simParams.boundElasticity)),a.y+2>t.canvas.height?(a.y=t.canvas.height-2,a.dy=a.dy*(-1*t.simParams.boundElasticity)):a.y<2&&(a.y=2,a.dy=a.dy*(-1*t.simParams.boundElasticity))},s=0,n=0,r=0,o=0,h=0,c=0;c<this.pArray.length;c++){var l=this.pArray[c];0===c&&(l.step(),e(l));for(var m=c+1;m<this.pArray.length;m++){var u=this.pArray[m];0===c&&(u.step(),e(u));var d=u.x-l.x,p=u.y-l.y,g=d*d+p*p,f=Math.pow(g,.5);0!==this.simParams.gForce&&i(l,u,f,g,d,p),a(l,u,f)}l.isIll()?(!l.isUsingHealthcare()&&this.totalIllUsingHealthCare<this.simParams.healthcareCapacity&&(l.setUseHealthcare(),this.totalIllUsingHealthCare++),l.isUsingHealthcare()?r++:o++,s++):l.isImmunized()?n++:l.isDead()&&h++}this.totalIll=s,this.totalImmunized=n,this.totalDead=h,this.totalIllUsingHealthCare=r,this.totalIllNotUsingHealthCare=o},t.prototype.step=function(){this.started&&(this.calcInteractions(),this.render(),this.simParams.timeStep++,window.requestAnimationFrame(this.step.bind(this)))},t.prototype.render=function(){var t=this;t.ctx.clearRect(0,0,t.canvas.width,t.canvas.height),t.pArray.forEach((function(a){a.render(t.ctx)})),this.simParams.timeStep%5==0&&function(){var a=t.graphCtx.getImageData(1,0,t.graphCtx.canvas.width-1,t.graphCtx.canvas.height);t.graphCtx.putImageData(a,0,0),t.graphCtx.clearRect(t.graphCtx.canvas.width-1,0,1,t.graphCtx.canvas.height);var i=function(a,i,e){var s=Math.round(a*t.graphCanvas.height/t.simParams.population);return t.graphCtx.beginPath(),t.graphCtx.moveTo(t.graphCanvas.width-1,i),t.graphCtx.lineTo(t.graphCanvas.width-1,s+i),t.graphCtx.strokeStyle=e,t.graphCtx.stroke(),s},e=function(a,i,e){var s=Math.round(a*t.graphCanvas.height/t.simParams.population);return t.graphCtx.beginPath(),t.graphCtx.moveTo(t.graphCanvas.width-1,t.graphCanvas.height-i),t.graphCtx.lineTo(t.graphCanvas.width-1,t.graphCanvas.height-i-s),t.graphCtx.strokeStyle=e,t.graphCtx.stroke(),s},s=i(t.totalImmunized,0,"#03a9f4");s=i(t.totalDead,s,"#000000"),s=e(t.totalIllUsingHealthCare,0,"orangered"),e(t.totalIllNotUsingHealthCare,s,"#af2f00"),t.graphCtx.beginPath(),t.graphCtx.moveTo(t.graphCanvas.width-7,t.graphCanvas.height-Math.round(t.simParams.healthcareCapacity*t.graphCanvas.height/t.simParams.population)),t.graphCtx.lineTo(t.graphCanvas.width,t.graphCanvas.height-Math.round(t.simParams.healthcareCapacity*t.graphCanvas.height/t.simParams.population)),t.graphCtx.strokeStyle="lightgreen",t.graphCtx.stroke()}()},t.prototype.setState=function(t){switch(t){case"socialDistancing":this.simParams.setSocialDistancing();break;default:this.pArray.forEach((function(t){t.isDead()?(t.dx=0,t.dy=0):t.setRndVelocity()})),this.simParams.setDefaultPhysics()}},t.prototype.getState=function(){return this.simParams.state},t.prototype.start=function(){this.started||(this.started=!0,this.animationFrameID=window.requestAnimationFrame(this.step.bind(this)))},t.prototype.stop=function(){this.started=!1,window.cancelAnimationFrame(this.animationFrameID),this.animationFrameID=null},t}();a.World=r},function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=function(){function t(t){void 0===t&&(t=500),this.timeStep=0,this.width=500,this.height=500,this.population=t,this.setDefaultPhysics()}return t.prototype.setDefaultPhysics=function(){this.gForce=0,this.boundElasticity=.99,this.drag=1,this.distanceInfectionProbability=1e-4,this.distanceInfectRadius=50,this.contactInfectionProbability=.1,this.contactInfectRadius=3,this.incubationPeriod=300,this.illPeriod=700,this.healthcareCapacity=100,this.deathRate=.35,this.deathRateWithhealthcare=.02,this.state="default"},t.prototype.setSocialDistancing=function(){this.gForce=-5,this.drag=.95,this.state="socialDistancing"},t}();a.default=e},function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=2*Math.PI,s=function(){function t(t,a,i,e,s){void 0===a&&(a=0),void 0===i&&(i=0),void 0===e&&(e=0),void 0===s&&(s=0),this.simParams=t,this.x=a,this.y=i,this.dx=e,this.dy=s,this.status=0}return t.prototype.step=function(){if(1!==this.simParams.drag&&(this.dx=this.dx*this.simParams.drag,this.dy=this.dy*this.simParams.drag),this.x+=this.dx,this.y+=this.dy,this.isInIncubationPeriod()&&this.simParams.timeStep>this.illTime)return this.setIll();this.isIll()&&this.simParams.timeStep>this.outcomeTime&&this.setOutcome()},t.prototype.infectChance=function(t,a){var i=Math.random();if(a<this.simParams.contactInfectRadius&&i<this.simParams.contactInfectRadius)return this.infect(t);i<this.simParams.distanceInfectionProbability&&this.infect(t)},t.prototype.isUncontaminated=function(){return 0===this.status},t.prototype.isInIncubationPeriod=function(){return 10===this.status},t.prototype.isIll=function(){return 11===this.status||12===this.status},t.prototype.isUsingHealthcare=function(){return 12===this.status},t.prototype.isInfectious=function(){return 10===this.status||11===this.status||12===this.status},t.prototype.isImmunized=function(){return 20===this.status},t.prototype.isDead=function(){return 30===this.status},t.prototype.infect=function(t){this.status=10,this.infectedTime=t;var a=this.simParams.incubationPeriod+Math.round(Math.random()*(this.simParams.incubationPeriod/4)-this.simParams.incubationPeriod/8);this.illTime=t+a},t.prototype.setIll=function(){this.status=11;var t=this.simParams.illPeriod+Math.round(Math.random()*(this.simParams.illPeriod/4)-this.simParams.illPeriod/8);this.outcomeTime=this.illTime+t},t.prototype.setUseHealthcare=function(){this.status=12},t.prototype.setOutcome=function(){if(Math.random()<(12===this.status?this.simParams.deathRateWithhealthcare:this.simParams.deathRate))return this.dx=0,this.dy=0,void(this.status=30);this.status=20},t.prototype.setRndPosition=function(){this.x=Math.random()*this.simParams.width,this.y=Math.random()*this.simParams.height},t.prototype.setRndVelocity=function(){this.dx=1*Math.random()-.5,this.dy=1*Math.random()-.5},t.prototype.render=function(t){switch(t.beginPath(),t.arc(this.x,this.y,2,0,e,!1),this.status){case 0:t.fillStyle="lime";break;case 10:t.fillStyle="green";break;case 11:case 12:t.fillStyle="orangered";break;case 20:t.fillStyle="#03a9f4";break;case 30:t.fillStyle="#000000"}t.fill()},t}();a.Person=s}]);
//# sourceMappingURL=main.bundle.js.map