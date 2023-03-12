export const fromStringBase64EncodedImgToLocalUrl = (image) => {
    const BASE_64_MARKER = ';base64,';
    const base64Idx = image.indexOf(BASE_64_MARKER) + BASE_64_MARKER.length;
    const base64 = image.substring(base64Idx);
    const rawImage = atob(base64);
    let array = new Uint8Array(new ArrayBuffer(rawImage.length));

    for (let i = 0; i < rawImage.length; i++) {
        array[i] = rawImage.charCodeAt(i);
    }

    const reconstructedBlob = new Blob([array], {
        type: 'image/png'
    });

    return URL.createObjectURL(reconstructedBlob);
}