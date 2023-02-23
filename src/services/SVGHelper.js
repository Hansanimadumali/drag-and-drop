/**
 * Convert DOM coordinates to SVG coordinates based on SVG offset and zoom level
 */
const convertCoordinatesDOMtoSVG = (svg, x, y) => {
    const pt = svg.node().createSVGPoint();
  
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(svg.node().getScreenCTM().inverse());
  };
  
  const convertCoordinatesSVGtoDOM = (svg, x, y) => {
    const pt = svg.node().createSVGPoint();
  
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(svg.node().getScreenCTM());
  };
  

  export {convertCoordinatesDOMtoSVG,convertCoordinatesSVGtoDOM}