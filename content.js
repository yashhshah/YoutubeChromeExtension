var url = [];
var times = [];
var timeCounter = [];
var oldUrl = window.location.href;
//if(!oldUrl.includes("https://www.youtube.com/watch?v=")){
	//url.push(oldUrl)

//}

var y = 0;

var once = 0;


function urlChange(){
	
	
	
	if(oldUrl!=window.location.href && !url.includes(window.location.href)){
		
		
		url.push(oldUrl)
		times.push(timeCounter[timeCounter.length -1])
		timeCounter = [];		
		oldUrl = window.location.href
		
		
	
	}

	else if(oldUrl!=window.location.href && url.includes(window.location.href)){
		url.push(oldUrl)
		times.push(timeCounter[timeCounter.length -1])
		timeCounter = [];		
		oldUrl = window.location.href
		
	
	
	 
		if(window.location.href.includes("https://www.youtube.com/watch?v=")){
		var indexInMind = url.indexOf(window.location.href); 
		console.log(times);
		var timeIndex = times[indexInMind]; 
		var i = Math.round(timeIndex); 
		var min = Math.floor(i/60);
		var sec = i-min;
		
		
		url[indexInMind] = oldUrl+"&t="+min+"m"+sec+"s";
		
		window.location.replace(oldUrl+"&t="+min+"m"+sec+"s");
		
		
	
	

		
	
		}
	}

	



	else{
		

		if(oldUrl.includes("https://www.youtube.com/watch?v=")){
				var y =document.getElementsByClassName("video-stream html5-main-video")[0].currentTime;

 				timeCounter.push(y);
				y=0;
				
		
		
		}
		
		
	
	}



}




window.setInterval(urlChange,1000)
















