import React, { useState } from "react";
import scara from "./img/ordem.jpeg";

const defaulgame = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const hasSequence = (items) => /ooo|xxx/i.test(items.join(''));

const checkBasicPattern = (acc, current, index, arr) => {
    if (acc) return true;

    const checkHorizontal = hasSequence(current);
    const checkVertical = hasSequence(arr.map(item => item[index]));

    return checkHorizontal || checkVertical;
};

const checkDiagonal = (game) => {
    const normal = hasSequence(game.map((el, index) => game[index][index]));
    const reverse = hasSequence(game.map((el, index) => game[index][game.length - 1 - index]));
    return normal || reverse;
};

export default function Game() {
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [game, setGame] = useState(defaulgame);

    const isGameOver = game.reduce(checkBasicPattern, false) || checkDiagonal(game);

    return (
        <section id="game">
            <header>
                <img src={scara} alt="logo" />
                <h1>Jogo da velha</h1>
            </header>
            {isGameOver && (
                <p className="gameover">Você perdeu!</p>
            )}
            <div className="board">
                {game.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <div
                                key={cellIndex}
                                className="cell"
                                role="button"
                                onClick={() => {
                                    if (cell !== "" || isGameOver) return; 
                                    setGame(game.map((rowItem, rowI) => {
                                        return rowItem.map((cellItem, cellI) => {
                                            if (rowI === rowIndex && cellI === cellIndex) {
                                                return currentPlayer;
                                            }
                                            return cellItem;
                                        });
                                    }));
                                    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
                                }}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="actions">
                <button type="button" onClick={() => {
                    setGame(defaulgame.map(row => [...row]));
                    setCurrentPlayer('X');
                }}>
                    Reiniciar jogo
                </button>
            </div>
        </section>
    );
}