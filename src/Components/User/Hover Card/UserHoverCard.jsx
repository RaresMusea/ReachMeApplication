import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import './styles.scss';
import {Avatar} from "@mui/joy";
import logo from '../../../Media/Images/logoPic.svg';
import Divider from "@mui/material/Divider";
import IconButton from "@mui/joy/IconButton";
import {Contacts, MessageRounded} from "@mui/icons-material";
import {endsWithVowel} from "../../../Modules/Text/TextModule";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";

export default function UserHoverCard(props) {

    return (
        <HoverCard.Root openDelay={0.7} closeDelay={10}>
            <HoverCard.Trigger asChild>
                <Avatar
                    src={props.currentProfilePhoto}/>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content className="HoverCardContent" sideOffset={5}>
                    <div className="CardFlexWrapper">
                        <div className="CardFirstRow">
                            <Avatar
                                className="CardAvatar"
                                src={props.currentProfilePhoto}/>
                            <div className="UserDetails">
                                <span className="UserRealName">{props.userInfo.userRealName}</span>
                                <span className="Username">{`@${props.userInfo.userName}`}</span>
                            </div>
                        </div>
                        <div className="Bio">
                            {
                                props.userInfo.bio &&
                                <h4 className="BioHeading">Bio</h4>
                            }
                            <cite className="BioText">
                                {props.userInfo.bio !== null ? props.userInfo.bio : ``}
                            </cite>
                        </div>
                        <div className="AdditionalInfo">
                            <p className="Additional">{props.additionalInfo}</p>
                        </div>
                        <div className="CardButtons">
                            {
                                props.userInfo.userFirebaseIdentifier !== loggedInAccount.userFirebaseIdentifier &&
                                <IconButton
                                    onClick={props.openConversation}
                                    title={`Send message to ${props.userInfo.userRealName}`}>
                                    <MessageRounded
                                        className="RoundedIcon"
                                    />
                                </IconButton>
                            }
                            <IconButton
                                title={`View ${props.userInfo.userRealName}${endsWithVowel(props.userInfo.userRealName) ? "'s" : ""} profile`}>
                                <Contacts
                                    className="RoundedIcon"
                                />
                            </IconButton>
                        </div>
                        <span className="Logo">
                            <Divider className="Divider">
                            <img src={logo} alt="Logo"/>
                            </Divider>
                        </span>
                    </div>
                    <HoverCard.Arrow className="HoverCardArrow"/>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
}

