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
