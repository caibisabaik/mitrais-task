window.httpRequest = (url, method = 'GET', data = null, headers = []) => {
    return new Promise( (resolve, reject) => {
        var xmlhttp;
		xmlhttp = new XMLHttpRequest();
        xmlhttp.withCredentials = true;
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4){
                if(xmlhttp.status == 200){
                    var ct = xmlhttp.getResponseHeader("content-type") || "";
                    if (ct.indexOf('json') > -1) {
                        try{
                            let json = JSON.parse(xmlhttp.responseText);
                            resolve(json);
                        }
                        catch(e){
                            resolve(xmlhttp.responseText);
                        }
                    } 
                    else{
                        resolve(xmlhttp.responseText);
                    }
                }
                else{
                    reject(xmlhttp.status);
                }
            }
        }
        try{
            xmlhttp.open(method, url, true);
            for (const header of headers) {
                xmlhttp.setRequestHeader(header[0], header[1]);
            }
            xmlhttp.send(data);
        }
        catch(e){
            reject(e);
        }
    });
};