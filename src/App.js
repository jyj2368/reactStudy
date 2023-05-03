import logo from './logo.svg';
import './App.css';
import { Suspense, lazy, useEffect, useState } from 'react';
import bg from './img/bg.png'
import { Button, Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
// import Detail from './Component/Detail';
// import Product from './Component/Product';
import ProductList from './Component/ProductList';
import Cart from './Component/Cart';
import Event from './Component/Event';
import data from './data'
import axios from 'axios';
import WatchProduct from './Component/WatchProduct';

const Detail = lazy(()=> import('./Component/Detail'))
const Product = lazy(()=> import('./Component/Product'))
//메인페이지에서 먼저 로드할 필요가 없기 때문에 lazy를 이용한다.
//lazy는 내가 필요할때 import해주세요라는 말이다.(초기 로딩시간을 줄여줌) -성능 개선
//단점은 해당 페이지로 들어갈때 load시간이 발생한다.

function App() {
  let [shoes,changeShoes] = useState(data)
  let [count,setCount] = useState(2)
  let navigate = useNavigate()

  useEffect(()=>{
    localStorage.setItem('watched',JSON.stringify([]))
  },[])

 





  const dataAxios = ()=>{
    document.querySelector('.spinner').style.display='block'
    let secound = setTimeout(()=>{ 
    if(count <= 3){  
      axios.get(`https://codingapple1.github.io/shop/data${count}.json`)
      .then((result)=>{
        let soso = [...shoes, ...result.data]
        changeShoes(soso)
        setCount(count+1)
      })
      .catch(()=>{
        alert('경로가 틀렸습니다')
      })
      }else{ 
        alert('상품이 없습니다')
      }
      document.querySelector('.spinner').style.display='none'
    },1500)

  }

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}}>ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/Cart')}}>Cart</Nav.Link>
            {/*<Link to="/">홈</Link>
            <Link to="/detail">상세페이지</Link> */}
          </Nav>
        </Container>
      </Navbar>
    
    {/* suspense를 이용해 lazy시간동안 보여줄 내용을 적어준다 */}
    <Suspense fallback={<div>로딩중입니다.</div>}>
      <Routes>   
        <Route path="/" element={ 
          <>
           <div className='main-bg' style={{ backgroundImage: 'url(' + bg + ')' }}></div>
           <ProductList shoes={shoes}/> 
           <button className="btn btn-danger" onClick={dataAxios} >불러오기</button>
           <Spinner animation="border" role="status" className='spinner'>
            <span className="visually-hidden">Loading...</span>
           </Spinner>
           <WatchProduct/>
          </> 
        } />
        <Route path="/detail" element={
        <>
         <ProductList shoes={shoes}/> 
         <button className="btn btn-danger" onClick={dataAxios} >불러오기</button>
         <Spinner animation="border" role="status" className='spinner'>
          <span className="visually-hidden">Loading...</span>
         </Spinner>
         <WatchProduct/>
        </>
      } />
        <Route path="/detail/:id" element={ 
        <>
          <Detail shoes={shoes}/> 
          <WatchProduct/>
        </>
        } />
        <Route path="/cart" element={ 
        <>
          <Cart/>
          <WatchProduct/>
        </>
        } />
        <Route path="/event" element={ <Event/> } >
          <Route path="one" element={ <div>첫 주문시 양배추즙 서비스</div> } />
          <Route path="two" element={ <div>생일기념 쿠폰받기</div> } />
        </Route>
        <Route path="*" element={ <div>없는 페이지입니다.</div> } />
      </Routes>
    </Suspense>
    </div>
  );
}

export default App;
