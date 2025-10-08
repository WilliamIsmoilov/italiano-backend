const spanYear = document.querySelector('#full-year')
const yearSpan = new Date().getFullYear()
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
		this.innerHTML = "LiquidTime";
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



console.log("Users frontend javascript file");

$(function() {
    $(".member-status").on("change", function(e) {
        const id = e.target.id;
        const memberStatus = $(`#${id}.member-status`).val();

        axios
        .post("/admin/user/edit", {
            _id: id,
            memberStatus: memberStatus,
        }) .then(response =>{
            console.log("response: ", response);
            const result = response.data;

            if( result.data) {
                console.log("User updated successfully");
                $(".member-status").blur();
            } else alert("User update failed");
        })
        .catch((err) => {
            console.log(err);
            alert("User update failed")
        })
    });

    //Axios updatechosen
});


