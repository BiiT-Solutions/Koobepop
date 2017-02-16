exports.readFileFromImages = function(_fileName,extension){
    
    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
    console.log('file system open: ' + fs.name);
    fs.root.getFile(_fileName+"."+extension, {},
     function (fileEntry) {
         readFile(fileEntry);
        }, onErrorCreateFile);

}, onErrorLoadFs);

}
function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
           return this.result;
        };

         reader.readBinaryFile(file);

    }, onErrorReadFile);
}

function readBinaryFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            var rawData = reader.result;
            return rawData
        }
        
        reader.readAsArrayBuffer(file);
        
    }, onErrorReadFile);
}

function onErrorLoadFs(){
}
function onErrorCreateFile(){
}