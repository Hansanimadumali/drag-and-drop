import * as d3 from "d3";

/**
 * Draw the nodes.
 * Each time this is called we only draw the added nodes since we are using "enter" only
 */
class SVGDrawer {
  
  static draw(nodes) {
    // console.log("drawer called")
    // console.log("transfered nodes from first svg",nodes)
    d3.select("#container-two svg")
      .selectAll(".product-img")
      .data(nodes, (d) => d.id)
      .join((enter) => {
        // Draw a group node that will contain the squre and the text
        const node = enter
          .append("g")
          .attr("class", "product-img")
          .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");

          node
            .html((d)=>d.node);
          
      });

      d3.select("#container-two svg")
      .selectAll(".product-img image")
      .attr("x",0)
      .attr("y",0)

  }
}

export default SVGDrawer;
