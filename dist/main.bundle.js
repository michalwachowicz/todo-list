(()=>{"use strict";const t=function(t){t.classList.add("hidden")},e=function(t){t.classList.remove("hidden")},n='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-fill">\n<path d="M19 19H5V8H19M16 1V3H8V1H6V3H5C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 3.89 20.1 3 19 3H18V1" fill="#A1A1AA"/>\n</svg>\n';function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=document.createElement("button");return n.classList="btn btn-icon",n.type="button",n.innerHTML=t,e&&n.addEventListener("click",e),n}var a=document.querySelector("dialog#delete-dialog"),o=document.querySelector("form#delete-form"),i=o.querySelector("button.btn-cancel"),s=-1,c=function(){a.close()};i.addEventListener("click",c),o.addEventListener("submit",(function(t){t.preventDefault(),Ot.deleteTask(s),Ot.renderTasks(document.querySelector(".task-list"),Gt.getActiveItem().filter),c()}));const u=function(){s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1,a.showModal()};function d(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function l(t,e){return+d(t)<+d(e)}function f(t){const e=d(t);return e.setHours(0,0,0,0),e}function h(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function m(t){return h(t,Date.now())}function g(t,e){return+f(t)==+f(e)}function v(t){return g(t,m(t))}function p(t,e){const n=d(t);return isNaN(e)?h(t,NaN):e?(n.setDate(n.getDate()+e),n):n}function w(t){return g(t,p(m(t),1))}function b(t,e){return p(t,-e)}function y(t){return g(t,b(m(t),1))}const L={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function k(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const C={date:k({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:k({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:k({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},M={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function S(t){return(e,n)=>{let r;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,a=n?.width?String(n.width):e;r=t.formattingValues[a]||t.formattingValues[e]}else{const e=t.defaultWidth,a=n?.width?String(n.width):t.defaultWidth;r=t.values[a]||t.values[e]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function x(t){return(e,n={})=>{const r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],o=e.match(a);if(!o)return null;const i=o[0],s=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(s)?function(t,e){for(let n=0;n<t.length;n++)if(e(t[n]))return n;return}(s,(t=>t.test(i))):function(t,e){for(const n in t)if(Object.prototype.hasOwnProperty.call(t,n)&&e(t[n]))return n;return}(s,(t=>t.test(i)));let u;u=t.valueCallback?t.valueCallback(c):c,u=n.valueCallback?n.valueCallback(u):u;return{value:u,rest:e.slice(i.length)}}}var E;const D={code:"en-US",formatDistance:(t,e,n)=>{let r;const a=L[t];return r="string"==typeof a?a:1===e?a.one:a.other.replace("{{count}}",e.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:C,formatRelative:(t,e,n,r)=>M[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:S({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:S({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:S({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:S({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:S({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(E={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(E.matchPattern);if(!n)return null;const r=n[0],a=t.match(E.parsePattern);if(!a)return null;let o=E.valueCallback?E.valueCallback(a[0]):a[0];return o=e.valueCallback?e.valueCallback(o):o,{value:o,rest:t.slice(r.length)}}),era:x({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:x({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:x({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:x({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:x({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let P={};function j(){return P}Math.pow(10,8);const T=6048e5,H=864e5;function q(t){const e=d(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function O(t,e){const n=f(t),r=f(e),a=+n-q(n),o=+r-q(r);return Math.round((a-o)/H)}function A(t){const e=d(t),n=h(t,0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}function N(t){const e=d(t);return O(e,A(e))+1}function W(t,e){const n=j(),r=e?.weekStartsOn??e?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,a=d(t),o=a.getDay(),i=(o<r?7:0)+o-r;return a.setDate(a.getDate()-i),a.setHours(0,0,0,0),a}function V(t){return W(t,{weekStartsOn:1})}function Y(t){const e=d(t),n=e.getFullYear(),r=h(t,0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);const a=V(r),o=h(t,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const i=V(o);return e.getTime()>=a.getTime()?n+1:e.getTime()>=i.getTime()?n:n-1}function F(t){const e=Y(t),n=h(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),V(n)}function B(t){const e=d(t),n=+V(e)-+F(e);return Math.round(n/T)+1}function Z(t,e){const n=d(t),r=n.getFullYear(),a=j(),o=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,i=h(t,0);i.setFullYear(r+1,0,o),i.setHours(0,0,0,0);const s=W(i,e),c=h(t,0);c.setFullYear(r,0,o),c.setHours(0,0,0,0);const u=W(c,e);return n.getTime()>=s.getTime()?r+1:n.getTime()>=u.getTime()?r:r-1}function z(t,e){const n=j(),r=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,a=Z(t,e),o=h(t,0);o.setFullYear(a,0,r),o.setHours(0,0,0,0);return W(o,e)}function Q(t,e){const n=d(t),r=+W(n,e)-+z(n,e);return Math.round(r/T)+1}function I(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const G={y(t,e){const n=t.getFullYear(),r=n>0?n:1-n;return I("yy"===e?r%100:r,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):I(n+1,2)},d:(t,e)=>I(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>I(t.getHours()%12||12,e.length),H:(t,e)=>I(t.getHours(),e.length),m:(t,e)=>I(t.getMinutes(),e.length),s:(t,e)=>I(t.getSeconds(),e.length),S(t,e){const n=e.length,r=t.getMilliseconds();return I(Math.trunc(r*Math.pow(10,n-3)),e.length)}},X="midnight",J="noon",$="morning",U="afternoon",R="evening",K="night",_={G:function(t,e,n){const r=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),r=e>0?e:1-e;return n.ordinalNumber(r,{unit:"year"})}return G.y(t,e)},Y:function(t,e,n,r){const a=Z(t,r),o=a>0?a:1-a;if("YY"===e){return I(o%100,2)}return"Yo"===e?n.ordinalNumber(o,{unit:"year"}):I(o,e.length)},R:function(t,e){return I(Y(t),e.length)},u:function(t,e){return I(t.getFullYear(),e.length)},Q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return I(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return I(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){const r=t.getMonth();switch(e){case"M":case"MM":return G.M(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){const r=t.getMonth();switch(e){case"L":return String(r+1);case"LL":return I(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){const a=Q(t,r);return"wo"===e?n.ordinalNumber(a,{unit:"week"}):I(a,e.length)},I:function(t,e,n){const r=B(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):I(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):G.d(t,e)},D:function(t,e,n){const r=N(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):I(r,e.length)},E:function(t,e,n){const r=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){const a=t.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return I(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){const a=t.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return I(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){const r=t.getDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return I(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){const r=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){const r=t.getHours();let a;switch(a=12===r?J:0===r?X:r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,e,n){const r=t.getHours();let a;switch(a=r>=17?R:r>=12?U:r>=4?$:K,e){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return G.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):G.H(t,e)},K:function(t,e,n){const r=t.getHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):I(r,e.length)},k:function(t,e,n){let r=t.getHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):I(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):G.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):G.s(t,e)},S:function(t,e){return G.S(t,e)},X:function(t,e,n){const r=t.getTimezoneOffset();if(0===r)return"Z";switch(e){case"X":return et(r);case"XXXX":case"XX":return nt(r);default:return nt(r,":")}},x:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"x":return et(r);case"xxxx":case"xx":return nt(r);default:return nt(r,":")}},O:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+tt(r,":");default:return"GMT"+nt(r,":")}},z:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+tt(r,":");default:return"GMT"+nt(r,":")}},t:function(t,e,n){return I(Math.trunc(t.getTime()/1e3),e.length)},T:function(t,e,n){return I(t.getTime(),e.length)}};function tt(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),a=Math.trunc(r/60),o=r%60;return 0===o?n+String(a):n+String(a)+e+I(o,2)}function et(t,e){if(t%60==0){return(t>0?"-":"+")+I(Math.abs(t)/60,2)}return nt(t,e)}function nt(t,e=""){const n=t>0?"-":"+",r=Math.abs(t);return n+I(Math.trunc(r/60),2)+e+I(r%60,2)}const rt=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},at=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},ot={p:at,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],r=n[1],a=n[2];if(!a)return rt(t,e);let o;switch(r){case"P":o=e.dateTime({width:"short"});break;case"PP":o=e.dateTime({width:"medium"});break;case"PPP":o=e.dateTime({width:"long"});break;default:o=e.dateTime({width:"full"})}return o.replace("{{date}}",rt(r,e)).replace("{{time}}",at(a,e))}},it=/^D+$/,st=/^Y+$/,ct=["D","DD","YY","YYYY"];function ut(t){return t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}function dt(t){if(!ut(t)&&"number"!=typeof t)return!1;const e=d(t);return!isNaN(Number(e))}const lt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,ft=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ht=/^'([^]*?)'?$/,mt=/''/g,gt=/[a-zA-Z]/;function vt(t,e,n){const r=j(),a=n?.locale??r.locale??D,o=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,i=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,s=d(t);if(!dt(s))throw new RangeError("Invalid time value");let c=e.match(ft).map((t=>{const e=t[0];if("p"===e||"P"===e){return(0,ot[e])(t,a.formatLong)}return t})).join("").match(lt).map((t=>{if("''"===t)return{isToken:!1,value:"'"};const e=t[0];if("'"===e)return{isToken:!1,value:pt(t)};if(_[e])return{isToken:!0,value:t};if(e.match(gt))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return{isToken:!1,value:t}}));a.localize.preprocessor&&(c=a.localize.preprocessor(s,c));const u={firstWeekContainsDate:o,weekStartsOn:i,locale:a};return c.map((r=>{if(!r.isToken)return r.value;const o=r.value;(!n?.useAdditionalWeekYearTokens&&function(t){return st.test(t)}(o)||!n?.useAdditionalDayOfYearTokens&&function(t){return it.test(t)}(o))&&function(t,e,n){const r=function(t,e,n){const r="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(console.warn(r),ct.includes(t))throw new RangeError(r)}(o,e,String(t));return(0,_[o[0]])(s,o,a.localize,u)})).join("")}function pt(t){const e=t.match(ht);return e?e[1].replace(mt,"'"):t}function wt(t){return wt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},wt(t)}function bt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function yt(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?bt(Object(n),!0).forEach((function(e){Lt(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):bt(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function Lt(t,e,n){return(e=Ct(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function kt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,Ct(r.key),r)}}function Ct(t){var e=function(t,e){if("object"!=wt(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!=wt(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==wt(e)?e:e+""}function Mt(t,e,n){(function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")})(t,e),e.set(t,n)}function St(t,e){return t.get(Et(t,e))}function xt(t,e,n){return t.set(Et(t,e),n),n}function Et(t,e,n){if("function"==typeof t?t===e:t.has(e))return arguments.length<3?e:n;throw new TypeError("Private element is not present on this object")}var Dt=new WeakMap,Pt=new WeakMap,jt=new WeakMap,Tt=function(){return t=function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),Mt(this,Dt,void 0),Mt(this,Pt,void 0),Mt(this,jt,void 0);var r=localStorage.getItem(e);xt(Dt,this,e),xt(Pt,this,0),xt(jt,this,r?JSON.parse(r):[]),St(jt,this).forEach((function(t){var e=t.id;e>=St(Pt,n)&&xt(Pt,n,e+1)}))},(e=[{key:"save",value:function(){localStorage.setItem(St(Dt,this),JSON.stringify(St(jt,this)))}},{key:"add",value:function(t){var e;St(jt,this).push(yt(yt({},t),{},{id:t.id||St(Pt,this)})),xt(Pt,this,(e=St(Pt,this),++e)),this.save()}},{key:"update",value:function(t,e){var n=St(jt,this).findIndex((function(e){return e.id==t}));-1!==n&&(St(jt,this)[n]=e,this.save())}},{key:"delete",value:function(t){var e=St(jt,this).findIndex((function(e){return e.id==t}));-1!==e&&(St(jt,this).splice(e,1),this.save())}},{key:"getList",value:function(){return St(jt,this)}}])&&kt(t.prototype,e),n&&kt(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t;var t,e,n}();var Ht=new Tt("tasks"),qt=function(t){var e=document.createElement("li");e.classList="task",e.dataset.id=t.id;var a=document.createElement("button");a.type="button",a.classList="btn btn-check btn-check-".concat(t.priority),a.addEventListener("click",(function(){}));var o=document.createElement("div");o.classList="task-container";var i=document.createElement("div");i.classList="task-info";var s=document.createElement("h3");if(s.classList="task-title",s.textContent=t.title,i.appendChild(s),t.description){var c=document.createElement("p");c.classList="task-description",c.textContent=t.description,i.appendChild(c)}if(t.dueDate){var d=document.createElement("div"),h=function(t){var e=l(t,f())?"overdue":"incoming";return{formattedDate:v(t)?"Today":w(t)?"Tomorrow":y(t)?"Yesterday":vt(t,"dd MMM yyyy"),dateClass:e}}(t.dueDate);d.classList="task-date task-date-".concat(h.dateClass),d.innerHTML=n+h.formattedDate,i.appendChild(d)}var m=document.createElement("div");m.classList="task-controls";var g=document.createElement("div");g.classList="task-controls-btns";var p=r('<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-fill">\n<path d="M20.71 7.54C21.1 7.15 21.1 6.5 20.71 6.13L18.37 3.79C18 3.4 17.35 3.4 16.96 3.79L15.12 5.62L18.87 9.37M3 17.75V21.5H6.75L17.81 10.43L14.06 6.68L3 17.75Z" fill="#71717A"/>\n</svg>\n',(function(){return ee.openDialog(t)})),b=r('<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-fill">\n<path d="M6 19.5C6 20.0304 6.21071 20.5391 6.58579 20.9142C6.96086 21.2893 7.46957 21.5 8 21.5H16C16.5304 21.5 17.0391 21.2893 17.4142 20.9142C17.7893 20.5391 18 20.0304 18 19.5V7.5H6V19.5ZM8 9.5H16V19.5H8V9.5ZM15.5 4.5L14.5 3.5H9.5L8.5 4.5H5V6.5H19V4.5H15.5Z" fill="#71717A"/>\n</svg>\n',(function(){u(t.id)}));g.append(p,b);var L=document.createElement("div");L.classList="task-project";var k=document.createElement("div");if(k.classList="task-project-title ".concat(t.project?"":"task-project-title-empty"),k.textContent=t.project?t.project.name:"No Project",L.append(k),t.project){var C=document.createElement("div");C.classList="project-color project-color-s",C.style.backgroundColor=t.project.color,L.append(C)}return m.append(g,L),o.append(i,m),e.append(a,o),e};const Ot={createTask:function(t,e,n,r){return{title:t,description:e,dueDate:n,project:r,priority:arguments.length>4&&void 0!==arguments[4]?arguments[4]:4}},renderTasks:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){return t},n=Ht.getList().filter(e).sort((function(t,e){return t.priority-e.priority||t.dueDate-e.dueDate}));t.innerHTML="",n.forEach((function(e){t.appendChild(qt(e))}))},getTasks:function(){return Ht}};var At=new Tt("projects");const Nt=function(t,e){return{name:t,color:e,dataName:t.replace(" ","_").toLowerCase()}},Wt=function(){return At},Vt=function(t){t.innerHTML="",At.getList().forEach((function(e){var n=document.createElement("li");n.classList="sidebar-nav-list-item";var r=document.createElement("button");r.dataset.name=e.dataName,r.type="button",r.classList="btn btn-sidebar btn-sidebar-s btn-project",r.addEventListener("click",(function(){Gt.activate(e),Gt.updateNavigationDOM("btn-sidebar","main-title"),Ot.renderTasks(document.querySelector(".task-list"),(function(t){return t.projectId==e.id}))}));var a=document.createElement("div");a.classList="project-color project-color-s",a.style.backgroundColor=e.color,r.appendChild(a),r.innerHTML+=e.name,n.appendChild(r),t.appendChild(n)}))};function Yt(t){return function(t){if(Array.isArray(t))return Ft(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return Ft(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ft(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Ft(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var Bt=function(t,e,n,r,a){return null==n&&(n=t.toLowerCase()),{name:t,dataName:n,icon:e,active:r,filter:a}},Zt=[Bt("All tasks",'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-fill">\n<path d="M19 15H15C15 15.7956 14.6839 16.5587 14.1213 17.1213C13.5587 17.6839 12.7956 18 12 18C11.2044 18 10.4413 17.6839 9.87868 17.1213C9.31607 16.5587 9 15.7956 9 15H5V5H19M19 3H5C3.89 3 3 3.9 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3Z" fill="#A1A1AA"/>\n</svg>\n',"all",!0,(function(t){return t})),Bt("Today",'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-fill">\n<path d="M12 15.39L8.24 17.66L9.23 13.38L5.91 10.5L10.29 10.13L12 6.09L13.71 10.13L18.09 10.5L14.77 13.38L15.76 17.66M22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.45 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24Z" fill="#A1A1AA"/>\n</svg>\n',null,!1,(function(t){return t})),Bt("Upcoming",n,null,!1,(function(t){return t}))],zt=[],Qt=function(){return zt=[].concat(Zt,Yt(Wt().getList()))},It=function(){return zt.find((function(t){return t.active}))};const Gt={mainNav:Zt,getActiveItem:It,activate:function(t){Qt(),zt.forEach((function(e){return e.active=e==t}))},updateFullNav:Qt,exists:function(t){return!!zt.find((function(e){return e.name.toLowerCase()==t.toLowerCase()}))},updateNavigationDOM:function(){var t=Yt(document.querySelectorAll("button.btn-sidebar")),e=t.find((function(t){return t.classList.contains("active")})),n=It();if(!e||e.dataset.name!=n.dataName){var r=t.find((function(t){return t.dataset.name==n.dataName}));if(r){t.forEach((function(t){return t.classList.remove("active")})),r.classList.add("active");var a=document.querySelector(".main-title-project");n.color?(a.style.backgroundColor=n.color,a.classList.remove("hidden")):a.classList.add("hidden"),document.querySelector(".main-title").textContent=n.name}}}};var Xt=document.querySelector("dialog#add-edit-dialog"),Jt=document.querySelector("form#add-edit-form"),$t=Jt.querySelector("#name"),Ut=Jt.querySelector("#description"),Rt=Jt.querySelector('button[type="submit"]'),Kt=Jt.querySelector(".btn-cancel"),_t=null,te=function(){Xt.close()};Kt.addEventListener("click",te),Jt.addEventListener("submit",(function(t){t.preventDefault();var e=Ot.createTask($t.value,Ut.value||null,null,null);_t&&-1!==_t.id?Ot.getTasks().update(_t.id,e):Ot.getTasks().add(e),Ot.renderTasks(document.querySelector(".task-list"),Gt.getActiveItem().filter),te()}));const ee={openDialog:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;_t=t,$t.value=t&&t.title||"",Ut.value=t&&t.description||"",Rt.textContent=t?"Edit task":"Add task",Xt.showModal()},closeDialog:te};function ne(t){var e=document.createElement("button");return e.classList="btn btn-add-task ".concat(t),e.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM11.4444 7.55556C11.4444 7.24873 11.6932 7 12 7C12.3068 7 12.5556 7.24873 12.5556 7.55556V11.4444H16.4444C16.7513 11.4444 17 11.6932 17 12C17 12.3068 16.7513 12.5556 16.4444 12.5556H12.5556V16.4444C12.5556 16.7513 12.3068 17 12 17C11.6932 17 11.4444 16.7513 11.4444 16.4444V12.5556H7.55556C7.24873 12.5556 7 12.3068 7 12C7 11.6932 7.24873 11.4444 7.55556 11.4444H11.4444V7.55556Z" fill="#3B82F6"/>\n</svg>\nAdd task',e.addEventListener("click",(function(){return ee.openDialog(null)})),e}var re,ae=document.querySelector(".sidebar"),oe=function(t){return r('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-stroke">\n<path d="M9 3V21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="#71717A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n',t)},ie=function(t){return re=t},se=function(){return oe((function(){e(ae),re&&t(re)}))},ce=function(){return oe((function(){t(ae),re&&e(re)}))};var ue="light",de={light:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-fill">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M5.6 19.7273L4.31818 18.4455L5.94545 16.8091L7.23636 18.1L5.6 19.7273ZM6.54545 12C6.54545 8.99091 8.99091 6.54545 12 6.54545C15.0091 6.54545 17.4545 8.98182 17.4545 12C17.4545 15.0091 15.0091 17.4545 12 17.4545C8.99091 17.4545 6.54545 15.0091 6.54545 12ZM22 12.9091H19.2727V11.0909H22V12.9091ZM18.4 19.7273L16.7636 18.1L18.0545 16.8091L19.6818 18.4455L18.4 19.7273ZM18.4 4.36364L19.6818 5.63636L18.0545 7.28182L16.7636 5.99091L18.4 4.36364ZM11.0909 2H12.9091V4.72727H11.0909V2ZM5.6 4.36364L7.23636 5.99091L5.94545 7.28182L4.31818 5.63636L5.6 4.36364ZM4.72727 12.9091H2V11.0909H4.72727V12.9091ZM11.0909 22V19.2727H12.9091V22H11.0909ZM12 15.6364C14.0083 15.6364 15.6364 14.0083 15.6364 12C15.6364 9.9917 14.0083 8.36364 12 8.36364C9.99172 8.36364 8.36366 9.9917 8.36366 12C8.36366 14.0083 9.99172 15.6364 12 15.6364Z" fill="#71717A"/>\n</svg>\n',dark:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-fill">\n<path d="M17.75 4.09L15.22 6.03L16.13 9.09L13.5 7.28L10.87 9.09L11.78 6.03L9.25001 4.09L12.44 4L13.5 1L14.56 4L17.75 4.09ZM21.25 11L19.61 12.25L20.2 14.23L18.5 13.06L16.8 14.23L17.39 12.25L15.75 11L17.81 10.95L18.5 9L19.19 10.95L21.25 11ZM18.97 15.95C19.8 15.87 20.69 17.05 20.16 17.8C19.84 18.25 19.5 18.67 19.08 19.07C15.17 23 8.84001 23 4.94001 19.07C1.03001 15.17 1.03001 8.83 4.94001 4.93C5.34001 4.53 5.76001 4.17 6.21001 3.85C6.96001 3.32 8.14001 4.21 8.06001 5.04C7.79001 7.9 8.75001 10.87 10.95 13.06C13.14 15.26 16.1 16.22 18.97 15.95ZM17.33 17.97C14.5 17.81 11.7 16.64 9.53001 14.5C7.36001 12.31 6.20001 9.5 6.04001 6.68C3.23001 9.82 3.34001 14.64 6.35001 17.66C9.37001 20.67 14.19 20.78 17.33 17.97Z" fill="#A1A1AA"/>\n</svg>\n'},le=function(){return de[ue]};const fe=le,he=function(){ue="light"==ue?"dark":"light"},me=function(t){t.innerHTML=le(),document.body.classList="theme-".concat(ue)};var ge=document.querySelector("dialog#add-project-dialog"),ve=document.querySelector("form#add-project-form"),pe=ve.querySelector('label[for="color"]'),we=ve.querySelector("#color"),be=ve.querySelector(".form-color-popup"),ye=ve.querySelector("button.btn-cancel"),Le=ve.querySelector('button[type="submit"]'),ke=ve.querySelector("#project-name"),Ce=ve.querySelector(".form-error"),Me=!1,Se=["#dc2626","#ea580c","#d97706","#ca8a04","#65a30d","#16a34a","#059669","#0d9488","#0891b2","#0284c7","#2563eb","#4f46e5"],xe=function(){Ee(),ge.close()},Ee=function(){Me=!1,be.classList.add("hidden")};!function(){Se.forEach((function(t){var e=document.createElement("li");e.classList="form-color-popup-item";var n=document.createElement("button");n.classList="btn project-color project-color-m",n.style.backgroundColor=t,n.dataset.color=t,n.type="button",e.appendChild(n),be.appendChild(e)}));var t=Se[0];pe.style.backgroundColor=t,we.value=t}(),pe.addEventListener("click",(function(t){t.preventDefault(),t.stopPropagation(),Me=!0,be.classList.remove("hidden")})),be.addEventListener("click",(function(t){t.stopPropagation();var e=t.target;if(e.classList.contains("project-color")){var n=e.dataset.color;we.value=n,pe.style.backgroundColor=n,Ee()}})),window.addEventListener("click",(function(t){!Me||pe.contains(t.target)||be.contains(t.target)||Ee()})),ye.addEventListener("click",xe),ve.addEventListener("submit",(function(t){t.preventDefault();var e=Nt(ke.value,we.value);Wt().add(e),Vt(document.querySelector(".sidebar-nav-list-projects")),Ot.renderTasks(document.querySelector(".task-list"),Gt.getActiveItem().filter),xe()})),ke.addEventListener("input",(function(t){var e=t.target.value;Gt.exists(e)?(Ce.textContent="A project with this name already exists",Ce.classList.remove("hidden"),Le.disabled=!0):(Ce.classList.add("hidden"),Le.disabled=!1)}));const De=function(){ge.showModal()};var Pe,je=function(t){var e=document.createElement("li");return e.classList="sidebar-nav-list-item",e.appendChild(t),e},Te=function(){var t=document.querySelector(".sidebar-nav-list-main");t.appendChild(je(ne("btn-sidebar btn-sidebar-l"))),Gt.mainNav.forEach((function(e){var n=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=t.name,a=t.dataName,o=t.icon,i=document.createElement("button");return i.type="button",i.classList="btn btn-sidebar ".concat(e||""),i.innerHTML=o+r,i.dataset.name=a,n&&i.addEventListener("click",n),i}(e,"btn-sidebar-l",(function(){Gt.activate(e),Gt.updateNavigationDOM(),Ot.renderTasks(document.querySelector(".task-list"))}));t.appendChild(je(n))}))};!function(){var t=r(fe(),(function(t){he(),me(t.target)})),e=ce();document.querySelector(".sidebar-header").append(t,e)}(),Te(),Pe=r('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-fill">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z" fill="#71717A"/>\n</svg>\n',De),document.querySelector(".sidebar-projects-header").appendChild(Pe),Vt(document.querySelector(".sidebar-nav-list-projects")),function(){var e=document.querySelector(".main-header"),n=se();t(n),e.appendChild(n),ie(n)}(),document.querySelector(".main-content").appendChild(ne("btn-add-task-l")),Gt.updateFullNav(),Gt.updateNavigationDOM(),Ot.renderTasks(document.querySelector(".task-list"))})();
//# sourceMappingURL=main.bundle.js.map