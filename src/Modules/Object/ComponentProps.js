import searchIcon from '../../Media/Images/search.svg';
import searchIconPressed from '../../Media/Images/searchIconPressed.svg';
import messagingIcon from '../../Media/Images/messages.svg';
import notificationIcon from '../../Media/Images/notifications-active.svg';

export const resetPasswordDialogProps = {
    dialogTitle: 'Forgot password? We\'ve got your back.',
    dialogMessage: 'Please fill in the form below with the email address associated with your account.' +
        'We will automatically send you an email on the specified address with a password reset link.',
    actionName: `Reset password`,
};

export const defaultMessagingIcon = messagingIcon;
export const defaultSearchIconName = searchIcon;
export const searchIconEngaged = searchIconPressed;
export const defaultNotificationIcon = notificationIcon;