import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function WatchProduct(){

  let watchItem = JSON.parse(localStorage.getItem('watched'))
 
  let navigate = useNavigate()
  
  return(
    <>
    {
      watchItem.length > 0 
      ?
      <div className='watched'>
       <h3>최근 본 상품</h3>
      {
      watchItem.map((a, i) => {
       return(
        <div key={i} onClick={()=>{navigate(`/detail/${a.id}`)}}>
          <img src={'https://codingapple1.github.io/shop/shoes' + (a.id+1) + '.jpg'}/>
          <p className='title'>{ a.name }</p>
        </div>
       )        
          }) 
        }
        </div> : null
    } 
  </>
  )
}
export default WatchProduct; 