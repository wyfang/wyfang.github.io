var AvatarProceduralEngine=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=(e,t)=>Math.sign(e)*Math.abs(e)**t,n=(e,n,r,i,a,o,s)=>{let c=t(Math.cos(n),o);return[r/2*c*t(Math.sin(e),s),i/2*t(Math.sin(n),o),a/2*c*t(Math.cos(e),s)]},r=(e,t,n)=>{let r=e.width/2,i=e.depth/2,a=Math.min(r,e.height/2),o=Math.max(0,(e.height-a*2)/2),s=o*2+Math.PI*a,c=(n+Math.PI/2)/Math.PI*s,l=r,u=0;if(c<Math.PI*a/2){let e=-Math.PI/2+c/a;l=r*Math.cos(e),u=-o+a*Math.sin(e)}else if(c<=Math.PI*a/2+o*2)u=-o+c-Math.PI*a/2;else{let e=(c-Math.PI*a/2-o*2)/a;l=r*Math.cos(e),u=o+a*Math.sin(e)}let d=r?i/r:1;return[l*Math.sin(t),u,l*d*Math.cos(t)]},i=e=>Math.max(0,Math.min(2,e??0)),a=e=>1+i(e.roundness)/2,o=.04,s=e=>e.roundness<=0?1/0:2/(o+i(e.roundness)/2*.96),c=(e,t,n,r)=>{let i=Math.cos(n)*Math.sin(t),a=Math.sin(n),o=Math.cos(n)*Math.cos(t),s=Number.isFinite(r)?(Math.abs(i)**r+Math.abs(a)**r+Math.abs(o)**r)**(1/r)||1:Math.max(Math.abs(i),Math.abs(a),Math.abs(o))||1;return[e.width/2*(i/s),e.height/2*(a/s),e.depth/2*(o/s)]},l=(e,t,n)=>c(e,t,n,a(e)),u=(e,t,n)=>c(e,t,n,s(e)),d=.24,f=.2,p=.22,m=e=>i(e.morphRoundness)/2,h=(e,t,n)=>{let r=m(e),i=Math.max(0,Math.min(1,t)),a=Math.sin(i*Math.PI),o=(1-Math.cos(i*Math.PI))/2;return{radiusScale:n.radiusScale+(a-n.radiusScale)*r,verticalProgress:n.verticalProgress+(o-n.verticalProgress)*r}},g=(e,t,n,r,i)=>{let a=1-i;return a**3*e+3*a*a*i*t+3*a*i*i*n+i**3*r},_=e=>({tipFraction:(e.tipRoundness??0)*d,baseFraction:(e.baseRoundness??0)*f}),v=(e,t)=>{let n=Math.max(0,Math.min(1,t)),r=e.roundness*p;if(r<=0)return{radiusScale:1,verticalProgress:(Math.sin((n-.5)*Math.PI)+1)/2};if(n<r){let e=-Math.PI/2+n/r*(Math.PI/2);return{radiusScale:1-r+r*Math.cos(e),verticalProgress:(r+r*Math.sin(e))/2}}if(n>1-r){let e=(n-(1-r))/r*(Math.PI/2);return{radiusScale:1-r+r*Math.cos(e),verticalProgress:1-r/2+r*Math.sin(e)/2}}let i=(n-r)/(1-r*2);return{radiusScale:1,verticalProgress:r/2+i*(1-r)}},y=(e,t)=>h(e,t,v(e,t)),b=(e,t,n)=>{let r=Math.max(0,Math.min(1,t)),i=0,a=1;for(let t=0;t<14;t+=1){let t=(i+a)/2;n(e,t).verticalProgress<r?i=t:a=t}return n(e,(i+a)/2).radiusScale},x=(e,t)=>{let n=Math.max(0,Math.min(1,t)),{tipFraction:r,baseFraction:i}=_(e);if(i>0&&n<i){let e=n/i;return{radiusScale:g(1-i,1,1-i/2,1-i,e),verticalProgress:g(0,0,i/2,i,e)}}if(r>0&&n>1-r){let e=(n-(1-r))/r;return{radiusScale:g(r,r/2,r/4,0,e),verticalProgress:g(1-r,1-r/2,1,1,e)}}return{radiusScale:1-n,verticalProgress:n}},S=(e,t)=>h(e,t,x(e,t)),C=e=>{let t=e.height*.36,n=e.height-t;return{coneApexY:-e.height/2,coneBaseY:-e.height/2+t,bodyHeight:n,bodyCenterY:e.height/2-n/2,bodyWidth:e.width*.54,bodyDepth:e.depth*.62}},w=(e,t,i)=>{let{width:a,height:o,depth:s}=e;switch(e.type){case`sphere`:case`mickey`:return n(t,i,a,o,s,1,1);case`cube`:return u(e,t,i);case`cylinder`:{let n=y(e,(i+Math.PI/2)/Math.PI);return[a/2*n.radiusScale*Math.sin(t),-o/2+o*n.verticalProgress,s/2*n.radiusScale*Math.cos(t)]}case`cursor`:{let n=C(e),r=(i+Math.PI/2)/Math.PI,a=v({...e,width:n.bodyWidth,height:n.bodyHeight,depth:n.bodyDepth},r);return[n.bodyWidth/2*a.radiusScale*Math.sin(t),n.bodyCenterY-n.bodyHeight/2+n.bodyHeight*a.verticalProgress,n.bodyDepth/2*a.radiusScale*Math.cos(t)]}case`diamond`:return l(e,t,i);case`capsule`:return r(e,t,i);case`cone`:{let n=S(e,(i+Math.PI/2)/Math.PI);return[a/2*n.radiusScale*Math.sin(t),o/2-o*n.verticalProgress,s/2*n.radiusScale*Math.cos(t)]}}},ee=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],T=([e,t,n])=>{let r=Math.hypot(e,t,n)||1;return[e/r,t/r,n/r]},te=(e,t,n)=>{let r=e.type===`cone`?-1:1;return T([r*(t[1]*n[2]-t[2]*n[1]),r*(t[2]*n[0]-t[0]*n[2]),r*(t[0]*n[1]-t[1]*n[0])])},ne=(e,t,n)=>{let r=5e-4;if(e.type===`cone`&&n>=Math.PI/2-r)return[0,-1,0];let i=w(e,t-r,n),a=w(e,t+r,n),o=w(e,t,Math.max(-Math.PI/2,n-r)),s=w(e,t,Math.min(Math.PI/2,n+r));return te(e,ee(a,i),ee(s,o))},E=(e,t)=>Math.sign(e)*Math.abs(e)**t,D=(e,t,n)=>{let r=e.width/2||1,i=e.height/2||1,a=e.depth/2||1;return T([E(t[0]/r,n-1)/r,E(t[1]/i,n-1)/i,E(t[2]/a,n-1)/a])},re=(e,t)=>D(e,t,a(e)),ie=(e,t)=>{let n=s(e);if(Number.isFinite(n))return D(e,t,n);let r=[t[0]/(e.width/2||1),t[1]/(e.height/2||1),t[2]/(e.depth/2||1)],i=r.reduce((e,t,n)=>Math.abs(t)>Math.abs(r[e])?n:e,0);return[i===0?Math.sign(r[0]):0,i===1?Math.sign(r[1]):0,i===2?Math.sign(r[2]):0]},ae=(e,t,n,r,i)=>{let a=e.width/2||1,o=e.height/2||1,s=e.depth/2||1;if(!Number.isFinite(r)){let r=[Math.max(-a,Math.min(a,t)),Math.max(-o,Math.min(o,n)),s];return{point:r,normal:i(e,r)}}let c=Math.max(-1,Math.min(1,n/o)),l=Math.max(0,1-Math.abs(c)**r)**(1/r),u=Math.max(-a*l,Math.min(a*l,t)),d=u/a,f=Math.max(0,1-Math.abs(d)**r-Math.abs(c)**r)**(1/r),p=[u,c*o,s*f];return{point:p,normal:i(e,p)}},oe=(e,t,n,r,i,a=0)=>{let o=t-a,s=Math.max(0,1-(e/(n||1))**2-(o/(r||1))**2),c=i*Math.sqrt(s);return{point:[e,t,c],normal:T([e/(n*n||1),o/(r*r||1),c/(i*i||1)])}},O=(e,t,n,r,i)=>{let a=e.width/2||1,o=e.depth/2||1,s=Math.max(0,Math.min(1,.5+i*(n/e.height))),c=b(e,s,r),l=a*c,u=o*c,d=Math.max(-l,Math.min(l,t)),f=l>0?Math.max(0,1-(d/l)**2):0,p=u*Math.sqrt(f),m=1e-4,h=Math.max(0,s-m),g=Math.min(1,s+m),_=b(e,h,r),v=(b(e,g,r)-_)/(g-h||1),y=Math.max(Math.sqrt(f),1e-4),x=-(o/a)*d/(l*y||1),S=i*o*v/(e.height*y||1);return{point:[d,n,p],normal:T([-x,-S,1])}},se=(e,t,n)=>{let r=e.width/2||1,i=e.height/2||1,o=e.depth/2||1;switch(e.type){case`sphere`:case`mickey`:return oe(t,n,r,i,o);case`cube`:return ae(e,t,n,s(e),ie);case`capsule`:{let e=Math.min(r,i),a=Math.max(0,i-e);return oe(t,n,r,e,o,n<-a?-a:n>a?a:n)}case`cylinder`:return O(e,t,n,y,1);case`cursor`:{let r=C(e),i=O({...e,width:r.bodyWidth,height:r.bodyHeight,depth:r.bodyDepth},t,n-r.bodyCenterY,v,1);return{point:[i.point[0],i.point[1]+r.bodyCenterY,i.point[2]],normal:i.normal}}case`cone`:return O(e,t,n,S,-1);case`diamond`:return ae(e,t,n,a(e),re)}},ce=(e,t,n)=>{let r=w(e,t,n);if(e.type===`sphere`||e.type===`mickey`){let t=e.width/2||1,n=e.height/2||1,i=e.depth/2||1;return{point:r,normal:T([r[0]/(t*t),r[1]/(n*n),r[2]/(i*i)])}}return e.type===`cylinder`&&e.roundness<=0&&(e.morphRoundness??0)<=0?{point:r,normal:T([Math.sin(t)/(e.width/2||1),0,Math.cos(t)/(e.depth/2||1)])}:e.type===`diamond`?{point:r,normal:re(e,r)}:e.type===`cube`?{point:r,normal:ie(e,r)}:{point:r,normal:ne(e,t,n)}},k=620,A=14,le=[`headX`,`headY`,`headZ`,`widthLeft`,`widthRight`,`heightLeft`,`heightRight`,`spacing`,`positionXLeft`,`positionXRight`,`positionYLeft`,`positionYRight`,`leftAngle`,`rightAngle`,`perspective`],j=e=>e*Math.PI/180,M=([e,t,n,r])=>{let i=Math.hypot(e,t,n,r)||1;return[e/i,t/i,n/i,r/i]},ue=([e,t,n,r],[i,a,o,s])=>M([e*i-t*a-n*o-r*s,e*a+t*i+n*s-r*o,e*o-t*s+n*i+r*a,e*s+t*o-n*a+r*i]),N=([e,t,n],r)=>{let i=r/2,a=Math.sin(i);return M([Math.cos(i),e*a,t*a,n*a])},P=(e,t,n)=>{let r=N([1,0,0],e),i=N([0,1,0],t);return ue(ue(N([0,0,1],n),r),i)},F=([e,t,n,r],[i,a,o])=>{let s=2*(n*o-r*a),c=2*(r*i-t*o),l=2*(t*a-n*i);return[i+e*s+(n*l-r*c),a+e*c+(r*s-t*l),o+e*l+(t*c-n*s)]},de=(e,t)=>{let n=e/2,r=t/2,i=Math.min(r,n),a=[],o=(e,t)=>{let n=Math.max(2,Math.ceil(Math.hypot(t[0]-e[0],t[1]-e[1])/1.5));for(let r=0;r<n;r+=1){let i=r/n;a.push([e[0]+(t[0]-e[0])*i,e[1]+(t[1]-e[1])*i])}},s=(e,t,n)=>{for(let r=0;r<A;r+=1){let o=n+r/A*(Math.PI/2);a.push([e+Math.cos(o)*i,t+Math.sin(o)*i])}};return o([-n+i,-r],[n-i,-r]),s(n-i,-r+i,-Math.PI/2),o([n,-r+i],[n,r-i]),s(n-i,r-i,0),o([n-i,r],[-n+i,r]),s(-n+i,r-i,Math.PI/2),o([-n,r-i],[-n,-r+i]),s(-n+i,-r+i,Math.PI),a},I=(e,t)=>{let n=k-e[2]*t,r=Math.abs(n)<1e-4?k/1e-4:k/n;return[e[0]*r,e[1]*r,e[2]]},L=(e,t=!0)=>e.length?`M${e[0][0].toFixed(2)} ${e[0][1].toFixed(2)}${e.slice(1).map(e=>`L${e[0].toFixed(2)} ${e[1].toFixed(2)}`).join(``)}${t?`Z`:``}`:``,fe=e=>({expression:e,orientation:P(j(e.headX),j(e.headY),j(e.headZ))}),pe=24,me=25,he=73,R=144,ge=33,_e=73,z=new Map,ve=new Map,ye=new Map,B=e=>[e.type,e.width,e.height,e.depth,e.roundness,e.morphRoundness,e.tipRoundness,e.baseRoundness].map(e=>typeof e==`number`?e.toFixed(4):e).join(`:`),V=(e,t,n)=>(e.size>=pe&&e.delete(e.keys().next().value),e.set(t,n),n),be=(e,t,n)=>ce(e,t,n),H=(e,t)=>({point:I(F(e.orientation,t.point),e.expression.perspective),normal:F(e.orientation,t.normal)}),xe=(e,t)=>{let n=e/120,r=t/120;return[120*Math.cos(r)*Math.sin(n),120*Math.sin(r)]},Se=(e,t,n,r)=>{let[i,a]=xe(n,r);return H(e,se(t,i,a))},U=(e,t,n,r,i={x:0,y:0})=>{let a=e.expression,o=n<0?`Left`:`Right`,s=a[`width${o}`],c=5+(a[`height${o}`]-5)*r,l=n*a.spacing/2+a[`positionX${o}`]+i.x,u=a[`positionY${o}`]+i.y,d=j(n<0?a.leftAngle:a.rightAngle);return de(s,c).map(([n,r])=>{let i=n*Math.cos(d)-r*Math.sin(d),a=n*Math.sin(d)+r*Math.cos(d);return Se(e,t,l+i,u+a)})},Ce=e=>{let t=[],n=[];return e.forEach(({point:e,normal:r})=>{r[2]>0?n.push(e):n.length&&(t.push(n),n=[])}),n.length&&t.push(n),t.filter(e=>e.length>1).map(e=>L(e,!1)).join(``)},we=(e,t)=>{let n=B(t),r=ye.get(n);if(!r){let e=[-60,-30,0,30,60].map(e=>Array.from({length:73},(n,r)=>be(t,j(-180+r*5),j(e)))),i=Array.from({length:12},(e,t)=>-150+t*30).map(e=>Array.from({length:37},(n,r)=>be(t,j(e),j(-90+r*5))));r=V(ye,n,[...e,...i])}return r.map(t=>Ce(t.map(t=>H(e,t))))},W=e=>{let t=[...e].sort((e,t)=>e[0]-t[0]||e[1]-t[1]),n=(e,t,n)=>(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]),r=e=>{let t=[];return e.forEach(e=>{for(;t.length>=2&&n(t.at(-2),t.at(-1),e)<=0;)t.pop();t.push(e)}),t};return[...r(t).slice(0,-1),...r(t.reverse()).slice(0,-1)]},G=e=>{if(e.length<3)return L(e);let t=t=>e[(t+e.length)%e.length];return`M${e[0][0].toFixed(2)} ${e[0][1].toFixed(2)}${e.map((e,n)=>{let r=t(n-1),i=t(n+1),a=t(n+2),o=[e[0]+(i[0]-r[0])/6,e[1]+(i[1]-r[1])/6,e[2]],s=[i[0]-(a[0]-e[0])/6,i[1]-(a[1]-e[1])/6,i[2]];return`C${o[0].toFixed(2)} ${o[1].toFixed(2)} ${s[0].toFixed(2)} ${s[1].toFixed(2)} ${i[0].toFixed(2)} ${i[1].toFixed(2)}`}).join(``)}Z`},K=(e,t=7)=>e.flatMap((n,r)=>{let i=e[(r+1)%e.length],a=Math.max(1,Math.ceil(Math.hypot(i[0]-n[0],i[1]-n[1])/t));return Array.from({length:a},(e,t)=>{let r=t/a;return[n[0]+(i[0]-n[0])*r,n[1]+(i[1]-n[1])*r,n[2]+(i[2]-n[2])*r]})}),Te=e=>e.length?e.length===1?`${e[0][0].toFixed(2)} ${e[0][1].toFixed(2)}`:e.slice(0,-1).map((t,n)=>{let r=e[Math.max(0,n-1)],i=e[n+1],a=e[Math.min(e.length-1,n+2)],o=t[0]+(i[0]-r[0])/6,s=t[1]+(i[1]-r[1])/6,c=i[0]-(a[0]-t[0])/6,l=i[1]-(a[1]-t[1])/6;return`C${o.toFixed(2)} ${s.toFixed(2)} ${c.toFixed(2)} ${l.toFixed(2)} ${i[0].toFixed(2)} ${i[1].toFixed(2)}`}).join(``):``,q=(e,t)=>I(F(e.orientation,t),e.expression.perspective),J=(e,t,n)=>Array.from({length:145},(r,i)=>{let a=i/R*Math.PI*2;return[e/2*Math.sin(a),n,t/2*Math.cos(a)]}),Y=(e,t)=>{let n=B(t),r=z.get(n);return r||(r=Array.from({length:ge},(e,n)=>{let r=-Math.PI/2+n/32*Math.PI;return Array.from({length:_e},(e,n)=>w(t,-Math.PI+n/72*Math.PI*2,r))}).flat(),V(z,n,r)),G(K(W(r.map(t=>q(e,t)))))},Ee=(e,t)=>{if(t.roundness>0||(t.morphRoundness??0)>0)return Y(e,t);let n=t.height/2;return G(K(W([...J(t.width,t.depth,-n),...J(t.width,t.depth,n)].map(t=>q(e,t)))))},De=(e,t)=>{let n=C(t),r=n.bodyHeight/2;return G(K(W([...J(n.bodyWidth,n.bodyDepth,n.bodyCenterY-r),...J(n.bodyWidth,n.bodyDepth,n.bodyCenterY+r)].map(t=>q(e,t)))))},Oe=(e,t)=>{let n=C(t),r=q(e,[0,n.coneApexY,0]);return G(K(W([...J(t.width,t.depth,n.coneBaseY).map(t=>q(e,t)),r])))},ke=(e,t)=>{if((t.morphRoundness??0)>0||(t.tipRoundness??0)>0||(t.baseRoundness??0)>0)return Y(e,t);let n=q(e,[0,-t.height/2,0]),r=W([...J(t.width,t.depth,t.height/2).map(t=>q(e,t)),n]),i=r.findIndex(e=>Math.hypot(e[0]-n[0],e[1]-n[1])<.01);if(i<0)return G(r);let a=[...r.slice(i),...r.slice(0,i)].slice(1);return a.length<2?L(r):`M${n[0].toFixed(2)} ${n[1].toFixed(2)}L${a[0][0].toFixed(2)} ${a[0][1].toFixed(2)}${Te(a)}L${n[0].toFixed(2)} ${n[1].toFixed(2)}Z`},Ae=(e,t)=>{if(t.roundness>0)return Y(e,t);let n=t.width/2,r=t.height/2,i=t.depth/2;return L(W([-1,1].flatMap(e=>[-1,1].flatMap(t=>[-1,1].map(a=>[e*n,t*r,a*i]))).map(t=>q(e,t))))},je=(e,t)=>{if(t.roundness>0)return Y(e,t);let n=t.width/2,r=t.height/2,i=t.depth/2;return L(W([[-n,0,0],[n,0,0],[0,-r,0],[0,r,0],[0,0,-i],[0,0,i]].map(t=>q(e,t))))},Me=(e,t,n,r,i)=>{let a=n+i,o=Math.hypot(n-i,r*2),s=(a+o)/2,c=(a-o)/2;return s<=0||c<=0?null:{centerX:e,centerY:t,majorRadius:Math.sqrt(s),minorRadius:Math.sqrt(c),rotation:Math.atan2(r*2,n-i)/2}},X=({centerX:e,centerY:t,majorRadius:n,minorRadius:r,rotation:i})=>{let a=i*180/Math.PI,o=Math.cos(i)*n,s=Math.sin(i)*n,c=e+o,l=t+s,u=e-o,d=t-s;return`M${c.toFixed(2)} ${l.toFixed(2)}A${n.toFixed(2)} ${r.toFixed(2)} ${a.toFixed(2)} 0 1 ${u.toFixed(2)} ${d.toFixed(2)}A${n.toFixed(2)} ${r.toFixed(2)} ${a.toFixed(2)} 0 1 ${c.toFixed(2)} ${l.toFixed(2)}Z`},Z=(e,t,n=[0,0,0])=>{let r=[F(e.orientation,[1,0,0]),F(e.orientation,[0,1,0]),F(e.orientation,[0,0,1])],i=F(e.orientation,n);if(Math.abs(e.expression.perspective)<1e-4){let e=r.reduce((e,n,r)=>e+n[0]*n[0]*t[r]*t[r],0),n=r.reduce((e,n,r)=>e+n[0]*n[1]*t[r]*t[r],0),a=r.reduce((e,n,r)=>e+n[1]*n[1]*t[r]*t[r],0);return Me(i[0],i[1],e,n,a)}let a=t.map(e=>1/(e*e)),o=Array.from({length:3},(e,t)=>Array.from({length:3},(e,n)=>r.reduce((e,r,i)=>e+r[t]*a[i]*r[n],0))),s=k/e.expression.perspective,c=[-i[0],-i[1],s-i[2]],l=[o[0][0]*c[0]+o[0][1]*c[1]+o[0][2]*c[2],o[1][0]*c[0]+o[1][1]*c[1]+o[1][2]*c[2],o[2][0]*c[0]+o[2][1]*c[1]+o[2][2]*c[2]],u=c[0]*l[0]+c[1]*l[1]+c[2]*l[2]-1,d=[l[0],l[1],-s*l[2]],f=[[o[0][0],o[0][1],-s*o[0][2]],[o[1][0],o[1][1],-s*o[1][2]],[-s*o[2][0],-s*o[2][1],s*s*o[2][2]]],p=Array.from({length:3},(e,t)=>Array.from({length:3},(e,n)=>d[t]*d[n]-u*f[t][n])),m=p[0][0]*p[1][1]-p[0][1]*p[0][1];if(Math.abs(m)<1e-12)return null;let h=-(p[1][1]*p[0][2]-p[0][1]*p[1][2])/m,g=(p[0][1]*p[0][2]-p[0][0]*p[1][2])/m,_=-(p[2][2]+p[0][2]*h+p[1][2]*g);if(Math.abs(_)<1e-12)return null;let v=p[0][0]/_,y=p[0][1]/_,b=p[1][1]/_,x=v*b-y*y;return x<=0?null:Me(h,g,b/x,-y/x,v/x)},Ne=(e,t)=>{let n=Z(e,[t.width/2,t.height/2,t.depth/2]),r=t.width===t.height&&t.height===t.depth;if(n&&r){let e=(n.majorRadius+n.minorRadius)/2;return X({centerX:0,centerY:0,majorRadius:e,minorRadius:e,rotation:0})}return n?X(n):null},Pe=(e,t)=>{if(t.type!==`mickey`)return[];let n=Math.min(t.width,t.height)*.23,r=Math.min(n,t.depth*.29),i=t.width*.37,a=-t.height*.39,o=-t.depth*.12,s=[n,n,r];return[-1,1].map(t=>Z(e,s,[t*i,a,o])).filter(e=>e!==null).map(X)},Fe=(e,t)=>t.type===`mickey`?Pe(e,t):t.type===`cursor`?[Oe(e,t)]:[],Ie=e=>Array.from({length:R},(t,n)=>{let r=n/R*Math.PI*2,i=Math.cos(r)*e.majorRadius,a=Math.sin(r)*e.minorRadius;return[e.centerX+i*Math.cos(e.rotation)-a*Math.sin(e.rotation),e.centerY+i*Math.sin(e.rotation)+a*Math.cos(e.rotation),0]}),Le=e=>{if(e.length<3)return L(e);let t=e.map((t,n)=>{let r=e[(n+1)%e.length];return Math.hypot(r[0]-t[0],r[1]-t[1])}),n=[...t].sort((e,t)=>e-t),r=n[Math.floor(n.length/2)]||1,i=Math.max(8,r*3.5),a=t.map(e=>e>i);return`M${e[0][0].toFixed(2)} ${e[0][1].toFixed(2)}${e.map((t,n)=>{let r=(n+1)%e.length,i=e[r];if(a[n])return`L${i[0].toFixed(2)} ${i[1].toFixed(2)}`;let o=a[(n-1+e.length)%e.length]?t:e[(n-1+e.length)%e.length],s=a[r]?i:e[(n+2)%e.length],c=t[0]+(i[0]-o[0])/6,l=t[1]+(i[1]-o[1])/6,u=i[0]-(s[0]-t[0])/6,d=i[1]-(s[1]-t[1])/6;return`C${c.toFixed(2)} ${l.toFixed(2)} ${u.toFixed(2)} ${d.toFixed(2)} ${i[0].toFixed(2)} ${i[1].toFixed(2)}`}).join(``)}Z`},Re=(e,t)=>{let n=t.width/2,r=Math.min(n,t.height/2),i=t.depth/2,a=Math.max(0,(t.height-r*2)/2),o=[n,r,i],s=Z(e,o,[0,a,0]),c=Z(e,o,[0,-a,0]);return!s||!c?null:Le(W([...Ie(s),...Ie(c)]))},ze=(e,t)=>{if(t.type===`sphere`||t.type===`mickey`){let n=Ne(e,t);if(n)return n}if(t.type===`capsule`){let n=Re(e,t);if(n)return n}if(t.type===`cylinder`)return Ee(e,t);if(t.type===`cursor`)return De(e,t);if(t.type===`cone`)return ke(e,t);if(t.type===`cube`)return Ae(e,t);if(t.type===`diamond`)return je(e,t);let n=B(t),r=z.get(n);return r||(r=Array.from({length:me},(e,n)=>{let r=-Math.PI/2+n/24*Math.PI;return Array.from({length:he},(e,n)=>w(t,-Math.PI+n/72*Math.PI*2,r))}).flat(),V(z,n,r)),L(W(r.map(t=>I(F(e.orientation,t),e.expression.perspective))))},Be=(e,t)=>{let n=B(t.surface),r=ve.get(n);r||(r=Array.from({length:17},(e,n)=>{let r=-Math.PI/2+n/16*Math.PI;return Array.from({length:49},(e,n)=>{let i=-Math.PI+n/48*Math.PI*2;return w(t.surface,i,r)})}).flat(),V(ve,n,r));let i=P(j(t.rotation[0]),j(t.rotation[1]),j(t.rotation[2])),a=W(r.map(n=>{let r=F(i,n),a=[r[0]+t.position[0],r[1]+t.position[1],r[2]+t.position[2]];return I(F(e.orientation,a),e.expression.perspective)}));return(t.surface.type===`cube`||t.surface.type===`diamond`)&&t.surface.roundness<=0?L(a):G(K(a))},Ve=.1,He=(e,t)=>{let n=P(j(t.rotation[0]),j(t.rotation[1]),j(t.rotation[2])),r=[[1,0,0],[0,1,0],[0,0,1]].map(t=>F(e.orientation,F(n,t))[2]);return Math.hypot(r[0]*(t.surface.width/2),r[1]*(t.surface.height/2),r[2]*(t.surface.depth/2))},Ue=(e,t)=>{let n=t.map(t=>{let n=F(e.orientation,t.position)[2];return{id:t.id,path:Be(e,t),depth:n,front:n>He(e,t)*Ve}}).sort((e,t)=>e.depth-t.depth);return{backPaths:n.filter(e=>!e.front).map(e=>e.path),frontPaths:n.filter(e=>e.front).map(e=>e.path),backNodeIds:n.filter(e=>!e.front).map(e=>e.id),frontNodeIds:n.filter(e=>e.front).map(e=>e.id)}},We=(e,t,n=1,r={})=>{let i=U(e,t,-1,n,r.eyeOffset),a=U(e,t,1,n,r.eyeOffset),o=i.map(e=>e.point),s=a.map(e=>e.point),c=Ue(e,r.bodyNodes??[]),l=Fe(e,t);return{backPaths:[...l,...c.backPaths],frontPaths:c.frontPaths,backNodeIds:[...l.map(()=>null),...c.backNodeIds],frontNodeIds:c.frontNodeIds,headPath:ze(e,t),leftPath:L(o),rightPath:L(s),leftVisible:i.reduce((e,t)=>e+t.normal[2],0)>0,rightVisible:a.reduce((e,t)=>e+t.normal[2],0)>0,wirePaths:r.includeWire===!1?[]:we(e,t)}},Ge=e=>e*e*(3-2*e),Q=e=>{let t=Math.sin(e*127.1+311.7)*43758.5453;return(t-Math.floor(t))*2-1},Ke=e=>e.headX*.71+e.headY*1.13+e.headZ*1.37,qe=17.29,$=(e,t,n,r)=>{let i=e/r,a=Math.floor(i),o=Ge(i-a),s=Q(a*3+t+n);return s+(Q((a+1)*3+t+n)-s)*o},Je=(e,t,n)=>{let r=1100;if(e<=0)return 0;let i=Math.floor(e/r),a=(e-i*r)/140,o=Ge(Math.min(a,1)),s=i===0?0:Q((i-1)*2+t+n);return s+(Q(i*2+t+n)-s)*o},Ye=e=>e.eyeMotion!==`none`||e.bodyMotion!==`none`,Xe=(e,t,n=1)=>{let r=Ke(e);if(e.bodyMotion===`slowDrift`)return{x:$(t,3,r,2900)*1.45*n,y:$(t,4,r,3700)*1.1*n};if(e.bodyMotion===`shake`){let e=t/1e3;return{x:(Math.sin(e*31)+Math.sin(e*53)*.45)*1.35*n,y:(Math.sin(e*37)+Math.sin(e*61)*.4)*1.1*n}}return{x:0,y:0}},Ze=(e,t,n=1)=>{if(e.eyeMotion===`microSaccades`)return{x:Je(t,0,qe)*1.5*n,y:Je(t,1,qe)*.9*n};if(e.eyeMotion===`shake`){let e=t/1e3;return{x:(Math.sin(e*47)+Math.sin(e*71)*.45)*1.2*n,y:(Math.sin(e*59)+Math.sin(e*83)*.4)*.8*n}}return{x:0,y:0}},Qe=(e,t,n=1)=>{let r={...e},i=Ke(e);if(e.bodyMotion===`slowDrift`)r.headX+=$(t,0,i,2600)*.8*n,r.headY+=$(t,1,i,3300)*1.15*n,r.headZ+=$(t,2,i,4100)*.45*n;else if(e.bodyMotion===`shake`){let e=t/1e3;r.headX+=(Math.sin(e*31)+Math.sin(e*53)*.45)*1.15*n,r.headY+=(Math.sin(e*37)+Math.sin(e*61)*.4)*1.35*n,r.headZ+=Math.sin(e*43)*.7*n}return r};return e.ambientBodyOffset=Xe,e.ambientEyeOffset=Ze,e.applyAmbientBodyMotion=Qe,e.applyAmbientMotion=(e,t,n=1)=>{let r=Qe(e,t,n),i=Ze(e,t,n);return r.positionXLeft+=i.x,r.positionXRight+=i.x,r.positionYLeft+=i.y,r.positionYRight+=i.y,r},e.expressionFields=le,e.hasAmbientMotion=Ye,e.poseFromExpression=fe,e.renderAvatar=We,e})({});
const DATA = {"version":1,"avatar":{"name":"Grok bot","surface":{"type":"sphere","width":240,"height":240,"depth":240,"roundness":1},"bodyNodes":[],"colors":{"body":"#000000","eyes":"#ffffff"}},"expressions":{"expression-13":{"id":"expression-13","headX":-8.752343750000001,"headY":-8.743359375,"headZ":-10.773828125000001,"widthLeft":56.133984375,"widthRight":56.133984375,"heightLeft":15.5,"heightRight":15.155468749999997,"spacing":69.276171875,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-22":{"id":"expression-22","headX":10.292578125,"headY":3.39921875,"headZ":7.583203125,"widthLeft":55.672265624999994,"widthRight":55.672265624999994,"heightLeft":14.616015625000003,"heightRight":14.616015625000003,"spacing":68.416796875,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-04":{"id":"expression-04","headX":3.4,"headY":13.22578125,"headZ":8.976953125,"widthLeft":51.775000000000006,"widthRight":51.775000000000006,"heightLeft":13.02734375,"heightRight":13.02734375,"spacing":63.872265625,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-00":{"id":"expression-00","headX":7.3,"headY":27.8,"headZ":-16.1,"widthLeft":22.501171874999997,"widthRight":22.501171874999997,"heightLeft":42.37773437499999,"heightRight":42.37773437499999,"spacing":54.3,"positionXLeft":0,"positionXRight":0,"positionYLeft":-20.5,"positionYRight":-20.5,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-08":{"id":"expression-08","headX":-12.303515625,"headY":-17.601171875,"headZ":5.9109375,"widthLeft":20.605859374999994,"widthRight":20.605859374999994,"heightLeft":47.769921874999994,"heightRight":47.769921874999994,"spacing":54.900000000000006,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":23.523046875000002,"rightAngle":-24.042578125000002,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-10":{"id":"expression-10","headX":1.43359375,"headY":6.194140624999999,"headZ":10.56015625,"widthLeft":23.836718749999996,"widthRight":23.836718749999996,"heightLeft":58.130078125,"heightRight":58.130078125,"spacing":56.8,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-01":{"id":"expression-01","headX":-15.057812500000004,"headY":0.14296874999999964,"headZ":-14.549218750000001,"widthLeft":22.401171875000003,"widthRight":22.401171875000003,"heightLeft":54.5703125,"heightRight":54.5703125,"spacing":57.7,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-19":{"id":"expression-19","headX":-6.077734375000001,"headY":-11.03515625,"headZ":-13.965625000000001,"widthLeft":23.045703125000003,"widthRight":23.045703125000003,"heightLeft":58.685156250000006,"heightRight":58.685156250000006,"spacing":56.2,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-16":{"id":"expression-16","headX":-14.750781250000001,"headY":-19.350000000000005,"headZ":5.631640624999998,"widthLeft":19.602343750000003,"widthRight":19.602343750000003,"heightLeft":48.63984375,"heightRight":48.63984375,"spacing":55.099999999999994,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":-27.606640625,"rightAngle":26.1484375,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-14":{"id":"expression-14","headX":3.5292968750000004,"headY":-7.0765625,"headZ":9.830078125,"widthLeft":24.306250000000006,"widthRight":48.92421875000001,"heightLeft":59.281640624999994,"heightRight":13.408203125,"spacing":62.218359375000006,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-17":{"id":"expression-17","headX":-4.3953125,"headY":14.07265625,"headZ":-16.126171874999997,"widthLeft":19.045145681988203,"widthRight":19.045145681988203,"heightLeft":43.370703125000006,"heightRight":43.370703125000006,"spacing":51.73124999999999,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":26.2921875,"rightAngle":-20.249218750000004,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-05":{"id":"expression-05","headX":-16.528515625,"headY":-3.7679687499999996,"headZ":-13.7296875,"widthLeft":23.090625000000003,"widthRight":49.924609375,"heightLeft":57.6796875,"heightRight":12.431640625,"spacing":56.3,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-15":{"id":"expression-15","headX":0.31914062500000184,"headY":35.307421874999996,"headZ":-10.904296875,"widthLeft":22.4609375,"widthRight":22.4609375,"heightLeft":39.820703124999994,"heightRight":39.820703124999994,"spacing":53.900000000000006,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-09":{"id":"expression-09","headX":-20.058203125,"headY":12.607421875,"headZ":-12.7,"widthLeft":42.5,"widthRight":22.1,"heightLeft":41.8,"heightRight":22.200000000000003,"spacing":61.7,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-03":{"id":"expression-03","headX":2.9468749999999986,"headY":-16.051171875,"headZ":-20.916015625,"widthLeft":51.68336723153048,"widthRight":51.68336723153048,"heightLeft":51.74054108796297,"heightRight":51.74054108796297,"spacing":70.9,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-20":{"id":"expression-20","headX":-17.127734375000003,"headY":18.070703124999998,"headZ":13.891796875,"widthLeft":35.452734375,"widthRight":35.452734375,"heightLeft":79.10429687499999,"heightRight":79.10429687499999,"spacing":70.8,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-12":{"id":"expression-12","headX":-19.20859375,"headY":15.2,"headZ":11.8,"widthLeft":52.084765625,"widthRight":53.11410881916996,"heightLeft":51.46715970849806,"heightRight":52.18769994441695,"spacing":69.5,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-18":{"id":"expression-18","headX":6.585546875,"headY":4.737109375000001,"headZ":12.840234374999998,"widthLeft":42.1,"widthRight":22.200000000000003,"heightLeft":41.7,"heightRight":22.099999999999994,"spacing":60.400000000000006,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-07":{"id":"expression-07","headX":8.063671874999999,"headY":17.626562500000002,"headZ":-11.116796874999999,"widthLeft":20.908203125,"widthRight":20.908203125,"heightLeft":40.400781249999994,"heightRight":40.400781249999994,"spacing":52.059765625,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":-30.865625,"rightAngle":28.781640625,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-11":{"id":"expression-11","headX":-2.092968750000001,"headY":-15.899609374999999,"headZ":-14.469921875,"widthLeft":34.20086765973213,"widthRight":34.20086765973213,"heightLeft":85.33085937499999,"heightRight":83.17775668160692,"spacing":59.414453124999994,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-02":{"id":"expression-02","headX":-15.287109375000002,"headY":15.006640625,"headZ":12.787890625,"widthLeft":31.25390625,"widthRight":31.25390625,"heightLeft":76.720703125,"heightRight":76.720703125,"spacing":68.7,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-21":{"id":"expression-21","headX":-5.428125,"headY":-11.71328125,"headZ":-13.472265625000002,"widthLeft":51.400000000000006,"widthRight":50.5,"heightLeft":50.099999999999994,"heightRight":49.400000000000006,"spacing":69,"positionXLeft":0,"positionXRight":0,"positionYLeft":0,"positionYRight":0,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-23":{"id":"expression-23","headX":-17.8,"headY":10,"headZ":-10.894921875,"widthLeft":23.969921874999997,"widthRight":53.56328125,"heightLeft":55.892968749999994,"heightRight":13.333593750000006,"spacing":59.943749999999994,"positionXLeft":0,"positionXRight":0,"positionYLeft":-9.8,"positionYRight":-9.8,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"},"expression-24":{"id":"expression-24","headX":7.131640624999998,"headY":7.7828124999999995,"headZ":3.935546874999999,"widthLeft":21.5,"widthRight":23.200000000000003,"heightLeft":32,"heightRight":33.5,"spacing":51.2,"positionXLeft":0,"positionXRight":0,"positionYLeft":40,"positionYRight":40,"leftAngle":0,"rightAngle":0,"perspective":1,"eyeMotion":"none","bodyMotion":"none"}},"animations":{"sleeping":{"name":"sleeping","description":"Yeux presque fermés, respiration lente et expression de sommeil.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":4800,"minIntervalMs":6500,"maxIntervalMs":9500,"durationMs":420},"steps":[{"expressionId":"expression-13","holdMs":3600,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-22","holdMs":3600,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-04","holdMs":3600,"transitionMs":500,"transition":"smooth"}]},"waking":{"name":"waking","description":"Séquence courte de réveil avant retour vers une expression neutre.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":1200,"minIntervalMs":1800,"maxIntervalMs":3600,"durationMs":220},"steps":[{"expressionId":"expression-13","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"idle":{"name":"idle","description":"Micro-mouvements lents, expressions 00 et 08, clignement rare.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2600,"minIntervalMs":3400,"maxIntervalMs":6200,"durationMs":280},"steps":[{"expressionId":"expression-00","holdMs":5200,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-08","holdMs":5200,"transitionMs":500,"transition":"smooth"}]},"listening":{"name":"listening","description":"Expressions 10, 01 et 19, regard stable et clignement attentif.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":3200,"minIntervalMs":4800,"maxIntervalMs":7200,"durationMs":240},"steps":[{"expressionId":"expression-10","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-01","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-19","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"thinking":{"name":"thinking","description":"Regard haut et latéral, expressions asymétriques et changements fréquents.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-08","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-16","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-14","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-17","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-05","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"searching":{"name":"searching","description":"Balayage rapide et changements très fréquents.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-15","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-09","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-03","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-20","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-12","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-18","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"working":{"name":"working","description":"Rythme régulier et expressions concentrées.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-07","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-16","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-11","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-10","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"excited":{"name":"excited","description":"Grandes expressions et transitions rapides.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":1200,"minIntervalMs":1800,"maxIntervalMs":3600,"durationMs":220},"steps":[{"expressionId":"expression-02","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-17","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-21","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-03","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-11","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"bored":{"name":"bored","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":4800,"minIntervalMs":6500,"maxIntervalMs":9500,"durationMs":420},"steps":[{"expressionId":"expression-04","holdMs":3600,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-22","holdMs":3600,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-00","holdMs":3600,"transitionMs":500,"transition":"smooth"}]},"suspicious":{"name":"suspicious","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-14","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-05","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-23","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"angry":{"name":"angry","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-07","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-16","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"drowsy":{"name":"drowsy","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":4800,"minIntervalMs":6500,"maxIntervalMs":9500,"durationMs":420},"steps":[{"expressionId":"expression-04","holdMs":3600,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-22","holdMs":3600,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-13","holdMs":3600,"transitionMs":500,"transition":"smooth"}]},"happy":{"name":"happy","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-02","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-11","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-17","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-19","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"curious":{"name":"curious","description":"Inclinaisons et forte asymétrie.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-03","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-21","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-00","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-15","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"confused":{"name":"confused","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-14","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-05","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-08","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"surprised":{"name":"surprised","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":1200,"minIntervalMs":1800,"maxIntervalMs":3600,"durationMs":220},"steps":[{"expressionId":"expression-03","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-21","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"proud":{"name":"proud","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-15","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-08","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-02","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"shy":{"name":"shy","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-00","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-24","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-13","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"sad":{"name":"sad","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":4800,"minIntervalMs":6500,"maxIntervalMs":9500,"durationMs":420},"steps":[{"expressionId":"expression-04","holdMs":3600,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-13","holdMs":3600,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-22","holdMs":3600,"transitionMs":500,"transition":"smooth"}]},"laughing":{"name":"laughing","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":1200,"minIntervalMs":1800,"maxIntervalMs":3600,"durationMs":220},"steps":[{"expressionId":"expression-02","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-11","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-17","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"scared":{"name":"scared","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":1200,"minIntervalMs":1800,"maxIntervalMs":3600,"durationMs":220},"steps":[{"expressionId":"expression-03","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-21","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"playful":{"name":"playful","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":2100,"minIntervalMs":2800,"maxIntervalMs":5000,"durationMs":260},"steps":[{"expressionId":"expression-02","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-17","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-11","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-08","holdMs":2300,"transitionMs":500,"transition":"smooth"}]},"celebrate":{"name":"celebrate","description":"Cet état enchaîne un pool de presets et des clignements.","playbackMode":"loop","blink":{"enabled":true,"initialDelayMs":1200,"minIntervalMs":1800,"maxIntervalMs":3600,"durationMs":220},"steps":[{"expressionId":"expression-02","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-08","holdMs":2300,"transitionMs":500,"transition":"smooth"},{"expressionId":"expression-17","holdMs":2300,"transitionMs":500,"transition":"smooth"}]}}};

const SVG_NS = 'http://www.w3.org/2000/svg';
const avatarInstanceId = () => typeof globalThis.crypto?.randomUUID === 'function'
  ? globalThis.crypto.randomUUID()
  : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
const clamp01 = value => Math.max(0, Math.min(1, value));
const easeProgress = (progress, transition) => transition === 'smooth'
  ? progress * progress * (3 - 2 * progress)
  : transition === 'snappy'
    ? 1 - (1 - progress) ** 3
    : 1 - Math.exp(-6 * progress) * Math.cos(8 * progress);
const nearestAngle = (target, current) => {
  let resolved = target;
  while (resolved - current > 180) resolved -= 360;
  while (resolved - current < -180) resolved += 360;
  return resolved;
};
const resolvedTargetExpression = (target, current) => ({
  ...target,
  headX: nearestAngle(target.headX, current.headX),
  headY: nearestAngle(target.headY, current.headY),
  headZ: nearestAngle(target.headZ, current.headZ),
  leftAngle: nearestAngle(target.leftAngle, current.leftAngle),
  rightAngle: nearestAngle(target.rightAngle, current.rightAngle),
});
const colorChannels = color => {
  const value = color.replace('#', '');
  const hex = value.length === 3 ? value.split('').map(channel => channel + channel).join('') : value;
  const numeric = Number.parseInt(hex, 16);
  return [(numeric >> 16) & 255, (numeric >> 8) & 255, numeric & 255];
};
const interpolateColor = (from, to, progress) => {
  const left = colorChannels(from);
  const right = colorChannels(to);
  const value = left.map((channel, index) => Math.round(channel + (right[index] - channel) * progress));
  return '#' + value.map(channel => channel.toString(16).padStart(2, '0')).join('');
};
const resolveColors = expression => ({
  body: expression.bodyColor || DATA.avatar.colors.body,
  eyes: expression.eyeColor || DATA.avatar.colors.eyes,
});
const svgElement = name => document.createElementNS(SVG_NS, name);

function mountAvatar(target, options = {}) {
  const host = typeof target === 'string' ? document.querySelector(target) : target;
  if (!host) throw new Error('Avatar target was not found.');
  const animationNames = Object.keys(DATA.animations);
  if (!animationNames.length) throw new Error('The avatar export contains no animations.');
  const instanceId = avatarInstanceId();
  const clipId = 'avatar-procedural-clip-' + instanceId;
  const svg = svgElement('svg');
  svg.setAttribute('viewBox', '-150 -150 300 300');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', DATA.avatar.name);
  svg.style.width = typeof options.size === 'number' ? options.size + 'px' : options.size || '100%';
  svg.style.height = typeof options.size === 'number' ? options.size + 'px' : options.size || '100%';
  svg.style.display = 'block';
  svg.style.overflow = 'visible';
  const defs = svgElement('defs');
  const clipPath = svgElement('clipPath');
  const clipHead = svgElement('path');
  clipPath.id = clipId;
  clipPath.append(clipHead);
  defs.append(clipPath);
  svg.append(defs);
  const motionLayer = svgElement('g');
  const backLayer = svgElement('g');
  const head = svgElement('path');
  const eyesLayer = svgElement('g');
  const leftEye = svgElement('path');
  const rightEye = svgElement('path');
  const frontLayer = svgElement('g');
  eyesLayer.setAttribute('clip-path', 'url(#' + clipId + ')');
  eyesLayer.append(leftEye, rightEye);
  motionLayer.append(backLayer, head, eyesLayer, frontLayer);
  svg.append(motionLayer);
  host.replaceChildren(svg);

  const ensurePaths = (group, paths, fill) => {
    while (group.children.length < paths.length) group.append(svgElement('path'));
    while (group.children.length > paths.length) group.lastElementChild.remove();
    paths.forEach((path, index) => {
      group.children[index].setAttribute('d', path);
      group.children[index].setAttribute('fill', fill);
    });
  };
  let currentAnimation = options.animation && DATA.animations[options.animation] ? options.animation : animationNames[0];
  const initialStep = DATA.animations[currentAnimation].steps[0];
  const initialExpression = DATA.expressions[initialStep.expressionId];
  let currentPose = AvatarProceduralEngine.poseFromExpression(initialExpression);
  let currentColors = resolveColors(initialExpression);
  let blinkAmount = 1;
  let transitionState = null;
  let blinkState = null;
  let frameRequest = null;
  let stepTimer = null;
  let blinkTimer = null;
  let blinkDueAt = null;
  let stepIndex = 0;
  let direction = 1;
  let playing = false;
  let paused = false;
  let pausedRemainingMs = 0;
  let pausedTransition = null;
  let pausedBlink = null;
  let pausedBlinkDelay = 0;
  let stepDueAt = null;
  let eyeAmbientStartedAt = performance.now();
  let bodyAmbientStartedAt = performance.now();
  let eyeAmbientSignature = initialExpression.eyeMotion;
  let bodyAmbientSignature = initialExpression.bodyMotion;
  let ambientStrength = 1;
  let lastAmbientFrame = 0;

  const applyMotion = expression => {
    const now = performance.now();
    if (expression.eyeMotion !== eyeAmbientSignature) {
      eyeAmbientSignature = expression.eyeMotion;
      eyeAmbientStartedAt = now;
    }
    if (expression.bodyMotion !== bodyAmbientSignature) {
      bodyAmbientSignature = expression.bodyMotion;
      bodyAmbientStartedAt = now;
    }
  };
  const render = (time = performance.now()) => {
    const eyeElapsed = time - eyeAmbientStartedAt;
    const bodyElapsed = time - bodyAmbientStartedAt;
    const expression = currentPose.expression.bodyMotion !== 'none'
      ? AvatarProceduralEngine.applyAmbientBodyMotion(currentPose.expression, bodyElapsed, ambientStrength)
      : currentPose.expression;
    const eyeOffset = AvatarProceduralEngine.ambientEyeOffset(currentPose.expression, eyeElapsed, ambientStrength);
    const renderedPose = AvatarProceduralEngine.poseFromExpression(expression);
    const geometry = AvatarProceduralEngine.renderAvatar(renderedPose, DATA.avatar.surface, blinkAmount, {
      includeWire: false,
      bodyNodes: DATA.avatar.bodyNodes,
      eyeOffset,
    });
    const offset = AvatarProceduralEngine.ambientBodyOffset(currentPose.expression, bodyElapsed, ambientStrength);
    motionLayer.setAttribute('transform', 'translate(' + offset.x + ' ' + offset.y + ')');
    ensurePaths(backLayer, geometry.backPaths, currentColors.body);
    ensurePaths(frontLayer, geometry.frontPaths, currentColors.body);
    head.setAttribute('d', geometry.headPath);
    head.setAttribute('fill', currentColors.body);
    clipHead.setAttribute('d', geometry.headPath);
    leftEye.setAttribute('d', geometry.leftPath);
    rightEye.setAttribute('d', geometry.rightPath);
    leftEye.setAttribute('fill', currentColors.eyes);
    rightEye.setAttribute('fill', currentColors.eyes);
    leftEye.style.display = geometry.leftVisible ? '' : 'none';
    rightEye.style.display = geometry.rightVisible ? '' : 'none';
  };
  const tick = time => {
    frameRequest = null;
    if (transitionState) {
      const linear = clamp01((time - transitionState.startedAt) / transitionState.durationMs);
      const eased = easeProgress(linear, transitionState.transition);
      ambientStrength = clamp01(eased);
      const expression = { ...transitionState.fromPose.expression };
      AvatarProceduralEngine.expressionFields.forEach(field => {
        expression[field] = transitionState.fromPose.expression[field] +
          (transitionState.toPose.expression[field] - transitionState.fromPose.expression[field]) * eased;
      });
      expression.eyeMotion = transitionState.toPose.expression.eyeMotion;
      expression.bodyMotion = transitionState.toPose.expression.bodyMotion;
      currentPose = AvatarProceduralEngine.poseFromExpression(expression);
      currentColors = {
        body: interpolateColor(transitionState.fromColors.body, transitionState.toColors.body, clamp01(eased)),
        eyes: interpolateColor(transitionState.fromColors.eyes, transitionState.toColors.eyes, clamp01(eased)),
      };
      if (linear >= 1) {
        currentPose = transitionState.toPose;
        currentColors = transitionState.toColors;
        transitionState = null;
        ambientStrength = 1;
      }
    }
    if (blinkState) {
      const progress = clamp01((time - blinkState.startedAt) / blinkState.durationMs);
      if (progress <= 0.42) {
        const closeProgress = progress / 0.42;
        blinkAmount = 1 - closeProgress * closeProgress;
      } else {
        const openProgress = (progress - 0.42) / 0.58;
        blinkAmount = 1 - (1 - openProgress) ** 2;
      }
      if (progress >= 1) {
        blinkAmount = 1;
        blinkState = null;
      }
    }
    const ambientActive = AvatarProceduralEngine.hasAmbientMotion(currentPose.expression);
    if (transitionState || blinkState || !ambientActive || time - lastAmbientFrame >= 1000 / 30) {
      render(time);
      if (ambientActive) lastAmbientFrame = time;
    }
    if (transitionState || blinkState || ambientActive) frameRequest = requestAnimationFrame(tick);
  };
  const requestTick = () => {
    if (frameRequest === null) frameRequest = requestAnimationFrame(tick);
  };
  const animateTo = (expressionId, durationMs, transition) => {
    const target = DATA.expressions[expressionId];
    if (!target) return;
    applyMotion(target);
    const resolved = resolvedTargetExpression(target, currentPose.expression);
    const targetPose = AvatarProceduralEngine.poseFromExpression(resolved);
    const targetColors = resolveColors(target);
    if (durationMs <= 0) {
      ambientStrength = 1;
      transitionState = null;
      currentPose = targetPose;
      currentColors = targetColors;
      render();
      if (AvatarProceduralEngine.hasAmbientMotion(currentPose.expression)) requestTick();
      return;
    }
    transitionState = {
      fromPose: currentPose,
      toPose: targetPose,
      fromColors: currentColors,
      toColors: targetColors,
      startedAt: performance.now(),
      durationMs,
      transition,
      expressionId,
    };
    ambientStrength = 0;
    requestTick();
  };
  const clearSchedule = () => {
    if (stepTimer !== null) clearTimeout(stepTimer);
    if (blinkTimer !== null) clearTimeout(blinkTimer);
    stepTimer = null;
    blinkTimer = null;
    blinkDueAt = null;
    stepDueAt = null;
  };
  const scheduleBlink = (animation, delay) => {
    if (!animation.blink.enabled) return;
    blinkDueAt = performance.now() + delay;
    blinkTimer = setTimeout(() => {
      blinkDueAt = null;
      blinkState = { startedAt: performance.now(), durationMs: animation.blink.durationMs };
      requestTick();
      const range = animation.blink.maxIntervalMs - animation.blink.minIntervalMs;
      scheduleBlink(animation, animation.blink.durationMs + animation.blink.minIntervalMs + Math.random() * range);
    }, delay);
  };
  const advance = animation => {
    const last = animation.steps.length - 1;
    const playbackMode = options.loop === true ? 'loop' : options.loop === false ? 'once' : animation.playbackMode;
    if (playbackMode === 'once' && stepIndex >= last) {
      playing = false;
      options.onAnimationEnd?.(currentAnimation);
      return;
    }
    if (playbackMode === 'pingPong' && last > 0) {
      if (stepIndex >= last) direction = -1;
      else if (stepIndex <= 0) direction = 1;
      stepIndex += direction;
    } else stepIndex = (stepIndex + 1) % (last + 1);
    runStep(animation);
  };
  const runStep = animation => {
    if (!playing || !animation.steps.length) return;
    const step = animation.steps[stepIndex];
    animateTo(step.expressionId, step.transitionMs, step.transition);
    const duration = step.transitionMs + step.holdMs;
    stepDueAt = performance.now() + duration;
    stepTimer = setTimeout(() => advance(animation), duration);
  };
  const api = {
    element: svg,
    get animation() { return currentAnimation; },
    get playing() { return playing; },
    play(animationName) {
      animationName = animationName || currentAnimation;
      if (!DATA.animations[animationName]) throw new Error('Unknown animation: ' + animationName);
      clearSchedule();
      if (animationName === currentAnimation && paused) {
        paused = false;
        playing = true;
        if (pausedTransition) animateTo(pausedTransition.expressionId, pausedTransition.durationMs, pausedTransition.transition);
        if (pausedBlink) {
          blinkState = {
            startedAt: performance.now() - pausedBlink.progress * pausedBlink.durationMs,
            durationMs: pausedBlink.durationMs,
          };
          requestTick();
        }
        stepDueAt = performance.now() + pausedRemainingMs;
        stepTimer = setTimeout(() => advance(DATA.animations[currentAnimation]), pausedRemainingMs);
        scheduleBlink(
          DATA.animations[currentAnimation],
          pausedBlinkDelay || DATA.animations[currentAnimation].blink.minIntervalMs
        );
        pausedTransition = null;
        pausedBlink = null;
        pausedBlinkDelay = 0;
        return api;
      }
      currentAnimation = animationName;
      stepIndex = 0;
      direction = 1;
      paused = false;
      playing = true;
      runStep(DATA.animations[currentAnimation]);
      scheduleBlink(DATA.animations[currentAnimation], DATA.animations[currentAnimation].blink.initialDelayMs);
      return api;
    },
    pause() {
      const now = performance.now();
      if (playing && stepDueAt !== null) pausedRemainingMs = Math.max(stepDueAt - now, 0);
      pausedBlinkDelay = blinkDueAt === null ? 0 : Math.max(blinkDueAt - now, 0);
      if (transitionState) {
        const elapsed = now - transitionState.startedAt;
        pausedTransition = {
          expressionId: transitionState.expressionId,
          durationMs: Math.max(transitionState.durationMs - elapsed, 0),
          transition: transitionState.transition,
        };
      }
      if (blinkState) {
        pausedBlink = {
          progress: clamp01((now - blinkState.startedAt) / blinkState.durationMs),
          durationMs: blinkState.durationMs,
        };
      }
      clearSchedule();
      transitionState = null;
      blinkState = null;
      paused = true;
      playing = false;
      render();
      return api;
    },
    stop() {
      clearSchedule();
      transitionState = null;
      blinkState = null;
      blinkAmount = 1;
      pausedBlink = null;
      pausedBlinkDelay = 0;
      paused = false;
      playing = false;
      stepIndex = 0;
      direction = 1;
      const first = DATA.animations[currentAnimation].steps[0];
      if (first) animateTo(first.expressionId, 0, first.transition);
      return api;
    },
    destroy() {
      clearSchedule();
      if (frameRequest !== null) cancelAnimationFrame(frameRequest);
      svg.remove();
    },
  };
  applyMotion(initialExpression);
  render();
  if (AvatarProceduralEngine.hasAmbientMotion(initialExpression)) requestTick();
  if (options.autoplay !== false) api.play(currentAnimation);
  return api;
}

export const availableAnimations = Object.freeze(Object.keys(DATA.animations));
export function createAvatar(target, options = {}) { return mountAvatar(target, options); }
export default createAvatar;
