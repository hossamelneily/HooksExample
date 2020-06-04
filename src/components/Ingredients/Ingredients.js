import React,{useReducer,useState,useEffect,useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorModal from "../UI/ErrorModal";


const IngredientsReducer = (intialstate,action)=>{
    switch (action.Type) {
        case 'SET':
            return action.ig
        case 'ADD':
            return [...intialstate,action.ig]
        case 'DELETE':
            return intialstate.filter(ig => ig.id !== action.id)
        default:
            return intialstate

    }
}

const httpReducer = (intialstate,action)=>{
    switch (action.Type) {
        case 'SEND':
            return {loading: action.spinner,error:null}
        case 'RESPONSE':
            return {...intialstate,loading:false}
        case 'ERROR':
            return {loading: false,error: action.error}
        case 'CLEARError':
            return {...intialstate,error:null}
        default:
            return intialstate

    }
}
const Ingredients=(props)=> {
    const [IngredientsState,dispatch] =useReducer(IngredientsReducer,[])
    const [httpState,dispatchhttp] = useReducer(httpReducer,{loading:false,error:null})
    // const [IngredientsState,setIngredientsState] = useState([]);
    // const [loadingstate,setloadingstate]= useState(false);
    // const [errorMessage,setErrorMessage] = useState();

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
    },[IngredientsState])

    const IngredientsHandler=(ingredients)=>{
        dispatchhttp({Type:'SEND',spinner:true})
        // setloadingstate(prevState => true)
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
                  dispatch({Type:'ADD',ig:{id:responseData.name,...ingredients}})
                // setIngredientsState((prevState) => ([...prevState,{id:responseData.name,...ingredients}]))
                // setloadingstate(prevState => false)
                dispatchhttp({Type:'REPONSE'})
            },


        ).catch(error => {

              dispatchhttp({Type:'ERROR',error:'Something went wrong!'})
              // setErrorMessage('Something went wrong!');
              // setloadingstate(false);
    });

    }

   // const FilterHandler=useCallback((LoadedData)=>{
   //      // setIngredientsState((prevState => ([...prevState,...LoadedData])))
   //      setIngredientsState(LoadedData)
   // },[])


   const RemoveHandler=(id)=>{
         // setloadingstate(prevState =>  true)
        dispatchhttp({Type:'SEND',spinner:true})
        fetch(`https://ingredients-20d75.firebaseio.com/ig/${id}.json/`,
            {
                method: 'DELETE',
             }).then(response => (
                 dispatch({Type:'DELETE',id:id}),
             //      setIngredientsState(prevState => (
             //     prevState.filter(ig => ig.id !== id)
             // )),
            // setloadingstate(false)
            dispatchhttp({Type:'REPONSE'})
        )

        ).catch(error => (
            dispatchhttp({Type:'ERROR',error:error.message})
            // setErrorMessage('Something went Wrong !!'),
            // setloadingstate(false)
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

    // console.log(errorMessage)
  return (
    <div className="App">
        {httpState.error && <ErrorModal onClose={()=> dispatchhttp({Type:'CLEARERROR'})}>{httpState.error}</ErrorModal>}
      <IngredientForm IngredientsHandler={IngredientsHandler} loadingstate={httpState.loading}/>

      <section>
          <Search  onLoadedFilter={useCallback((ig)=>dispatch({Type:'SET',ig:ig}),[])}
                   onSearch={useCallback((spinner)=>dispatchhttp({Type:'SEND',spinner:spinner}),[])}
                   onError={useCallback((error)=>dispatchhttp({Type:'ERROR',error:error}),[])}/>
        {/*<Search  onLoadedFilter={setIngredientsState}  onSearch={setloadingstate} onError={setErrorMessage}/>*/}
          <IngredientList ingredients={IngredientsState} onRemoveItem={RemoveHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
