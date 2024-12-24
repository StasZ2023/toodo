import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import Task from '../Task';
import ChangeTaskForm from '../ChangeTaskForm';
import './TaskList.css';

const TaskList = ({ taskData, filterData, onCheckBoxClick, onDeletedClick, onEditClick, onChangeDescription }) => {
  const listElements = taskData.map((item) => {
    const { id, minValue, secValue } = item;

    const timeAfterCreate = formatDistanceToNow(new Date(item.dateCreate));
    let classNames = 'active';
    let checked = false;
    if (item.compleeted) {
      classNames = 'completed';
      checked = true;
    }
    if (item.editing) {
      classNames = 'editing';
    }
    if (filterData === 'all') {
      return (
        <li key={id} className={classNames}>
          <Task
            description={item.description}
            timeAfterCreate={timeAfterCreate}
            checked={checked}
            minValue={minValue}
            secValue={secValue}
            onCheckBoxClick={() => {
              onCheckBoxClick(id);
            }}
            onDeletedClick={() => {
              onDeletedClick(id);
            }}
            onEditClick={() => {
              onEditClick(id);
            }}
          />
          {item.editing ? (
            <ChangeTaskForm id={id} description={item.description} onChangeDescription={onChangeDescription} />
          ) : null}
        </li>
      );
    }
    if (classNames === filterData || classNames === 'editing') {
      return (
        <li key={id} className={classNames}>
          <Task
            description={item.description}
            timeAfterCreate={timeAfterCreate}
            className={classNames}
            checked={checked}
            minValue={minValue}
            secValue={secValue}
            onCheckBoxClick={() => {
              onCheckBoxClick(id);
            }}
            onDeletedClick={() => {
              onDeletedClick(id);
            }}
            onEditClick={() => {
              onEditClick(id);
            }}
          />
          {item.editing ? (
            <ChangeTaskForm id={id} description={item.description} onChangeDescription={onChangeDescription} />
          ) : null}
        </li>
      );
    }
    return null;
  });
  return <ul className="todo-list">{listElements}</ul>;
};
TaskList.default = {
  filterData: 'all',
  taskData: () => {},
  onCheckBoxClick: () => {},
  onDeletedClick: () => {},
  onEditClick: () => {},
  onChangeDescription: () => {},
};

TaskList.propTypes = {
  filterData: PropTypes.string,
  taskData: PropTypes.instanceOf(Array),
  onCheckBoxClick: PropTypes.func,
  onDeletedClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onChangeDescription: PropTypes.func,
};

export default TaskList;
