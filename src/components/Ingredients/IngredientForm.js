import React,{useState} from 'react';
import LoadingIndicator from "../UI/LoadingIndicator";
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  
  // const [Inputstate,setInputstate] = useState({title:'',amount:''})
  const[TitleState,setTitleState] = useState('')
  const[AmountState,setAmountState] = useState('')


  const submitHandler = event => {
    event.preventDefault();
    props.IngredientsHandler({title:TitleState,amount:AmountState})
  };

  const ChangeHandler=(event,InputElement)=>{
    switch (InputElement) {
      case('title'):

          setTitleState(event.target.value)
        break
      case('amount'):
         setAmountState(event.target.value)
        break
      default:
        console.log('Wrong Inputs Element:'+InputElement)
    }

  }

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={TitleState}
                   onChange={(event ) => setTitleState(event.target.value)}/>

          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount"
                   value={AmountState}
                   onChange={(event)=>ChangeHandler(event,'amount')}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit" >Add Ingredient</button>
            {props.loadingstate && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
