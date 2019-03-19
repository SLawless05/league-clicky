import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import champions from "./champions.json";

class App extends Component {
  state = {
    champions,
    score: 0,
    highscore: 0
  };

  gameEnd = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({ highscore: this.state.score }, function () {
        console.log(this.state.highscore);
      });
    }
    this.state.champions.forEach(card => {
      card.count = 0;
    });
    alert(`Game Over :( \nscore: ${this.state.score}`);
    this.setState({ score: 0 });
    return true;
  }

  clickCount = id => {
    this.state.champions.find((o, i) => {
      if (o.id === id) {
        if (champions[i].count === 0) {
          champions[i].count = champions[i].count + 1;
          this.setState({ score: this.state.score + 1 }, function () {
            console.log(this.state.score);
          });
          this.state.champions.sort(() => Math.random() - 0.5)
          return true;
        } else {
          this.gameEnd();
        }
      }
    });
  }

  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highscore={this.state.highscore}>- League of Legends Memory Game -</Header>
        {this.state.champions.map(card => (
          <Card
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
