import React, {useState,useEffect} from "react"
import Card from "../components/Card/Card"


function Page() {
    const [page, setPage] = useState([])

    useEffect(()=>{
        fetch("/home").then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => console.log(data))
    
    },[])



    return (
      <div>
        <Card/>
      </div>
    );
  }
  
  export default Page;
  