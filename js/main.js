const imageFileInput = document.querySelector('#imageFileInput'),
    topTextInput = document.querySelector('#topTextInput'),
    bottomTextInput = document.querySelector('#bottomTextInput'),
    canvas = document.querySelector('#meme'),
    saveImage = document.querySelector('#saveImage'),
    btnSaveImage = document.querySelector('#btnSaveImage');

let image;


imageFileInput.addEventListener("change", () => {
    const imageURL = URL.createObjectURL(imageFileInput.files[0]);
    image = new Image();
    image.src = imageURL;

    image.addEventListener("load", () => {
        updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
    }, { once: true });

});

topTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

saveImage.addEventListener("click", () => {
    const toDataUrl = canvas.toDataURL('image/png')
    saveImage.href = toDataUrl;
    console.log(toDataUrl);
});


function updateMemeCanvas(canvas, image, topText, bottomText) {
    const ctx = canvas.getContext('2d'),
        width = image.width,
        height = image.height,
        fontSize = Math.floor(width / 10),
        yOffset = height / 25;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    //Text preparation
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 10);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px sans-serif`;

    //Top text
    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);

    //Bottom text
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);
}

