(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=e=>{localStorage.setItem(`user`,JSON.stringify(e))},t=()=>JSON.parse(localStorage.getItem(`user`)),n=()=>{localStorage.removeItem(`user`)},r=()=>!!t(),i=()=>t()?.role===`admin`,a=`http://localhost:3001`,o=async(e,t={})=>{try{let n=await fetch(`${a}${e}`,{headers:{"Content-Type":`application/json`},...t});if(!n.ok)throw Error(`HTTP Error ${n.status}`);return await n.json()}catch(e){throw console.error(e),e}},s={get:e=>o(e),post:(e,t)=>o(e,{method:`POST`,body:JSON.stringify(t)}),put:(e,t)=>o(e,{method:`PUT`,body:JSON.stringify(t)}),patch:(e,t)=>o(e,{method:`PATCH`,body:JSON.stringify(t)}),delete:e=>o(e,{method:`DELETE`})},c=()=>{let t=document.querySelector(`#loginForm`);t.addEventListener(`submit`,async n=>{n.preventDefault();let r=t.email.value.trim(),i=t.password.value.trim();try{let t=await s.get(`/users?email=${r}&password=${i}`);if(!t.length){alert(`Credenciales incorrectas`);return}e({id:t[0].id,name:t[0].name,role:t[0].role}),E(`/home`)}catch(e){console.error(e),alert(`Error conectando con la API`)}})};function l(){return setTimeout(()=>{c()}),`
    <div class="min-h-screen flex justify-center items-center bg-slate-100">

      <div class="bg-white p-8 rounded-lg shadow w-96">

        <h1 class="text-3xl font-bold mb-5">
          Login
        </h1>

        <form id="loginForm">

          <input
            type="email"
            name="email"
            placeholder="Correo"
            class="border w-full p-2 rounded mb-3"
          >

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            class="border w-full p-2 rounded mb-4"
          >

          <button
            class="bg-blue-600 text-white w-full py-2 rounded"
          >
            Ingresar
          </button>

        </form>

      </div>

    </div>
  `}function u(){return setTimeout(()=>{document.querySelector(`#logoutBtn`)?.addEventListener(`click`,()=>{n(),E(`/`)})}),`
    <aside
      class="w-64 bg-slate-900 text-white h-screen p-5"
    >
      <h2 class="text-2xl font-bold mb-8">
        SPA Base
      </h2>

      <nav class="flex flex-col gap-4">

        <a href="/home" class="px-3 py-1 bg-gray-500 rounded-xl" data-link>
          Home
        </a>

        <button
          id="logoutBtn"
          class="text-left cursor-pointer text-red-400 hover:text-white hover:bg-red-400 px-3 py-1 rounded-xl"
        >
          Cerrar sesión
        </button>

      </nav>

    </aside>
  `}function d(e,t,n){let{id:r,workspace:i,date:a,startHour:o,endHour:s,reason:c,status:l,userId:u}=e,d=String(u)===String(t?.id),f=n||d&&l!==`approved`&&l!==`cancelled`,p=(n||d)&&l!==`cancelled`,m=n,h=n&&l===`pending`;return`
    <article class="rounded border p-4 shadow-sm">
      <h3 class="font-bold text-lg">
        ${i}
      </h3>

      <div>
        <p>
          <strong>Fecha:</strong>
          ${a}
        </p>

        <p>
          <strong>Horario:</strong>
          ${o} - ${s}
        </p>

        <p>
          <strong>Motivo:</strong>
          ${c}
        </p>

        <p>
          <strong>Estado:</strong>
          <span>
            ${l}
          </span>
        </p>
      </div>

      <div class="flex gap-2 mt-4 flex-wrap">
        ${f?`
        <button
          type="button"
          class="btn-edit"
          data-id="${r}"
        >
          Editar
        </button>
        `:``}

        ${m?`
        <button
          type="button"
          class="btn-delete"
          data-id="${r}"
        >
          Eliminar
        </button>
        `:``}

        ${h?`
        <button
          type="button"
          class="btn-approve"
          data-id="${r}"
        >
          Aprobar
        </button>

        <button
          type="button"
          class="btn-reject"
          data-id="${r}"
        >
          Rechazar
        </button>
        `:``}

        ${p?`
        <button
          type="button"
          class="btn-cancel"
          data-id="${r}"
        >
          Cancelar
        </button>
        `:``}
      </div>
    </article>
  `}var f=()=>s.get(`/reservations`),p=e=>s.post(`/reservations`,e),m=(e,t)=>s.patch(`/reservations/${e}`,t),h=e=>s.delete(`/reservations/${e}`),g=null,_=null,v=async()=>{g=t(),_=document.querySelector(`#reservationsContainer`),!(!g||!_)&&(await y(),document.querySelector(`#btnNuevaReserva`)?.addEventListener(`click`,()=>{x()}))},y=async()=>{if(!g||!_)return;let e=await f(),t=i()?e:e.filter(e=>String(e.userId)===String(g.id));_.innerHTML=t.length?t.map(e=>d(e,g,i())).join(``):`<p class="col-span-2 text-center py-8 text-slate-400">No hay reservas</p>`,b()},b=()=>{_&&(_.querySelectorAll(`.btn-edit`).forEach(e=>e.addEventListener(`click`,async()=>{let t=(await f()).find(t=>t.id===e.dataset.id);if(t){if(!i()&&String(t.userId)!==String(g.id)){alert(`No tienes permiso para editar esta reserva.`);return}if(!i()&&t.status===`approved`){alert(`No puedes editar una reserva aprobada.`);return}x(t)}})),_.querySelectorAll(`.btn-delete`).forEach(e=>e.addEventListener(`click`,async()=>{i()&&confirm(`¿Eliminar esta reserva?`)&&(await h(e.dataset.id),await y())})),_.querySelectorAll(`.btn-approve`).forEach(e=>e.addEventListener(`click`,async()=>{i()&&(await m(e.dataset.id,{status:`approved`}),await y())})),_.querySelectorAll(`.btn-reject`).forEach(e=>e.addEventListener(`click`,async()=>{i()&&(await m(e.dataset.id,{status:`rejected`}),await y())})),_.querySelectorAll(`.btn-cancel`).forEach(e=>e.addEventListener(`click`,async()=>{let t=(await f()).find(t=>t.id===e.dataset.id);if(t){if(!i()&&String(t.userId)!==String(g.id)){alert(`No tienes permiso para cancelar esta reserva.`);return}await m(e.dataset.id,{status:`cancelled`}),await y()}})))},x=(e=null)=>{let t=!!e,n=document.createElement(`div`);n.className=`fixed inset-0 bg-black/50 flex justify-center items-center z-50`,n.innerHTML=`
    <div class="bg-white rounded-lg p-6 w-full max-w-md flex flex-col gap-3">
      <h2 class="text-xl font-bold">${t?`Editar Reserva`:`Nueva Reserva`}</h2>
      <input id="f-workspace" type="text" placeholder="Espacio" value="${t?e.workspace:``}" class="border p-2 rounded"/>

      <label class="flex flex-col gap-1 text-sm text-slate-600">
        Día
        <input
          id="f-date"
          type="date"
          value="${t?e.date:``}"
          class="border p-2 rounded"
        />
      </label>

      <label class="flex flex-col gap-1 text-sm text-slate-600">
        Hora inicio
        <input
          id="f-startHour"
          type="time"
          min="00:00"
          max="23:59"
          placeholder="08:00"
          value="${t?e.startHour:``}"
          class="border p-2 rounded"
        />
      </label>

      <label class="flex flex-col gap-1 text-sm text-slate-600">
        Hora fin
        <input
          id="f-endHour"
          type="time"
          min="00:00"
          max="23:59"
          placeholder="09:00"
          value="${t?e.endHour:``}"
          class="border p-2 rounded"
        />
      </label>
      
      <input id="f-reason" type="text" placeholder="Motivo" value="${t?e.reason:``}" class="border p-2 rounded"/>
      <p id="formError" class="text-red-500 text-sm hidden"></p>
      <div class="flex gap-2">
        <button id="btnSave" class="bg-blue-600 text-white px-4 py-2 rounded flex-1">${t?`Guardar`:`Crear`}</button>
        <button id="btnClose" class="bg-slate-200 px-4 py-2 rounded flex-1">Cancelar</button>
      </div>
    </div>
  `,document.body.appendChild(n),n.querySelector(`#btnClose`).addEventListener(`click`,()=>n.remove()),n.querySelector(`#btnSave`).addEventListener(`click`,async()=>{let r=n.querySelector(`#f-workspace`).value.trim(),a=n.querySelector(`#f-date`).value,o=n.querySelector(`#f-startHour`).value,s=n.querySelector(`#f-endHour`).value,c=n.querySelector(`#f-reason`).value.trim(),l=n.querySelector(`#formError`);if(!r||!a||!o||!s||!c){l.textContent=`Todos los campos son obligatorios.`,l.classList.remove(`hidden`);return}let u=e=>{let t=e.split(`:`);if(t.length!==2)return NaN;let[n,r]=t.map(Number);return Number.isInteger(n)&&Number.isInteger(r)?n*60+r:NaN},d=u(o),h=u(s);if(Number.isNaN(d)||Number.isNaN(h)){l.textContent=`La hora de inicio y fin deben estar en formato válido.`,l.classList.remove(`hidden`);return}if(d>=h){l.textContent=`La hora de inicio debe ser menor a la de fin.`,l.classList.remove(`hidden`);return}if(t&&!i()&&String(e.userId)!==String(g.id)){alert(`No tienes permiso para modificar esta reserva.`);return}if(t&&!i()&&e.status===`approved`){alert(`No puedes modificar una reserva aprobada.`);return}if((await f()).find(t=>t.workspace===r&&t.date===a&&t.startHour===o&&t.id!==e?.id)){l.textContent=`Ya existe una reserva para ese espacio y horario.`,l.classList.remove(`hidden`);return}t?await m(e.id,{workspace:r,date:a,startHour:o,endHour:s,reason:c}):await p({workspace:r,date:a,startHour:o,endHour:s,reason:c,userId:g.id,status:`pending`}),n.remove(),await y()})};function S(){let e=t();return setTimeout(()=>{v()}),`
    <div class="flex">

      ${u()}

      <main class="flex-1 bg-slate-100 min-h-screen p-6">

        <div class="mb-6">
          <h1 class="text-2xl font-bold">Bienvenido, ${e?.name}</h1>
          <p class="text-slate-500">Rol: ${e?.role}</p>
        </div>

        <section class="bg-white p-5 rounded-lg shadow">

          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl">Reservas</h2>
            <button
              id="btnNuevaReserva"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Nueva Reserva
            </button>
          </div>

          <div id="reservationsContainer" class="grid gap-4 md:grid-cols-2">
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-slate-400">Cargando reservas...</p>
            </div>
          </div>

        </section>

      </main>

    </div>
  `}var C={"/":l,"/home":S},w=[`/home`],T=[],E=e=>{history.pushState({},``,e),D()},D=()=>{let e=document.querySelector(`#app`),t=window.location.pathname;if(w.includes(t)&&!r()){history.replaceState({},``,`/`),e.innerHTML=l();return}if(t===`/`&&r()){history.replaceState({},``,`/home`),e.innerHTML=S();return}if(T.includes(t)&&!i()){e.innerHTML=`
      <div class="min-h-screen flex justify-center items-center bg-slate-100">
        <div class="bg-white p-8 rounded-lg shadow text-center">
          <h1 class="text-2xl font-bold text-red-500 mb-2">Acceso denegado</h1>
          <p class="text-slate-500">No tienes permisos para ver esta página.</p>
          <button onclick="history.back()" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Volver
          </button>
        </div>
      </div>
    `;return}e.innerHTML=(C[t]||l)()};window.addEventListener(`popstate`,D),document.addEventListener(`DOMContentLoaded`,()=>{D()});