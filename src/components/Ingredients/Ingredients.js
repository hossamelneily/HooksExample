import React,{useState,useEffect,useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorModal from "../UI/ErrorModal";

const Ingredients=(props)=> {
    const [IngredientsState,setIngredientsState] = useState([]);
    const [loadingstate,setloadingstate]= useState(false);
    const [errorMessage,setErrorMessage] = useState();

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
        setloadingstate(prevState => prevState = true)
        fetch('https://ingredients-20d75.firebaseio.com/ig.json',{
            method:'POST',
            body:JSON.stringify(ingredients),
            headers:{
                ContentType:'application/json'
            }
        }).then(response => {

            return response.json()
            },
        )
            .then(
            responseData => {
                setIngredientsState((prevState) => ([...prevState,{id:responseData.name,...ingredients}]))
                setloadingstate(prevState => prevState = false)
            },


        ).catch(error => {
              setErrorMessage('Something went wrong!');
              setloadingstate(false);
    });

    }

   // const FilterHandler=useCallback((LoadedData)=>{
   //      // setIngredientsState((prevState => ([...prevState,...LoadedData])))
   //      setIngredientsState(LoadedData)
   // },[])


   const RemoveHandler=(id)=>{
         setloadingstate(prevState => prevState = true)
        fetch(`https://ingredients-20d75.firebaseio.com/ig/${id}.json/`,
            {
                method: 'DELETE',
             }).then(response => (
                  setIngredientsState(prevState => (
                 prevState.filter(ig => ig.id !== id)
             )),
            setloadingstate(false)
        )

        ).catch(error => (
            setErrorMessage('Something went Wrong !!'),
            setloadingstate(false)
            )
        )}


   // let SpinnerHtml=<LoadingIndicator/>
   //
   //  if(loadingstate){
   //      SpinnerHtml=(<IngredientList ingredients={IngredientsState} onRemoveItem={RemoveHandler}/>)
   //  }

    // const SpinnerHandler=useCallback((props)=>{
    //     setloadingstate(prevState => !prevState)
    // },[])

    console.log(errorMessage)
  return (
    <div className="App">
        {errorMessage && <ErrorModal onClose={()=> setErrorMessage(null)}>{errorMessage}</ErrorModal>}
      <IngredientForm IngredientsHandler={IngredientsHandler} loadingstate={loadingstate}/>

      <section>
        <Search  onLoadedFilter={setIngredientsState}  onSearch={setloadingstate} onError={setErrorMessage}/>
          <IngredientList ingredients={IngredientsState} onRemoveItem={RemoveHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
