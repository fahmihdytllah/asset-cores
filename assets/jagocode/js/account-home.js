$(function(){toastr.options={closeButton:!0,progressBar:!0,newestOnTop:!0};let i=$(".account-activities"),a=$(".active-devices");s();{i.empty();let t={update_profile:"secondary",change_password:"warning",reset_password_request:"info",reset_password_success:"success",account_verification:"success",delete_account:"danger",enable_2fa:"info",disable_2fa:"warning",login_failed:"danger",enable_third_party:"info",disable_third_party:"warning",register:"success"};$.get("/api/activities?type=home",function(e){e.data.forEach(e=>{e=`<li class="timeline-item timeline-item-transparent">
          <span class="timeline-point timeline-point-${t[e.type]||"primary"}"></span>
          <div class="timeline-event">
            <div class="timeline-header mb-3">
              <h6 class="mb-0">${e.details.title}</h6>
              <small class="text-muted">${n(e.createdAt)}</small>
            </div>
            <p class="mb-2">${e.details.description}</p>
          </div>
        </li>`;i.append(e)})})}function s(){a.empty();let s={desktop:"device-laptop",tablet:"device-tablet",mobile:"device-mobile"};$.get("/api/devices?type=active",function(e){e.data.forEach(e=>{var t=e.isActive?`<button class="btn btn-sm btn-outline-danger btn-logout" data-id="${e._id}" data-name="${e.deviceName}">Logout</button>`:"",i=e.isCurrentDevice?'<span class="badge rounded-pill bg-label-success mt-2">Your current session</span>':`<span class="d-block text-muted">Last activity ${n(e.lastActive)}</span>`,e=`<li class="list-group-item d-flex justify-content-between align-items-center">
  <div class="d-flex align-items-center">
    <i class="ti ti-${s[e.deviceType]} ti-36px me-2"></i>
    <div>
      <span class="fw-bold">${e.browserName} on ${e.deviceName}</span>
      <span class="d-block">${e.ip} (${e.location})</span>
      ${i}
    </div>
  </div>
  ${t}
</li>`;a.append(e)})})}function n(e){e=new Date(e);return e.getDate()+`, ${e.toLocaleString("default",{month:"long"})} ${e.getFullYear()} `+e.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}a.on("click",".btn-logout",function(){let t=$(this).data("id");Swal.fire({html:`Are you sure you want to logout this <strong>${$(this).data("name")}</strong> device?`,icon:"question",showCancelButton:!0,confirmButtonText:"Yes",customClass:{confirmButton:"btn btn-primary me-2 waves-effect waves-light",cancelButton:"btn btn-label-secondary waves-effect waves-light"},buttonsStyling:!1}).then(function(e){e.value&&(e=t,$.ajax({type:"PUT",url:"/api/devices?",data:{deviceId:e},success:function(e){toastr.success(e.message,"Good News!"),s()},error:function(e){e=e.responseJSON?.message||"An unknown internal error occurred!";toastr.error(e,"Bad News!")}}))})})});