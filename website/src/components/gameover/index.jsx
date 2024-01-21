import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import Layout from '../layout';
import './gameover-styles.css';

const GameOver = () => {
	const { status, turn } = useContext(GameContext);
	let winner;
	if (status === 'checkmate') {
		if (turn === 'b') {
			winner = 'BELI';
		} else {
			winner = 'ČRNI';
		}
	}

	const Content = () => (
		<React.Fragment>
			<h1>KONEC IGRE</h1>
			
			{winner && (
				<p>
					<mark>{winner}</mark> JE ZMAGAL
				</p>
			)}

		</React.Fragment>
	);

	const Image = () => (
		<img
			className="bg-img"
			src={require('../../assets/game-over.jpg')}
			alt="game over"
		/>
	);
	return <Layout Image={Image} Content={Content} />;
};

export default GameOver;
