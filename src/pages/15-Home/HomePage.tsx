import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogoComponent } from "../../components/LogoComponent";

export function HomePage() {
	return (
		<HomePageDiv>
			<div className="logodiv">
			<h1>SigmaStamp</h1>
			</div>
			<p>Are you an artist, write or creator?</p>
			<p>Or maybe you are a landord or tenant?</p>
			<p>Want you to prove to somebody that you were at some place at a specific time?</p>
			<p>In all of these situations you may find the SigmaStamp project helpful for you :-)</p>
			<p>See example usages of SigmaStamp project <Link to="/wiki#examples-of-sigmastamp-usage" target="_blank" rel="noopener noreferrer">here</Link>.</p>
		</HomePageDiv>
	);
}

const HomePageDiv = styled.div`
    img.logo {
        width: 400px;
    }
    h1{
    	text-decoration: !none;
    	text-align: center;
    }
    .logoDiv{
    	text-align: center;
    }
    p{
    	font-size: 1.5rem;
    }
`;
