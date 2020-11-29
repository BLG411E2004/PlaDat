import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'
import $ from "jquery";


function SignUpFormCompany(){

  const [name, setName] = useState(null)
  const [surname, setSurname] = useState(null)
  const [email, setEmail] = useState(null)
  const [student_university, setStudentUniversity] = useState(null)
  const [student_ID, setStudentID] = useState(null)
  const [pass, setPass] = useState(null)
  const [confirm_pass, setConfirmPass] = useState(null)
  const [name_error,setNameError] =useState(null)
  const [surname_error,setSurnameError] =useState(null)
  const [email_error,setEmailError] =useState(null)
  const [student_ID_error, setStudentIDError] = useState(null)
  const [pass_error,setPassError] = useState([])
  const [confirm_pass_error,setConfirmPassError] = useState(null)
  const [loaded,setLoaded] = useState(false);
  const [university, setUniversity] = useState(null);


  //TODO: Add validation criteria for student ID
  function isValid(){
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    function hasUpper(str){
      return (/[A-Z]/.test(str))
    }
    if(!name.trim()){
      setNameError(prevState => prevState = "Name is required")
    }
    if(!surname.trim()){
      setSurnameError(prevState => prevState = "Surname is required")
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
      setConfirmPassError(prevState => prevState = "This field is required") ;
    }else if(pass !== confirm_pass){
      setConfirmPassError(prevState => prevState = "Passwords must match");
    }
  }

  function updateState(func,e){
    func(prevState => prevState = e.target.value)
  }

  //FIXME: Con't show the error messages
  function handleError() {
    $(function(){
      $("#submit").on("click",function(){
        $("#nameInput").attr("error",{ content: name_error});
        $("#surnameInput").attr("error",{ content: surname_error});
        $("#emailInput").attr("error",{ content: email_error});
        $("#passInput").attr("error",{ content: pass_error});
        $("#confirmPassInput").attr("error",{ content: confirm_pass_error});
      })
    })
    }

    
  async function postData(){
    const student = {name:name,surname:surname,email:email,university:student_university,studentID:student_ID,password:pass};
    const response = await fetch("/SignUpStudent",{
      method:"POST",
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      },
      "body":JSON.stringify(student)
    }) 
    if(response.ok){
      console.log("okkkk")
    }
    else{
      console.log("nöööö")
    }
  }
  function formatUniversity(data){
    var formatted_array = []
    for(var i = 0;i<data.length;i++){
      formatted_array.push({key:data[i]._id,text:data[i].name,value:data[i]._id})
    }
    return formatted_array
  }  

  async function getUniversity(){
    const response = await fetch("/GetUniversity")
    const data = await response.json();
    const uni = formatUniversity(data);
    setUniversity(prevData => prevData = uni);
    setLoaded(prevData => prevData = true);
  }
  
  function hasError(){
    if(name_error === null || surname_error === null || email_error === null || pass_error === null || student_ID_error === null || confirm_pass_error === null || student_university !== null){
      return false;
    }
    else{
      return true;
    }
  }


  async function handleSubmit(e){
    e.preventDefault();
    isValid();
    if(!hasError()){
      postData();
    }
    else{
      handleError();
    }
    //handleError();
  }

  if(university === null){
    getUniversity();
  }
  if(loaded === true){
    const element = document.getElementById("form");
    element.classList.remove("loading");
  }

  return (
    <div>
      <Form id = "form" onSubmit = {e => handleSubmit(e)} loading>
        <div>
          <Form.Input id = "nameInput" fluid label='Name' placeholder='Name' value={name} onChange={e => updateState(setName,e)}/>
        </div>
        <div>
          <Form.Input id = "surnameInput" fluid label='Surname' placeholder='Surname' value={surname} onChange={e => updateState(setSurname,e)}/>
        </div>
        <div>
          <Form.Input id = "emailInput" fluid  type="email" label='Email' placeholder='Email' value={email} onChange={e => updateState(setEmail,e)}/>
        </div>
        <div>
        <Form.Select
            fluid
            selection
            label='University'
            options={university}
            placeholder='University'
            onChange={(e, { value }) => setStudentUniversity(prevData => prevData = value)}
          />
        </div>
        <div>
          <Form.Input id = "studentIDInput" fluid label='Student ID' placeholder='Student ID' value={student_ID} onChange={e => updateState(setStudentID,e)}/>
        </div>        
        <div>
          <Form.Input id = "passInput" fluid label='Enter Password' type='password' value={pass} onChange={e => updateState(setPass,e)}/>
        </div>
        <div>
          <Form.Input id = "confirmPassInput" fluid label='Confirm Password' type='password' value={confirm_pass} onChange={e => updateState(setConfirmPass,e)}/>
        </div>
        <Form.Button id="submit">Sign Up</Form.Button>
      </Form>
    </div>
  );
}

export default SignUpFormCompany;