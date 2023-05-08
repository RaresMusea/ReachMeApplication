export const getDownloadLink = (fileName, url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

export const sortReceivedNotifications = (array) => {
    array.sort((a, b) => b.notificationDate - a.notificationDate);
}

export const sortActivitiesDescending = (array) => {
    array.sort((a, b) => b.activityDate - a.activityDate);
}

export const generateUuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
