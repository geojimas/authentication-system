import{a as l,n as _,b as m,p as o,s as x,m as p,q as a,o as u,d as g,e,i as n,t as h,x as f}from"./index.c1b1116d.js";const y={key:0,class:"mt-28 animate__animated animate__zoomIn"},v={class:"flex items-center justify-center"},B={class:"bg-slate-700 rounded-xl m-16 border"},b={class:"flex flex-col p-10 px-16 space-y-6 items-center text-center"},k={class:"font-light md:text-6xl text-5xl text-white tracking-wide"},I={class:"text-red-600"},w=e("p",{class:"text-gray-400 md:text-2xl text-xl px-18"}," You are logged In !! Only Logged Users can watch this page. ",-1),S={__name:"BoardPage",setup(N){const c=l("You are not logged in!"),s=_(),r=m(),i=o(()=>s.isLoggedIn),d=o(()=>s.userInfo);return x(()=>{p.get("/dashboard").then(t=>{c.value=t.data.message}).catch(t=>{console.log(t),r.error(`${t.response.data.message}`,{timeout:2e3,position:"top-center",icon:!0})})}),(t,V)=>a(i)?(u(),g("div",y,[e("div",v,[e("div",B,[e("div",b,[e("h1",k,[n(" Welcome "),e("span",I,h(a(d).name),1),n(" !! ")]),w])])])])):f("",!0)}};export{S as default};