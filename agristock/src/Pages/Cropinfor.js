import React from "react";
import '../Styles/cropinfo.css';

const Cropinfor = () => {
  return (
    <div className="outer_container">
      <div className="inner_container">Carrot</div>
      <div className="inner_container">Potato</div>
      <div className="inner_container">Onion</div>
      <div className="inner_container">Tomato</div>
      <div className="inner_container">Brinjal</div>
      <div className="inner_container">Chilly pepper</div>
      <div className="inner_container">Cucumber</div>
      <div className="inner_container">Corn</div>
    </div>
  )
}

// function ImageLink({ src, hoverSrc }) {
//   const [imageSrc, setImageSrc] = React.useState(src);

//   return (
//     <img
//       src={imageSrc}
//       onMouseEnter={() => setImageSrc(hoverSrc)}
//       onMouseLeave={() => setImageSrc(src)}
//     />
//   );
// }

// function ImageGrid() {
//   return (
//     <div className="image-grid" style={{ backgroundColor: "#53D258" }}>
//       <Row>
//         <ImageLink src={carrotSrc} hoverSrc={carrotHoverSrc} />
//         <ImageLink src={brinjalSrc} hoverSrc={brinjalHoverSrc} />
//         <ImageLink src={potatoSrc} hoverSrc={potatoHoverSrc} />
//         <ImageLink src={callyPepperSrc} hoverSrc={callyPepperHoverSrc} />
//       </Row>
//       <Row>
//         <ImageLink src={onionSrc} hoverSrc={onionHoverSrc} />
//         <ImageLink src={cucumberSrc} hoverSrc={cucumberHoverSrc} />
//         <ImageLink src={tomatoSrc} hoverSrc={tomatoHoverSrc} />
//         <ImageLink src={carrotSrc} hoverSrc={carrotHoverSrc} />
//       </Row>
//     </div>
//   );
// }

// function Row({ children }) {
//   return <div className="row">{children}</div>;
// }

// const carrotSrc = "path/to/carrot.png";
// const carrotHoverSrc = "path/to/carrot-hover.png";
// const brinjalSrc = "path/to/brinjal.png";
// const brinjalHoverSrc = "path/to/brinjal-hover.png";
// const potatoSrc = "path/to/potato.png";
// const potatoHoverSrc = "path/to/potato-hover.png";
// const callyPepperSrc = "path/to/cally-pepper.png";
// const callyPepperHoverSrc = "path/to/cally-pepper-hover.png";
// const onionSrc = "path/to/onion.png";
// const onionHoverSrc = "path/to/onion-hover.png";
// const cucumberSrc = "path/to/cucumber.png";
// const cucumberHoverSrc = "path/to/cucumber-hover.png";
// const tomatoSrc = "path/to/tomato.png";
// const tomatoHoverSrc = "path/to/tomato-hover.png";

export default Cropinfor;