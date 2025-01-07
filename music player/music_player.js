class Deque {
    constructor(id) {
        this.id = id;
        this.data = [];
        this.length = 0;
    }
    frontInsert(item) {
        this.data.unshift(item);
    }
    frontTake() {
        return this.data.shift();
    }
    backInsert(item) {
        this.data.push(item);
    }
    backTake() {
        return this.data.pop();
    }
    getCount() {
        this.length = this.data.length;
        return this.length;
    }
}

class MusicPlayer {
    constructor(id) {
        this.id = id;
        this.playerBox = document.getElementById('playerBox');
        this.songName = document.getElementById('songName');
        this.artistName = document.getElementById('artistName');
        this.jacketBox = document.getElementById('jacketBox');
        this.songList = new Deque('songList');
        this.originalSongList = [];
        this.songLength = 0;
        this.musicBar = document.querySelector('.musicBar');
        this.rangeBar = document.querySelector('.rangeBar');
        this.audio = document.getElementById('audio');
        this.current = document.querySelector('.current');
        this.duration = document.querySelector('.duration');
        this.repeatBtn = document.querySelector('.repeatBtn');
        this.repeatIcon = document.getElementById('repeatIcon');
        this.backwardBtn = document.getElementById('backwardBtn');
        this.playBtnBox = document.getElementById('playBtnBox');
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.forwardBtn = document.getElementById('forwardBtn')
        this.shuffleBtn = document.querySelector('.shuffleBtn');
        this.shuffleIcon = document.getElementById('shuffleIcon');
        this.musicList = document.querySelector(".music__list");
        this.MusicListBtn = document.querySelector(".listBtn");
        this.MusicListClose = document.querySelector(".xi-close");
        this.musicListUl = document.querySelector(".list ul");
        this.musicIndex = 1;
        this.currentSongIndex = 0;
        this.starBtn = document.querySelector('.starBtn');
        this.starIcon = document.getElementById('starIcon');
        this.volumeBtn = document.querySelector('.volumeBtn');
        this.volumeSlider = document.querySelector('#volumeSlider');
    }
    makeDeque(inputList) {
        inputList.forEach((value) => {
            this.songList.backInsert(value);
        });
        this.originalSongList = [...inputList];
    }


    //초기화면 설정
    init() {
        this.musicIndex = 0;
        const startSong = this.songList.data[0];

        if (startSong) {
            const figureString = `
                <figure>
                    <img src="${startSong.jacket}" style="width: 100%;">
                </figure>`;
            this.songName.innerHTML = startSong.name;
            this.artistName.innerHTML = startSong.artist;
            document.querySelector('.lyricsBox').innerHTML = startSong.lyrics;
            this.jacketBox.innerHTML = figureString;
            document.querySelector('.playerBox').style.backgroundImage = startSong.background;

            this.audio.src = `./media/${startSong.song}.mp3`;
            this.audio.load();
        } else {
            console.warn("재생 목록이 비어 있습니다.");
        }

        this.updateStarButton();
        this.musicListSet();
    }
    //재생,정지 전환 이벤트
    playPause() {
        this.playBtnBox.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

                this.musicSource = this.audioContext.createMediaElementSource(this.audio);
                this.analyzer = this.audioContext.createAnalyser();

                this.musicSource.connect(this.analyzer);
                this.analyzer.connect(this.audioContext.destination);

                this.musicEqualizer();
            }

            if (this.audio.paused) {
                if (this.audioContext.state === 'suspended') {
                    this.audioContext.resume();
                }
                this.playClick();
            } else {
                this.pauseClick();
            }
        });
    }
    //이전곡
    prevMusic() {
        const lastItem = this.songList.backTake();
        const firstItem = this.songList.data[0];
        const figureString_jacket =
            `<figure>
                <img src="${lastItem['jacket']}" style="width: 100%;">
            </figure>`;
        this.songName.innerHTML = `${lastItem['name']}`;
        this.artistName.innerHTML = `${lastItem['artist']}`;
        this.jacketBox.innerHTML = figureString_jacket;
        document.querySelector('.lyricsBox').innerHTML = `${lastItem['lyrics']}`;
        this.songList.frontInsert(lastItem);
        document.querySelector('.playerBox').style.backgroundImage = lastItem.background;
        this.audio.src = `./media/${lastItem['song']}.mp3`;
        this.audio.load();
        this.audio.play();

        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.musicSource = this.audioContext.createMediaElementSource(this.audio);
            this.analyzer = this.audioContext.createAnalyser();
            this.musicSource.connect(this.analyzer);
            this.analyzer.connect(this.audioContext.destination);
        }

        if (this.audioContext && this.analyzer) {
            this.musicEqualizer();
        }

        this.musicIndex = this.songList.data.findIndex(song => song.song === lastItem.song);
        this.updateStarButton();
        this.playClick();
    }
    //다음곡
    nextMusic() {
        const firstOutItem = this.songList.frontTake();
        const firstItem = this.songList.data[0];
        const figureString_jacket =
            `<figure>
                <img src="${firstItem['jacket']}" style="width: 100%;">
            </figure>`;
        this.songName.innerHTML = `${firstItem['name']}`;
        this.artistName.innerHTML = `${firstItem['artist']}`;
        document.querySelector('.lyricsBox').innerHTML = `${firstItem['lyrics']}`;
        this.jacketBox.innerHTML = figureString_jacket;
        this.songList.backInsert(firstOutItem);
        document.querySelector('.playerBox').style.backgroundImage = firstItem.background;
        this.audio.src = `./media/${firstItem['song']}.mp3`;
        this.audio.load();
        this.audio.play();

        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.musicSource = this.audioContext.createMediaElementSource(this.audio);
            this.analyzer = this.audioContext.createAnalyser();
            this.musicSource.connect(this.analyzer);
            this.analyzer.connect(this.audioContext.destination);
        }

        if (this.audioContext && this.analyzer) {
            this.musicEqualizer();
        }
        this.musicIndex = this.songList.data.findIndex(song => song.song === firstItem.song);
        this.updateStarButton();
        this.playClick(); // 재생 상태를 업데이트
    }
    //재생 버튼
    playClick() {
        if (!this.audioContext) {
            // AudioContext 초기화
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.musicSource = this.audioContext.createMediaElementSource(this.audio);
            this.analyzer = this.audioContext.createAnalyser();
            this.musicSource.connect(this.analyzer);
            this.analyzer.connect(this.audioContext.destination);
        }
        if (this.audio.paused) {
            this.audio.play();
        }
        this.playBtn.style.display = 'none';
        this.pauseBtn.style.display = 'block';

        if (this.audioContext && this.analyzer) {
            this.musicEqualizer();
        }

        const playingSpans = this.musicListUl.querySelectorAll('.audio-duration.playing');
        playingSpans.forEach((span) => {
            const originalDuration = span.getAttribute('data-duration');
            span.classList.remove('playing');
            span.innerHTML = originalDuration;
        });

        const currentPlayingSpan = this.musicListUl.querySelector(`#${this.songList.data[0].song}`);
        if (currentPlayingSpan) {
            currentPlayingSpan.classList.add('playing');
            currentPlayingSpan.innerHTML = 'playing';
        }
    }
    //정지 버튼
    pauseClick() {
        this.playBtn.style.display = 'block';
        this.pauseBtn.style.display = 'none';
        this.audio.pause();
    }
    //이전곡 버튼
    backwardClick() {
        this.backwardBtn.addEventListener(
            'click',
            () => {
                this.prevMusic();
                this.playClick();
            }
        )
    }
    //다음곡 버튼
    forwardClick() {
        this.forwardBtn.addEventListener(
            'click',
            () => {
                const currentClass = this.shuffleIcon.className;
                if (currentClass.includes('xi-shuffle click_color')) {
                    this.makeRandom();
                    this.playClick();
                } else {
                    this.nextMusic();
                    this.playClick();
                }
            }
        )
    }
    // 재생바 
    barMaking() {
        //바 생성
        this.audio.addEventListener("timeupdate", (e) => {
            const currentTime = e.target.currentTime;
            const duration = e.target.duration;
            let barWidth = (currentTime / duration) * 100;
            this.rangeBar.style.width = `${barWidth}%`
            //console.log(barWidth);

            //현재 시간
            let currentMin = Math.floor(currentTime / 60);
            let currentSec = Math.floor(currentTime % 60);
            if (currentSec < 10) { currentSec = `0${currentSec}` };

            this.current.innerHTML = `${currentMin}:${currentSec}`;
        });

        //전체 시간
        this.audio.addEventListener("loadedmetadata", () => {
            let audioDuration = this.audio.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if (totalSec < 10) { totalSec = `0${totalSec}` };

            this.duration.innerHTML = `${totalMin}:${totalSec}`;
        });
        //pin버튼 설정
        this.musicBar.addEventListener("click", e => {
            let progressWidth = this.musicBar.clientWidth;
            let clickedOffsetX = e.offsetX;
            let songDuration = this.audio.duration;

            this.audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
            this.audio.play();
            this.playClick();
        })
    }
    // 반복버튼
    musicRepeatBtn() {
        this.repeatBtn.addEventListener('click', () => {
            const currentClass = this.repeatIcon.className;
            if (currentClass.includes('xi-repeat-one')) {
                this.repeatIcon.className = 'xi-repeat';
            } else if (currentClass.includes('xi-repeat click_color')) {
                this.repeatIcon.className = 'xi-repeat-one click_color';
            } else {
                this.repeatIcon.className = 'xi-repeat click_color';
            }
        });
    }
    //오디오 끝날 때,
    musicRepeat() {
        this.audio.addEventListener('ended', (e) => {
            const currentClass = this.repeatIcon.className;
            const currentClassShuffle = this.shuffleIcon.className;
            const songCount = this.songList.data[0].song;
            if (currentClassShuffle.includes('xi-shuffle click_color')) {
                this.makeRandom();
            } else {
                if (currentClass.includes('xi-repeat-one')) {
                    this.audio.play();
                } else if (currentClass.includes('xi-repeat click_color')) {
                    this.updatePlayingState();
                    this.nextMusic();
                } else {
                    if (songCount == 'song10') {
                        this.audio.pause();
                        this.pauseClick();
                    } else {
                        this.updatePlayingState();
                        this.nextMusic();
                    }
                }
            }
        });
    }
    //랜덤 생성
    makeRandom() {
        this.songLength = this.songList.getCount();
        let rotateCount = Math.floor(Math.random() * (this.songLength - 1) + 1);
        console.log(rotateCount);
        for (let i = 0; i < rotateCount; i++) {
            let tempV = this.songList.frontTake();
            this.songList.backInsert(tempV);
        }

        const shuffleItemItem = this.songList.data[0];
        const figureString_jacket =
            `<figure>
                <img src="${shuffleItemItem['jacket']}" style="width: 100%;">
            </figure>`;
        this.songName.innerHTML = `${shuffleItemItem['name']}`;
        this.artistName.innerHTML = `${shuffleItemItem['artist']}`;
        document.querySelector('.lyricsBox').innerHTML = `${shuffleItemItem['lyrics']}`;
        this.jacketBox.innerHTML = figureString_jacket;
        document.querySelector('.playerBox').style.backgroundImage = shuffleItemItem.background;
        this.audio.src = `./media/${shuffleItemItem['song']}.mp3`
        this.audio.load();
        this.audio.play();
        this.updateStarButton();
        // 현재 재생 중인 곡에 'playing' 표시 설정
        this.playClick();
    }
    //셔플 실행
    musicShuffle() {
        this.audio.addEventListener('ended', () => {
            const currentClass = this.shuffleIcon.className;
            if (currentClass.includes('xi-shuffle click_color')) {
                this.makeRandom();
            } else { this.nextMusic(); this.updatePlayingState(); }
        })
        this.forwardBtn.addEventListener('click', () => {
            const currentClass = this.shuffleIcon.className;
            if (currentClass.includes('xi-shuffle click_color')) {
                this.makeRandom();
            } else { this.nextMusic(); }
        })
    }
    //셔플버튼
    musicShuffleBtn() {
        this.shuffleBtn.addEventListener('click', () => {
            const currentClass = this.shuffleIcon.className;
            if (currentClass.includes('xi-shuffle click_color')) {
                this.shuffleIcon.className = 'xi-shuffle';
            } else {
                this.shuffleIcon.className = 'xi-shuffle click_color';
            }
        });
    }
    //뮤직 리스트버튼
    musicListBtnEvent() {
        this.MusicListBtn.addEventListener("click", () => {
            this.setToggleToAll();
            this.musicList.classList.toggle("show");
        });

        this.MusicListClose.addEventListener("click", () => {
            this.musicList.classList.remove("show");
        });
    }

    // ALL 토글
    setToggleToAll() {
        const toggleButton = document.getElementById('toggleFavoritesSlider');
        toggleButton.checked = false;
        this.musicListSet();
    }
    //뮤직 리스트 세팅
    musicListSet() {
        this.musicListUl.innerHTML = '';

        this.originalSongList.forEach((song, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;

            li.innerHTML = `
                <div>
                    <p class="listSongName">${song.name}</p>
                    <p>${song.artist}</p>
                </div>
                <audio class="${song.song}" src="./media/${song.song}.mp3"></audio>
                <span id="${song.song}" class="audio-duration"></span>
            `;
            this.musicListUl.appendChild(li);

            const liAudio = li.querySelector(`.${song.song}`);
            const liAudioDuration = li.querySelector(`#${song.song}`);
            liAudio.addEventListener('loadeddata', () => {
                if (liAudioDuration.classList.contains('playing')) return;
                const audioDuration = liAudio.duration;
                const totalMin = Math.floor(audioDuration / 60);
                const totalSec = Math.floor(audioDuration % 60);
                liAudioDuration.innerHTML = `${totalMin}:${totalSec < 10 ? '0' : ''}${totalSec}`;
                liAudioDuration.setAttribute('data-duration', `${totalMin}:${totalSec}`);
            });

            const currentSong = this.audio.src.split('/').pop().replace('.mp3', '');
            if (this.audio.src && currentSong === song.song) {
                li.classList.add('playing');
                li.querySelector('.audio-duration').innerHTML = 'playing';
                li.querySelector('.audio-duration').classList.add('playing');
            } else {
                li.classList.remove('playing');
            }

            li.addEventListener('click', () => {
                this.loadSong(index);
            });
        });
    }

    loadSong(index, isFav = false) {
        const song = isFav ? JSON.parse(localStorage.getItem('favorites'))[index] : this.originalSongList[index];

        this.songList.data[0] = song;
        this.songName.innerText = song.name;
        this.artistName.innerText = song.artist;
        document.querySelector('.lyricsBox').innerHTML = song.lyrics;
        this.jacketBox.innerHTML = `<figure><img src="${song.jacket}" style="width: 100%;"></figure>`;
        this.audio.src = `./media/${song.song}.mp3`;
        document.querySelector('.playerBox').style.backgroundImage = song.background;
        this.audio.play();

        if (this.audioContext && this.analyzer) {
            this.musicEqualizer();
        }

        this.playClick();
        this.updateStarButton();
        this.musicList.classList.remove('show');
    }
    updateStarButton() {
        const currentSong = this.songList.data[0];

        let favorites;
        try {
            favorites = JSON.parse(localStorage.getItem('favorites'));
            if (!Array.isArray(favorites)) throw new Error();
        } catch {
            console.warn('favorites 데이터가 유효하지 않습니다. 초기화합니다.');
            favorites = [];
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        const isFavorite = favorites.some(song => song.song === currentSong.song);

        this.starIcon.className = isFavorite ? 'xi-heart click_color' : 'xi-heart-o';

        console.log(
            `현재 곡: ${currentSong.name}, 즐겨찾기 상태: ${isFavorite ? '즐겨찾기에 추가됨' : '즐겨찾기에 없음'
            }`
        );
    }
    //스타버튼
    musicStarBtn() {
        this.starBtn.addEventListener('click', () => {
            const currentSong = this.songList.data[0];
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            const isFavorite = favorites.some(song => song.song === currentSong.song);
            if (isFavorite) {
                favorites = favorites.filter(song => song.song !== currentSong.song);
                this.starIcon.className = 'xi-heart-o';
            } else {
                favorites.push(currentSong);
                this.starIcon.className = 'xi-heart click_color';
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));

            const toggleButton = document.getElementById('toggleFavoritesSlider');
            if (toggleButton.checked) {
                this.favoritesListSet();
            }
        });
    }
    toggleFavorites() {
        const toggleButton = document.getElementById('toggleFavoritesSlider');


        toggleButton.checked = false;
        this.musicListSet();

        toggleButton.addEventListener('click', () => {
            const isFavoritesMode = toggleButton.checked;
            if (isFavoritesMode) {
                this.favoritesListSet();
            } else {
                this.musicListSet();
            }
        });
    }
    favoritesListSet() {
        this.musicListUl.innerHTML = '';
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.length === 0) {
            const noFavoritesMessage = document.createElement('li');
            noFavoritesMessage.innerHTML = `<p>즐겨찾기 목록이 비어 있습니다.</p>`;
            this.musicListUl.appendChild(noFavoritesMessage);
            return;
        }

        favorites.forEach((song, index) => {
            const li = document.createElement('li');
            li.dataset.index = index;

            li.innerHTML = `
                <div>
                    <p class="listSongName">${song.name}</p>
                    <p>${song.artist}</p>
                </div>
                <audio class="${song.song}" src="./media/${song.song}.mp3"></audio>
                <span id="${song.song}" class="audio-duration"></span>
            `;
            this.musicListUl.appendChild(li);

            const liAudio = li.querySelector(`.${song.song}`);
            const liAudioDuration = li.querySelector(`#${song.song}`);
            liAudio.addEventListener('loadeddata', () => {
                if (liAudioDuration.classList.contains('playing')) return;
                const audioDuration = liAudio.duration;
                const totalMin = Math.floor(audioDuration / 60);
                const totalSec = Math.floor(audioDuration % 60);
                liAudioDuration.innerHTML = `${totalMin}:${totalSec < 10 ? '0' : ''}${totalSec}`;
                liAudioDuration.setAttribute('data-duration', `${totalMin}:${totalSec}`);
            });

            // 현재 재생 중인 곡 표시
            const currentSong = this.audio.src.split('/').pop().replace('.mp3', '');
            if (currentSong === song.song) {
                li.classList.add('playing');
                li.querySelector('.audio-duration').innerHTML = 'playing';
                li.querySelector('.audio-duration').classList.add('playing');
            }

            // 리스트 항목 클릭 시 해당 곡 재생
            li.addEventListener('click', () => {
                this.loadSong(index, true); // FAV에서 선택
            });
        });
    }
    updatePlayingState() {
        const currentIndex = this.songList.data.findIndex(
            song => song.song === this.audio.src.split('/').pop().replace('.mp3', '')
        );

        if (currentIndex !== -1) {
            this.loadSong(currentIndex); // 현재 재생 중인 곡의 상태 업데이트
        }
    }
    initVolumeControl() {
        // 볼륨 버튼을 클릭하면 슬라이더 표시/숨김
        this.volumeBtn.addEventListener('click', () => {
            const currentClass = document.getElementById('volumeIcon').className;
            if (currentClass.includes('xi-volume-up click_color')) {
                document.getElementById('volumeIcon').className = 'xi-volume-up';
                this.volumeSlider.style.visibility = 'hidden';
            } else {
                document.getElementById('volumeIcon').className = 'xi-volume-up click_color';
                this.volumeSlider.style.visibility = 'visible';
            }
        });

        // 슬라이더의 값이 변경되면 오디오 볼륨을 조절
        this.volumeSlider.addEventListener('input', (event) => {
            this.audio.volume = event.target.value;
        });
    }
    musicEqualizer() {
        const equalizerArea = document.getElementById("equalizer");
        if (!equalizerArea) {
            console.error("Equalizer area not found.");
            return;
        }

        if (!this.analyzer) {
            console.warn("Analyzer not initialized. Equalizer will not run.");
            return;
        }

        const numberOfBar = 20;
        const frequencyData = new Uint8Array(this.analyzer.frequencyBinCount);

        // 이퀄라이저 막대 생성
        function createBars() {
            if (!equalizerArea.hasChildNodes()) {
                for (let i = 0; i < numberOfBar; i++) {
                    const bar = document.createElement("div");
                    bar.id = `bar${i}`;
                    bar.classList.add("equalizerBar");
                    equalizerArea.appendChild(bar);
                }
            }
        }

        // 막대 업데이트
        function updateBars() {
            this.analyzer.getByteFrequencyData(frequencyData);
            for (let i = 0; i < numberOfBar; i++) {
                const bar = document.getElementById(`bar${i}`);
                if (bar) {
                    const fd = frequencyData[i];
                    const intensity = Math.max(0, fd / 255);
                    bar.style.backgroundColor = `rgba(255, 255, 255, ${intensity})`;
                    bar.style.transform = `scaleY(${intensity})`;
                }
            }
        }

        // 애니메이션 프레임 렌더링
        const renderFrame = () => {
            updateBars.call(this);
            requestAnimationFrame(renderFrame);
        };

        createBars();
        renderFrame();
    }



    // 실행
    running(inputList) {
        this.makeDeque(inputList);
        this.init();
        this.backwardClick();
        this.forwardClick();
        this.playPause();
        this.barMaking();
        this.musicRepeatBtn();
        this.musicShuffleBtn();
        this.musicRepeat();
        this.musicListBtnEvent();
        this.musicListSet();
        this.setToggleToAll();
        // this.musicListClick();
        this.musicStarBtn();
        this.initVolumeControl();
        this.musicEqualizer();
        this.toggleFavorites();
    }
}



// imgUrl1 = "https://image.bugsm.co.kr/album/images/original/9833/983380.jpg?version=undefined";
// imgUrl2 = "https://image.bugsm.co.kr/album/images/original/201420/20142085.jpg?version=undefined";
// imgUrl3 = "https://image.bugsm.co.kr/album/images/original/316333/31633306.jpg?version=undefined";
// imgUrl4 = "https://image.bugsm.co.kr/album/images/original/5370/537057.jpg?version=undefined";
// imgUrl5 = "https://image.bugsm.co.kr/album/images/original/9981/998125.jpg?version=undefined";
// imgUrl6 = "https://image.bugsm.co.kr/album/images/original/40911/4091100.jpg?version=undefined";
// imgUrl7 = "https://image.bugsm.co.kr/album/images/original/6606/660693.jpg?version=undefined";
// imgUrl8 = "https://image.bugsm.co.kr/album/images/original/150143/15014381.jpg?version=undefined";
// imgUrl9 = "https://image.bugsm.co.kr/album/images/original/316601/31660157.jpg?version=undefined";
// imgUrl10 = "https://image.bugsm.co.kr/album/images/original/40026/4002616.jpg?version=undefined";

// const album = [
//     { name: "Nothing", artist: "Bruno Major", jacket: imgUrl1, background: 'url(./media/bgimg1.png)', song: 'song1' },
//     { name: "June (Instrumental)", artist: "Jung Joonil", jacket: imgUrl2, background: 'url(./media/bgimg2.png)', song: 'song2' },
//     { name: "Paris", artist: "New West", jacket: imgUrl3, background: 'url(./media/bgimg3.png)', song: 'song3' },
//     { name: "Warmest Regards", artist: "Half Moon Run", jacket: imgUrl4, background: 'url(./media/bgimg4.png)', song: 'song4' },
//     { name: "free love (dream edit)", artist: "HONNE", jacket: imgUrl5, background: 'url(./media/bgimg5.png)', song: 'song5' },
//     { name: "Tomorrow", artist: "Car, the garden", jacket: imgUrl6, background: 'url(./media/bgimg6.png)', song: 'song6' },
//     { name: "Sweet", artist: "Cigarettes After Sex", jacket: imgUrl7, background: 'url(./media/bgimg7.png)', song: 'song7' },
//     { name: "Sinatra (piano ver.)", artist: "Forrest Nolan", jacket: imgUrl8, background: 'url(./media/bgimg8.png)', song: 'song8' },
//     { name: "We Were Never Really Friends", artist: "Bruno Major", jacket: imgUrl9, background: 'url(./media/bgimg9.png)', song: 'song9' },
//     { name: "Everything Happens to Me", artist: "Chet Baker", jacket: imgUrl10, background: 'url(./media/bgimg10.png)', song: 'song10' }
// ];
// const myAlbum = new MusicPlayer('myAlbum');
// myAlbum.running(album);




// document.addEventListener('DOMContentLoaded', () => {
//     async function fetchData() {
//         try {
//             const response = await fetch('http://kkms4001.iptime.org:45212/api/data');
//             console.log("Response Status:", response.status); // 응답 상태 코드 확인
//             console.log("Response Status Text:", response.statusText); // 상태 설명 텍스트 확인

//             if (!response.ok) throw new Error('데이터 가져오기 실패');

//             const data = await response.json();
//             console.log(data);
//             myAlbum.running(data);
//         } catch (error) {
//             console.error('데이터 가져오기 오류:', error);
//         }
//     }


// function displayData(data) {
//     const container = document.getElementById('dataContainer');
//     container.innerHTML = data.map(item => `
//         <p>ID: ${item.id}, Name: ${item.name}, Email: ${item.email}</p>
//     `).join('');
// }

//     // const myAlbum = new MusicPlayer('myAlbum');
//     // myAlbum.running(album);
// fetchData(); 
// });

const fetchData = async (playerInstance) => {
    try {
        const response = await fetch('http://kkms4001.iptime.org:45212/api/data');
        console.log("Response Status:", response.status);
        console.log("Response Status Text:", response.statusText);

        if (!response.ok) throw new Error('데이터 가져오기 실패');

        const data = await response.json();
        console.log(data);
        playerInstance.running(data);
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    }
};

window.onload = () => {
    const myAlbum = new MusicPlayer('myAlbum');
    fetchData(myAlbum);
};

