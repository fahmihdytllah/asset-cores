$(document).ready(function(){let t=$("#formCreate"),a=$("#formSetting"),o=$("#formBilling"),n=$("#modalCreate"),c=$("#modalSetting"),i=$("#billingId"),r=$("#billingType"),l=$("#billingPeriod");var e=$(".select2");let s={},d=!1,p=!1,u="new",m,b=null;b=new Tagify(document.querySelector("#keywords"),{whitelist:["Blogging","Finance","Insurance","Investement","Programming"],maxTags:20,dropdown:{maxItems:20,classname:"tags-inline",enabled:0,closeOnSelect:!1}}),e.length&&e.each(function(){var e=$(this);e.wrap('<div class="position-relative"></div>').select2({placeholder:"Choose option...",dropdownParent:e.parent(),allowClear:!1})});[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(e){return new bootstrap.Popover(e)});f(),$(".btn-create").click(function(){$("#step-1").show(),$("#step-2").hide(),t[0].reset(),n.modal("show")}),$(".btn-next").click(function(){$("#step-1").hide(),$("#step-2").show()}),$(".btn-prev").click(function(){$("#step-1").show(),$("#step-2").hide()}),$("#formCreate").submit(function(e){e.preventDefault()}),$(".btn-submit").click(function(){t.block({message:itemLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({url:"?",type:"POST",data:t.serialize(),success:function(e){f(),t.unblock(),n.modal("hide"),toastr.success(e.msg,"Good News!")},error:function(e){t.unblock();e=e.responseJSON?.msg;toastr.error(e,"Bad News!")}})}),a.submit(function(e){e.preventDefault(),a.block({message:itemLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}});var e=$(this).serializeArray(),t=b.value.map(e=>e.value);e.push({name:"keywords",value:JSON.stringify(t)}),$.ajax({url:"?",type:"PUT",data:e,success:function(e){f(),a.unblock(),a[0].reset(),c.modal("hide"),toastr.success(e.msg,"Good News!")},error:function(e){a.unblock();e=e.responseJSON?.msg;toastr.error(e,"Bad News!")}})}),$(document).on("click",".copy-key",function(){h($(this).data("key"))}),$(document).on("click",".key-setting",function(){var l;l=$(this).data("id"),$("#card-"+l).block({message:itemLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.get("?type=detail&id="+l,function({data:e,validators:t}){$(".fmi-locked").remove();for(var{type:a,selector:o,value:n}of e){o=$(o);o&&("boolean"==typeof n?n?o.prop("checked",!0):o.prop("checked",!1):"textarea"===a?o.val(n?.join("\n")):"select"===a?o.val(n).trigger("change"):"input"===a?o.val(n):"radio"===a?o.prop("checked",!0):"tags"===a&&(b.removeAllTags(),b.addTags(n)))}for(var s of t)for(var i of s.selectors){var i=$(i),r=i.parent();r.find("select")&&i.append(k(s.message)),r.find(".switch-label")&&r.find(".switch-label").append(k(s.message)),r.find(".form-check-label")&&r.find(".form-check-label").append(k(s.message)),r.find(".fmi-feature")&&r.find(".fmi-feature").append(k(s.message)),i.prop("disabled",!0)}g.Proxy(),g.ReadingControl(),g.AutoInteraction(),g.AutoAdClick(),g.AdNetwork(),g.SearchEngine(),g.CustomUserAgent(),g.CustomReferer(),$(".fmi-locked").tooltip(),$("#card-"+l).unblock(),c.modal("show")})}),$(document).on("click",".key-delete",function(){let t=$(this).data("id");Swal.fire({title:"Are you sure?",text:"Want to delete this Access Key permanently",icon:"question",showCancelButton:!0,confirmButtonText:"Yes",customClass:{confirmButton:"btn btn-primary waves-effect waves-light",cancelButton:"btn btn-outline-danger ms-2 waves-effect waves-light"},buttonsStyling:!1}).then(function(e){e.value&&(e=t,$.blockUI({message:itemLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({url:"?id="+e,type:"DELETE",success:function(e){f(),$.unblockUI(),toastr.success(e.msg,"Good News!")},error:function(e){$.unblockUI();e=e.responseJSON?.msg;toastr.error(e,"Bad News!")}}))})}),$(document).on("click",".show-key",function(){var e=$(this).data("id"),t=$(this).data("key");void 0===s[e]&&(s[e]=!1),s[e]?($("#key-"+e).html("******************"),$(this).html('<i class="ti ti-eye ti-sm"></i>')):($("#key-"+e).html(t),$(this).html('<i class="ti ti-eye-off ti-sm"></i>')),s[e]=!s[e]});let g={Proxy:()=>{$("#isProxy").is(":checked")?$("#proxys").prop("disabled",!1):$("#proxys").prop("disabled",!0)},ReadingControl:()=>{$("#isReadingControl").is(":checked")?$("#readingDuration").prop("disabled",!1):$("#readingDuration").prop("disabled",!0)},AutoInteraction:()=>{$("#isAutoInteraction").is(":checked")?($("#interactions").prop("disabled",!1),$("#repeatInteraction").prop("disabled",!1)):($("#interactions").prop("disabled",!0),$("#repeatInteraction").prop("disabled",!0))},AutoAdClick:()=>{$("#isAutoAdClick").is(":checked")?($("#repeatAdClick").prop("disabled",!1),$("#adType").prop("disabled",!1),$('[name="adType"]').prop("disabled",!1)):($("#repeatAdClick").prop("disabled",!0),$("#adType").prop("disabled",!0),$('[name="adType"]').prop("disabled",!0))},AdNetwork:()=>{"other"===$("#adNetwork").val()?$("#additionalAdConfig").prop("disabled",!1):$("#additionalAdConfig").prop("disabled",!0)},SearchEngine:()=>{$("#isSearchEngine").is(":checked")?($("#isRandomSearchEngine").prop("disabled",!1),$("#searchEngines").prop("disabled",!1),b.setReadonly(!1)):($("#isRandomSearchEngine").prop("disabled",!0),$("#searchEngines").prop("disabled",!0),$("#keywords").prop("disabled",!0),b.setReadonly(!0))},CustomUserAgent:()=>{$("#isCustomUserAgent").is(":checked")?$("#userAgents").prop("disabled",!1):$("#userAgents").prop("disabled",!0)},CustomReferer:()=>{$("#isCustomReferer").is(":checked")?$("#referers").prop("disabled",!1):$("#referers").prop("disabled",!0)}};function f(){$("#list-keys").html(""),$("#loadingKeys").show();let s={active:"label-success",pending:"label-warning",expired:"label-danger"},i={multi:{class:"btn-text-info",icon:"api-app"},blogger:{class:"btn-text-warning",icon:"brand-blogger"},wordpress:{class:"btn-text-info",icon:"brand-wordpress"},youtube:{class:"btn-text-youtube",icon:"brand-youtube"},tiktok:{class:"btn-text-dark",icon:"brand-tiktok"},instagram:{class:"btn-text-instagram",icon:"brand-instagram"},other:{class:"btn-text-secondary",icon:"filters"}};$.get("?type=json",function(e){$("#loadingKeys").hide(),0===e.data?.length?$("#list-keys").html(`<div class="col-md-12">
          <div class="bg-lighter rounded p-3 mb-3 position-relative">
            <span class="text-muted">You don't have an access key yet.
          </div>
        </div>`):e.data.forEach(e=>{var t="expired"===e.status&&"trial"!==e.plan||"pending"===e.status?'<button data-id="'+e._id+'" data-plan="'+e.plan+'" class="btn btn-label-primary btn-sm btn-buy rounded-pill mt-4 "><span class="ti-xs ti ti-wallet me-1"></span>'+("pending"===e.status?"Buy Now":"Renew")+"</button><br/>":"",a='<button class="dropdown-item btn-renew" data-id="'+e._id+'" data-plan="'+e.plan+'" ><i class="ti ti-wallet me-2"></i>Renew</button>',o='<button class="dropdown-item key-setting" data-id="'+e._id+'" ><i class="ti ti-settings-code me-2"></i>Setting</button>',n='<span class="btn btn-sm rounded-pill '+i[e.isMultiPlatform?"multi":e.platform].class+' me-2"> <i class="ti ti-'+i[e.isMultiPlatform?"multi":e.platform].icon+' ti-xs me-1_5"></i>'+(e.isMultiPlatform?"Multiple":e.platform.capitalize())+"</span>",o='<button class="btn dropdown-toggle dropdown-toggle-split hide-arrow cursor-pointer" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical"></i></button><div class="dropdown-menu">'+("active"===e.status?o:"")+("pending"!==e.status?a:"")+("pending"!==e.status||"active"===e.status?'<div class="dropdown-divider"></div>':"")+'<button class="dropdown-item text-danger key-delete" data-id="'+e._id+'" ><i class="ti ti-trash me-2"></i>Delete</button></div>';$("#list-keys").append('<div class="col-md-6 col-xl-4 mb-4"><div class="card card-key" id="card-'+e._id+'"><div class="card-body"><div class="d-flex justify-content-center justify-content-between"><h5 class="card-title">'+e.name+"</h5>"+("trial"===e.plan&&"expired"===e.status?"":o)+'</div><div class="d-flex align-items-center mb-6">'+n+'<span class="badge rounded-pill bg-label-primary me-2">'+e.plan.capitalize()+'</span><span class="badge rounded-pill bg-'+s[e.status]+'">'+e.status.capitalize()+'</span></div><div class="d-flex align-items-center"><p class="me-2 mb-0 fw-medium" id="key-'+e._id+'">******************</p> <span class="text-muted cursor-pointer me-2 show-key" data-id="'+e._id+'" data-key="'+e.accessKey+'"><i class="ti ti-eye ti-sm"></i></span><span class="text-muted cursor-pointer copy-key" data-key="'+e.accessKey+'"><i class="ti ti-copy ti-sm"></i></span></div>'+t+'</div><div class="card-footer"><span class="text-muted">Expires on '+((e,t="default")=>(e=new Date(e)).toLocaleDateString(t,{weekday:"short",year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))(e.expiredAt)+"</span></div></div></div>")})})}$("#isProxy").on("change",function(){g.Proxy()}),$("#isReadingControl").on("change",function(){g.ReadingControl()}),$("#isAutoInteraction").on("change",function(){g.AutoInteraction()}),$("#isAutoAdClick").on("change",function(){g.AutoAdClick()}),$("#adNetwork").on("change",function(){g.AdNetwork()}),$("#isSearchEngine").on("change",function(){g.SearchEngine()}),$("#isCustomUserAgent").on("change",function(){g.CustomUserAgent()}),$("#isCustomReferer").on("change",function(){g.CustomReferer()}),$("#applyPromo").click(function(){o.block({message:itemLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({url:"/api/applyPromo",data:o.serialize(),type:"POST",success:function(e){o.unblock(),$(".amount-subtotal").text(e.subtotal),$(".amount-discount").text(e.discount),$(".amount-total").text(e.total),d=!0,toastr.success(e.msg,"Good News!")},error:function(e){o.unblock();e=e.responseJSON?.msg;toastr.error(e,"Bad News!")}})}),$("#modalBilling").on("shown.bs.modal",function(){p=!0}),$("#modalBilling").on("hidden.bs.modal",function(){p=!1}),l.on("input",function(){var e=i.val(),t=r.val(),a=$(this).val();y(e,t,a)}),$("#decrease").on("click",function(){var e=parseInt(l.val()),t=i.val(),a=r.val();1<e&&(e--,l.val(e),y(t,a,e))}),$("#increase").on("click",function(){var e=parseInt(l.val()),t=i.val(),a=r.val();e<12&&(e++,l.val(e),y(t,a,e))}),r.on("change",function(){var e=i.val(),t=$(this).val();y(e,t)}),$(document).on("click",".btn-buy",function(){var e=$(this).data("id"),t=$(this).data("plan");u="new",r.prop("disabled",!1),y(e,t)}),$(document).on("click",".btn-renew",function(){var e=$(this).data("id"),t=$(this).data("plan");u="renew",r.prop("disabled",!0),y(e,t)}),o.submit(function(e){e.preventDefault();var e=i.val(),t=r.val(),a=l.val(),o=d?$("#promoCode").val():null;$.blockUI({message:itemLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({url:"/api/payment",data:{id:e,plan:t,code:o,mode:u,period:a},type:"POST",success:function(e){$.unblockUI(),e=e.token,JagoPay(e,{onSuccess:function(e){e=e,$.blockUI({message:itemLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({data:{orderId:e.referenceId,paymentMethod:e.paymentMethod.name},url:"/api/payment/process",type:"POST",success:function(e){$.unblockUI(),Swal.fire({title:"Good News!",text:"Your payment has been successful 🎉",icon:"success",customClass:{confirmButton:"btn btn-primary waves-effect waves-light"}}).then(()=>location.reload())},error:function(e){$.unblockUI();e=e.responseJSON?.msg;toastr.error(e,"Bad News!")}})},onPending:function(e){toastr.info(e.msg,"INFO!")},onError:function(e){toastr.error(e.msg,"Bad News!")},onClose:function(){toastr.warning("The payment window has closed!","WARNING!")}})},error:function(e){$.unblockUI();e=e.responseJSON?.msg;toastr.error(e,"Bad News!")}})});let y=(o,n,s)=>{clearTimeout(m),m=setTimeout(()=>{var t,a,e;t=o,a=n,e=s,p||$.blockUI({message:itemLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({data:{id:t,plan:a,period:e},url:"/api/billingInfo",type:"POST",success:function(e){p||$.unblockUI(),i.val(t),r.val(a),l.val(e.period),$(".amount-subtotal").text(e.subtotal),$(".amount-discount").text(e.discount),$(".amount-total").text(e.total),$("#modalBilling").modal("show")},error:function(e){p||$.unblockUI(),console.log(e)}})},600)};let k=e=>'<span class="cursor-pointer mb-1_5 px-1_5 fmi-locked" data-bs-toggle="tooltip" data-bs-placement="top" title="'+e+'"><i class="text-warning ti ti-lock"></i></span>',h=e=>{navigator.clipboard.writeText(e).then(()=>toastr.success("Successfully copied Access Key","Good News!")).catch(()=>console.log("Gagal mengcopy!"))};String.prototype.capitalize=function(){return this.split(" ").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}});