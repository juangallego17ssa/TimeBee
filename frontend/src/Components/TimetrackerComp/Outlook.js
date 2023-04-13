import React, { useRef, useState } from 'react';
import { useEffect } from 'react';




function Outlook() {

    let [timer, setTime] = useState(0);
    const intervalId = useRef()
   
   

    return (
        <div>
            <div>Outlook</div>
            <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=8b24d741-b41a-4d56-a4d5-364930a6ade0&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ftimetracker&response_mode=query&scope=offline_access%20user.read%20Calendars.ReadWrite&state=46216">Connect to Outloos</a>
        </div>
    )
}
export default Outlook;