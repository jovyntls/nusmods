import { FC } from 'react';

export type Props = {
    mods: mods_ive_visited
};

type State = {
};

const ModList: FC<Props> = (props) => {
    const logProps = () => {console.log(props)}
    return (
      <>
        <button onClick={logProps}></button>
        <div>{props.mod}</div>
        <div>new item</div>
      </>
    );
  };
  
  export default ModList;
