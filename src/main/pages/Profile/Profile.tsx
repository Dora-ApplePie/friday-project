import s from './Profile.module.css'
import avatar from './Sample_User_Icon.png'
import {ProfileType} from "./profileReducer";
import React, {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";
import {TextField} from "@material-ui/core";
import {RequestStatusType} from "../../../app/app-reducer";
import {CircularProgress} from "@mui/material";


type ProfilePropsType = {
    profile: ProfileType
    logOutHandler: () => void
    EditMode: (newName: string | null) => void
    status: RequestStatusType
}

const Profile: React.FC<ProfilePropsType> = ({profile, logOutHandler, EditMode, status}) => {

    let [editMode, setEditMode] = useState(false)
    let [name, setName] = useState(profile.name)

    const activateEditMode = () => {
        setEditMode(true)
        setName(profile.name)
    }
    const activateViewMode = () => {
        setEditMode(false)
        EditMode(name)
    }
    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)


    const CardsMessage = profile.publicCardPacksCount === 0
        ? `You don't have any cards yet`
        : `Count cards you have is ${profile.publicCardPacksCount}`


    return (
        <div className={s.profileBox}>
            {status === 'loading' &&  <CircularProgress/>}
            <span>
                <Button color="secondary" onClick={logOutHandler}>Log Out</Button>
                <Button color="secondary" onClick={activateEditMode} disabled={editMode}> Edit </Button>
            </span>

            <div>
                <div className={s.avatarBox}>
                    <img className={s.avatar} src={avatar} alt={'avatar'}/>
                </div>
            </div>
            <div className={s.wrap}>
                <span className={s.name}>
                    {editMode
                        ? <>
                            <TextField variant={'standard'}
                                       error={name === ""}
                                       value={name}
                                       onChange={onChangeNameHandler}
                                       onBlur={activateViewMode}
                                       autoFocus/>
                            <Button color="secondary" onClick={activateViewMode}> Save </Button>
                          </>
                        : <span>Hello, {profile.name}</span>
                    }
                </span>
                <p>{CardsMessage}</p>
            </div>
        </div>
    )
};

export default Profile

