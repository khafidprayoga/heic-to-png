(()=>{"use strict";var t={541:function(t,e,r){var n=r("100");r("117");var l=r("901");function o(t){let e;return{c(){(e=(0,n.bGB)("p")).textContent="Format file must be heic",(0,n.Ljt)(e,"class","error svelte-vh4rtn")},m(t,r){(0,n.$Tr)(t,e,r)},d(t){t&&(0,n.ogt)(e)}}}function i(t){let e;return{c(){e=(0,n.bGB)("div"),(0,n.Ljt)(e,"class","spinner mx-auto svelte-vh4rtn")},m(t,r){(0,n.$Tr)(t,e,r)},d(t){t&&(0,n.ogt)(e)}}}function u(t){let e,r;return{c(){e=(0,n.bGB)("p"),r=(0,n.fLW)(t[1])},m(t,l){(0,n.$Tr)(t,e,l),(0,n.R3I)(e,r)},p(t,e){2&e&&(0,n.rTO)(r,t[1])},d(t){t&&(0,n.ogt)(e)}}}function s(t){let e,r,l,s,a,c,d,f,m,b,p,v,g,h,x;let y=t[3]&&o(t),j=t[0]&&i(t),L=t[1]&&u(t);return{c(){e=(0,n.bGB)("div"),r=(0,n.bGB)("form"),(l=(0,n.bGB)("label")).textContent="Upload file",s=(0,n.DhX)(),a=(0,n.bGB)("input"),c=(0,n.DhX)(),y&&y.c(),d=(0,n.DhX)(),f=(0,n.bGB)("button"),m=(0,n.fLW)("Convert"),p=(0,n.DhX)(),j&&j.c(),v=(0,n.DhX)(),g=(0,n.bGB)("div"),L&&L.c(),(0,n.Ljt)(l,"class","block mb-2 text-sm font-medium text-gray-900 dark:text-white"),(0,n.Ljt)(l,"for","file_input"),(0,n.Ljt)(a,"class","block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none py-2 px-2"),(0,n.Ljt)(a,"id","file_input"),(0,n.Ljt)(a,"type","file"),(0,n.Ljt)(f,"type","submit"),(0,n.Ljt)(f,"class","text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-3"),f.disabled=b=t[0]||!t[2],(0,n.Ljt)(g,"class","mt-[10%]")},m(o,i){(0,n.$Tr)(o,e,i),(0,n.R3I)(e,r),(0,n.R3I)(r,l),(0,n.R3I)(r,s),(0,n.R3I)(r,a),(0,n.R3I)(r,c),y&&y.m(r,null),(0,n.R3I)(r,d),(0,n.R3I)(r,f),(0,n.R3I)(f,m),(0,n.R3I)(r,p),j&&j.m(r,null),(0,n.R3I)(e,v),(0,n.R3I)(e,g),L&&L.m(g,null),!h&&(x=[(0,n.oLt)(a,"change",t[5]),(0,n.oLt)(r,"submit",(0,n.AT7)(t[4]))],h=!0)},p(t,[e]){t[3]?y||((y=o(t)).c(),y.m(r,d)):y&&(y.d(1),y=null),5&e&&b!==(b=t[0]||!t[2])&&(f.disabled=b),t[0]?j||((j=i(t)).c(),j.m(r,null)):j&&(j.d(1),j=null),t[1]?L?L.p(t,e):((L=u(t)).c(),L.m(g,null)):L&&(L.d(1),L=null)},i:n.ZTd,o:n.ZTd,d(t){t&&(0,n.ogt)(e),y&&y.d(),j&&j.d(),L&&L.d(),h=!1,(0,n.j7q)(x)}}}function a(t,e,r){let n=!1,o=null,i=(0,l.x)(),u=null,s="";async function a(t){if(r(3,s=""),!u){r(3,s="Please select a file before submitting.");return}if(!/(\.heic)$/i.test(u.name)){r(3,s="Only HEIC files are allowed.");return}if(u.size>1048576){r(3,s="File size must be 1MB or less.");return}r(0,n=!0);try{let t=await fetch("/upload",{method:"POST",headers:{"Content-Type":"application/octet-stream","File-Name":u.name},body:u});if(t.ok){let e=await t.json();r(1,o=`File uploaded successfully.. CID: ${e.cid} and the url is ${e.url}`)}else r(1,o="Failed to upload file.")}catch(t){r(1,o="An error occurred while uploading the file.")}finally{r(0,n=!1)}i("submit",{file:u})}return[n,o,u,s,a,function(t){r(2,u=t.target.files[0]),r(3,s="")}]}class c extends n.f_C{constructor(t){super(),(0,n.S1n)(this,t,a,s,n.N8,{})}}function d(t){let e,r,l,o,i,u,s;return o=new c({}),{c(){e=(0,n.bGB)("div"),(r=(0,n.bGB)("h1")).textContent="Fully decentralized image convertor using Acurast x Cere",l=(0,n.DhX)(),(0,n.YCL)(o.$$.fragment),i=(0,n.DhX)(),(u=(0,n.bGB)("div")).innerHTML="",(0,n.Ljt)(r,"class","text-xl mb-10"),(0,n.Ljt)(u,"id","result"),(0,n.Ljt)(e,"id","container"),(0,n.Ljt)(e,"class","mx-auto text-center max-w-[800px] mt-32")},m(t,a){(0,n.$Tr)(t,e,a),(0,n.R3I)(e,r),(0,n.R3I)(e,l),(0,n.yef)(o,e,null),(0,n.R3I)(e,i),(0,n.R3I)(e,u),s=!0},p:n.ZTd,i(t){!s&&((0,n.Ui)(o.$$.fragment,t),s=!0)},o(t){(0,n.etI)(o.$$.fragment,t),s=!1},d(t){t&&(0,n.ogt)(e),(0,n.vpE)(o)}}}class f extends n.f_C{constructor(t){super(),(0,n.S1n)(this,t,null,d,n.N8,{})}}new f({target:document.body})}},e={};function r(n){var l=e[n];if(void 0!==l)return l.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}r.m=t,r.d=function(t,e){for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},(()=>{var t=[];r.O=function(e,n,l,o){if(n){o=o||0;for(var i=t.length;i>0&&t[i-1][2]>o;i--)t[i]=t[i-1];t[i]=[n,l,o];return}for(var u=1/0,i=0;i<t.length;i++){for(var n=t[i][0],l=t[i][1],o=t[i][2],s=!0,a=0;a<n.length;a++)(!1&o||u>=o)&&Object.keys(r.O).every(function(t){return r.O[t](n[a])})?n.splice(a--,1):(s=!1,o<u&&(u=o));if(s){t.splice(i--,1);var c=l();void 0!==c&&(e=c)}}return e}})(),r.rv=function(){return"1.0.8"},(()=>{var t={980:0};r.O.j=function(e){return 0===t[e]};var e=function(e,n){var l=n[0],o=n[1],i=n[2],u,s,a=0;if(l.some(function(e){return 0!==t[e]})){for(u in o)r.o(o,u)&&(r.m[u]=o[u]);if(i)var c=i(r)}for(e&&e(n);a<l.length;a++)s=l[a],r.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return r.O(c)},n=self.webpackChunkrsbuild_svelte_ts=self.webpackChunkrsbuild_svelte_ts||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})(),r.ruid="bundler=rspack@1.0.8";var n=r.O(void 0,["879"],function(){return r("541")});n=r.O(n)})();