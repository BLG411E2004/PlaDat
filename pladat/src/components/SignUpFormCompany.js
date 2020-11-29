import React, {useState} from 'react'
import { Form,Select } from 'semantic-ui-react'
import $ from "jquery";


function SignUpFormCompany(){

  const [company_name, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [company_city, setCompanyCity] = useState(null)
  const [pass, setPass] = useState("")
  const [confirm_pass, setConfirmPass] = useState("")
  const [company_name_error,setCompanyNameError] =useState("")
  const [email_error,setEmailError] =useState("")
  const [pass_error,setPassError] = useState([])
  const [confirm_pass_error,setConfirmPassError] = useState("")
  const [city, setCity] = useState(null);
  const [loaded,setLoaded] = useState(false);


  function isValid(){
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    function hasUpper(str){
      return (/[A-Z]/.test(str))
    }
    if(!company_name.trim()){
      setCompanyNameError(prevState => prevState = "Company name is required")
    }
    if(!email.trim()){
      setEmailError(prevState => prevState = "Email required") 
    }else if(!/^[A-Z0-9._%+-]+@[[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
      setEmailError(prevState => prevState = "Email is invalid");
    }
    if(!pass){
      setPassError(prevState => prevState.concat("Password is required"));
    }if(pass.length < 8){
      setPassError(prevState => prevState.concat("Password needs to be at least 8 characters\n"));
    }if(!format.test(pass)){
      setPassError(prevState => prevState.concat("Passwords must contain at least one special character\n"));
    }if(!hasUpper(pass)){
      setPassError(prevState => prevState.concat("Password must contain at leat one upper case character\n"));
    }
    if(!confirm_pass){
      setConfirmPassError(prevState => prevState = "This field is reuired") ;
    }else if(pass !== confirm_pass){
      setConfirmPassError(prevState => prevState = "Passwords must match");
    }
  }

  function updateState(func,e){
    func(prevState => prevState = e.target.value)
  }

  //FIXME:Con't show the error messages
  function handleError() {
    $(function(){
      $("#submit").on("click",function(){
        $("#companyNameInput").attr("error",{ content: company_name_error});
        $("#companyEmailInput").attr("error",{ content: email_error});
        $("#companyPassInput").attr("error",{ content: pass_error});
        $("#companyConfirmPassInput").attr("error",{ content: confirm_pass_error});
      })
    })
    }

    
  async function postData(){
    const company = {name:company_name,email:email,city:company_city,password:pass};
    console.log(company)
    const response = await fetch("/SignUpCompany",{
      method:"POST",
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      },
      "body":JSON.stringify(company)
    }) 
    if(response.ok){
      console.log("okkkk")
    }
    else{
      console.log("nöööö")
    }
  }

  
  function formatCity(data){
    var formatted_array = []
    for(var i = 0;i<data.length;i++){
      formatted_array.push({key:String(data[i]._id),text:data[i].name,value:String(data[i]._id)})
    }
    return formatted_array
  }  

  async function getCity(){
    const response = await fetch("/GetCity")
    const data = await response.json()
    const city = formatCity(data)
    console.log(city);
    setCity(prevData => prevData = city);
    setLoaded(prevData => prevData = true);
  }
  
  async function handleSubmit(e){
    e.preventDefault();
    isValid();
    postData();
    //handleError();
  }

  if(city === null){
    getCity();
  }
  if(loaded === true){
    const element = document.getElementById("form");
    element.classList.remove("loading");
  }

  return (
    <div>
      <Form id = "form" onSubmit = {e => handleSubmit(e)} loading>
        <div>
          <Form.Input id = "companyNameInput" fluid label='Company Name' placeholder='Name' value={company_name} onChange={e => updateState(setCompanyName,e)}/>
        </div>
        <div>
          <Form.Input id = "companyEmailInput" fluid  type="email" label='Company Email' placeholder='Email' value={email} onChange={e => updateState(setEmail,e)}/>
        </div> 
        <div>
          <Form.Field
            control={Select}
            options={city}
            label={{ children: 'City', htmlFor: 'form-select-control-city' }}
            placeholder='City'
            search
            searchInput={{ id: 'form-select-control-city' }}
            onChange={e => (console.log(e.target.key))}
          />
        </div>       
        <div>
          <Form.Input id = "companyPassInput" fluid label='Enter Password' type='password' value={pass} onChange={e => updateState(setPass,e)}/>
        </div>
        <div>
          <Form.Input id = "companyConfirmPassInput" fluid label='Confirm Password' type='password' value={confirm_pass} onChange={e => updateState(setConfirmPass,e)}/>
        </div>
        <Form.Button id="submit">Sign Up</Form.Button>
      </Form>
    </div>
  );
}

export default SignUpFormCompany;