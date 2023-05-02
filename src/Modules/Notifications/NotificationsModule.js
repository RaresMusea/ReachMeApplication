export const getIdentifiersFromNotificationsArray = (notificationsArray) => {
    const result = [];
    notificationsArray.forEach(notification => {
            if (!result.includes(notification.senderId)) {
                result.push(notification.senderId);
            }
        }
    );
    return result;
}

export const getProfilePhotoHrefForSpecificId = (list, id) => {
    let returnedValue;
    list.forEach(element => {
        if (element.id === id) {
            returnedValue = element.profilePhotoHref;
        }
    });
    return returnedValue;
}