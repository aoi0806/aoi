const stageCounter = document.getElementById('stage-counter');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const imageWrapper = document.getElementById('image-wrapper');
const goalScreen = document.getElementById('goal-screen');
const goalImage = document.getElementById('goal-image');

const TOTAL_STAGES = 13;
let currentStage = 1;

// 画像のパスを生成
const images = [];
for (let i = 1; i <= 26; i++) {
    images.push(`../images/image_${String(i).padStart(2, '0')}.png`);
}
const goalImgSrc = '../images/goal.png';

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

    // ステージに基づいて画像を設定
    const imgIndex1 = (currentStage - 1) * 2 + 1;
    const imgIndex2 = (currentStage - 1) * 2 + 2;
    const img1Src = `../images/image_${String(imgIndex1).padStart(2, '0')}.png`;
    const img2Src = `../images/image_${String(imgIndex2).padStart(2, '0')}.png`;

    image1.src = img1Src;
    image2.src = img2Src;

    // 正解を右側に固定
    const correctImage = image2;

    // クリックイベントリスナーを一度削除してから再設定
    image1.onclick = () => handleChoice(image1 === correctImage);
    image2.onclick = () => handleChoice(image2 === correctImage);
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
    goalImage.src = goalImgSrc;
}

// 初期化
document.addEventListener('DOMContentLoaded', startGame);
