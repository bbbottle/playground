!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):n.pseudoterminal=e()}(this,function(){var n=function(n){if(!n)return"";var e=n.split("\n"),t=e.filter(function(n){return/^[^-\s].*/.test(n)&&""!==n}).length>0;if(1===e.length||t)return n;var o=e.map(function(n){return n.match(/^\s+/)}).filter(function(n){return n}).map(function(n){return n[0]}),r=Math.min.apply(null,o.map(function(n){return n.length})),i=e.map(function(n){return n.slice(r)}).join("\n");return i.startsWith("\n")?i.replace("\n",""):i},e=function(n){var e=document.createElement("div");return e.innerHTML=n,e.childNodes},t={createNodesFrom:e,Trim:n,injectCSS:function(t){var o=document.getElementsByTagName("head")[0],r=o.querySelector("style");r||((r=o.appendChild(document.createElement("style"))).type="text/css"),r.appendChild(e(n(t))[0])},completionWith:function(n){return function(e,t){return String(n).repeat(String(t).length-String(e).length)+e}},loadingText:function(n){var e,t=["-","\\","|","/"],o=0;return function(r,i){r?e=setInterval(function(){o++,i?i.innerHTML=t[o%4]:n(t[o%4])},80):(i&&i.remove(),clearInterval(e))}}};function o(n,e){function o(n,t,o){l=t.value.split("");var r=t.selectionStart===l.length,i=r&&t.selectionStart===t.selectionEnd&&e.blink,a=r?e.cursorColor:"unset",s='<span class="'+(i&&"blink")+'" style="color: rgba(0,0,0,0); background: '+(i?a:"unset")+'">&nbsp;</span>';c=l.map(function(n,e){return[n,(o=e,o>=t.selectionStart&&o<=t.selectionEnd?"cursor":"char")];var o}),n.innerHTML=c.map(function(n){return function(n,t){void 0===t&&(t="char");var o,r,i=" "===n,a="cursor"===t,l=a&&u.selectionStart===u.selectionEnd&&e.blink,c="rgba(0,0,0,0)";return r=a?u.selectionStart!==u.selectionEnd?e.selectionColor:e.cursorColor:"unset",o=a?i?c:"unset"===e.backgroundColor?"#000":e.backgroundColor:i?c:e.color,'<span class="'+t+" "+(l&&"blink")+'" style="color: '+o+"; background: "+r+'" >'+(i?"&nbsp;":n)+"</span>"}.apply(void 0,n)}).join("")+s}function r(n,t){var r,f,p,m,h;e=Object.assign({color:"#000",backgroundColor:"#fff",cursorColor:"#000",fontSize:"16px",fontFamily:"monospace",selectionColor:"blue",readOnly:!1,autoFocus:!1,blink:!0},e),r=n,a=document.getElementById(r)||!1,t||(u=function(n){var t=document.getElementById("mapWith"+n);if(t)return t;var o=document.createElement("input");return o.style.height="20px",o.style.position="fixed",o.style.outline="none",o.style.border="none",o.style.opacity=0,o.setAttribute("autocomplete","off"),o.id="mapWith"+n,e.readOnly&&(o.setAttribute("readonly",!0),o.onfocus=function(){o.blur()}),e.autoFocus&&(o.onblur=function(){o.focus()}),document.body.appendChild(o)}(n)),u.value="",l=[],c=[],d(n),(f=a).style.fontFamily=e.fontFamily,f.style.fontSize=e.fontSize||"16px",f.style.backgroundColor=e.backgroundColor||"#fff",f.style.color=e.color||"#000",o(a,u),m=function(){return o(a,u)},(p=u).onkeyup=function(n){var t=["ArrowLeft","ArrowRight","Home","End"].includes(n.code),o=n.ctrlKey&&"KeyA"===n.code,r="Enter"===n.code;(t||o)&&m&&m(n),r&&e.onEnter&&e.onEnter(p.value)},h=function(n){return e=n,u.selectionStart=u.selectionEnd=e,i(),void o(a,u);var e},a.addEventListener("click",function(n){h(Array.from(a.children).indexOf(n.target),n.target)}),u.oninput=function(n){e.onChange&&e.onChange(n.target.value),o(a,n.target)},u.addEventListener("keydown",function(n){"Tab"===n.code&&(n.preventDefault(),u.value=function(n){if(!s)return n;var e=n.split(/\s+/).pop(),t=s.filter(function(n){return n.startsWith(e)});return 1!==t.length?n:n.replace(new RegExp(e+"$"),t[0])}(u.value),o(a,u))},!1),u.focus(),e.disableAutoFocus||(u.onblur=u.focus)}function i(){u.focus()}var a,u,l,c,s;function d(n){var e=document.getElementById(n).getBoundingClientRect();u.style.top=e.y,u.style.left=e.x}return r(n),t.injectCSS("\n            @keyframes blink {\n              from {\n                 background: "+(e.cursorColor||"#fff")+";\n                 color: "+e.backgroundColor+";\n              }\n\n              to {\n                 background: none;\n                 color: "+e.color+";\n              }\n            }\n            \n            .blink {\n              animation-duration: 1s;\n              animation-name: blink;\n              animation-iteration-count: infinite\n            }\n        "),{get value(){return u.value},set value(n){u.value=n,o(a,u)},set blink(n){e.blink=n,o(a,u)},set candidates(n){if(!Array.isArray(n))return!1;s=n},set disabled(n){n?u.setAttribute("disabled",!0):u.removeAttribute("disabled")},set onEnter(n){"function"==typeof n&&(e.onEnter=n)},set onChange(n){"function"==typeof n&&(e.onChange=n)},blur:function(){u.blur(),a.innerHTML=l.join("")},focus:i,destroy:function(){u.remove()},focusOn:function(e){d(e),e===n?(this.focus(),o()):(this.blur(),r(e,!0))}}}var r=t.Trim,i=t.injectCSS,a=t.createNodesFrom;function u(n,e){function u(n,e){return this.input=n,this.output=e,this}function l(n,t){return'\n            <div class="session">\n                <div class="input">\n                    <span class="prompt">'+e.promptSign+'</span>\n                    <span class="cmd" id="cmd_'+(t||Math.random())+'">\n                        '+(n.input||"")+'\n                    </span>\n                </div>\n                <div class="output">\n                    <pre>'+(n.output||"")+"</pre>\n                </div>\n            </div>"}function c(n,e){var t=a(e)[1];return n.appendChild(t)}function s(n){return n.getElementsByClassName("cmd")[0]}function d(n){if(b.focus(),!(T<0)){switch(n){case"forwards":T<L.length-1&&(T+=1);break;case"backwards":T>0&&(T-=1)}return T}}function f(n,e){for(var t=[],o=arguments.length-2;o-- >0;)t[o]=arguments[o+2];var i,a=x.lastChild.querySelector(".output"),u=a.lastElementChild;switch((i=a.classList).add.apply(i,t),e){case"append":return u.insertAdjacentHTML("afterend","<pre>"+r(n)+"</pre>"),a.lastElementChild;case"overwrite":return a.innerHTML=n,a;default:u.innerHTML=r(n)}return a}function p(n){n.blink=!0,n.disabled=!1;var e=s(c(x,l(new u))).id;n.focusOn(e),h(x),A="AVAILABLE"}function m(n){void 0===n&&(n=""),A="BUSY",n&&(L.push(n),T=L.length-1);var e=n.trim().split(/\s+/),o=e[0],r=e.slice(1);if(o){var i=o.match(/!(\d+)/);if(i){var a=L[Number(i[1])-1];m.apply(void 0,[a].concat(a.split(/\s+/)))}else{if(Object.keys(j).includes(o)){var u,l=j[o].handler||j[o],c=j[o].shortopts,s=(j[o].usage||"").replace(/</g,"&lt;"),d={cmdName:o,output:f,next:function(){return p(b)},loading:t.loadingText(f)},h=function(n){f(n+(s?"\n\n":"")),c&&f(s||"","append"),d.next()};if(c)try{u=function(n,e){if(e.length<1)throw"option required";for(var t={};e.length>0&&e[0].startsWith("-")&&"-"!==e[0];){if("--"===e[0]){e=e.slice(1);break}if(e[0].startsWith("--"))throw"can't recognize long option";var o;t=(o=r(t,e[0].slice(1),n,e.slice(1)))[0],e=o[1]}function r(n,e,t,o){for(;""!==e;){var r=e[0];if(e=e.slice(1),i(r,t)){if(""===e){if(o.length<1)throw"option '-"+r+"' requires argument";e=o[0],o=o.slice(1)}n[r]=e,e=""}else n[r]=!0}return[n,o]}function i(n,e){var t=e.split(""),o=t.indexOf(n);if(o<0)throw"option '-"+n+"' not recognized";return o>=0&&":"===t[o+1]}return t}(c,r)}catch(n){h(n)}Promise.resolve(l(d,c?u:r)).catch(h)}else f("\n                Command not found. input 'help' for more information."),p(b)}}else p(b)}function h(t){var o=document.querySelector("#"+n);if(e.showScrollbar)o.scrollTop=o.scrollHeight-o.clientHeight;else{var r=o.offsetHeight,i=t.offsetHeight-r;t.style.top=i<0?0:-1*i+"px"}}function v(n){x.style.top=n+"px"}function y(e,t){void 0===t&&(t=50);var o=document.querySelector("#"+n).offsetHeight,r=x.offsetHeight-o;if(r<0)return!1;var i=[-1*r,0],a=Number(x.style.top.replace("px",""));if(a<i[0])return v(i[0]),!0;if(a>i[1])return v(i[1]),!0;switch(e){case"up":a!==i[1]&&v(a+t);break;case"down":a!==i[0]&&v(a-t)}}function g(){x.remove(),b.destroy()}void 0===e&&(e={});var b,C,w,k,S,E,x=(k=function(n){var e=document.getElementById("under_"+n);if(e)return e;var t=document.createElement("div"),o=document.getElementById(n);return t.id="under_"+n,o.appendChild(t)}(n),(e=Object.assign({showScrollbar:!1,width:"700px",height:"300px",bgColor:"#fff",color:"#000",promptSign:"$",fontFamily:'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',inputSelectionColor:"blue",fontSize:"12px",readOnly:!1,autoFocus:!1},e)).showScrollbar||(S=y,document.querySelector("#"+n).addEventListener("wheel",function(n){var e=n.deltaY>0?"down":"up";S(e,Math.abs(n.deltaY))},{passive:!0})),function(n){if(n.childNodes.length>0)return!1;var t=s(c(n,l(new u))).id;(b=o(t,{color:e.color,backgroundColor:"unset",fontFamily:e.fontFamily,fontSize:e.fontSize,readOnly:e.readOnly,cursorColor:e.cursorColor||e.color,selectionColor:e.inputSelectionColor,disableAutoFocus:!0})).onEnter=function(n){b.blur(),m(n)}}(k),E={ArrowUp:function(){b.value=L[d("backwards")]||""},ArrowDown:function(){b.value=L[d("forwards")]||""}},document.addEventListener("keydown",function(n){b.focus(),h(x)}),document.addEventListener("keyup",function(n){var e=E[n.code];e&&"function"==typeof e&&e(n)}),w=(C=k).id,i("\n            #"+n+" {\n                position: relative;\n                width: "+e.width+";\n                height: "+e.height+";\n                background: "+e.bgColor+";\n                color: "+e.color+";\n                overflow: hidden;\n                overflow-y: "+(e.showScrollbar?"auto":"hidden")+";\n            }\n            #"+w+" {\n                position: "+(e.showScrollbar?"unset":"absolute")+";\n                top: 0;\n                transition: all .2s;\n                width: 100%;\n                word-wrap: break-word;\n                font-family: "+e.fontFamily+";\n                font-size: "+e.fontSize+";\n            }\n            \n            .session {\n                margin-bottom: 10px;\n            }\n            \n            .output {padding: 5px 0}\n            \n            .output > pre {\n                margin: 0;\n                line-height: 1.2;\n                font-family: "+e.fontFamily+";\n            }\n        "),C),A="AVAILABLE",L=[],T=-1,j={help:function(n){var e=Object.entries(j).filter(function(n){return"addByUser"===n[1].type}).map(function(n){return n[0]}).join("\n");n.output('\n            <a href="https://github.com/zjhou/pseudoTerminal">PseudoTerminal</a>, Version 0.0.1 (c) zjhou. These commands are defined internally:\n\n            help          see this help information\n            exit          destroy the terminal\n            clear         clear the screen\n            history       view history commands\n            man           see commands\' manual\n            \n            '),e&&n.output("These commands are defined by user: \n\n"+e,"append"),n.next()},clear:function(n){for(;x.firstChild;)x.removeChild(x.firstChild);n.next()},history:function(n){var e=L.length;n.output(L.map(function(n,o){return t.completionWith(" ")(o+1,e)+"  "+n}).join("\n")),n.next()},exit:g,man:function(n,e){var t,o=e[0];if((t=e)&&1===t.length)if(Object.keys(j).includes(o)){var r=j[o];"addByUser"===r.type?(n.output(r.usage?r.usage:'No manual entry for "'+o+'"'),n.next()):(n.output('No manual entry for "'+o+'"'),n.next())}else n.output('No manual entry for "'+o+'"'),n.next();else n.output("Usage: man &lt;command&gt;"),n.next()}};return{set candidates(n){Array.isArray(n)&&(b.candidates=n)},set freeze(n){b.disabled=n},set oninput(n){"function"==typeof n&&(b.onChange=n)},get currentInput(){return b.value},set currentInput(n){"string"==typeof n&&(h(x),b.value=n)},get commands(){return Object.entries(j).map(function(n){return n[0]})},addCommand:function(n,e){var t=n&&e.handler&&"function"==typeof e.handler;return e.type="addByUser",t&&(j[n]=e),this},get isAvailable(){return"AVAILABLE"===A&&!b.value},execCommand:function(n){if("AVAILABLE"===A)return b.blink=!1,b.value=n,h(x),m(n)},destroy:g}}return window.PseudoTerminal=u,u});
//# sourceMappingURL=pseudoterminal.umd.js.map
