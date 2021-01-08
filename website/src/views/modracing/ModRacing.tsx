import * as React from 'react';
import ModList from "./ModList"
import axios from "axios";
import { Link } from "react-router-dom"

import classnames from 'classnames';
import styles from './ModRacing.scss'

export type Props = {
  TEST: 1
};

type State = {
  gameStarted: boolean,
  destination: String,
  start_point: String,
  gameWon: boolean,
};

export default class ModRacing extends React.PureComponent<Props, State> {
  searchElement = React.createRef<HTMLInputElement>();
  
  constructor(props: Props) {
    super(props);
    
    this.state = {
      gameStarted: false,
      destination: "Destination",
      gameWon: false,
      start_point: "MA1100"
    };
  }

  componentDidMount() {
    axios.get('http://simpson-mods-api.herokuapp.com/path_random')
      .then((res) => {
        this.setState({destination: res.data.mod2});
        this.setState({start_point: res.data.mod1});
        console.log(res.data)
        return res.data
      })
      .then((res) => {
        console.log(this.state.start_point)
      })
      .catch((err) => console.log(err));
  }

  start_game = () => {
    this.setState({gameStarted: true});
    this.setState({gameWon: false})
  }
  
  end_game = () => {
    this.setState({gameStarted: false})
    this.setState({gameWon: true})
  }

  isGameActive = () => {
    return this.state.gameStarted && !this.state.gameWon;
  }


  render() {
    return (
      <div className={styles.myDiv}>
        {this.state.gameStarted || this.state.gameWon
          ? <ModList start_point={this.state.start_point} destination={this.state.destination} end_game={this.end_game} isGameActive={this.isGameActive} restart_game={this.start_game} /> 
          : <Link to={"/modules/" + this.state.start_point + "/"}>
            <button 
              type="button"
              className={classnames('btn btn-outline-primary btn-svg')}
              onClick={this.start_game}
            >
              Start Game
            </button>
          </Link>
        }
      </div>
    );
  }
}
  
