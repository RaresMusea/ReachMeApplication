import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import './styles.scss';
import {Avatar} from "@mui/joy";
import logo from '../../../Media/Images/logoPic.svg';
import Divider from "@mui/material/Divider";

export default function UserHoverCard(props) {

    return (
        <HoverCard.Root openDelay={0.7} closeDelay={10}>
            <HoverCard.Trigger asChild>
                <Avatar
                    src={props.userInfo.profilePhotoHref}/>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content className="HoverCardContent" sideOffset={5}>
                    <div className="CardFlexWrapper">
                        <div className = "CardFirstRow">
                        <Avatar
                            className="CardAvatar"
                            src={props.userInfo.profilePhotoHref}/>
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
                                {props.userInfo.bio!==null?props.userInfo.bio:``}
                                </cite>
                            </div>
                            <div className="AdditionalInfo">
                                <p className="Additional">{props.additionalInfo}</p>
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

