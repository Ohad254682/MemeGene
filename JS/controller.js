var gCanvas = document.querySelector('#my-canvas');
var gCtx = gCanvas.getContext('2d');

function init() {
    createImgs();
    setMemeTxt('posY', 50);
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
    resizeCanvas();
}

function onSetLinePos() {
    var meme = getgMeme();
    if (meme.txts.length === 2) {
        setMemeTxt('posY', gCanvas.height - 50);
    }
    else if (meme.txts.length === 1) {
        setMemeTxt('posY', 50);
    }
    else setMemeTxt('posY', meme.txts.length * 50);
}

function closeMemeMode() {
    setCurrImg("");
    clearCurrImg();
    clearInputAndText();
    renderGallery();
}


function clearInputAndText() {
    document.querySelector('.text-line').value = '';
    removeAllTextLines();
    addLine();
}

function renderGallery() {
    hideMemeMode();
    var filteredGallery = imgsToRender();
    var strHtml = filteredGallery.map(function (img) {
        return `\n<img class="picture" src="${img.url}" onclick="renderMemeMode('${img.url}')">`
    })
    elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = strHtml.join('');
    document.querySelector('#about').style.display = 'flex';
}

function renderMemeMode(url) {
    hideGallery();
    showMemeModeContent();
    drawImg(url);
}

function hideMemeMode() {
    document.querySelector('.meme-body').style.display = 'none';
}

function hideGallery() {
    elImgs = document.querySelectorAll('.picture');
    elImgs.forEach(function (elImg) {
        elImg.style.display = 'none';
    })
    document.querySelector('#about').style.display = 'none';
}


function drawImg(url) {
    var memeImg = new Image();
    memeImg.src = getCurrImg();
    if (getCurrImg()) {
        memeImg.onload = () => {
            gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height);
            drawText();
        };
    }
    else {
        setCurrImg(url);
        saveData();
        memeImg.src = url;
        memeImg.onload = () => {
            gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height);
            drawText();
        };

    }
}

function onIncreaseFont() {
    increaseFont();
    drawImg();
}

function onDecreaseFont() {
    decreaseFont();
    drawImg();
}

function onMoveTextDown() {
    moveTextDown();
    drawImg();
}

function onMoveTextUp() {
    moveTextUp();
    drawImg();
}

function onChangeTextLine() {
    changeTextLine();
    var meme = getgMeme();
    if (meme.txts.length > 0) {
        document.querySelector('.text-line').value = meme.txts[meme.currTextLine].line;
    }
    drawImg();
}

function drawText() {
    var meme = getgMeme();
    var inputTxt = document.querySelector('.text-line').value;
    if (meme.txts.length > 0) {
        setMemeTxt('line', inputTxt);
        meme.txts.forEach(function (txtLine) {
            gCtx.save();
            gCtx.font = `${txtLine.size}px ${txtLine.family}`;
            gCtx.textAlign = txtLine.align;
            gCtx.fillStyle = txtLine.color;
            gCtx.strokeStyle = 'black';
            gCtx.fillText(txtLine.line, 50, txtLine.posY);
            gCtx.strokeText(txtLine.line, 50, txtLine.posY);
            gCtx.restore();
        })
    }
    drawRect();
}

function showMemeModeContent() {
    document.querySelector('.meme-body').style.display = 'flex';
}

function onAddLine() {
    addLine();
    onSetLinePos()
    document.querySelector('.text-line').value = '';
    drawImg();
}

function onRemoveLine() {
    removeLine();
    onChangeTextLine();
    drawImg();
}

function drawRect() {
    var meme = getgMeme();
    if (meme.txts.length > 0) {
        var rect = document.querySelector('.rectangle');
        rect.style.display = 'block';
        var inputCharCount = document.querySelector('.text-line').value.length;
        rect.style.width = (inputCharCount * (meme.txts[meme.currTextLine].size / 1.6)) + 'px';
        rect.style.height = meme.txts[meme.currTextLine].size + 'px';
        rect.style.top = meme.txts[meme.currTextLine].posY + gCanvas.offsetTop - (meme.txts[meme.currTextLine].size) + 'px';
        rect.style.left = 50 + gCanvas.offsetLeft - 10 + 'px';

        setTimeout(function () {
            rect.style.display = 'none';
        }, 3000)
    }
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
}

function openMenu(ev) {
    document.querySelector('.navbar ul').style.display = 'flex';
    document.querySelector('.close-menu-btn').style.display = 'inline';
    document.querySelector('.mobile-logo-menu').style.display = 'inline';
    ev.stopPropagation();
}

function closeMenu() {
    document.querySelector('.navbar ul').style.display = 'none';
    document.querySelector('.close-menu-btn').style.display = 'none';
    document.querySelector('.mobile-logo-menu').style.display = 'none';
}

function onSelectRow(ev) {
    console.log(ev.clientY);
    var locationY = ev.clientY - gCanvas.offsetTop;
    console.log(locationY);
    var textIndex = findTextIndexByLocation(locationY);
    if (textIndex === -1) return;
    setTextLine(textIndex);
    var meme = getgMeme();
    if (meme.txts.length > 0) {
        document.querySelector('.text-line').value = meme.txts[meme.currTextLine].line;
    }
    drawImg();
}

function resizeCanvas() {
    window.addEventListener('resize', function () {
        if (window.innerWidth <= 1020 && window.innerWidth > 450) {
            gCanvas.width = 400;
            gCanvas.height = 400;
            drawImg();
        }
        else if (window.innerWidth <= 450) {
            gCanvas.width = 310;
            gCanvas.height = 330;
            drawImg();
        }
    })
}



