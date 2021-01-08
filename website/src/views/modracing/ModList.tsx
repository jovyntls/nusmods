import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

function ModList(props) {
  const [modHistory, setModHistory] = useState([]);
  const [winPath, setWinPath] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const history = useHistory();

  history.listen((location, action) => {
    const mod = location.pathname.split("/")[2];
    addPath(mod);
    hasGameEnded(mod);
  })

  const addPath = (mod) => {
    setModHistory(modHistory => modHistory[modHistory.length - 1] == mod ? modHistory : [...modHistory, mod]);
  }

  const hasGameEnded = (mod) => {
    if (mod == props.destination) {
      props.end_game();
      setGameWon(true);
      setWinPath([...modHistory, props.destination]);
      setModHistory([]);
    }
  }

  const showActiveGame = () => {
    return (
      <div>
        {modHistory.length} clicks:
        <ul>
          {modHistory.map(mod => <li>{mod}</li>)}
        </ul>
      </div>
    )
  }

  const restartGame = () => {
    setGameWon(false);
    props.restart_game();
  }
  
  const showWinGame = () => {
    return (
      <>
        <div>You won!</div>
        <div>Clicks used: {winPath.length}</div>
        <div>your path: </div>
        <ul>
          {winPath.map(mod => <li>{mod}</li>)}
        </ul>
        <button onClick={restartGame}>Play again</button>
      </>
    )
  }
  
  return (
    <div>
      <strong>destination: {props.destination}</strong>
      {!gameWon ? showActiveGame() : showWinGame()}
    </div>
  )
}

export default ModList;
