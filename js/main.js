
window.onload = function () {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back"){
        	try {
        	    tizen.application.getCurrentApplication().exit();
        	} catch (ignore) {
        		
        	}
        }
    });

    // Sample code
    var textbox = document.querySelector('.contents');
    textbox.addEventListener("click", onClick);
};

function onClick(){
	box = document.querySelector('#textbox');
	box.innerHTML = box.innerHTML == "Basic" ? "Sample" : "Basic";
	
	tizen.ppm.requestPermission("http://tizen.org/privilege/healthinfo", onsuccessPermission, onErrorPermission);
}

var counter = 0;

function onchangedCB(hrmInfo) {
    console.log('Heart Rate: ' + hrmInfo.heartRate);
    console.log('Peak-to-peak interval: ' + hrmInfo.rRInterval + ' milliseconds');

    box = document.querySelector('#textbox');
	box.innerHTML = "rRInt: " + hrmInfo.rRInterval;
    
    //counter++;
    //if (counter > 10) {
    //    /* Stop the sensor after detecting a few changes */
    //    tizen.humanactivitymonitor.stop('HRM');
    //}
}

function onwristChangedCB() {
    console.log('You are looking at your smart watch');
}

function onerrorCB(error) {
    console.log('Error occurred: ' + error.message);
}

function onErrorPermission(error){
	console.log('Permission error occurred: ' + error.message);
}

function onsuccessPermission(){
	tizen.humanactivitymonitor.start('HRM', onchangedCB, onerrorCB);
	tizen.humanactivitymonitor.start('WRIST_UP', onwristChangedCB);
	
	box = document.querySelector('#textbox');
	box.innerHTML = "STARTED";
}
