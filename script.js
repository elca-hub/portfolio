/* バックグラウンドで動作する画像に関する処理 */
const backgroundImgObj = {
    elementId: 'backgroundImg',
    nowViewImgEleId: {
        illustration: 1,
        code: 1
    },
    max: {
        illustration: 17,
        code: 10
    },
    extension: '.jpeg',
    viewImgLogs: {
        illustration: [],
        code: []
    },
    maxLogLen: 4
};

let isElca = false;

function getType(reverse = false) {
    if (reverse) return !isElca ? 'code' : 'illustration';
    return isElca ? 'code' : 'illustration';
}

function getEleId(reverse = false) {
    if (reverse) return !isElca ? 1 : 2;
    return isElca ? 2 : 1;
}

function changeImg(imgElementNumber, type) {
    console.log(type);
    while(true) {
        const randomMax = backgroundImgObj.max[type];
        
        const n = Math.floor(Math.random() * randomMax) + 1;

        const viewLogs = backgroundImgObj.viewImgLogs[type];

        if (viewLogs.indexOf(n) === -1) {
            const imgEle = document.getElementById(`${backgroundImgObj.elementId}${imgElementNumber}`);

            const path = type;

            imgEle.src = `img/home/${path}/${n}${backgroundImgObj.extension}`;

            if (viewLogs.length >= 4) {
                viewLogs.unshift();
            }
            viewLogs.push(n);

            break;
        }
    }
}

function viewImg(imgElementNumber) {
    const imgEle = document.getElementById(`${backgroundImgObj.elementId}${imgElementNumber}`);
    imgEle.style.opacity = 1;
}

function closeImg(imgElementNumber) {
    const imgEle = document.getElementById(`${backgroundImgObj.elementId}${imgElementNumber}`);
    imgEle.style.opacity = 0;
}

async function switchImg(count) {
    const ele = document.getElementById('developerName');

    if (count !== 0) {
        ele.style.opacity = 0;

        const beforeImgId = getEleId();
        closeImg(beforeImgId);
        await new Promise(resolve => setTimeout(resolve, 2.2 * 1000));
        changeImg(beforeImgId, getType());
    }

    ele.innerHTML = count % 2 ? '<span style="color: #eb6ea5">赤</span>紫' : '<span style="color: #84a2d4">E</span>lca';

    isElca = !isElca;

    const viewImgId = getEleId();

    viewImg(viewImgId);
    ele.style.opacity = 1;
}

function init() {
    /* 初期化 */
    changeImg(1, getType());
    changeImg(2, getType(true));

    let count = 0;

    switchImg(count++);

    setInterval(() => {
        switchImg(count++);
    }, 10 * 1000);
}

init();
