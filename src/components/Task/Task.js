import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

export default class Task extends Component {
  state = {
    min: this.props.minValue,
    sec: this.props.secValue,
   
  };

  static defaultProps = {
    description: 'Имя не задано',
    checked: false,
    timeAfterCreate: () => {},
    onEditClick: () => {},
    onDeletedClick: () => {},
    onCheckBoxClick: () => {},
  };

  static propTypes = {
    checked: PropTypes.bool,
    onCheckBoxClick: PropTypes.func,
    description: PropTypes.string,
    timeAfterCreate: PropTypes.string,
    onEditClick: PropTypes.func,
    onDeletedClick: PropTypes.func,
  };

  componentWillUnmount() {
    clearInterval(this.counterID);
  }

  minDecrement = () => {
    const { min } = this.state;
    this.setState({
      min: min - 1,
      sec: 59,
    });
  };

  secDecrement = () => {
    const { min, sec, isCounting } = this.state;
    const { onCheckBoxClick } = this.props;

    if (min === 0 && sec === 0 && isCounting === true) {
      onCheckBoxClick();
      clearInterval(this.counterID);
      this.setState({
        isCounting: false,
      });
    }
    if (sec > 0) {
      
      this.setState({
        sec: sec - 1,
        isCounting: true,
        
      });
      
    } else {
      this.minDecrement();
    }
  };

  handlePause = (event) => {
    event.stopPropagation();
    this.setState({ isCounting: false });
    clearInterval(this.counterID);
  };

  handleStart = (event) => {
    const startTime = Date.now();
    const { min, sec } = this.state;
    this.setState({ 
      isCounting: true, 
      startTime,
      remainingTime: min * 60 + sec 
    });
  
    this.counterID = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = Math.max(0, this.state.remainingTime - elapsedTime);
      const newMin = Math.floor(remainingTime / 60);
      const newSec = remainingTime % 60;
  
      this.setState({ min: newMin, sec: newSec });
      
      if (remainingTime === 0) {
        this.handlePause();
        this.props.onCheckBoxClick();
      }
    }, 1000);
  };
  
  render() {
    const { onCheckBoxClick, description, timeAfterCreate, onEditClick, onDeletedClick, checked } = this.props;
    const { min, sec, isCounting } = this.state;
    const buttonTimer = !isCounting ? (
      
      <button type="button" className="icon icon-play" onClick={this.handleStart} />
    ) : (
      
      <button type="button" className="icon icon-pause" onClick={this.handlePause} />
    );
    return (
      <div className="view">
        <input className="toggle" type="checkbox" readOnly onClick={onCheckBoxClick} checked={checked} />

        <div className="label">
          <span role="presentation" className="title" onClick={onCheckBoxClick}>
            {description}
          </span>
          <span className="description">
            {buttonTimer}
            <span className="description__time-value">
              {min}:{sec}
            </span>
          </span>
          <span className="created">created {timeAfterCreate} ago</span>
        </div>
        <button type="button" className="icon icon-edit" onClick={onEditClick} aria-label="log out" />
        <button type="button" className="icon icon-destroy" onClick={onDeletedClick} aria-label="log out" />
      </div>
    );
  }
}
