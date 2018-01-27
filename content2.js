//////////////////////////////////////
//				    //
// Yash Shah			    //
// 				    //
// Youtube Chrome Extension	    //
//				    //
//			            //
//////////////////////////////////////



//set runsite to be youtube
runsite = "https://www.youtube.com/"
oldUrl = getUrl()  

//if currently not on youtube
if(!oldUrl.includes(runsite) || oldUrl==runsite){
	oldUrl = ""
}

//set arrays and variables
timeStamps = []
finalTimes = []
urlVisits = []
originalUrl = []
oldUrl2 = ""


//get current time stamp of youtube video
function getTimeStamp(){
	return document.getElementsByClassName("video-stream html5-main-video")[0].currentTime
}


//get current url
function getUrl(){
	return window.location.href
}

//convert cookies to Array- function that will be used in the future, not used currently
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


//gets url visits from given cookie
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

//main function-runs every 2 seconds
function main(){

	currUrl = getUrl()
	getIndex = urlVisits.indexOf(currUrl)
	
	if(urlVisits==[]){
		urlVisits = JSON.parse(urlVisits)
	}
	console.log(document.cookie)
	console.log(urlVisits)

	if(currUrl.includes(runsite) && currUrl!=runsite && getIndex!=-1){
		urlVisits[getIndex] = originalUrl[getIndex]+finalTimes[getIndex]
		urlVisits.push(oldUrl)
		urlVisits.push(finalTimes.slice(0))
		urlVisits.push(originalUrl.slice(0))
		document.cookie=JSON.stringify(urlVisits)
		//document.cookie+=JSON.stringify(finalTimes)
		//document.cookie+=JSON.stringify(originalUrl)
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
			
			
			oldUrl = getUrl() 
			timeStamps = []	
		}
	
		
		else if (oldUrl==currUrl){
			timeStamps.push(getTimeStamp())	
		
	
		}

		else{
		
			oldUrl = currUrl
		}	
	}
}


//run main every 2 seconds
window.setInterval(main, 2000)
