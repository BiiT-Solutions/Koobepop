
exports.readFileFromImages = function httpGet(_fileName,extension)
{
    var xmlHttp = new XMLHttpRequest();
    var file = _fileName+'.'+extension;
    xmlHttp.open( "GET", file, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
    
}


