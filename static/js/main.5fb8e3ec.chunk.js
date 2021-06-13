(this["webpackJsonpsigmaverse-hackathon-frontend"]=this["webpackJsonpsigmaverse-hackathon-frontend"]||[]).push([[0],{101:function(t,e){},103:function(t,e){},139:function(t,e,n){},140:function(t,e,n){"use strict";n.r(e);var r,a=n(0),c=n.n(a),i=n(74),s=n.n(i),o=n(25),u=n(28),l=n(3),f=n.n(l),p=n(6),h=n(5),b=n(11),j=n(13),v=n(12),d=n(27),O=n(1),m=function(t){Object(j.a)(n,t);var e=Object(v.a)(n);function n(){var t;Object(h.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=e.call.apply(e,[this].concat(a))).state={fileInputField:null},t}return Object(b.a)(n,[{key:"render",value:function(){var t,e=this.props,n=e.children,r=e.onFiles,a=e.onFilesOver,c=e.clickable,i=function(t){a&&a(t)};return Object(O.jsxs)(g,{onClick:function(){c&&t()},onDragEnter:function(t){t.stopPropagation(),t.preventDefault()},onDragOver:function(t){t.stopPropagation(),t.preventDefault(),i(!0)},onDragExit:function(t){t.stopPropagation(),t.preventDefault(),i(!1)},onDragEnd:function(t){t.stopPropagation(),t.preventDefault()},onDrop:function(t){t.preventDefault(),t.stopPropagation(),i(!1);var e=Array.from(t.dataTransfer.files);r(e)},children:[Object(O.jsx)("input",{type:"file",ref:function(e){e&&(t=function(){i(!0),e.click()})},onChange:function(t){t&&t.target&&t.target.files&&r(Array.from(t.target.files))}}),n]})}}]),n}(a.Component),g=d.a.div(r||(r=Object(o.a)(["\n\n    width: 200px;\n    height: 300px;\n    border: 5px dashed #009edf;\n\n\n    input{\n        display: none;\n    }\n\n"]))),x=n(78);function w(t){var e=t.certificateFilename,n=t.hash,r=new x.a;r.text("Your BLAKE2b file hash is:\n".concat(n),10,10);var a=r.output("blob");return new File([a],e)}var y=n(79),k=n.n(y),T=n(80);function D(){return Object(O.jsx)("div",{className:"loading-overlay",children:Object(O.jsx)("div",{className:"spinner"})})}function C(t){var e=t.loading,n=t.content,r=a.useState({content:e||Object(O.jsx)(D,{})}),c=Object(u.a)(r,2),i=c[0],s=c[1];return a.useEffect((function(){return Object(p.a)(f.a.mark((function t(){return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=s,t.next=3,"function"===typeof(e=n)?e():e;case 3:t.t1=t.sent,t.t2={content:t.t1},(0,t.t0)(t.t2);case 6:case"end":return t.stop()}var e}),t)})))(),function(){}}),[n]),Object(O.jsx)(O.Fragment,{children:i.content})}var A=function(){function t(){Object(h.a)(this,t),this.name=void 0,this.title=void 0,this.dataTitles={hash:"Current block hash"},this.ttl=-1}return Object(b.a)(t,[{key:"getData",value:function(){var t=Object(p.a)(f.a.mark((function t(){var e,n,r;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.blockcypher.com/v1/".concat(this.name.toLowerCase(),"/main"));case 2:return e=t.sent,console.log({response:e}),t.next=6,e.json();case 6:if(!(n=t.sent).error){t.next=9;break}throw new Error(n.error);case 9:return r=n.hash,t.abrupt("return",{hash:r});case 11:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),t}(),E=function(t){Object(j.a)(n,t);var e=Object(v.a)(n);function n(){var t;Object(h.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=e.call.apply(e,[this].concat(a))).name="BTC",t.title="Bitcoin",t}return n}(A),F=n(29);function U(t){return new Promise((function(e,n){var r=new FileReader;r.addEventListener("loadend",(function(t){return e(t.target.result)})),r.addEventListener("error",n),r.readAsArrayBuffer(t)}))}function L(t){return S.apply(this,arguments)}function S(){return(S=Object(p.a)(f.a.mark((function t(e){return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=Uint8Array,t.next=3,U(e);case 3:return t.t1=t.sent,t.abrupt("return",new t.t0(t.t1));case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var P=n(82);function B(t){return Object(P.a)(t).map((function(t){return t.toString(16).padStart(2,"0")})).join("")}function I(t){return M.apply(this,arguments)}function M(){return(M=Object(p.a)(f.a.mark((function t(e){var n,r,a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return null,32,n=Object(F.blake2bInit)(32,null),t.t0=F.blake2bUpdate,t.t1=n,t.next=7,L(e);case 7:return t.t2=t.sent,(0,t.t0)(t.t1,t.t2),r=Object(F.blake2bFinal)(n),a=B(r),t.abrupt("return",a);case 12:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var N,Y=function(t){Object(j.a)(n,t);var e=Object(v.a)(n);function n(){var t;Object(h.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=e.call.apply(e,[this].concat(a))).name="ETH",t.title="Ethereum",t}return n}(A),H=function(t){Object(j.a)(n,t);var e=Object(v.a)(n);function n(){var t;Object(h.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(t=e.call.apply(e,[this].concat(a))).name="LTC",t.title="Litecoin",t}return n}(A),J=function(){function t(){Object(h.a)(this,t),this.name="DATE",this.title="Current",this.ttl=1,this.dataTitles={date:"date",time:"time"}}return Object(b.a)(t,[{key:"getData",value:function(){var t=new Date;return{date:"".concat(t.getUTCFullYear(),"-").concat(("0"+t.getUTCMonth()).slice(-2),"-").concat(("0"+t.getUTCDate()).slice(-2)),time:"".concat(("0"+t.getUTCHours()).slice(-2),":").concat(("0"+t.getUTCMinutes()).slice(-2),":").concat(("0"+t.getUTCSeconds()).slice(-2))}}}]),t}(),R=n(81),z=n.n(R),K=function(){function t(){Object(h.a)(this,t),this.name="NYTIMES",this.title="The New York Times",this.ttl=-1,this.dataTitles={firstTitle:"first title"}}return Object(b.a)(t,[{key:"getData",value:function(){var t=Object(p.a)(f.a.mark((function t(){var e,n;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new z.a,t.next=3,e.parseURL("https://rss.nytimes.com/services/xml/rss/nyt/World.xml");case 3:return n=t.sent,t.abrupt("return",{firstTitle:n.items[0].title});case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}]),t}(),W=[new E,new Y,new H,new J,new K];function q(){return Object(O.jsxs)(G,{children:[Object(O.jsx)("h1",{children:"Sigmastamp"}),Object(O.jsx)(m,{onFiles:function(){var t=Object(p.a)(f.a.mark((function t(e){var n,r,a,c,i;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e[0],t.next=3,I(n);case 3:return r=t.sent,console.log({files:e,file:n,hash:r}),a=w({certificateFilename:"certificate.pdf",hash:r}),(c=new k.a).file(n.name,n),c.file(a.name,a),t.next=11,c.generateAsync({type:"blob"});case 11:i=t.sent,Object(T.saveAs)(i,"certificate.zip");case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),clickable:!0,children:"Upload your file(s) here!"}),W.map((function(t){return Object(O.jsx)("div",{children:Object(O.jsx)(C,{content:Object(p.a)(f.a.mark((function e(){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getData();case 2:return n=e.sent,e.abrupt("return",Object(O.jsx)(O.Fragment,{children:Object.entries(n).map((function(e){var n=Object(u.a)(e,2),r=n[0],a=n[1];return Object(O.jsxs)("div",{children:[Object(O.jsxs)("b",{children:[t.title," ",t.dataTitles[r],":"]})," ",a]},r)}))}));case 4:case"end":return e.stop()}}),e)})))})},t.name)}))]})}var G=d.a.div(N||(N=Object(o.a)([""])));n(139);s.a.render(Object(O.jsx)(c.a.StrictMode,{children:Object(O.jsx)(q,{})}),document.getElementById("root"))}},[[140,1,3]]]);
//# sourceMappingURL=main.5fb8e3ec.chunk.js.map