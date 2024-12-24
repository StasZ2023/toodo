import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';
import TaskList from '../TaskList';
import './App.css';

export default class App extends Component {
  state = {
    dataStream: [
      this.createTodoTask('Completed task', 15, 0),
      this.createTodoTask('Editing task', 15, 0),
      this.createTodoTask('Active task', 15, 0),
    ],
    filterData: 'all',
    
    
  };

  static defaultProps = {
    dataStream: [
      {
        id: 101,
        description: 'список задач',
        dateCreate: new Date(),
        compleeted: false,
        editing: false,
        min: 15,
        secValue: 30,
      },
    ],
    filterData: 'all',
  };

  static propTypes = {
    dataStream: PropTypes.instanceOf(Array),
    filterData: PropTypes.string,
  };

  addItem = (description, minValue, secValue) => {
    const newItem = this.createTodoTask(description, minValue, secValue);
    this.setState(({ dataStream }) => {
      const newDataStream = [...dataStream, newItem];
      console.log(minValue)
      return {
      
        dataStream: newDataStream,
      };
    });
  };

  changeDescription = (id, description) => {
    this.setState(({ dataStream }) => {
      const newDataStream = dataStream.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            description,
            compleeted: false,
            editing: false,
          };
        }
        return el;
      });
      return {
        dataStream: newDataStream,
      };
    });
  };

  editingItem = (id) => {
    this.setState(({ dataStream }) => {
      const newDataStream = dataStream.map((el) => {
        if (el.id === id) {
          console.log('22')
          return {
            ...el,
            editing: false,
          };
        }
        return el;
      });
      return {
        dataStream: newDataStream,
      };
    });
  };

  completedItem = (id) => {
    this.setState(({ dataStream }) => {
      const newDataStream = dataStream.map((el) => {
        if (el.id === id) {
          localStorage.setItem('id', id);
          return {
            ...el,
            compleeted: !el.compleeted,
            
          };
        }
        return el;
      });
      return {
        dataStream: newDataStream,
      };
    });
  };

  deletedItem = (id) => {
    this.setState(({ dataStream }) => {
      const newDataStream = dataStream.filter((el) => el.id !== id);
      return {
        dataStream: newDataStream,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ dataStream }) => {
      const newDataStream = dataStream.filter((el) => el.compleeted === false);
      return {
        dataStream: newDataStream,
      };
    });
  };

  setFilterData = (event) => {
    this.setState({
      filterData: event.target.innerText.toLowerCase(),
    });
  };

  createTodoTask(description, minValue, secValue) {
    const id = Date.now() + Math.floor(Math.random() * 10000);
    const trimDescription = description.replace(/ +/g, ' ').trim();
    let minValueNumber = +minValue;
    let secValueNumber = +secValue;
    if (secValueNumber >60 ){
      minValueNumber +=Math.trunc(secValueNumber/60)
      secValueNumber -= Math.trunc(secValueNumber/60)*60
            }
    return {
      id,
      description: trimDescription,
      dateCreate: new Date(),
      compleeted: false,
      editing: false,
      minValue: minValueNumber,
      secValue: secValueNumber,
    };
  }

  render() {
    const { dataStream, filterData } = this.state;
    const notCompletedCount = dataStream.filter((el) => !el.compleeted).length;
    
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addNewItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            taskData={dataStream}
            onCheckBoxClick={this.completedItem}
            onDeletedClick={this.deletedItem}
            onEditClick={this.editingItem}
            onChangeDescription={this.changeDescription}
            filterData={filterData}
          />

          <Footer
            notCompleetedCount={notCompletedCount}
            clearCompleted={this.clearCompleted}
            setFilterData={this.setFilterData}
          />
        </section>
      </section>
    );
  }
}
