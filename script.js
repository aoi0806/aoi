const stageCounter = document.getElementById('stage-counter');
const choice1 = document.getElementById('image1');
const choice2 = document.getElementById('image2');
const imageWrapper = document.getElementById('image-wrapper');
const goalScreen = document.getElementById('goal-screen');
const goalImage = document.getElementById('goal-image'); // これは残しておく

const TOTAL_STAGES = 13;
let currentStage = 1;

// 色のリストを生成
const colors = [];
for (let i = 0; i < 26; i++) {
    colors.push(`hsl(${i * 13}, 100%, 50%)`);
}
const goalColor = 'gold';

function startGame() {
    currentStage = 1;
    updateStage();
    imageWrapper.style.display = 'flex';
    goalScreen.style.display = 'none';
}

function updateStage() {
    if (currentStage > TOTAL_STAGES) {
        showGoal();
        return;
    }
    stageCounter.textContent = `ステージ ${currentStage}`;

    // 現在のステージに基づいて2つのユニークな色をランダムに選択
    const availableColors = [...colors];
    const colorIndex1 = Math.floor(Math.random() * availableColors.length);
    let [color1] = availableColors.splice(colorIndex1, 1);
    const colorIndex2 = Math.floor(Math.random() * availableColors.length);
    let [color2] = availableColors.splice(colorIndex2, 1);

    choice1.style.backgroundColor = color1;
    choice2.style.backgroundColor = color2;

    // 正解をランダムに設定
    const correctChoice = Math.random() < 0.5 ? choice1 : choice2;

    // クリックイベントリスナーを一度削除してから再設定
    choice1.onclick = () => handleChoice(choice1 === correctChoice);
    choice2.onclick = () => handleChoice(choice2 === correctChoice);
}

function handleChoice(isCorrect) {
    if (isCorrect) {
        currentStage++;
        updateStage();
    } else {
        alert('不正解！ステージ1からやり直してください。');
        startGame();
    }
}

function showGoal() {
    stageCounter.textContent = 'Congratulations!';
    imageWrapper.style.display = 'none';
    goalScreen.style.display = 'block';
    // ゴール画像はまだ使わないが、将来のために残しておく
    // goalImage.src = goalImgSrc;
    goalScreen.style.backgroundColor = goalColor; // 代わりに背景色を設定
}

// 初期化
document.addEventListener('DOMContentLoaded', startGame);
