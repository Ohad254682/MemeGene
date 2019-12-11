var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gNextId = 1;
var gImgs = [];
var gCurrImg;
var gMeme = {
    selectedImgId: 5,
    txts:
        [{ line: '', size: 30, family: 'IMPACT', align: 'center', posY: 50, color: 'white' },
        { line: '', size: 30, family: 'IMPACT', align: 'center', posY: 250, color: 'white' }],
    currTextLine: 0
}

function createImgs() {
    gImgs.push(createImg("img/003.jpg", ["weird"]));
    gImgs.push(createImg("img/004.jpg", ["cute"]));
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

function setMemeTxt(key,value){
    gMeme.txts[gMeme.currTextLine][key]=value;
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
    if (gMeme.currTextLine == 0) gMeme.currTextLine = 1;
    else gMeme.currTextLine = 0;
}