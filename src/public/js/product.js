const spanYear = document.querySelector('#full-year')
const yearSpan = new Date().getFullYear()
if(spanYear) spanYear.textContent = new Date().getFullYear()
spanYear.textContent = yearSpan
let welcome;  
    let date = new Date();  
    let hour = date.getHours();  
    let minute = date.getMinutes();  
    let second = date.getSeconds();  
    if (minute < 10) {  
      minute = "0" + minute;  
    }  
    if (second < 10) {  
      second = "0" + second;  
    }  
    if (hour < 12) {  
      welcome = "morning";  
    } else if (hour < 17) {  
      welcome = "afternoon";  
    } else {  
      welcome = "evening";  
    } 

function display(val){
  if(event.key === 'Enter'){
		if((val.value).length > 0){
			  console.log(val.value)
    	customAlert(`searching for: "${val.value}"`, 3500)
		}else{
			customWarn('Type something',1500)
		}
  }
}


$(document).ready(function(){
	const body = document.querySelector('body');
	const toggled = document.getElementById('toggle');
	const media = window.matchMedia("(min-width:700px)")

toggled.onclick = function(){
		body.classList.toggle('light');
	toggled.classList.toggle('active')
}
	if(media.matches){
		console.log(true)
		$('#dashboard').mouseenter(function(){
		this.innerHTML = `good
    ${welcome}`;
	});
	$('#dashboard').mouseleave(function(){
		this.innerHTML = "DASHBOARD";
	});
	$('#kleenpulse').mouseenter(function(){
		this.innerHTML = "welcome";
	});
	$('#kleenpulse').mouseleave(function(){
		this.innerHTML = "Bon appetit";
	});
	}else{
		console.log(false)
	}



})

function customAlert(msg, duration) {
	var styler = document.createElement("div");
	styler.className = 'dis-wrap'

	styler.innerHTML = "<h1 class='display'>" + msg + "</h1>";
	setTimeout(function () {
		styler.parentNode.removeChild(styler);
	}, duration);
	document.body.appendChild(styler);
}

function customWarn(msg, duration) {
	var styler = document.createElement("div");
	styler.className = 'dis-warn'

	styler.innerHTML = "<h1 class='display'>" + msg + "</h1>";
	setTimeout(function () {
		styler.parentNode.removeChild(styler);
	}, duration);
	document.body.appendChild(styler);
}

console.log('products frontend javascript file')

$(function() {
	$(".dish-container").hide();
	$('.product-collection').on("change", () => {
		const selectedValue = $('.product-collection').val();
		if(selectedValue === 'DRINK'){
			$('#product-volume').show();
			$('#product-collection').hide();
		} else{
			$('#product-volume').hide();
			$('#product-collection').show();
		}
	})
	$("#process-btn").on("click", () => {
      $(".dish-container").slideToggle(500);
      $("#process-btn").css("display", "none");
    });
	 $("#cancel-btn").on("click", () => {
      $(".dish-container").slideToggle(100);
      $("#process-btn").css("display", "flex");
    });
	  $(".product-status").on("change", async  function(e) {
      const id = e.target.id,
      productStatus =$(`#${id}.product-status`).val();

	  try {
		const response = await axios.post(`/admin/product/${id}`, {productStatus: productStatus});
        console.log("response:", response);
        const result = response.data;
		if (result.data){
          $(".product-status").blur();
        } else alert("Product updated failed!");
	  } catch (err) {
		console.log(err);
        alert("Product update failed!");
	  }
	   });
	    });

function validateForm(){
	const productName = $('product-name').val();
	const productPrice = $('product-price').val();
	const productLeftCount = $('product-left-count').val();
	const productCollection = $('.product-collection').val();
	const productDesc = $('product-desc').val();
	const productStatus = $('product-status').val();

	 
	if(	productName === '' ||
		productPrice === '' ||
		productLeftCount === '' ||
		productCollection === '' ||
		productDesc === '' ||
		productStatus === '' )
	 { alert('All fields are required');
	return false;
	} else return true
}

function previewFileHandler(input, order){
	const imgClassName = input.className;
	console.log('input', input);

	const file = $(`.${imgClassName}`).get(0).files[0];
	const fileType = file['type'];
	const validateImageType = ['image/jpeg', 'image/jpg', 'image/png'];

	if(!validateImageType.includes(fileType)){
		alert('Please select a valid image file');
	} else{
		if(file){
			const reader = new FileReader();
			reader.onload = function(){
				$( `#image-section-${order}`).attr('src', reader.result);
			};
			reader.readAsDataURL(file);
		}
	}
}

