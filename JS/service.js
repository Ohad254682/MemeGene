var gKeywords = { 'happy': 12, 'funny puk': 1 };
var gNextId = 1;
var gImgs = [];
var gCurrImg;
var gMeme = {
    selectedImgId: 5,
    selectedTxtIdx: 0,
    txts: 
        { line: 'I never eat Falafel', size: '30px', family:'IMPACT', align: 'center', color: 'red' }
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

function setgMeme(key, value) {
    gMeme[key] = value;
}

function setgMemeTxt(key,value){
    gMeme.txts[key]=value;
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

function increaseFont(){
    gMeme.txts.size++;
}

function decreaseFont(){
    gMeme.txts.size--;
}