const zeroPad = (num, places) => String(num).padStart(places, '0')

export function readBinaryFile(global, file, numsamples, callback, gallery)
{
	var binary_vec = [];
	var float_data = [];
	var reader = new FileReader();
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, true);
  rawFile.responseType = "arraybuffer";
	rawFile.overrideMimeType('text\/plain; charset=x-user-defined');


	rawFile.onreadystatechange = function (){
    	if(rawFile.readyState === 4){
    	
        	if(rawFile.status === 200 || rawFile.status == 0){
            var buf = rawFile.response;
            float_data = new Float32Array(buf);
            callback(global, float_data, numsamples, gallery);
              			
        	}
    	}
	}
	rawFile.send(null);
	return float_data;
}
