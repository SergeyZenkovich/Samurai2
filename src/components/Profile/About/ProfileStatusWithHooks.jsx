import React, { useEffect, useState } from 'react';

const ProfileStatusWithHooks = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);


    const activateEditMode = () => {
        if (props.isOwner) {
            setEditMode(true);
        }
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }
    const onStatusChange = (e) => {
        e.currentTarget.value === '' ? setStatus('----') : setStatus(e.currentTarget.value);
    }
    return (
        <div>
            {editMode ?
                <div>
                    <input type="text" autoFocus={true} onBlur={deActivateEditMode} onChange={onStatusChange} value={status} />
                </div> :
                < div >
                    <span onDoubleClick={() => { activateEditMode() }}>{props.status}</span>
                </div>
            }


        </div >

    );
}

export default ProfileStatusWithHooks;