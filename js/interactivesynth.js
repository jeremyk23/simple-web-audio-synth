context = new AudioContext(),
    oscillator = context.createOscillator();
myOscilloscope = new WavyJones(context, 'oscilloscope');

var isPlaying = false;
oscillator.type = "sine";
postGainNode = context.createGain();
oscGain = 0;
firstTime = true;

myOscilloscope.lineColor = '#527483';
myOscilloscope.lineThickness = 3;

function osc1(pitch){
    oscillator.frequency.value = pitch;
    oscillator.connect(postGainNode);
    postGainNode.connect(myOscilloscope);
    myOscilloscope.connect(context.destination);
//postGainNode.connect(context.destination);
    postGainNode.gain.value = 0;
    oscillator.noteOn(0);

};

function playOscillator(img) {
    if (isPlaying == false) {
        isPlaying = true;
        if (firstTime) {
            $('#gain').simpleSlider("setValue", 0.5);
            postGainNode.gain.value = 0.5;
            img.src = "PlayOscillator_Pressed-01.png";
            firstTime = false;
        }
        else {
            postGainNode.gain.value = oscGain;
            img.src = "PlayOscillator_Pressed-01.png";
        }
    } else {
        isPlaying = false;
        postGainNode.gain.value = 0;
        img.src = "PlayOscillator_Unpressed-01.png"
    }
}

function updateSlider (sliderAmount) {
    var sliderValue = sliderAmount;
    document.getElementById("frequency-value").innerHTML = sliderValue + "hz";

}

function setPicture(imgId) {
    //reset pictures
    document.getElementById('square').src= "SquareWave_Unpressed-01.png"
    document.getElementById('triangle').src= "TriangleWave_Unpressed-01.png"
    document.getElementById('sine').src= "SineWave_Unpressed-01.png"
    document.getElementById('sawtooth').src= "SawTooth_Unpressed.png"

    if (imgId.id == "square") {
        imgId.src = "SquareWave_Pressed-01.png";
    }
    else if (imgId.id == "triangle") {
        imgId.src = "TriangleWave_Pressed-01.png";
    }
    else if (imgId.id == "sine") {
        imgId.src = "SineWave_Pressed-01.png";
    }
    else if (imgId.id == "sawtooth") {
        imgId.src = "SawTooth_Pressed.png";
    }

}

function setFrequency (frequency) {
    oscillator.frequency.value = frequency;
}

function setGain (gain) {
    if (isPlaying == true) {
        oscGain = gain;
        postGainNode.gain.value = oscGain;
    }
}

function setWaveType(waveType) {
    if (waveType === 'square' && isPlaying === true) {
        postGainNode.gain.value = oscGain - .15;
        oscillator.type = waveType;
    }
    else {
        if (isPlaying == true) {
            oscillator.type = waveType;
            postGainNode.gain.value = oscGain;
        }
    }
}
osc1(440);