

function Product(props) {



  return (
    <>
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.shoes.id+1) + '.jpg'} width='80%'/>
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.price}</p>
    </>
  );
}

export default Product;
