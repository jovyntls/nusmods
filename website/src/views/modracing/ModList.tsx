import React, { useState } from "react";
import styles from './ModRacing.scss'
import classnames from 'classnames';
import { useHistory, Link } from 'react-router-dom';

function ModList(props) {
  const [modHistory, setModHistory] = useState([]);
  const [winPath, setWinPath] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [modName, setModName] = useState("");
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
    console.log(props.route)
    return (
      <div>
        Target: <br />
        <strong>{props.destination}</strong> <br />
        <small>{props.destination_name}</small> <br />
        <div>
        {modHistory.length} clicks:
        </div>
        <div className={styles.navbar1} >
        <ul className={styles.nobullets}>
          {modHistory.map(mod => <li className={styles.block}>{mod}</li> )}
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
        <strong>{winPath[0]} -> {winPath[winPath.length - 1]}</strong>
        <div>in {winPath.length} clicks</div>
        <sub>Your path: </sub>
        <ul className={styles.navbar2}>
          {winPath.map(mod => <li className={styles.block}>{mod}</li>)}
        </ul>
        <Link to={"/modules/" + props.start_point + "/"}>
          <button 
          type="button"
          className={classnames('btn btn-outline-primary btn-svg')}
          onClick={restartGame}>Play again</button>
        </Link>
      </>
    )
  }
  
  return (
    <div>
      {!gameWon ? showActiveGame() : showWinGame()}
    </div>
  )
}

export default ModList;
