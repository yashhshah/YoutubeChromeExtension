


runsite = "https://www.youtube.com/"
oldUrl = getUrl()  

if(!oldUrl.includes(runsite) || oldUrl==runsite){
	oldUrl = ""

}
timeStamps = []
finalTimes = []
urlVisits = []
originalUrl = []
oldUrl2 = ""



function getTimeStamp(){
	return document.getElementsByClassName("video-stream html5-main-video")[0].currentTime
}


function getUrl(){

	return window.location.href
}

function convertToArray(rawstring, myArray){
	currString = rawstring.substring(1)
	initialIndex = rawstring.indexOf(",")

	while (initialIndex!=-1){
		beginString = currString.substring(2, initialIndex-2)
		myArray.push(beginString)
		currString = currString.substring(initialIndex)
		initialIndex = currString.indexOf(",")
		
	}

	lastString = currString.substring(1, currString.indexOf("]")-1)
	myArray.push(lastString)
	return myArray
	

}

function getUrlVisits(docCookie){
	initialIndex = docCookie.indexOf(";")
	restAnalyze = docCookie
	//initialAnalyze = docCookie.substring(0,initialIndex+1)
	//restAnalyze = docCookie.substring(initialIndex+1)
	while(initialIndex!=-1){
		restAnalyze = restAnalyze.substring(initialIndex+1)
		initialIndex = restAnalyze.indexOf(";")
	}
	if(restAnalyze.includes("http")){
		return convertToArray(restAnalyze, [])
	}
	else{
		return 0
	}

	



}


function main(){

	currUrl = getUrl()
	getIndex = urlVisits.indexOf(currUrl)
	
	if(urlVisits==[]){
		urlVisits = JSON.parse(urlVisits)
	}
	potUrlVisits = getUrlVisits(document.cookie)
	if(potUrlVisits!=0){
		urlVisits = potUrlVisits.slice()
	}
	console.log(urlVisits)

	if(currUrl.includes(runsite) && currUrl!=runsite && getIndex!=-1){
		urlVisits[getIndex] = originalUrl[getIndex]+finalTimes[getIndex]
		urlVisits.push(oldUrl)
		document.cookie=JSON.stringify(urlVisits)
		window.location = originalUrl[getIndex]+finalTimes[getIndex]		
	
	}	

	else if(currUrl.includes(runsite) && currUrl!=runsite){
		
		if(oldUrl!=currUrl && oldUrl!=""){
			
			final_time = timeStamps[timeStamps.length-1]			
			final_min =Math.floor(final_time/60) 
			final_sec = Math.ceil(final_time - (final_min*60))
			if(final_sec<10){
				final_sec = "0"+final_sec
			}

			finalTimes.push("#t="+final_min+"m"+final_sec+"s")
			//console.log(finalTimes)
			if(oldUrl.indexOf("#t")!=-1){
				oldUrl2 = oldUrl.substring(0, oldUrl.indexOf("#t"))
				
			}
			//console.log(oldUrl)
			urlVisits.push(oldUrl)
			if(oldUrl2!=""){
				originalUrl.push(oldUrl2)			
			}
			else{
				originalUrl.push(oldUrl)
			}
			
			
			//console.log(originalUrl[originalUrl.length-1])
			oldUrl = getUrl() 
			timeStamps = []
			//window.location = "https://www.google.ca"
	
		}
	
		
		else if (oldUrl==currUrl){
			timeStamps.push(getTimeStamp())	
		
	
		}

		else{
		
			oldUrl = currUrl
		}
	
	
	
	
	
	
	}
	

	


}

window.setInterval(main, 2000)
