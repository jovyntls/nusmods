import * as React from 'react';
import ModList from "./ModList"

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

  start_game = () => {
    this.setState({gameStarted: true});
    this.setState({destination: this.set_destination()})
    this.setState({gameWon: false})
  }
  
  end_game = () => {
    this.setState({gameStarted: false})
    this.setState({gameWon: true})
  }

  set_destination = () => {
    return "CS1231S";
  }

  isGameActive = () => {
    return this.state.gameStarted && !this.state.gameWon;
  }


  render() {
    // const { value, placeholder, isLoading } = this.props;
    return (
      <div className={styles.myDiv}>
        {this.state.gameStarted || this.state.gameWon
          ? <ModList start_point={this.state.start_point} destination={this.state.destination} end_game={this.end_game} isGameActive={this.isGameActive} restart_game={this.start_game} /> 
          : <button 
                type="button"
                className={classnames('btn btn-outline-primary btn-svg')}
                onClick={this.start_game} ref="/modules/MA1100/"
            >
            Start Game
            </button>}
      </div>
    );
  }
}
  
