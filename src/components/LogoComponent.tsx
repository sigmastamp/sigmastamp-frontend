import styled from 'styled-components';

interface ILogoComponentProps {
    isWatermark?: boolean;
}

export function LogoComponent({ isWatermark }: ILogoComponentProps) {
    return (
        <LogoElement>
            <img
                className="logo"
                alt="SigmaStamp logo"
                src={`./sigmastamp-logo.grey.svg`}
            />

            {!isWatermark && (
                <div>
                    <h1 className="name">SigmaStamp</h1>
                    <p className="claim">
                        Timestamp your
                        <br />
                        <b>documents</b>
                    </p>
                </div>
            )}
        </LogoElement>
    );
}
const LogoElement = styled.div`
    /*/
    outline: 1px dashed red; /**/

    display: flex;
    font-family: 'Oswald', sans-serif;
    color: white;

    img.logo {
        width: 5rem;
    }

    h1.name {
        display: block;
        font-size: 1.5em;
        margin: 0;
    }

    p.claim {
        display: block;
        font-size: 1em;
        margin: 0;
    }
`;
