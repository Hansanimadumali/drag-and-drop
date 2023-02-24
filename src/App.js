import './index.css';
import { products } from './api/products';
import ContainerTwo from './containers/Home/ContainerTwo';
import { useEffect, useState } from 'react';
import ContainerOne from './containers/Home/ContainerOne';
import ContainerOneSVG from './containers/Home/ContainerOneSVG';

const  App = ()=> {
 
    const [nodes,setNodes] = useState([]);
    const updateNodes = (product)=>{
    console.log("products 1",product)
    setNodes((prevList)=>[...prevList,product]);
  }
    const [nodesFromDes,setNodesFromDes] = useState([]);
    const updateNodesFromDes = (product)=>{
    console.log("products 2",product)
    setNodesFromDes((prevList)=>[...prevList,product]);
  }



  return (
    <div className="App">
      <div className="main-container">
        <ContainerOneSVG nodes={nodesFromDes}  data={products} updateNodes={updateNodes} />
        <ContainerOne nodes={nodesFromDes}  data={products} updateNodes={updateNodes} />
        <ContainerTwo nodes={nodes} updateNodesFromDes={updateNodesFromDes}  />
      </div>
    </div>
  );
}

export default App;
