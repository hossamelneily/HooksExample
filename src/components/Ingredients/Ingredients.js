import React,{useState,useEffect,useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

const Ingredients=(props)=> {
    const [IngredientsState,setIngredientsState] = useState([])
    const [loadingstate,setloadingstate]= useState(true)
    // useEffect(()=>{
    //       console.log("check keda Fetching !!")
    //    fetch('https://ingredients-20d75.firebaseio.com/ig.json').then(response => response.json()).then(
    //
    //        responseData=>{
    //            const LoadedData=[]
    //            Object.entries(responseData).map(([key,value])=>{
    //                LoadedData.push({
    //                    id:key,
    //                    title:value.title,
    //                    amount:value.amount
    //                })
    //            })
    //            setIngredientsState(LoadedData)
    //        }
    //    )
    // },[])

    useEffect(()=>{
        console.log("Second Fetching !!")
    },IngredientsState)

    const IngredientsHandler=(ingredients)=>{
        fetch('https://ingredients-20d75.firebaseio.com/ig.json',{
            method:'POST',
            body:JSON.stringify(ingredients),
            headers:{
                ContentType:'application/json'
            }
        }).then(response => response.json()).then(
            responseData =>
           setIngredientsState((prevState) => ([...prevState,{id:responseData.name,...ingredients}])),
           setloadingstate(false)
        )

    }

   const FilterHandler=useCallback((LoadedData)=>{
        // setIngredientsState((prevState => ([...prevState,...LoadedData])))
        setIngredientsState(LoadedData)
   },[])


   const RemoveHandler=(id)=>{
        fetch(`https://ingredients-20d75.firebaseio.com/ig/${id}.json/`,
            {
                method: 'DELETE',
             }).then(
             setIngredientsState(prevState => (
                 prevState.filter(ig => ig.id !== id)
             ))
        )
   }
  return (
    <div className="App">
      <IngredientForm IngredientsHandler={IngredientsHandler}/>

      <section>
        <Search onLoadedFilter={setIngredientsState}/>
        <IngredientList ingredients={IngredientsState} onRemoveItem={RemoveHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
