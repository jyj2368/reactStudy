import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'


let product = createSlice({
  name:'product',
  initialState:
  [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers:{
    addCount(state,plus){

      // let number = state.findIndex((a)=>{ return plus.payload== a.id})
      // state[number].count ++
      
      for(let i=0 ; i<state.length ; i++){
         if(plus.payload == state[i].id){
         state[i].count ++
        }else{
          console.log('땡');
        } 
      }
    },
    addCart(state,action){
      // for(let i = 0 ; i<state.length ; i++){
      //   if(state[i].id == action.payload.id ){
          
      //     state[i].count =   state[i].count + parseInt(action.payload.value)
          
      //   }else if(state[i].id !== action.payload.id){
      //     let addArr ={id:action.payload.id, name:action.payload.name, count:action.payload.value}
      //     state.push(addArr)
      //   }

      // }
      
      let number = state.findIndex((a)=>{ return action.payload.id == a.id}) 
        //action.payload.id == a.id가 true면 해당 number
        //action.payload.id == a.id가 false면 -1

      if(number >= 0){ 
        state[number].count = parseInt(state[number].count) + parseInt(action.payload.count)
      }else if(number == -1){
     
        let addArr = action.payload
        state.push(addArr)
      }
    
    }
  } 
})

export let { addCount, addCart } = product.actions


export default configureStore({
  reducer: { 
   user : user.reducer,
   product : product.reducer
  }
}) 