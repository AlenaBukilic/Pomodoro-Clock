$(document).ready(function(){

	$('#stopwatch').text('00:00');
	var totalBre = $('#break');
    var totalSes = $('#session');
    var numBr = 0;
    var numSes = 0;
    totalBre.text('5');
    totalSes.text('25');
    totalBre = 5;
    totalSes = 25;
   	var min = 0;
	var running = 0;
	var sec = 60;
	var active = 0;
	var alarm = new Audio('alarm.wav');
	var time;
	var pause = false;

	$('#plusbr').click(function(){
		numBr = totalBre + 1;
		totalBre = numBr;
		$('#break').text(numBr);
	});
	$('#minbr').click(function(){
		numBr = totalBre - 1;
		totalBre = numBr;
		$('#break').text(numBr);
	});
	$('#plusses').click(function(){
		numSes = totalSes + 1;
		totalSes = numSes;
		$('#session').text(numSes);
	});
	$('#minses').click(function(){
		numSes = totalSes - 1;
		totalSes = numSes;
		$('#session').text(numSes);
	});

	$('#play').click(function(){
		if(running == 0){
			running = 1;
			$('#title').text('Session');
			if(pause){
				decrement();
				pause = false;
			}
			else{
				min = totalSes;
				decrement();
				time = totalSes * 60 / 100;
				move();
			}
			
		}
	});
	$('#pause').click(function(){
		if (running == 1) {
			running = 0;
			$('#title').text('Pause');
			pause = true;
		}
	});
	$('#reset').click(function(){
		location.reload();
	});

	function decrement(){

		if (running == 1) {

			setTimeout(function(){
				
				if(min == 0 && sec == 0 && active == 0){
					alarm.play();
					$('#title').text('Break');
					active = 1;
					min = totalBre;
					sec = 60;
					time = totalBre * 60 / 100;
					move();
				}
				else if(min == 0 && sec == 0 && active == 1){
					alarm.play();
					$('#title').text('Session');
					active = 0;
					min = totalSes;
					sec = 60;
					time = totalSes * 60 / 100;
					move();
				}

				if(sec == 60){
					min--;
				}
				else if(sec == 0){
					sec = 60;
					min--;
				}
				sec--;

				if(min < 10 && sec >= 10) {
					$('#stopwatch').text('0' + min + ':' + sec);
				}
				else if(sec < 10 && min >= 10){
					$('#stopwatch').text(min + ':' + '0' + sec);
				}
				else if(min < 10 && sec < 10){
					$('#stopwatch').text('0' + min + ':' + '0' + sec);
				}
				else{
					$('#stopwatch').text(min + ':' + sec);
				}
				decrement();
					
			}, 1000);

		}
	}

		
	function move() {

	    var elem = $('#myBar');
	    var width = 1;
	    var id = setInterval(frame, time * 1000);

	    function frame(){
	        if (width >= 100) {
	        	clearInterval(id);
	        }
	        else if(pause){
	        	event.preventDefault();
	        }
	        else {
	        	width++; 
	           	elem.css("width", width + '%');  
	        } 
	    }
	    
	}

});
