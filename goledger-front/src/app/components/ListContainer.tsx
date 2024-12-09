import React from 'react';
import classNames from 'classnames';

interface ContainerProps {
  direction?: 'col' | 'row'; 
  children: React.ReactNode;
}

const ListContainer: React.FC<ContainerProps> = ({ direction = 'col', children }) => {
  const directionClasses = classNames('flex', {
    'flex-wrap': direction === 'row',
    'flex-col': direction === 'col',
  });

  return <div className={`${directionClasses} gap-4 p-4`}>{children}</div>;
};

export default ListContainer;
