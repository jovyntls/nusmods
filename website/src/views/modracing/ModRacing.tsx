import { useHistory } from 'react-router-dom';

import { FC } from 'react';

export type Props = {
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
    const mods_ive_visited = [];
    history.listen((location, action) => {
        console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
        console.log(`The last navigation action was ${action}`)
        mods_ive_visited.push(history.location.pathname);
    })

    const logHistory = () => {
        console.log(history)
        console.log(mods_ive_visited)
    }
  
    return (
      <>
        <div className="hello">HELLO WORLD</div>
        <button onClick={logHistory}>HISTORY</button>
        {mods_ive_visited.map(mod => (<div>mod</div>))}
      </>
    );
  };
  
  export default ModRacing;
