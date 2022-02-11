var song = "";
var song2 = "";
var score_leftWrist = 0;
var score_rightWrist = 0;
var status1 = "";
var status2 = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Of Left Wrist =>>" + score_leftWrist);

        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Of Right Wrist =>> " + score_rightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X=> " + leftWristX + " Left Wrist Y=> " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X=> " + rightWristX + "Right Wrist Y=> " + rightWristY);
    }
}

function modelLoaded() {
    console.log("PoseNet Is Initialized!!")
}

function draw() {
    image(video, 0, 0, 600, 430);

    fill(4, 7, 94);
    stroke(4, 7, 94);

    status1 = song.isPlaying();
    if (score_leftWrist > 0.1) {
        circle(leftWristX, leftWristY, 25);
        song2.stop();
        if (status1 == false) {
            song.play();
            document.getElementById("song").innerHTML = "SONG: Pirate Pops";

        }
    }

    status2 = song2.isPlaying();
    if (score_rightWrist > 0.1) {
        circle(rightWristX, rightWristY, 25);
        song.stop();
        if (status2 == false) {
            song2.play();
            document.getElementById("song").innerHTML = "SONG: Victory";

        }
    }
}


function preload() {
    song = loadSound("music2.mp3");
    song2 = loadSound("Victory.mp3");
}