import * as d3 from "d3";

/**
 * Draw the nodes.
 * Each time this is called we only draw the added nodes since we are using "enter" only
 */
class SVGDrawerTwo {
  
  static draw(nodes) {
    // console.log("drawer called")
    
    d3.select("#container-one")
      .selectAll(".node1")
      .data(nodes, (d) => d.id)
      .join((enter) => {
        // Draw a group node that will contain the squre and the text
        const node = enter
          .append("g")
          .attr("class", "product-img")
          // .attr("x",(d)=>d.x)
          // .attr("y",(d)=>d.y)
          .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");

          node
            .html((d)=>d.node)
         
   
      });
  }
}

export default SVGDrawerTwo;
