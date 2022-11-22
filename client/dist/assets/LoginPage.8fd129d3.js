import{r as g,a as h,u as y,n as x,b as v,c as w,o as n,d as k,e,w as E,f as l,v as V,g as j,h as c,j as m,k as u,i as p,m as B}from"./index.a321d664.js";import{E as L,a as $}from"./EyeOff.8773e0e2.js";const C={class:"w-full mt-24 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 animate__animated animate__fadeIn"},D={class:"w-full sm:max-w-md p-5 mx-auto"},I=e("h2",{class:"mb-12 text-center text-5xl font-extrabold"},"Login",-1),M=["onSubmit"],N={class:"mb-4"},P=e("label",{class:"block mb-1",for:"email"},"Email-Address",-1),R={class:"mb-4"},S=e("label",{class:"mb-1",for:"password"},"Password",-1),T={class:"flex items-center"},q=["type"],A={class:"mt-6 flex items-center justify-between"},O=e("div",{class:"flex items-center"},[e("input",{type:"checkbox",checked:"",class:"border border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"}),e("label",{for:"remember_me",class:"ml-2 mt-1 block text-sm leading-5 text-gray-900"}," Remember me ")],-1),U=e("div",{class:"mt-6"},[e("button",{class:"w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"}," Login ")],-1),z={class:"mt-6 text-center"},F=e("span",{class:"font-bold"},"Register",-1),K={__name:"LoginPage",setup(G){const t=g({email:"",password:""}),r=h(!1),f=y(),b=x(),i=v(),_=()=>{B.post("/login",{email:t.email,password:t.password}).then(o=>{b.$patch(s=>{s.isLoggedIn=!0,s.userInfo={name:o.data.user.name,email:o.data.user.email}}),f.push("/dashboard"),i.success(`${o.data.message}`,{timeout:2e3,position:"top-center",icon:!0})}).catch(o=>{console.log(o),i.error(`${o.response.data.message}`,{timeout:2e3,position:"top-center",icon:!0})})};return(o,s)=>{const d=w("router-link");return n(),k("div",C,[e("div",D,[I,e("form",{onSubmit:E(_,["prevent"])},[e("div",N,[P,l(e("input",{type:"email",name:"email","onUpdate:modelValue":s[0]||(s[0]=a=>t.email=a),required:"",class:"py-2 px-3 border-2 border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"},null,512),[[V,t.email]])]),e("div",R,[S,e("div",T,[l(e("input",{type:r.value?"text":"password",name:"password",required:"","onUpdate:modelValue":s[1]||(s[1]=a=>t.password=a),class:"py-2 px-3 border-l-2 border-y-2 border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-l-md shadow-sm disabled:bg-gray-100 mt-1 w-full"},null,8,q),[[j,t.password]]),e("div",{onClick:s[2]||(s[2]=a=>r.value=!r.value),class:"py-3 px-1 mt-1 border-y-2 border-r-2 hover:cursor-pointer border-gray-300 rounded-r-md"},[r.value?(n(),c(L,{key:0})):(n(),c($,{key:1}))])])]),e("div",A,[O,m(d,{to:"/",class:"text-sm hover:underline"},{default:u(()=>[p(" Forgot your password? ")]),_:1})]),U,e("div",z,[p(" Don't have an Account ? "),m(d,{to:"/register",class:"hover:underline"},{default:u(()=>[F]),_:1})])],40,M)])])}}};export{K as default};