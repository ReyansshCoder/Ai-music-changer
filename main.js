song1=""
song2=""
my_model=""
lwx=0;
rwx=0;
lwy=0;
rwy=0;
scrrw=0;
scrlw=0;
s1s="";
s2s="";

function preload(){
song1=loadSound("music.mp3")
song2=loadSound("music2.mp3")
}

function setup(){
canvas=createCanvas(500,500);
canvas.center()
chitra=createCapture(VIDEO);
chitra.hide()
my_model=ml5.poseNet(chitra,modelLoaded)
my_model.on('pose',gotPoses)
}

function gotPoses(results){
   if(results.length>0){
    lwx=results[0].pose.leftWrist.x;
    rwx=results[0].pose.rightWrist.x;
    lwy=results[0].pose.leftWrist.y;
    rwy=results[0].pose.rightWrist.y;
    scrlw=results[0].pose.keypoints[9].score;
    scrrw=results[0].pose.keypoints[10].score;
    console.log("the x pos of lw is:" ,lwx)
    console.log("the x pos of rw is:" ,rwx)
    console.log("the y pos of lw is:" ,lwy)
    console.log("the y pos of rw is:" ,rwy)
   } 
}

function modelLoaded(){
console.log("Your model has been loaded")
}

function draw(){
image (chitra, 0, 0, 500,500)
fill ("red")
s1s= song1.isPlaying() 
console.log("the song is playing",s1s)
s2s= song2.isPlaying()
console.log("the song is playing",s2s)

if(scrlw>0.2){
   circle (lwx,lwy,20)
   song1.stop()

   if(s2s==false){
      song2.play()    
      document.getElementById("sn").innerHTML="Peter Pan";  
   }

}

if(scrrw>0.2){
   circle(rwx,rwy,20)
   song2.stop()

   if(s1s==false){
      song1.play()
      document.getElementById("sn").innerHTML="Harry Potter Theme song";
   }
}
}

