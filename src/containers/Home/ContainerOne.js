import * as d3 from "d3";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, {
  useRef,
  useEffect,
  useState,

} from "react";
import sampleData from "../../api/sample-data-object.json";
import SVGDrawerTwo from "./SVGDrawerTwo";
import { convertCoordinatesDOMtoSVG,convertCoordinatesSVGtoDOM } from "../../services/SVGHelper";


const ContainerOne = ({data,updateNodes,nodeList, nodes}) => {

    const ref = useRef();
    const MySwal = withReactContent(Swal);
    let prevGap = 0;
    let prevHeight = 0;
    const multiplyAmout = 2.4064171123;
    var currentNode = "";
 


    const planogram = sampleData?.extra?.planogramShelfDto;
    const selectedProduct = (data) => {
        // console.log("data",data);
        return(
            MySwal.fire({
                title: <p>{data.productName}</p>,
                html: 
                <div>
                    <image width={data.productWidth} height={data.productHeight} href={data.imageUrl}></image>
                    <p>Height: {data.productHeight} cm</p>
                    <p>Width: {data.productWidth} cm</p>
                    <p>X: {data.x}</p>
                    <p>Y: {data.y}</p>
                </div>,
              })
        )
    }
    // console.log("productDataList", planogram);



    //DRAG AND DROP
    const dragAndDrop = () => {
        const containerOne = d3.select("#container-one");
        const containerTwo = d3.select("#container-two").select("svg");  


        // select all images under the container-one and register the the callbacks on drag
        var test = d3.select("#container-one").selectAll(".product-img")
        .call(
        d3.drag().on("start", dragstarted).on("drag", dragging).on("end", dragended)
        );


        function dragstarted(d) {
            // console.log("dragstarted called",d)
            
            // Select the clicked object.
            const clickedObject = d3.select(this);
            currentNode = clickedObject;

            // remove the clicked object
            clickedObject.remove();

            // remove html draggable object in exist
            d3.select("#ziro").remove();

            const { x, y } = convertCoordinatesSVGtoDOM(
                containerOne,
                d.x,
                d.y
            );

            // create new html draggable object
            d3.select("body")
                .append("div")
                .style("background-color","red")
                .style("height","25px")
                .style("width","25px")
                .style("position","absolute")
                .style("border-radius",25)
                .property("draggable",true)
                .property("id","ziro")
                .style("left",`${x}px` )
                .style("top",`${y}px`)

            console.log(`x: ${x}  y:${y}`)

        }

        function dragging(d) {

            const { x, y } = convertCoordinatesSVGtoDOM(
                containerOne,
                d.x,
                d.y
            );

            // move the draggable html object with the mouse move
            d3.select("#ziro")
                .style("background-color","blue")
                .style("left",`${x}px` )
                .style("top",`${y}px`)



        }

        function dragended(d) {
            
            d3.select("#ziro").style("background-color","green");
            
            // mouse coordinates relative to main viewport
            const { x:xMain, y:yMain } = convertCoordinatesSVGtoDOM(
                containerOne,
                d.x,
                d.y
            );
          
            console.log(`x: ${d.x}  y:${d.y}`)
            console.log(`x: ${xMain}  y:${yMain}`)



            // convert the x,y coordinates to SVG coordinates
            const { x, y } = convertCoordinatesDOMtoSVG(
              containerTwo,
              xMain,
              yMain
            );

            // Create a clone of the selected to update the state
            let clonedNode = Object.assign({}, currentNode)
            clonedNode = currentNode.clone(true)
                                //    .attr("x",0)
                                //    .attr("y",0)
            
            // Check the drop is within the drop target
            const containerTwoOffset = containerTwo.node().getBoundingClientRect();
            const xIn = d.x-containerTwoOffset.left;
            const yIn = d.y-containerTwoOffset.top;

            // If inside drop target, create the SVG element on drop target.
            // if(xIn >=0 && xIn<=containerTwoOffset.width && yIn >=0 && yIn <=containerTwoOffset.height){
                updateNodes({
                    x:x, 
                    y:y,
                    node: clonedNode.node().innerHTML
                    
                });
                // console.log("Item added to the destination container");

                // remove the draggable html object
                d3.select("#ziro").remove();
            // }

        }
    }



    useEffect(() => {
        SVGDrawerTwo.draw(nodes);
        dragAndDrop();
    }, []);
  
    useEffect(()=>{
        SVGDrawerTwo.draw(nodes);
        dragAndDrop();

    },[nodes])

    return (
        <svg id="container-one">
        {/* <g> */}
            {data?.shelf.map((d, i) => {
                
                prevHeight += i === 0 ? 0 : data?.shelf[i-1].height;
                prevGap += i === 0 ? 0 : data?.shelf[i-1].gap;
                var newShelfY = i === 0 ? 0 : prevHeight + prevGap;
                return (
                    <g key={i}>
                    <rect width={d.width * multiplyAmout} height={d.height * multiplyAmout} x={d.x} y={newShelfY * multiplyAmout} style={{"strokeWidth": 1, "stroke": "rgb(81, 40, 160)", "fill": "transparent", "zIndex": -1}}></rect>
                    <rect width={d.width * multiplyAmout} height={d.gap * multiplyAmout} x={d.x} y={(newShelfY * multiplyAmout) + (d.height * multiplyAmout)} style={{"strokeWidth": 1, "stroke": "rgb(81, 40, 160)", "fill": "rgb(81, 40, 160)", "zIndex": -1}}></rect>
                    </g>
                )
            })}
            {planogram?.map((a, j) => {
               
                    return a?.planogramProduct.map((b) => {
                  
                        return b?.productBlock.map((c) => {
                          
                            return c?.productLocations.map((d) => {
                              
                                return(
                                    // <g className="svg-img">
                                        <g  className="product-img" key={d.id}>
                                            <image
                                            
                                            onClick={async ()=>{
                                                console.log("CLICKKKKK", d);
                                                selectedProduct(
                                                    {...d, 
                                                        imageUrl: b?.productInfo?.imageUrl, 
                                                        productName: b?.productInfo?.productName,
                                                        // x: d.x * multiplyAmout,
                                                        // y: d.y * multiplyAmout,
                                                    })
                                            }} 
                                            pointerEvents="all" 
                                            preserveAspectRatio="none" 
                                            x={d.x * multiplyAmout} 
                                            y={d.y * multiplyAmout} 
                                            width={d.productWidth * multiplyAmout} 
                                            height={d.productHeight * multiplyAmout} 
                                            href={b?.productInfo?.imageUrl} 
                                            draggable="true" 
                                            // opacity="1" 
                                            style={{"outlineColor": "rgb(204, 204, 204)", cursor:'pointer'}}></image>
                                        </g>
                                    // </g>
                                )
                            });
                        });
                    })
            })}
        {/* </g> */}
    </svg>
      
      
      );
}
export default ContainerOne;
