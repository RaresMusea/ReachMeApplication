import ListItemButton from "@mui/material/ListItemButton";
import {Divider, List, ListItem, ListItemIcon} from "@mui/material";
import {
    AccountBox,
    BackupRounded,
    PieChart,
    PrivacyTip,
    QuestionMarkSharp,
    SettingsApplications
} from "@mui/icons-material";
import "../../../Styles/Navbar/FeedDrawer.scss";
import SignOutModal from "../../Modals/SignOutModal";

export default function MiddleSection() {

    return (
        <>
            <h4 className='SubHeading'>Personal Settings</h4>
            <List>
                <ListItem key="accountManagement" disablePadding
                          style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <ListItemButton alignItems="center">
                        <ListItemIcon>
                            <AccountBox/>
                        </ListItemIcon>
                        <div className="ListItemText">Manage Account Info</div>
                    </ListItemButton>
                </ListItem>
                <ListItem key="accountReputation" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PieChart/>
                        </ListItemIcon>
                        <div className="ListItemText">Account Reputation</div>
                    </ListItemButton>
                </ListItem>
                <ListItem key="accountPrivacy" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PrivacyTip/>
                        </ListItemIcon>
                        <div className="ListItemText">Privacy</div>
                    </ListItemButton>
                </ListItem>
                <ListItem key="accountBackup" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <BackupRounded/>
                        </ListItemIcon>
                        <div className="ListItemText">Backup & Recovery</div>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <h4 className="SubHeading">App</h4>
            <List>
                <ListItem key="appSettings" disablePadding
                          style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <ListItemButton alignItems="center">
                        <ListItemIcon>
                            <SettingsApplications/>
                        </ListItemIcon>
                        <div className="ListItemText">App Settings</div>
                    </ListItemButton>
                </ListItem>
                <ListItem key="faq" disablePadding
                          style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <ListItemButton alignItems="center">
                        <ListItemIcon>
                            <QuestionMarkSharp/>
                        </ListItemIcon>
                        <div className="ListItemText">FAQ</div>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>
            <SignOutModal/>
        </>
    );
}