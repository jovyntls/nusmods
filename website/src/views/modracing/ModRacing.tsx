import { useHistory } from 'react-router-dom';
import ModList from "./ModList"

import { FC } from 'react';

export type Props = {
  TEST: 0
};

type State = {
};

// export const SIDE_MENU_LABELS = {
//   details: 'Details',
//   prerequisites: 'Prerequisites',
//   timetable: 'Timetable',
//   reviews: 'Reviews',
// };

const ModRacing: FC<Props> = ({
    props,
    go,
    here
  }) => {
    const history = useHistory();
    let mods_ive_visited = [0];
    history.listen((location, action) => {
        console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
        console.log(`The last navigation action was ${action}`)
        // mods_ive_visited.push(history.location.pathname);
        if (action == "PUSH") {
          mods_ive_visited = [...mods_ive_visited, history.location.pathname]
        } else if (action == "POP") {
          mods_ive_visited.pop()
        } else {
        }
 })

    const logHistory = () => {
        console.log("mods ive visited:")
        console.log(mods_ive_visited)
    }
  
    return (
      <>
        <div className="hello">HELLO WORLD</div>
        <button onClick={logHistory}>HISTORY</button>
        {/* <ModList mods_ive_visited={mods_ive_visited} /> */}
        {mods_ive_visited.map(mod => (<ModList mod={mod} key={mod}/>))}
        {/* {mods_ive_visited.map(mod => (<div key={mod}>mod</div>))} */}
        {/* <ModList mod={mods_ive_visited}/> */}
      </>
    );
  };
  
  export default ModRacing;
