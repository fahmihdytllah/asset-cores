$(document).ready(function(){let e,n,a;a=(isDarkStyle?(e=config.colors_dark.borderColor,n=config.colors_dark.bodyBg,config.colors_dark):(e=config.colors.borderColor,n=config.colors.bodyBg,config.colors)).headingColor;let s,o,r=$(".formEditReview"),t=$(".datatables-review"),i={Pending:{title:"Pending",class:"bg-label-warning"},Published:{title:"Published",class:"bg-label-success"}};$(document).on("click",".review-delete",function(){let n=$(this),a=n.data("id");Swal.fire({text:"Are you sure you want to remove this Review?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes",customClass:{confirmButton:"btn btn-primary waves-effect waves-light",cancelButton:"btn btn-outline-danger ms-2 waves-effect waves-light"},buttonsStyling:!1}).then(function(t){var e;t.value&&(e=n,t=a,$.blockUI({message:elementLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({url:"review/"+t,type:"DELETE",success:function(t){$.unblockUI(),o.row(e.parents("tr")).remove().draw(),Swal.fire({title:"Good job!",text:t.msg,icon:"success",customClass:{confirmButton:"btn btn-primary waves-effect waves-light"},buttonsStyling:!1})},error:function(t){$.unblockUI();t=t.responseJSON.msg;Swal.fire({title:"Upss!",text:t||"There is an error!",icon:"error",customClass:{confirmButton:"btn btn-primary waves-effect waves-light"},buttonsStyling:!1})}}))})}),$(document).on("click",".review-edit",function(){var e,t=$(this).data("id");e=t,$.blockUI({message:elementLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({url:"review/"+e,type:"GET",success:function(t){$.unblockUI(),s=e,$("#editStatus").val(t.status),$("#editComment").val(t.comment),$("#modalEditReview").modal("show")},error:function(t){$.unblockUI();t=t.responseJSON.msg;Swal.fire({title:"Upss!",text:t||"There is an error!",icon:"error",customClass:{confirmButton:"btn btn-primary waves-effect waves-light"},buttonsStyling:!1})}})}),r.submit(function(t){t.preventDefault(),r.block({message:elementLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({url:"review/"+s,type:"PUT",data:$(this).serialize(),success:function(t){r.unblock(),r[0].reset(),$("#modalEditReview").modal("hide"),o.ajax.reload(),Swal.fire({title:"Good job!",text:t.msg,icon:"success",customClass:{confirmButton:"btn btn-primary waves-effect waves-light"},buttonsStyling:!1})},error:function(t){r.unblock();t=t.responseJSON.msg;Swal.fire({title:"Upss!",text:t||"There is an error!",icon:"error",customClass:{confirmButton:"btn btn-primary waves-effect waves-light"},buttonsStyling:!1})}})}),t.length&&(o=t.DataTable({ajax:{url:"?type=json",type:"GET",beforeSend:function(){$(".card").block({message:elementLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}})},complete:function(){$(".card").unblock()}},columns:[{data:""},{data:"user"},{data:"comment"},{data:"createdAt"},{data:"status"},{data:""}],columnDefs:[{className:"control",searchable:!1,orderable:!1,responsivePriority:2,targets:0,render:function(t,e,n,a){return""}},{targets:1,responsivePriority:1,render:function(t,e,n,a){var s=n.user?.username,o=n.user?.phoneNumber?n.user.phoneCode+n.user.phoneNumber:n.user.email,r=n.user?.avatar;return'<div class="d-flex justify-content-start align-items-center customer-name"><div class="avatar-wrapper"><div class="avatar me-2">'+(r?'<img src="'+r+'" alt="Avatar" class="rounded-circle">':'<span class="avatar-initial rounded-circle bg-label-'+["success","danger","warning","info","dark","primary","secondary"][Math.floor(6*Math.random())]+'">'+(r=(((r=(s=n.reviewer).match(/\b\w/g)||[]).shift()||"")+(r.pop()||"")).toUpperCase())+"</span>")+'</div></div><div class="d-flex flex-column"><a href="#"><span class="fw-medium">'+s+'</span></a><small class="text-muted text-nowrap">'+o+"</small></div></div>"}},{targets:2,responsivePriority:2,sortable:!1,render:function(t,e,n,a){var s=n.rating,n=n.comment,o=$('<div class="read-only-ratings ps-0 mb-2"></div>');return o.rateYo({rating:s,rtl:isRtl,readOnly:!0,starWidth:"20px",spacing:"3px",starSvg:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" /></svg>'}),"<div>"+o.prop("outerHTML")+'<small class="text-break pe-3">'+n+"</small></div>"}},{targets:3,render:function(t,e,n,a){return'<span class="text-nowrap">'+new Date(n.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})+"</span>"}},{targets:-2,render:function(t,e,n,a){n=n.status;return'<span class="badge '+i[n].class+'" text-capitalize>'+i[n].title+"</span>"}},{targets:-1,title:"Actions",searchable:!1,orderable:!1,render:function(t,e,n,a){return'<div class="d-inline-block text-xxl-center"><button class="btn btn-sm btn-icon review-edit" data-id="'+n._id+'"><i class="text-primary ti ti-pencil"></i></button><button class="btn btn-sm btn-icon review-delete" data-id="'+n._id+'"><i class="text-danger ti ti-trash"></i></button></div>'}}],dom:'<"card-header d-flex align-items-md-center pb-md-2 flex-wrap"<"me-5 ms-n2"f><"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-end align-items-md-center justify-content-md-end pt-0 gap-2 flex-wrap"l<"review_filter"> <"mx-0 me-md-n3 mt-sm-0"B>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',language:{sLengthMenu:"_MENU_",search:"",searchPlaceholder:"Search Review"},buttons:[{extend:"collection",className:"btn btn-label-secondary dropdown-toggle ms-2 me-3 mt-2 mt-sm-0 waves-effect waves-light",text:'<i class="ti ti-download me-1"></i>Export',buttons:[{extend:"print",text:'<i class="ti ti-printer me-2" ></i>Print',className:"dropdown-item",exportOptions:{columns:[1,2,3,4],format:{body:function(t,e,n){var a;return t.length<=0?t:(t=$.parseHTML(t),a="",$.each(t,function(t,e){void 0!==e.classList&&e.classList.contains("customer-name")?a+=e.lastChild.firstChild.textContent:void 0===e.innerText?a+=e.textContent:a+=e.innerText}),a)}}},customize:function(t){$(t.document.body).css("color",a).css("border-color",e).css("background-color",n),$(t.document.body).find("table").addClass("compact").css("color","inherit").css("border-color","inherit").css("background-color","inherit")}},{extend:"csv",text:'<i class="ti ti-file me-2" ></i>Csv',className:"dropdown-item",exportOptions:{columns:[1,2,3,4],format:{body:function(t,e,n){var a;return t.length<=0?t:(t=$.parseHTML(t),a="",$.each(t,function(t,e){void 0!==e.classList&&e.classList.contains("customer-name")?a+=e.lastChild.firstChild.textContent:void 0===e.innerText?a+=e.textContent:a+=e.innerText}),a)}}}},{extend:"excel",text:'<i class="ti ti-file-export me-2"></i>Excel',className:"dropdown-item",exportOptions:{columns:[1,2,3,4],format:{body:function(t,e,n){var a;return t.length<=0?t:(t=$.parseHTML(t),a="",$.each(t,function(t,e){void 0!==e.classList&&e.classList.contains("customer-name")?a+=e.lastChild.firstChild.textContent:void 0===e.innerText?a+=e.textContent:a+=e.innerText}),a)}}}},{extend:"pdf",text:'<i class="ti ti-file-text me-2"></i>Pdf',className:"dropdown-item",exportOptions:{columns:[1,2,3,4],format:{body:function(t,e,n){var a;return t.length<=0?t:(t=$.parseHTML(t),a="",$.each(t,function(t,e){void 0!==e.classList&&e.classList.contains("customer-name")?a+=e.lastChild.firstChild.textContent:void 0===e.innerText?a+=e.textContent:a+=e.innerText}),a)}}}},{extend:"copy",text:'<i class="ti ti-copy me-2"></i>Copy',className:"dropdown-item",exportOptions:{columns:[1,2,3,4],format:{body:function(t,e,n){var a;return t.length<=0?t:(t=$.parseHTML(t),a="",$.each(t,function(t,e){void 0!==e.classList&&e.classList.contains("customer-name")?a+=e.lastChild.firstChild.textContent:void 0===e.innerText?a+=e.textContent:a+=e.innerText}),a)}}}}]}],responsive:{details:{display:$.fn.dataTable.Responsive.display.modal({header:function(t){return"Details of "+t.data().user.username}}),type:"column",renderer:function(t,e,n){n=$.map(n,function(t,e){return""!==t.title?'<tr data-dt-row="'+t.rowIndex+'" data-dt-column="'+t.columnIndex+'"><td>'+t.title+":</td> <td>"+t.data+"</td></tr>":""}).join("");return!!n&&$('<table class="table"/><tbody />').append(n)}}},initComplete:function(){this.api().columns(4).every(function(){var e=this,n=$('<select id="Review" class="form-select"><option value=""> All </option></select>').appendTo(".review_filter").on("change",function(){var t=$.fn.dataTable.util.escapeRegex($(this).val());e.search(t?"^"+t+"$":"",!0,!1).draw()});e.data().unique().sort().each(function(t,e){n.append('<option value="'+t+'" class="text-capitalize">'+t+"</option>")})})}}),$(".dataTables_length").addClass("mt-0 mt-md-3")),setTimeout(()=>{$(".dataTables_filter .form-control").removeClass("form-control-sm"),$(".dataTables_length .form-select").removeClass("form-select-sm")},300)});