var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gNextId = 1;
var gImgs = [];
var gCurrImg;
var gMeme = {
    selectedImgId: 5,
    txts:
        [{ line: '', size: 30, family: 'IMPACT', align: 'left', posY: 50, color: 'white' }],
    currTextLine: 0
}

function createImgs() {
    gImgs.push(createImg("img/Gallery-Pics/003.jpg", ["weird"]));
    gImgs.push(createImg("img/Gallery-Pics/004.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/005.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/5.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/006.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/8.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/9.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/12.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/Ancient-Aliens.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/img5.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/img11.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/img12.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/leo.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/meme1.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/One-Does-Not-Simply.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/patrick.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/putin.jpg", ["cute"]));
    gImgs.push(createImg("img/Gallery-Pics/X-Everywhere.jpg", ["cute"]));
}
function createImg(url, keywords) {
    var img = {};
    img.id = gNextId++;
    img.url = url;
    img.keywords = [];
    keywords.forEach(function (keyword) {
        img.keywords.push(keyword);
    });
    return img;
}



function imgsToRender() {
    return gImgs;
}

function getgMeme() {
    return gMeme;
}

function setMemeTxt(key, value) {
    gMeme.txts[gMeme.currTextLine][key] = value;
}

function setgMeme(key, value) {
    gMeme[key] = value;
}

function setCurrImg(url) {
    gCurrImg = url;
}

function getCurrImg() {
    return gCurrImg;
}

function saveData() {
    saveToStorage('currImg', gCurrImg);
}

function loadCurrImage() {
    return loadFromStorage('currImg', '');
}

function clearCurrImg() {
    removeCurrImgFromStorage('currImg');
}

function increaseFont() {
    gMeme.txts[gMeme.currTextLine].size++;
}

function decreaseFont() {
    gMeme.txts[gMeme.currTextLine].size--;
}

function moveTextDown() {
    gMeme.txts[gMeme.currTextLine].posY += 10;
}


function moveTextUp() {
    gMeme.txts[gMeme.currTextLine].posY -= 10;
}

function changeTextLine() {
    if (gMeme.currTextLine >= gMeme.txts.length - 1) gMeme.currTextLine = 0;
    else gMeme.currTextLine++;
}

function setTextLine(line) {
    gMeme.currTextLine = line;
}

function addLine() {
    gMeme.txts.push(createLine());
    gMeme.currTextLine = gMeme.txts.length - 1;
}

function createLine() {
    if (gMeme.txts.length == 1) {
        return { line: '', size: 30, family: 'IMPACT', align: 'left', posY: 500, color: 'white' }
    }
    else if (gMeme.txts.length == 0) {
        return { line: '', size: 30, family: 'IMPACT', align: 'left', posY: 50, color: 'white' }
    }
    return { line: '', size: 30, family: 'IMPACT', align: 'left', posY: (gMeme.txts.length) * 50, color: 'white' }
}

function removeAllTextLines() {
    gMeme.txts.splice(0, gMeme.txts.length);
}

function removeLine() {
    gMeme.txts.splice(gMeme.currTextLine, 1);
}
