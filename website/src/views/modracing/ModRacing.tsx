import * as React from 'react';
import ModList from "./ModList"
import axios from "axios";
import { Link } from "react-router-dom"

import classnames from 'classnames';
import styles from './ModRacing.scss'

export type Props = {
};

type State = {
  gameStarted: boolean,
  destination: String,
  destination_name: String,
  start_point: String,
  route: String,
  gameWon: boolean,
};

export default class ModRacing extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      gameStarted: false,
      destination: "modCode",
      destination_name: "Destination",
      gameWon: false,
      start_point: "MA1100",
      route: "",
    };
  }

  componentDidMount() {
    axios.get('http://simpson-mods-api.herokuapp.com/path_random')
      .then((res) => {
        this.setState({destination: res.data[0].mod2});
        this.setState({start_point: res.data[0].mod1});
        this.setState({route: res.data[0].route})
        return res.data[0]
      })
      .then((res) => {
        const modcode = res.mod2
        axios.get(`https://api.nusmods.com/v2/2020-2021/modules/${modcode}.json`)
          .then((res) => {
            this.setState({destination_name: res.data.title})
          })
          .catch(err => console.log(err))
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
    axios.get('http://simpson-mods-api.herokuapp.com/path_random')
      .then((res) => {
        this.setState({destination: res.data[0].mod2});
        this.setState({start_point: res.data[0].mod1});
        this.setState({route: res.data[0].route})
        axios.get(`https://api.nusmods.com/v2/2020-2021/modules/${res.data[0].mod2}.json`)
          .then((res) => {
            this.setState({destination_name: res.data.title})
          })
          .catch(err => console.log(err))
        return res.data
      })
      .catch((err) => console.log(err));
  }


  render() {
    return (
      <div className={styles.myDiv}>
        {this.state.gameStarted || this.state.gameWon
          ? <ModList start_point={this.state.start_point} destination={this.state.destination} destination_name={this.state.destination_name} route={this.state.route} end_game={this.end_game} restart_game={this.start_game} /> 
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
  
