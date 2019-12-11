var gCanvas = document.querySelector('#my-canvas');
var gCtx = gCanvas.getContext('2d');

function init() {
    createImgs();
    setCurrImg(loadCurrImage());
    if (getCurrImg()) {
        renderMemeMode(getCurrImg());
    }
    else {
        renderGallery();
    }
    renderGallery();

    document.querySelector('.text-line-one').addEventListener('keyup', function () {
        renderMemeMode(getCurrImg());
    });
}

function closeMemeMode() {
    setCurrImg("");
    clearCurrImg();
    renderGallery();
}

function renderGallery() {
    hideMemeMode();
    var filteredGallery = imgsToRender();
    var strHtml = filteredGallery.map(function (img) {
        return `\n<img class="picture" src="${img.url}" onclick="renderMemeMode('${img.url}')">`
    })
    elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = strHtml.join('');
}

function renderMemeMode(url) {
    hideGallery();
    showMemeModeContent();
    drawImg(url);
    drawText();
}

function hideMemeMode() {
    document.querySelector('.tools').style.display = 'none';
    document.querySelector('.canvas-container').style.display = 'none';
    document.querySelector('.close-meme-mode').style.display = 'none';
}

function hideGallery() {
    elImgs = document.querySelectorAll('.picture');
    elImgs.forEach(function (elImg) {
        elImg.style.display = 'none';
    })
}


function drawImg(url) {
    var memeImg = new Image();
    memeImg.src = getCurrImg();
    if (getCurrImg())
        gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height);
    else {
        setCurrImg(url);
        saveData();
        memeImg.src = url;
        memeImg.onload = () => {
            gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height);
        };

    }
}

function onIncreaseFont(){
    increaseFont();
}

function onDecreaseFont(){
    decreaseFont();
}

function drawText() {
    gCtx.save();
    var meme = getgMeme();
    gCtx.font = `${meme.txts.size} ${meme.txts.family}`;
    gCtx.textAlign = meme.txts.align;
    gCtx.fillStyle = 'white';
    elInputText = document.querySelector('.text-line-one');
    var textLine1 = elInputText.value;
    gCtx.fillText(textLine1, 250, 50);
    gCtx.strokeText(textLine1, 250, 50);
    gCtx.restore();
}

function showMemeModeContent() {
    document.querySelector('.canvas-container').style.display = 'block';
    document.querySelector('.close-meme-mode').style.display = 'block';
    document.querySelector('.tools').style.display = 'inline';
}


