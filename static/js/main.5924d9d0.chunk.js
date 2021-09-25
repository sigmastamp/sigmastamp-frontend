(this["webpackJsonpsigmaverse-hackathon-frontend"]=this["webpackJsonpsigmaverse-hackathon-frontend"]||[]).push([[0],{116:function(e,t){},118:function(e,t){},159:function(e,t,n){},160:function(e,t,n){"use strict";n.r(t);var r,a=n(9),c=n(96),s=n(0),i=n.n(s),o=n(89),u=n.n(o),p=n(5),f=n(10),l=n(32),d=n(18),h=n(2),b=n.n(h),j=n(3),m=n(14),x=n(90),v=n(40),O=n.n(v),g=n(29),w=n(1);function y(){return Object(w.jsx)(T,{children:Object(w.jsx)("div",{className:"spinner"})})}var k,T=f.a.div(r||(r=Object(a.a)([""])));function S(e){var t=e.loading,n=e.content,r=s.useState({content:t||Object(w.jsx)(y,{})}),a=Object(m.a)(r,2),c=a[0],i=a[1];return s.useEffect((function(){return Object(j.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=i,e.next=3,"function"===typeof(t=n)?t():t;case 3:e.t1=e.sent,e.t2={content:e.t1},(0,e.t0)(e.t2);case 6:case"end":return e.stop()}var t}),e)})))(),function(){}}),[n]),Object(w.jsx)(w.Fragment,{children:c.content})}function F(e){var t=e.amount,n=e.address,r=e.dueTime;return Object(w.jsxs)(E,{children:["Pay ",t," ERG to address ",n," in $",r," seconds."]})}var A,E=f.a.div(k||(k=Object(a.a)([""]))),D=n(94);function I(e){var t=Object(s.useRef)(null);return Object(w.jsxs)("div",{children:[e.createUi({createPdf:function(){var e=Object(j.a)(b.a.mark((function e(){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new D.a).text(t.current.innerText,10,10),e.abrupt("return",n.output("blob"));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}),Object(w.jsx)(P,{ref:t,children:e.children})]})}var N,P=f.a.div(A||(A=Object(a.a)(["\n    width: ","px;\n    height: ","px;\n    border: 2px solid #009edf;\n\n    background-color: white;\n    color: black;\n"])),420,594),C=n(11),H=n(19),U=n(21),R=n(20),B=function(e){Object(U.a)(n,e);var t=Object(R.a)(n);function n(){var e;Object(C.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={fileInputField:null},e}return Object(H.a)(n,[{key:"render",value:function(){var e,t=this.props,n=t.children,r=t.onFiles,a=t.onFilesOver,c=t.clickable,s=function(e){a&&a(e)};return Object(w.jsxs)(M,{onClick:function(){c&&e()},onDragEnter:function(e){e.stopPropagation(),e.preventDefault()},onDragOver:function(e){e.stopPropagation(),e.preventDefault(),s(!0)},onDragExit:function(e){e.stopPropagation(),e.preventDefault(),s(!1)},onDragEnd:function(e){e.stopPropagation(),e.preventDefault()},onDrop:function(e){e.preventDefault(),e.stopPropagation(),s(!1);var t=Array.from(e.dataTransfer.files);r(t)},children:[Object(w.jsx)("input",{type:"file",ref:function(t){t&&(e=function(){s(!0),t.click()})},onChange:function(e){e&&e.target&&e.target.files&&r(Array.from(e.target.files))}}),n]})}}]),n}(s.Component),M=f.a.div(N||(N=Object(a.a)(["\n    width: ","px;\n    height: ","px;\n    padding: 10px;\n    border: 5px dashed #009edf;\n\n    input {\n        display: none;\n    }\n"])),210,297),W=n(43);function G(e){return new Promise((function(t,n){var r=new FileReader;r.addEventListener("loadend",(function(e){return t(e.target.result)})),r.addEventListener("error",n),r.readAsArrayBuffer(e)}))}function z(e){return L.apply(this,arguments)}function L(){return(L=Object(j.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Uint8Array,e.next=3,G(t);case 3:return e.t1=e.sent,e.abrupt("return",new e.t0(e.t1));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var V=n(97);function J(e){return Object(V.a)(e).map((function(e){return e.toString(16).padStart(2,"0")})).join("")}function q(e){return Y.apply(this,arguments)}function Y(){return(Y=Object(j.a)(b.a.mark((function e(t){var n,r,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return null,32,n=Object(W.blake2bInit)(32,null),e.t0=W.blake2bUpdate,e.t1=n,e.next=7,z(t);case 7:return e.t2=e.sent,(0,e.t0)(e.t1,e.t2),r=Object(W.blake2bFinal)(n),a=J(r),e.abrupt("return",a);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Z,$=function(){function e(){Object(C.a)(this,e),this.name=void 0,this.title=void 0,this.dataTitles={hash:"Current block hash"},this.ttl=-1}return Object(H.a)(e,[{key:"getData",value:function(){var e=Object(j.a)(b.a.mark((function e(){var t,n,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.blockcypher.com/v1/".concat(this.name.toLowerCase(),"/main"));case 2:return t=e.sent,e.next=5,t.json();case 5:if(!(n=e.sent).error){e.next=8;break}throw new Error(n.error);case 8:return r=n.hash,e.abrupt("return",{hash:r});case 10:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),Q=function(e){Object(U.a)(n,e);var t=Object(R.a)(n);function n(){var e;Object(C.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).name="BTC",e.title="Bitcoin",e}return n}($),_=function(){function e(){Object(C.a)(this,e),this.name="DATE",this.title="Current",this.ttl=1,this.dataTitles={date:"date",time:"time"}}return Object(H.a)(e,[{key:"getData",value:function(){var e=new Date;return{date:"".concat(e.getUTCFullYear(),"-").concat(("0"+e.getUTCMonth()).slice(-2),"-").concat(("0"+e.getUTCDate()).slice(-2)),time:"".concat(("0"+e.getUTCHours()).slice(-2),":").concat(("0"+e.getUTCMinutes()).slice(-2),":").concat(("0"+e.getUTCSeconds()).slice(-2))}}}]),e}(),K=function(e){Object(U.a)(n,e);var t=Object(R.a)(n);function n(){var e;Object(C.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).name="ETH",e.title="Ethereum",e}return n}($),X=function(e){Object(U.a)(n,e);var t=Object(R.a)(n);function n(){var e;Object(C.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).name="LTC",e.title="Litecoin",e}return n}($),ee=n(95),te=n.n(ee),ne=function(){function e(){Object(C.a)(this,e),this.name="NYTIMES",this.title="The New York Times",this.ttl=-1,this.dataTitles={firstTitle:"first title"}}return Object(H.a)(e,[{key:"getData",value:function(){var e=Object(j.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new te.a,e.next=3,t.parseURL("https://rss.nytimes.com/services/xml/rss/nyt/World.xml");case 3:return n=e.sent,e.abrupt("return",{firstTitle:n.items[0].title});case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}();function re(e){return ae.apply(this,arguments)}function ae(){return(ae=Object(j.a)(b.a.mark((function e(t){var n,r,a,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.script,r=JSON.stringify(n.trim()).split("^\n").join("\n").split("\n\n").join("\n"),e.next=4,fetch("http://assembler.sigmastamp.ml:14747/compile",{method:"POST",body:r,headers:{"Content-Type":"application/json"}});case 4:return a=e.sent,e.next=7,a.json();case 7:if(!1!==(c=e.sent).success){e.next=10;break}throw new Error("Failed to compile Ergo script:\n".concat(c.detail));case 10:return e.abrupt("return",c);case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ce(e){return se.apply(this,arguments)}function se(){return(se=Object(j.a)(b.a.mark((function e(t){var n,r,a,c,s,i,o,u,p;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t.script);case 2:return n=e.sent,e.next=5,n.text();case 5:r=e.sent,a=Object(d.a)(Object.entries(t).filter((function(e){return"script"!==Object(m.a)(e,1)[0]}))),e.prev=7,a.s();case 9:if((c=a.n()).done){e.next=17;break}if(s=Object(m.a)(c.value,2),i=s[0],o=s[1],1!==(u=r.split("$".concat(i))).length){e.next=14;break}throw new Error('Could not find param "'.concat(i,'" in the script "').concat(t.script,'"'));case 14:r=u.join(o);case 15:e.next=9;break;case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(7),a.e(e.t0);case 22:return e.prev=22,a.f(),e.finish(22);case 25:if(!(p=r.match(/\$[a-zA-Z0-9]+/g))){e.next=28;break}throw new Error("Missing params ".concat(p.map((function(e){return'"'.concat(e.substring(1),'"')})).join(", "),' for the script "').concat(t.script,'".'));case 28:return e.abrupt("return",{script:r});case 29:case"end":return e.stop()}}),e,null,[[7,19,22,25]])})))).apply(this,arguments)}function ie(){return oe.apply(this,arguments)}function oe(){return(oe=Object(j.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",0);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ue(e){return pe.apply(this,arguments)}function pe(){return(pe=Object(j.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",!0);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function fe(e){return le.apply(this,arguments)}function le(){return(le=Object(j.a)(b.a.mark((function e(t){var n,r,a,c,s,i,o,u,p,f,l,d,h,m,x,v,O,g,w,y,k,T,S;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.userAddress,r=t.documentHashInBase64,a=t.documentHashInHex,e.next=3,ue(n);case 3:if(e.sent){e.next=5;break}throw new Error('User address "'.concat(n,'" is not correct.'));case 5:return c=2e7,s=1e8,i=1e8,o="3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV",u="Ad4=",p=1e7,f="3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV",e.next=14,ie();case 14:return e.t0=e.sent,l=e.t0+10,console.log(JSON.stringify({ergsSendTogetherWithNFT:s,userAddress:n,ergsFeeForSigmaStampService:i,sigmaStampProviderAddress:o,assetTypeValue:u,documentHashInBase64:r,returnTransactionFee:p,sigmaStampAssemblerNodeAddr:f,refundHeightThreshold:l})),e.next=19,ce({script:"/scripts/sigmastamp-nft.scala",ergsSendTogetherWithNFT:s,userAddress:n,ergsFeeForSigmaStampService:i,sigmaStampProviderAddress:o,assetTypeValue:u,documentHashInBase64:r,returnTransactionFee:p,sigmaStampAssemblerNodeAddr:f,refundHeightThreshold:l});case 19:return d=e.sent,h=d.script,console.log(h),e.next=24,re({script:h});case 24:return m=e.sent,x=m.address,v=s+i+c,O="e20".concat(a),g="0e61".concat("http://sigmastamp.ml/verify?hash=a16d5705c031866f5c5dd1ba39e43538193b45718af5a50a115e1c8d67c209cd"),w={address:x,returnTo:n,startWhen:{erg:v},txSpec:{requests:[{ergValue:s,address:n,name:"SigmaStampNFT",amount:1,decimals:0,description:"Proof of existence of document with Blake2b-256 hash specified in R8 register during minting of this NFT token.",registers:{R7:"0e0201de",R8:O,R9:g}},{value:i,address:o}],fee:c,inputs:["$userIns"],dataInputs:[]}},e.next=32,fetch("http://assembler.sigmastamp.ml:14747/follow",{method:"POST",body:JSON.stringify(w)});case 32:return y=e.sent,e.next=35,y.json();case 35:return k=e.sent,T=k.id,S=k.dueTime,e.abrupt("return",{amount:v/1e9,address:x,dueTime:S,getStatus:function(){return Object(j.a)(b.a.mark((function e(){var t,n,r,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=fetch("http://assembler.sigmastamp.ml:14747/result/".concat(T)),e.next=3,y.json();case 3:if(n=e.sent,r=k.tx,a=k.detail,console.log({watchResponse:t,watchResponseBody:n,tx:r}),"success"!==a){e.next=8;break}return e.abrupt("return",!0);case 8:return e.abrupt("return",!1);case 9:case"end":return e.stop()}}),e)})))()}});case 38:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var de=[new Q,new K,new X,new _,new ne];function he(){var e=Object(s.useState)({files:[]}),t=Object(m.a)(e,2),n=t[0],r=t[1],a=Object(s.useState)(null),c=Object(m.a)(a,2),i=c[0],o=c[1];return i?Object(w.jsx)(F,Object(l.a)({},i)):Object(w.jsxs)(je,{children:[0===n.files.length?Object(w.jsx)(B,{onFiles:function(){var e=Object(j.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r({files:t});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),clickable:!0,children:"Upload your file(s) here!"}):Object(w.jsxs)(I,{createUi:function(e){var t=e.createPdf;return Object(w.jsx)("button",{onClick:Object(j.a)(b.a.mark((function e(){var r,a,c,s,i,u,p,f,l;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=File,e.next=3,t();case 3:e.t1=e.sent,e.t2=[e.t1],r=new e.t0(e.t2,"certificate1.pdf"),a=new O.a,c=Object(d.a)(n.files);try{for(c.s();!(s=c.n()).done;)i=s.value,a.file(i.name,i)}catch(h){c.e(h)}finally{c.f()}return a.file(r.name,r),e.next=12,a.generateAsync({type:"blob"});case 12:return u=e.sent,e.next=15,q(u);case 15:if(p=e.sent,Object(x.saveAs)(u,"certificate1.".concat(p.substring(0,5),".zip")),f=prompt("Please fill your Ergo address","3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV")){e.next=20;break}return e.abrupt("return");case 20:return e.next=22,fe({userAddress:f,documentHashInBase64:p,documentHashInHex:p});case 22:l=e.sent,o(l);case 24:case"end":return e.stop()}}),e)}))),children:"Download 1st certificate"})},children:[n.files.map((function(e){return Object(w.jsx)(S,{content:Object(j.a)(b.a.mark((function t(){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,q(e);case 2:return n=t.sent,t.abrupt("return",Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("b",{children:["Hash of ",e.name]})," is ",n]}));case 4:case"end":return t.stop()}}),t)})))},e.name)})),de.map((function(e){return Object(w.jsx)("div",{children:Object(w.jsx)(S,{content:Object(j.a)(b.a.mark((function t(){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getData();case 2:return n=t.sent,t.abrupt("return",Object(w.jsx)(w.Fragment,{children:Object.entries(n).map((function(t){var n=Object(m.a)(t,2),r=n[0],a=n[1];return Object(w.jsxs)("div",{children:[Object(w.jsxs)("b",{children:[e.title,e.dataTitles[r],":"]}),a]},r)}))}));case 4:case"end":return t.stop()}}),t)})))})},e.name)}))]}),Object(w.jsx)(g.a,{to:"/verify",target:"_blank",children:"Or verify your 1st certificate."})]})}var be,je=f.a.div(Z||(Z=Object(a.a)(["\n    a {\n        color: #555;\n        font-size: 0.7em;\n    }\n"])));n(159);function me(e){return xe.apply(this,arguments)}function xe(){return(xe=Object(j.a)(b.a.mark((function e(t){var n,r,a,c,s,i;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api-testnet.ergoplatform.com/api/v0/assets/issuingBoxes");case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.next=8,q(t);case 8:a=e.sent,c=Object(d.a)(r.items),e.prev=10,c.s();case 12:if((s=c.n()).done){e.next=18;break}if((i=s.value).additionalRegisters.R8!=="0e20".concat(a)){e.next=16;break}return e.abrupt("return",i);case 16:e.next=12;break;case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(10),c.e(e.t0);case 23:return e.prev=23,c.f(),e.finish(23);case 26:return e.abrupt("return",null);case 27:case"end":return e.stop()}}),e,null,[[10,20,23,26]])})))).apply(this,arguments)}function ve(e){return Oe.apply(this,arguments)}function Oe(){return(Oe=Object(j.a)(b.a.mark((function e(t){var n,r,a,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api-testnet.ergoplatform.com/api/v0/transactions/".concat(t));case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,console.log("getTransactionTime",r),a=r.summary.timestamp,c=r.outputs[0].assets[0].tokenId,e.abrupt("return",{timestamp:a,tokenId:c});case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ge(e){return we.apply(this,arguments)}function we(){return(we=Object(j.a)(b.a.mark((function e(t){var n,r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api-testnet.ergoplatform.com/api/v0/addresses/assetHolders/".concat(t));case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,console.log("getAssetHolders",r),e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ye(){var e=Object(s.useState)([]),t=Object(m.a)(e,2),n=t[0],r=t[1],a=Object(s.useState)(null),c=Object(m.a)(a,2),i=c[0],o=c[1];return i?Object(w.jsxs)(I,{createUi:function(e){var t=e.createPdf;return Object(w.jsx)("button",{onClick:Object(j.a)(b.a.mark((function e(){var r,a,c,s,i,o,u;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=File,e.next=3,t();case 3:e.t1=e.sent,e.t2=[e.t1],r=new e.t0(e.t2,"certificate2.pdf"),a=new O.a,c=Object(d.a)(n);try{for(c.s();!(s=c.n()).done;)i=s.value,a.file(i.name,i)}catch(p){c.e(p)}finally{c.f()}return a.file(r.name,r),e.next=12,a.generateAsync({type:"blob"});case 12:return o=e.sent,e.next=15,q(o);case 15:u=e.sent,saveAs(o,"certificate2.".concat(u.substring(0,5),".zip"));case 17:case"end":return e.stop()}}),e)}))),children:"Download 2nd certificate"})},children:[Object(w.jsx)("b",{children:"txId:"})," ",i.txId,Object(w.jsx)("br",{}),Object(w.jsx)("b",{children:"timestamp:"})," ",i.timestamp,Object(w.jsx)("br",{}),Object(w.jsx)("b",{children:"tokenId:"})," ",i.tokenId,Object(w.jsx)("br",{}),Object(w.jsx)("b",{children:"hodlers:"})," ",i.hodlers.join(", ")]}):Object(w.jsxs)(Te,{children:[Object(w.jsx)(B,{onFiles:function(){var e=Object(j.a)(b.a.mark((function e(t){var n,a,c,s,i,u,p;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t[0],r([t[0]]),e.next=4,me(n);case 4:return(a=e.sent)||alert("Your 1st certificate is still not validated through Ergo blockchain."),c=a.txId,e.next=9,ve(c);case 9:return s=e.sent,i=s.timestamp,u=s.tokenId,e.next=14,ge(u);case 14:p=e.sent,o(Object(l.a)(Object(l.a)({},a),{},{timestamp:i,tokenId:u,hodlers:p})),console.log(a);case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),clickable:!0,children:"Upload your 1st certificate."}),Object(w.jsx)(g.a,{to:"/",target:"_blank",children:"Or create your 1st certificate."})]})}var ke,Te=f.a.div(be||(be=Object(a.a)(["\n    a {\n        color: #555;\n        font-size: 0.7em;\n    }\n"]))),Se=Object(c.a)(),Fe=f.a.header(ke||(ke=Object(a.a)(["\n    h1 {\n        font-size: 1em;\n    }\n"])));u.a.render(Object(w.jsxs)(i.a.StrictMode,{children:[Object(w.jsx)(Fe,{children:Object(w.jsx)("h1",{children:"\ud83d\udcdc Sigmastamp"})}),Object(w.jsx)(p.b,{history:Se,children:Object(w.jsxs)(p.c,{children:[Object(w.jsx)(p.a,{exact:!0,path:"/",children:Object(w.jsx)(he,{})}),Object(w.jsx)(p.a,{exact:!0,path:"/verify",children:Object(w.jsx)(ye,{})})]})})]}),document.getElementById("root"))}},[[160,1,3]]]);
//# sourceMappingURL=main.5924d9d0.chunk.js.map