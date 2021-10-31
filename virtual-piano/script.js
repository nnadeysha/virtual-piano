
const piano = document.getElementById('piano');
const audio = document.querySelector('.audio');
const keys = document.querySelectorAll('.piano-key');

const fullscreen = document.querySelector(".fullscreen")

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  }

  const StartAudio = (event) => {
    event.target.classList.add("active");
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
    
}

const StopAudio = (event) => {
    event.target.classList.remove("active");
}

const startCorrespondOver = (event) => {
    if (event.target.classList.contains("piano-key"))
    {
    event.target.classList.add("active");
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
    keys.forEach((elem) => {
        elem.addEventListener("mouseover", StartAudio)
        elem.addEventListener("mouseout", StopAudio)
    });
    }
}

const stopCorrespondOver = () => {
    keys.forEach((elem) => {
        elem.classList.remove("active");
        elem.removeEventListener("mouseover", StartAudio)
        elem.removeEventListener("mouseout", StopAudio)
    });
}

piano.addEventListener("mousedown", startCorrespondOver, false);
document.addEventListener("mouseup", stopCorrespondOver);

//клавиатура

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.code}"]`);
    const key = document.querySelector(`div[data-key="${e.code}"]`);
    if (!audio) return;
    
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
    }
    
    window.addEventListener("keydown", (e) => {
        if (!e.repeat) {playSound(e)
        } 

    });
        
    function removeTransition(e) {
        if (e.propertyName !== "transform") return;
        this.classList.remove("playing");
    }
    keys.forEach(key => key.addEventListener("transitionend", removeTransition));
    window.addEventListener('keydown', playSound); 

    const stopSound= (e) => {
        const letter = document.querySelector(`div[data-key="${e.code}"]`);
        console.log(letter);
        letter.classList.remove('playing');
    };

    window.addEventListener('keydown', playSound); 
    window.addEventListener('keyup', stopSound);
    
/* проверка подключение кода клавы
window.addEventListener('keydown', function(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    console.log(audio);
}
) */

//переключение notes/letters
const NOTES = document.querySelector('.btn-notes');
const LETTERS = document.querySelector('.btn-letters');

LETTERS.addEventListener('click', () => {
    if (NOTES.classList.contains('btn-active')) {
        NOTES.classList.remove('btn-active')
        LETTERS.classList.add('btn-active')
        keys.forEach(key => {
            key.classList.add('letter')
        })
    }
});

NOTES.addEventListener('click', () => {
    if (NOTES.classList.contains('btn-active')) {
        keys.forEach(key => {
            key.classList.add('note')
        })

    } else {
        LETTERS.classList.remove('btn-active')
        keys.forEach(key => {
            key.classList.remove('letter')
        })
        NOTES.classList.add('btn-active')
    }
});

//фуллскрин

fullscreen.addEventListener('click', () => {
        toggleFullScreen();  
  });

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

