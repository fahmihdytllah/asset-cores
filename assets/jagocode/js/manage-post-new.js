$(function(){var e=document.querySelector(".comment-editor"),t=document.querySelector("#post-date"),o=document.querySelector("#post-category"),n=$(".select2");let a=null;firebase.initializeApp({apiKey:"AIzaSyClXd1AAB_Nzlm52X4GB7V9TR0Rv8YCu1w",authDomain:"jago-code.firebaseapp.com",projectId:"jago-code",storageBucket:"jago-code.appspot.com",messagingSenderId:"733341114140",appId:"1:733341114140:web:aee7d8fd24e979e9bba4d9",measurementId:"G-4CDRVEBPJD"});let l=firebase.storage();n.length&&n.each(function(){var e=$(this);e.wrap('<div class="position-relative"></div>').select2({dropdownParent:e.parent(),placeholder:e.data("placeholder")})}),$("#changeView").on("change",function(){"html"===this.value?($("#content-html").show(),$("#content-text").hide(),$("#content-html").val(a.root.innerHTML)):($("#content-text").show(),$("#content-html").hide(),a.clipboard.dangerouslyPasteHTML($("#content-html").val()))}),e&&(a=new Quill(e,{modules:{toolbar:{container:[[{font:[]}],[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{script:"sub"},{script:"super"}],[{list:"ordered"},{list:"bullet"}],[{align:[]}],["blockquote","code-block"],["link","image","video"],["clean"]],handlers:{image:function(){let e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("accept","image/*"),e.click(),e.onchange=function(){var t=e.files[0];if(t){let e=l.ref().child("posts/"+t.name).put(t);e.on("state_changed",e=>{e=e.bytesTransferred/e.totalBytes*100;console.log("Upload progress: "+e+"%")},e=>{console.error("Error uploading file: ",e)},()=>{e.snapshot.ref.getDownloadURL().then(e=>{var t=a.getSelection();a.insertEmbed(t.index,"image",e)})})}}}}}},placeholder:"Product Description",theme:"snow"}));new Tagify(o,{whitelist:["SaaS Software","Web Development","Mobile App","Design","Other"],maxTags:10,dropdown:{maxItems:10,enabled:0,closeOnSelect:!1}});n=new Date;t&&t.flatpickr({defaultDate:n}),$(".btn-discard").click(function(){window.location.href="/blog"}),$(".btn-publish").click(function(){var e=JSON.parse($("#post-category").val()).map(function(e){return e.value});$("#content-text").is(":visible")&&$("#content-html").val(a.root.innerHTML),$.blockUI({message:elementLoader,css:{backgroundColor:"transparent",border:"0"},overlayCSS:{backgroundColor:"#fff",opacity:.8}}),$.ajax({url:"?",type:"POST",data:JSON.stringify({title:$("#post-title").val(),content:$("#content-html").val(),labels:e,status:$("#post-status").val(),publishedAt:$("#post-date").val()}),contentType:"application/json",success:function(e){$.unblockUI(),Swal.fire({title:"Good job!",text:e.msg,icon:"success",customClass:{confirmButton:"btn btn-success waves-effect waves-light"}}),setTimeout(function(){window.location.href="/blog"},2e3)},error:function(e){$.unblockUI();e=e.responseJSON?.msg;Swal.fire({title:"Upss!",text:e||"There is an error!",icon:"error",customClass:{confirmButton:"btn btn-primary"}})}})})});