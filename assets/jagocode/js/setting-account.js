document.addEventListener("DOMContentLoaded",function(e){{var d=document.querySelector("#formAccountSettings"),m=document.querySelector("#formAccountDeactivation");let t=m.querySelector(".deactivate-account"),n=document.querySelector(".btn-save"),o=$("#formAccountSettings"),a=d.querySelector('[name="username"]').value.trim();if(d){let t=FormValidation.formValidation(d,{fields:{name:{validators:{notEmpty:{message:"Please enter first name"}}},username:{validators:{notEmpty:{message:"Please enter username"},stringLength:{min:6,message:"Username must be more than 6 characters"},remote:{enabled:!1,message:"Username already exists!",method:"POST",url:"/api/check-username",delay:500}}}},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap5:new FormValidation.plugins.Bootstrap5({eleValidClass:"",rowSelector:".col-md-6"}),autoFocus:new FormValidation.plugins.AutoFocus,submitButton:new FormValidation.plugins.SubmitButton},init:e=>{e.on("plugins.message.placed",function(e){e.element.parentElement.classList.contains("input-group")&&e.element.parentElement.insertAdjacentElement("afterend",e.messageElement)})}});d.querySelector('[name="username"]').addEventListener("input",function(e){e.target.value.trim()===a?t.disableValidator("username"):t.enableValidator("username")}),t.on("core.validator.validated",function(e){"username"===e.field&&"remote"===e.validator&&(e.result.valid?n.removeAttribute("disabled"):n.setAttribute("disabled","disabled"))}),t.on("core.form.valid",function(){o.block({message:elementLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({type:"POST",url:"?",data:$(o).serialize(),success:function(e){o.unblock(),Swal.fire({icon:"success",title:"Good Job!",text:e.msg,customClass:{confirmButton:"btn btn-success waves-effect waves-light"}})},error:function(e){o.unblock();e=e.responseJSON?.msg;Swal.fire({icon:"error",title:"Opps!",text:e||"There is an error!",customClass:{confirmButton:"btn btn-danger waves-effect waves-light"}})}})})}m&&FormValidation.formValidation(m,{fields:{accountActivation:{validators:{notEmpty:{message:"Please confirm you want to delete account"}}}},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap5:new FormValidation.plugins.Bootstrap5({eleValidClass:""}),submitButton:new FormValidation.plugins.SubmitButton,fieldStatus:new FormValidation.plugins.FieldStatus({onStatusChanged:function(e){e?t.removeAttribute("disabled"):t.setAttribute("disabled","disabled")}})},init:e=>{e.on("plugins.message.placed",function(e){e.element.parentElement.classList.contains("input-group")&&e.element.parentElement.insertAdjacentElement("afterend",e.messageElement)})}});let e=document.querySelector("#accountActivation"),r=(t&&(t.onclick=function(){1==e.checked&&Swal.fire({text:"Are you sure you would like to deactivate your account?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes",customClass:{confirmButton:"btn btn-primary me-2 waves-effect waves-light",cancelButton:"btn btn-label-secondary waves-effect waves-light"},buttonsStyling:!1}).then(function(e){var t;e.value?(t=e.value,$.blockUI({message:elementLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({type:"DELETE",url:"?screet="+t,success:function(e){$.unblockUI(),Swal.fire({icon:"success",title:"Good Job!",text:e.msg,customClass:{confirmButton:"btn btn-success waves-effect waves-light"}}).then(()=>window.location.href="/auth/login")},error:function(e){$.unblockUI();e=e.responseJSON?.msg;Swal.fire({icon:"error",title:"Opps!",text:e,customClass:{confirmButton:"btn btn-danger waves-effect waves-light"}})}})):e.dismiss===Swal.DismissReason.cancel&&Swal.fire({title:"Cancelled",text:"Deactivation Cancelled!!",icon:"error",customClass:{confirmButton:"btn btn-success waves-effect waves-light"}})})}),document.getElementById("uploadedAvatar")),s,i=document.querySelector(".account-file-input"),l=(d=document.querySelector(".account-image-reset"),document.getElementById("avatarCropped")),c=$("#modalCropped"),u=$(".btn-crop");if(c.on("shown.bs.modal",function(){s=new Cropper(l,{aspectRatio:1,viewMode:3})}).on("hidden.bs.modal",function(){s.destroy(),s=null}),r){let e=r.src;i.onchange=()=>{var e;i.files[0]&&(e=window.URL.createObjectURL(i.files[0]),$(".btn-save").prop("disabled",!0),c.modal("show"),l.src=e),u.on("click",function(){let n;var e;c.modal("hide"),s&&(e=s.getCroppedCanvas({width:150,height:150}),n=r.src,r.src=e.toDataURL(),e.toBlob(function(e){var t=new FormData;t.append("file",e,"avatar.jpg"),$.ajax("https://api.jagocode.my.id/upload?type=avatar&service=aws",{method:"POST",data:t,processData:!1,contentType:!1,mimeType:"multipart/form-data",xhr:function(){var e=new XMLHttpRequest;return e.upload.onprogress=function(e){e.lengthComputable&&(e=Math.round(e.loaded/e.total*100),console.log("Upload progress: "+(e+"%")))},e},success:function(e){e=JSON.parse(e);r.src=e.fileUrl,$("#avatar").val(e.fileUrl)},error:function(){r.src=n,console.log("Upload error...")},complete:function(){$(".btn-save").prop("disabled",!1)}})}))})},d.onclick=()=>{i.value="",r.src=e}}}}),$(function(){var e=$(".select2");let t=$("#phoneCountry"),n=$("#phoneCode");e.length&&e.each(function(){var e=$(this);e.wrap('<div class="position-relative"></div>').select2({placeholder:"Select value",dropdownParent:e.parent()})}),t&&$.get("https://ipwhois.app/json/",function(e){t.val(e.country_phone.replace("+","")),n.html(e.country_code+` (${e.country_phone})`)})});