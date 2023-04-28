import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name:'user',
  initialState:{name:'연준', age :32},
  reducers:{
    changeName(state){
      state.name = 'Jeong' + state.name
    },
    chaneAge(state,i){
      state.age += i.payload//함수의 파라미터를 받아서 사용할때는 payload를 붙여서 사용해야한다.
    }
  }//수정하는 함수
})

export let {changeName, chaneAge} = user.actions//user에있는 함수


export default user;