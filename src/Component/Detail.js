import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../store";



function Detail(props){   
  let {id} = useParams();
  let idNum = parseInt(id)
  let [promo,setPromo] = useState(true)
  let [inputValue,setInputValue] = useState('')
  let [page,setPage] = useState(0)


  let state = useSelector((state)=>{ return state.product})
  let dispatch = useDispatch()

  const data = props.shoes.find(item => item.id === idNum);

  useEffect(()=>{
    setTimeout(()=>{setPromo(false)},2000)
  },)

  useEffect(()=>{
    if(isNaN(inputValue)==true){
      setInputValue('')
      alert('수량을 입력해주세요')
      }
  },[inputValue])

  useEffect(()=>{
    setTimeout(()=>{
      let a = document.getElementsByClassName('container')[1]
      a.classList.add('end')
    },500)

  },[])

  const changeInput = (e)=>{
    setInputValue(e.target.value)
    }

  const cartIn = ()=>{
    setInputValue('')
  }


 


  return(
    <>
      <div className="container start">
        {
          promo == true ? 
            <div className="alert alert-warning">
              2초이내 구매시 할인
            </div> : null
        } 
      
        <div className="row">
          <div className="col-md-6">
           <img src={'https://codingapple1.github.io/shop/shoes'+(data.id+1)+'.jpg'} width="100%"/> 
           </div>
          <div className="col-md-6">
            <h4 className="pt-5">{data.title}</h4>
            <p>{data.content}</p>
            <p>{data.price}원</p>
            <input type="text" placeholder="수량을 입력하세요" value={inputValue} onChange={changeInput}/>
            <button className="btn btn-danger" onClick={cartIn}>주문하기</button>            
            <button className="btn btn-danger" onClick={()=>{dispatch(addCart({id:data.id,name:data.title,count:inputValue}))}}>장바구니 담기</button>            
          </div>
        </div>
        <Nav variant="tabs" defaultActiveKey="link-1">
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={()=>{ setPage(0)}}>Option 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={()=>{ setPage(1)}}>Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3" onClick={()=>{ setPage(2)}}>Option 3</Nav.Link>
          </Nav.Item>
        </Nav>
        <TapComponent page={page}/>
      </div> 
      <Outlet></Outlet>
    </>
  )
  function TapComponent(props){

    let [fade, setFade] = useState('')
      
    useEffect(()=>{
       let addClass = setTimeout(()=>{
          setFade('end')
        },10)
        /* 리액트 18버전 이상부터는 automatic batch 라는 기능이 생겼습니다.
        state 변경함수들이 연달아서 여러개 처리되어야한다면 
        state 변경함수를 다 처리하고 마지막에 한 번만 재렌더링됩니다. 
        그래서 'end' 로 변경하는거랑 ' ' 이걸로 변경하는거랑 약간 시간차를 뒀습니다.
        찾아보면 setTimeout 말고 flushSync() 이런거 써도 될 것 같기도 합니다. automatic batching을 막아줍니다. */
        return ()=>{
          clearTimeout(addClass)
          setFade('')
        }
        //clean up 함수
        //useEffect 실행 전에 실행하는 함수
      },[props.page])

   /*  if(propa.page == 0){
      return <div>내용 1</div>
     }else if(propa.page == 1){
      return <div>내용 2</div>
     }else if(propa.page == 2){
      return <div>내용 3</div>
     }   */
     return (
     <div className={`start ${fade}`}>
      {
      [<div>내용 1</div>,<div>내용 2</div>,<div>내용 3</div>][props.page]
      }
     </div>
     )
   
  }

}

export default Detail;