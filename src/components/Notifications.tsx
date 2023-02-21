import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../routes.mjs';
import { isRunningOnMobileDevice } from '../utils/isRunningOnMobileDevice';
import { usePersistentState } from '../utils/usePersistentState';

export function Notifications() {
    const [isMobileDeviceWarning, setMobileDeviceWarning] = usePersistentState(
        'isMobileDeviceWarning',
        isRunningOnMobileDevice(),
    );

    return (
        <NotificationsDiv className="notifications">
            {isMobileDeviceWarning && (
                <NotificationDiv className="notification">
                    On mobile devices SigmaStamp has limited capabilities.
                    <Link
                        className="button"
                        to={ROUTES.Mobile}
                        onClick={() => void setMobileDeviceWarning(false)}
                    >
                        See more
                    </Link>
                    <Link
                        className="button"
                        to={ROUTES.Mobile}
                        onClick={() => void setMobileDeviceWarning(false)}
                    >
                        Dismiss
                    </Link>
                </NotificationDiv>
            )}
        </NotificationsDiv>
    );
}

const NotificationsDiv = styled.div`
    /*/
    outline: 1px dashed green; /**/

    pointer-events: none;
    z-index: 10010;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 850px) {
        top: unset;
        bottom: 0;
    }
`;

const NotificationDiv = styled.div`
    /*/
    outline: 1px dashed red; /**/

    pointer-events: all;

    padding: 10px;
    border-radius: 5px;
    background-color: #a3b168;
`;

/**
 * TODO: Here should be also EU cookies warning
 */
