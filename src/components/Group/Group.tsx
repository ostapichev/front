import { FC } from 'react';

import { IGroup } from "../../interfaces";

interface IProps {
    group: IGroup;
}

const Group: FC<IProps> = ({ group }) => {
    const {id, name} = group;

    return (
        <option value={id}>{name}</option>
    );
};

export {
    Group
};
