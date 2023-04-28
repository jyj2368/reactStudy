
import Product from './Product.js';

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap';


function ProductList(props){

  let [arrySort,setArrySort] = useState(false)
  let [copyArry,setCopyArry] = useState(false)
 
  let navigate = useNavigate()

  const click = ()=>{

    let copy = [...props.shoes].sort((a, b) => a.title.localeCompare(b.title));
    if(arrySort == false){
      setArrySort(true)
    
    }else if(arrySort == true ){
      setArrySort(false)
    }
    setCopyArry(copy)
  }


    /* 
    useEffect(()=>{ 
      if(id == 'detail'){
        document.querySelector('.main-bg').style.display='none'
      }else {
        document.querySelector('.main-bg').style.display='block'
      }
    }) */


    const navClick = (title,id)=>{
      let watched = JSON.parse(localStorage.getItem('watched'))
      let number = watched.findIndex((a)=>{ return a.id == id })
      if(number == -1){
        watched.push({'name':title,'id':id})
        localStorage.removeItem('watched')
        localStorage.setItem('watched',JSON.stringify(watched))
      }else {
        return false
      }
      
    }

  return(
    <>
   

      <div className='container'>
        <div className='row'>
          {
            arrySort == false 
            ?
            props.shoes.map((a, i) => {
              return (
                <Nav.Link onClick={()=>{navigate(`/detail/${a.id}`); navClick(a.title,a.id);}} className='col-md-4'key={i}>
                  <Product shoes={a} i={i}/>
                </Nav.Link>
              )
            })
            :
            copyArry.map((a, i) => {
              return (
                <Nav.Link onClick={()=>{navigate(`/detail/${a.id}`); navClick(a.title,a.id);}} className='col-md-4' key={i}>
                  <Product shoes={a} i={i}/>
                </Nav.Link>
              )
            })

          }
        </div>
      </div>
      <button className="btn btn-danger" onClick={click} >정렬하기</button>
    </>
  )

}

export default ProductList;