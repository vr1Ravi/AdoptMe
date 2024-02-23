import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };
  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="flex h-1/2 w-full justify-between px-8 py-2 md:h-2/3">
        <div className=" mr-6 w-1/3">
          <img src={images[active]} alt="animal hero" />
        </div>
        <div className="grid h-1/3 grid-cols-2 gap-3  pt-8 md:grid-cols-4">
          {images.map((photo, index) => (
            <img
              className={`  opacity-${active === index ? "60" : "0"} mr-4 h-14 w-14 cursor-pointer rounded-full border-2 border-black  md:h-24 md:w-24`}
              key={photo}
              src={photo}
              alt="animal thumbnail"
              onClick={() => this.setState({ active: index })}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
