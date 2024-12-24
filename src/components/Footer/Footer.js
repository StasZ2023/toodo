import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../TaskFilter';
import './Footer.css';

const Footer = ({ notCompleetedCount, clearCompleted, setFilterData }) => (
  <footer className="footer">
    <span className="todo-count">{`${notCompleetedCount}  items left`}</span>
    <TaskFilter setFilterData={setFilterData} />
    <button type="button" className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
);
Footer.default = {
  notCompleetedCount: 0,
  clearCompleted: () => {},
  setFilterData: () => {},
};
Footer.propTypes = {
  notCompleetedCount: PropTypes.number,
  clearCompleted: () => {},
  setFilterData: () => {},
};
export default Footer;
