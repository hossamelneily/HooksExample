import React,{useState,useEffect} from 'react';



import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
    const {onLoadedFilter,onSearch,onError} = props
    const [FilteredData,setFilteredData] =useState('')

        useEffect(()=>{
        const query = FilteredData.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${FilteredData}"`;
        // onSpinner(true)
            onSearch(true)
        fetch('https://ingredients-20d75.firebaseio.com/ig.json'+query)
            .then(response => response.json())
            .then(
            responseData => {
                const LoadedData =[]
                if(responseData){
                    Object.entries(responseData).map(([key,value])=>{
                        LoadedData.push({
                        id:key,
                        title:value.title,
                        amount:value.amount
                    })
                })
                }

                onLoadedFilter(LoadedData)
                onSearch(false)
            },

        ).catch(error => (
                onError("Something went Wrong !!"),
                onSearch(false)
            )
        )
    },[FilteredData,onLoadedFilter,onSearch,onError])



  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={FilteredData} onChange={(event)=>
              setFilteredData(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
