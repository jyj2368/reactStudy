import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addCount } from '../store';
import { changeName, chaneAge } from './../store/userSlice';
import { useEffect } from 'react';

function Cart(){

  let state  = useSelector((state)=>{ return state })
  let dispatch = useDispatch() // store.js로 요청을 보내주는 함수
// useEffect(()=>{
//   console.log(state.product);
// },[])
  return(
    <>
    <h3>{ state.user.name }의 장바구니 { state.user.age }</h3>
     <button onClick={()=>{dispatch(changeName())}}>이름 변경</button>
     <button onClick={()=>{dispatch(chaneAge(1))}}>나이 변경</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
        {  
        state.product.map((e,i)=>    
            <tr key={i}>
              <td>{i+1}</td>
              <td>{e.name}</td>
              <td>{e.count}</td>
              <td>
                <button onClick={()=>{dispatch(addCount(e.id))}}>+</button>
              </td>
            </tr>
            
          )
         }
        </tbody>
      </Table> 
    </>
  )

}

export default Cart ;
