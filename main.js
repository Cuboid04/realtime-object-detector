var img="";
var status="";
var object=[];
function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status : Dectecting Object...";
}
function modelloaded(){
    console.log("Model Loaded");
    status=true;
}
function gotresult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}
function preload(){
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(video, gotresult);
        for(i=0;i< object.length ; i++){
            r=random(255);
            g=random(255);
            b=random(255);
            fill(r,g,b);
            document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("number_object").innerHTML="Number Of Objects Detected Are : "+object.length;
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+ percent+"%", object[i].x + 15, object[i].y+15);
            noFill();
            stroke(r,b,g);
            rect(object[i].x, object[i].y , object[i].width, object[i].height);
        }
    }
}