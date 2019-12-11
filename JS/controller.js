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
    document.querySelector('.text-line').addEventListener('keyup', function () {
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

function onIncreaseFont() {
    increaseFont();
    renderMemeMode();
}

function onDecreaseFont() {
    decreaseFont();
    renderMemeMode();
}

function onMoveTextDown() {
    moveTextDown();
    renderMemeMode();
}

function onMoveTextUp() {
    moveTextUp();
    renderMemeMode();
}

function onChangeTextLine() {
    changeTextLine();
    var meme = getgMeme();
    document.querySelector('.text-line').value = meme.txts[meme.currTextLine].line;
}

function drawText() {
    var meme = getgMeme();
    var inputTxt = document.querySelector('.text-line').value;
    setMemeTxt('line', inputTxt);
    meme.txts.forEach(function (txtLine) {
        gCtx.save();
        gCtx.font = `${txtLine.size}px ${txtLine.family}`;
        gCtx.textAlign = txtLine.align;
        gCtx.fillStyle = txtLine.color;
        gCtx.fillText(txtLine.line, 250, txtLine.posY);
        gCtx.strokeText(txtLine.line, 250, txtLine.posY);
        gCtx.restore();
    })

}

function showMemeModeContent() {
    document.querySelector('.canvas-container').style.display = 'block';
    document.querySelector('.close-meme-mode').style.display = 'block';
    document.querySelector('.tools').style.display = 'inline';
}


