(this.webpackJsonprepopulate=this.webpackJsonprepopulate||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(1),c=n.n(r),o=n(7),u=n.n(o),s=(n(13),n(2)),i=n.n(s),l=n(6),m=n(3),f=n(4),h=function(e){var t=e.people,n=e.selectMate,r=e.mate,c=e.femaleName,o=e.setPeople;return Object(a.jsxs)("select",{value:r,onChange:function(e){return n(c,e.target.value,t,o)},children:[Object(a.jsx)("option",{value:"none",children:"- Choose Mate -"}),t.map((function(e){return"male"===e.sex&&Object(a.jsx)("option",{value:e.name,children:e.name},e.name)}))]})},p=function(e){var t=e.name,n=e.sex,r=e.mate,c=(e.mother,e.father,e.setPeople),o=e.people,u=e.selectMate;return Object(a.jsxs)("li",{children:[Object(a.jsx)("span",{style:{color:"male"===n?"blue":"pink"},children:t}),"female"===n&&Object(a.jsxs)(a.Fragment,{children:[" "," - ",Object(a.jsx)(h,{people:o,femaleName:t,mate:r,selectMate:u,setPeople:c})]})]})};function d(e,t){var n=[e],a=j(e,t);return a.mother&&(n=n.concat(d(a.mother,t))),a.father&&(n=n.concat(d(a.father,t))),n}function b(e,t){var n=j(e,t),a=n.mother?b(n.mother,t)+1:0,r=n.father?b(n.father,t)+1:0;return Math.max(a,r)}function j(e,t){return t.find((function(t){return t.name===e}))}function g(e,t,n){var a=d(e,n),r=d(t,n);return a.filter((function(e){return r.includes(e)})).length>0}n(15);var v={1:{males:2,females:1,depth:2,depthLabel:"grandchild"},2:{males:3,females:1,depth:3,depthLabel:"great-grandchild"},3:{males:2,females:2,depth:3,depthLabel:"great-grandchild"}};function x(e,t){return O.apply(this,arguments)}function O(){return(O=Object(f.a)(i.a.mark((function e(t,n){var a,r,c,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([fetch("https://randomuser.me/api/?gender=female&results=".concat(v[n].females,"&inc=name&nat=us,dk,fr,gb")).then((function(e){return e.json()})),fetch("https://randomuser.me/api/?gender=male&results=".concat(v[n].males,"&inc=name&nat=us,dk,fr,gb")).then((function(e){return e.json()}))]);case 2:a=e.sent,r=a[0].results.map((function(e){return{name:e.name.first,sex:"female"}})),c=a[1].results.map((function(e){return{name:e.name.first,sex:"male"}})),o=r.concat(c),t(o);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e,t,n,a){a(n.map((function(n){return e===n.name?"none"===t?Object(m.a)(Object(m.a)({},n),{},{mate:void 0}):Object(m.a)(Object(m.a)({},n),{},{mate:t}):n})))}function k(e){return y.apply(this,arguments)}function y(){return(y=Object(f.a)(i.a.mark((function e(t){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://randomuser.me/api/?results=".concat(t.length,"&inc=name,gender&nat=us,dk,fr,gb")).then((function(e){return e.json()}));case 2:return n=e.sent,e.abrupt("return",t.map((function(e,t){var a=n.results[t];return{name:a.name.first,sex:a.gender,mother:e.mother,father:e.father}})));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(){return(M=Object(f.a)(i.a.mark((function e(t,n,a,r){var c,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=[],e.next=3,t.every((function(e){if(e.mate){if(g(e.name,e.mate,t)){window.confirm("".concat(e.name," and ").concat(e.mate," are related. Inbreeding is not allowed!"));return x(n,a),c=[],!1}var o=b(e.name,t),u=b(e.mate,t);if(console.log(o,u,v[a].depth),Math.max(o,u)+1>=v[a].depth){if(a>=v.length){window.confirm("Well done! You won the game!");r(1)}else{window.confirm("Well done! On to the next level for you!");r(a+1)}return!1}c.push({mother:e.name,father:e.mate})}return!0}));case 3:if(!(c.length>0)){e.next=8;break}return e.next=6,k(c);case 6:o=e.sent,n(t.concat(o));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var P=function(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(1),u=Object(l.a)(o,2),s=u[0],i=u[1];return Object(r.useEffect)((function(){x(c,s)}),[s]),Object(a.jsxs)("div",{children:["The Event has left only ",v[s].males+v[s].females," people alive. Give the woman a ",v[s].depthLabel," without inbreeding.",Object(a.jsx)("ul",{children:n.map((function(e){return Object(r.createElement)(p,Object(m.a)(Object(m.a)({},e),{},{key:e.name,setPeople:c,people:n,selectMate:w}))}))}),Object(a.jsx)("button",{onClick:function(){return function(e,t,n,a){return M.apply(this,arguments)}(n,c,s,i)},children:"Reproduce"})]})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),a(e),r(e),c(e),o(e)}))};u.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(P,{})}),document.getElementById("root")),C()}},[[16,1,2]]]);
//# sourceMappingURL=main.6927346b.chunk.js.map