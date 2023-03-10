export const fromStringBase64EncodedAudioToLocalUrl = (data) => {
    const BASE_64_MARKER = ';base64,';
    const base64Idx = data.indexOf(BASE_64_MARKER) + BASE_64_MARKER.length;
    const base64 = data.substring(base64Idx);
    const raw = atob(base64);
    let array = new Uint8Array(new ArrayBuffer(raw.length));

    for (let i = 0; i < raw.length; i++) {
        array[i] = raw.charCodeAt(i);
    }

    const reconstructedBlob = new Blob([array], {
        type: 'audio/ogg'
    });

    return URL.createObjectURL(reconstructedBlob);
}

export const convertBlobToString64 = (blob) => {
    console.log(URL.createObjectURL(blob));
}

