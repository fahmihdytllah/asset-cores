$(function(){toastr.options={closeButton:!0,progressBar:!0,newestOnTop:!0};let c=$(".active-devices");function n(){c.empty();let o={desktop:"device-laptop",tablet:"device-tablet",mobile:"device-mobile"};$.get("/api/devices?type=all",function(e){e.data.forEach(e=>{var t,n,s=e.isActive?`<button class="btn btn-sm btn-outline-danger btn-logout" data-id="${e._id}" data-name="${e.deviceName}">Logout</button>`:"",a=e.isCurrentDevice?'<span class="badge rounded-pill bg-label-success mt-2">Your current session</span>':`<span class="d-block text-muted">Last activity ${t=e.lastActive,t=new Date(t),a=t.getDate(),i=t.toLocaleString("default",{month:"long"}),n=t.getFullYear(),t=t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}),a+`, ${i} ${n} `+t}</span>`,i=`<li class="list-group-item d-flex justify-content-between align-items-center">
  <div class="d-flex align-items-center">
    <i class="ti ti-${o[e.deviceType]} ti-36px me-2"></i>
    <div>
      <span class="fw-bold">${e.browserName} on ${e.deviceName}</span>
      <span class="d-block">${e.ip} (${e.location})</span>
      ${a}
    </div>
  </div>
  ${s}
</li>`;c.append(i)})})}n(),c.on("click",".btn-logout",function(){let t=$(this).data("id");Swal.fire({html:`Are you sure you want to logout this <strong>${$(this).data("name")}</strong> device?`,icon:"question",showCancelButton:!0,confirmButtonText:"Yes",customClass:{confirmButton:"btn btn-primary me-2 waves-effect waves-light",cancelButton:"btn btn-label-secondary waves-effect waves-light"},buttonsStyling:!1}).then(function(e){e.value&&(e=t,$.ajax({type:"PUT",url:"/api/devices?",data:{deviceId:e},success:function(e){toastr.success(e.message,"Good News!"),n()},error:function(e){e=e.responseJSON?.message||"An unknown internal error occurred!";toastr.error(e,"Bad News!")}}))})})});