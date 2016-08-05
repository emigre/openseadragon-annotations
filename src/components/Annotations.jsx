import { h, Component } from 'preact';
import Store from '../store/Store';
import { clickOnCanvas } from '../actions/annotations';

export default class Annotations extends Component {
  getInitialState() {
    return Store.getAll();
  }

  componentDidMount() {
    Store.addHandler('change', () => {
      this.setState(Store.getAll());
    });
  }

  render() {
    return (
      <svg {...svgProperties} onClick={ clickOnCanvas }>
        { this.state.annotations.map(el => h(...el)) }
      </svg>
    );
  }
}

const svgProperties = {
  xmlns: "http://www.w3.org/2000/svg",
  version: "1.1",
  preserveAspectRatio: "none",
  viewBox: "0 0 100 100",
  width: "100%",
  height: "100%",
};
