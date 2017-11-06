var recording = false;
function playNote(note) {
	var noteID = note.id + "-note";
	var noteAudio = document.getElementById(noteID);
	noteAudio.currentTime = 0;
	noteAudio.play();
}

function toggleRecording(btn) {
	if(btn.id === "record") {
		recording = true;
	} else {
		recording = false;
	}
}

function recordNote(note) {
	if(recording === true) {
		var recorded = document.getElementById("recording");
		var box = '<div id="' + note.id + '" class="box recorded"></div>';
		recorded.innerHTML += box;
	}
}

function playRecording() {
	recording = false;
	var recordingDiv = document.getElementById("recording");
	var children = recordingDiv.getElementsByTagName("div");
	(function playAll (i) {          
   		setTimeout(function () {  
      		var note = document.getElementById(children[children.length - 1 - i].id + "-note");
			note.currentTime = 0; 
			note.play();             
      		if (i > 0) {
      			i--;
      			playAll(i);
      		}    
   		}, 500)
	})(children.length-1);  

}

function dragNote(note) {
	var noteAudio = document.getElementById(note.id + "-note");
	var box = '<div id="' + note.id + '" class="box dragged"></div>';
	box.addEventListener('drag', drag, false);
	document.body.addEventListener('dragover',dragOver,false);
	document.body.addEventListener('drop',drop,false); 
	//create a small version 

}

function drag(event) {
	console.log("drag");
	var style = window.getComputedStyle(event.target, null);
	 event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
}

function dragOver(event){

 event.preventDefault();
    return false;
}

function drop(event) {

var offset = event.dataTransfer.getData("text/plain").split(',');
    var dm = document.getElementById('dragme');
    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
    return false;
}