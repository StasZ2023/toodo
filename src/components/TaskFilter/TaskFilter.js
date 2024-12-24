import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TaskFilter.css';

export default class TaskFilter extends Component {
  state = {
    allButtonClicked: true,
    activeButtonClicked: false,
    completedButtonClicked: false,
  };

  static defaultProps = {
    setFilterData: () => {},
  };

  static propTypes = {
    setFilterData: PropTypes.func,
  };

  onClickButton = (event) => {
    const buttonClicked = event.target.innerText.toLowerCase();
    if (buttonClicked === 'all') {
      this.setState({
        allButtonClicked: true,
        activeButtonClicked: false,
        completedButtonClicked: false,
      });
    } else if (buttonClicked === 'active') {
      this.setState({
        allButtonClicked: false,
        activeButtonClicked: true,
        completedButtonClicked: false,
      });
    } else {
      this.setState({
        allButtonClicked: false,
        activeButtonClicked: false,
        completedButtonClicked: true,
      });
    }
  };

  render() {
    const { setFilterData } = this.props;
    const { allButtonClicked } = this.state;
    const { activeButtonClicked } = this.state;
    const { completedButtonClicked } = this.state;
    return (
      <ul className="filters">
        <li>
          <button
            type="button"
            className={allButtonClicked ? 'selected' : ''}
            onClick={(event) => {
              setFilterData(event);
              this.onClickButton(event);
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={activeButtonClicked ? 'selected' : ''}
            onClick={(event) => {
              setFilterData(event);
              this.onClickButton(event);
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={completedButtonClicked ? 'selected' : ''}
            onClick={(event) => {
              setFilterData(event);
              this.onClickButton(event);
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
