import * as d3 from "d3";
import { selectAll } from "d3";

/**
 * Draw the nodes.
 * Each time this is called we only draw the added nodes since we are using "enter" only
 */
class SVGPlanogramDrawer {
   
  
  static draw(nodes) {
    const multiplyAmout = 2.4064171123;
console.log(nodes)

d3.select(".container-d3")
.selectAll(".node1")
.data(nodes, (d) => {console.log(d)})
.join((enter) => {
  // Draw a group node that will contain the squre and the text
  const node = enter
    .append("g:image")
    .attr("class", "product-img")
    .attr("transform", (d) => "translate(" + d.x*multiplyAmout + "," + d.y*multiplyAmout + ")");

    node
    .attr("xlink:href", function(d) {
      console.log(d.planogramProductImage
        )
             return d.planogramProductImage;
         })
         .attr("width", function(d) {
                 return d.productWidth*multiplyAmout;
             })
            .attr("height", function(d) {
               return d.productHeight*multiplyAmout;;
           })
            .attr("pointerEvents", "all")
            .attr("preserveAspectRatio", "none")
            .attr("draggable", "true")
        //      .attr("x", function(d) {
        //     return d.x*multiplyAmout;;
        //    })
        //   .attr("y", function(d) {
        //       return d.y*multiplyAmout;;
        // })
   

});

  }
 
}

export default SVGPlanogramDrawer;
