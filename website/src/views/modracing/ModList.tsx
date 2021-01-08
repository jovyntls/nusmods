import React, { useState } from "react";
import styles from './ModRacing.scss'
import classnames from 'classnames';
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
        <div>
        {modHistory.length} clicks:
        </div>
        <div className={styles.navbar1} >
        <ul className={styles.nobullets}>
          {modHistory.map(mod => 
          // <li className={styles.branch} >
          //   <a className={styles.link}>{mod}</a></li>)}
          <li className={styles.block}>{mod}</li> )}

        </ul>
        </div>
        
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
        <ul className={styles.navbar2}>
          {winPath.map(mod => <li className={styles.block}>{mod}</li>)}
        </ul>
        <button 
        type="button"
        className={classnames('btn btn-outline-primary btn-svg')}
        onClick={restartGame}>Play again</button>
      </>
    )
  }
  
  return (
    <div>
      <strong>Destination: {props.destination}</strong>
      {!gameWon ? showActiveGame() : showWinGame()}
    </div>
  )
}

export default ModList;
