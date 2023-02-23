import React, { useEffect } from "react";
import * as d3 from "d3";

import SVGDrawer from "./SVGDrawer";
import { convertCoordinatesDOMtoSVG,convertCoordinatesSVGtoDOM } from "../../services/SVGHelper";


const ContainerTwo = ({ nodes, updateNodesFromDes}) => {
  var currentNode = "";


      //DRAG AND DROP
  const dragAndDrop = () => {
      const containerOne = d3.select("#container-one");
      const containerTwo = d3.select("#container-two").select("svg");



      // select all images under the container-two and register the the callbacks on drag
      var test = d3.select("#container-two").select("svg").selectAll(".product-img")
      .call(
      d3.drag().on("start", dragstarted).on("drag", dragging).on("end", dragended)
      );

      function dragstarted(d) {
        console.log("dragstarted called from destination",d)
        
        // Select the clicked object.
        const clickedObject = d3.select(this);
        console.log("clicked object from drop container",clickedObject)
        currentNode = clickedObject;

         // remove the clicked object
        clickedObject.remove();

        // Add the offset of the #container-two to calculate the 
        // x, y relative to main viewport 
        // const containerTwo = d3.select("#container-two").select("svg");


        const { x, y } = convertCoordinatesSVGtoDOM(
          containerTwo,
          d.x,
          d.y
        );

    


        // remove html draggable object in exist
        d3.select("#ziro1").remove();

        // create new html draggable object
        d3.select("body")
            .append("div")
            .style("background-color","red")
            .style("height","25px")
            .style("width","25px")
            .style("position","absolute")
            .style("border-radius",25)
            .property("draggable",true)
            .property("id","ziro1")
            .style("left",`${x}px` )
            .style("top",`${y}px`)

      }

      function dragging(d) {

        // Add the offset of the #container-two to calculate the 
        // x, y relative to main viewport 

        
        const { x, y } = convertCoordinatesSVGtoDOM(
          containerTwo,
          d.x,
          d.y
        );

      
        // move the draggable html object with the mouse move
        d3.select("#ziro1")
              .style("background-color","blue")
              .style("left",`${x}px` )
              .style("top",`${y}px`)

      }

      function dragended(d) {

        const { x:xMain, y:yMain } = convertCoordinatesSVGtoDOM(
          containerTwo,
          d.x,
          d.y
        );

          d3.select("#ziro1").style("background-color","green");
          console.log("dragended",d);


          const { x, y } = convertCoordinatesDOMtoSVG(
            containerOne,
            xMain,
            yMain
          );

          let clonedNode = Object.assign({}, currentNode)
          clonedNode = currentNode.clone(true)
                              .attr("x",0)
                              .attr("y",0)

          // if(xMain <=0 && xMain<=containerOneOffset.width && yMain >=0 && yMain <=containerOneOffset.height){
            updateNodesFromDes({
                  x:x, 
                  y:y,
                  node: clonedNode.node().innerHTML
                  
              });
              console.log("Item added to the Planogram container");
              d3.select("#ziro1").remove();
          // }

      }
  }

  useEffect(() => {
      // console.log("call drag and drop from destination svg");
      // dragAndDrop();
  }, []);

  //   console.log("dragged data", draggedData)
  useEffect(() => {
      SVGDrawer.draw(nodes);
  }, []);

  useEffect(()=>{
      // console.log("call drag and drop from destination svg");
      // draw the items when updating the node
      SVGDrawer.draw(nodes)
      // bind drag callbacks to the created elements in SVG
      if(nodes.length>0){
        dragAndDrop();
      }
  },[nodes])


  return (
    
    <div
     id="container-two"
    //  onDrop={(e) => onDrop(e)}
    //  onDragLeave={(e) => onDragLeave(e)}
    //  onDragOver={(e) => onDragOver(e)}
   >
     <svg ></svg>
   </div>
  );
};

export default ContainerTwo;
