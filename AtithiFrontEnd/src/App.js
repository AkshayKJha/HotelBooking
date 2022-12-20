import React, {useState, useEffect, useRef} from 'react';
import ListingProperties from './components/ListingProperties';
import ListingReservations from './components/ListingReservations';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
  function App () {
    const userInfo=useRef({"first_name":"","last_name":"","email":"","password":"","phone":""});
    const registerInfo=useRef({"first_name":"","last_name":"","email":"","password":"","phone":"","address":""});
    const propertyInfo=useRef({"city":"","state":"","street":""});
    const [resList, setResList] = useState([]);
    const loginInfo=useRef({"email":"","password":""});
    const [loginShow, setLoginShow] = useState(false);
    const [loginHost, setLoginHost] = useState(false);
    const [addPropShow, setAddPropShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const handleAddPropClose = () => setAddPropShow(false);
  const handleAddPropShow = () => setAddPropShow(true);
  const [registerShow, setRegisterShow] = useState(false);
  const handleLoggedInUser = () => {
    userInfo.current=({"first_name":"","last_name":"","email":"","password":"","phone":""});
    setLoggedInUser(false);}

  const handleRegisterClose = () => setRegisterShow(false);
  const handleRegisterShow = () => {
    registerInfo.current={"first_name":"","last_name":"","email":"","password":"","phone":"","address":""}
    setRegisterShow(true);}
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [getReservations, setGetReservations] = useState(false);
  const handleShowReservations=async (e)=>{
    const res = await fetch("http://localhost:3000/reservations/"+userInfo.current.email,{
      method:'GET',
      headers : { 
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      }
    });
    const usr = await res.json();
    console.log("lolo");
    console.log(usr);
    if(usr.length===0){
      window.alert("You have no reservations");
    }
    else{
      setResList(usr)
    setGetReservations(true);
    }
    
    }
    // const buildBody = function(propertyInfoObject){
    //   return{
    //     title : propertyInfoObject.title,
    //     description : propertyInfoObject.description,
    //     property_type : propertyInfoObject.property_type,
    //       city : propertyInfoObject.city,
    //       state : propertyInfoObject.state,
    //       street : propertyInfoObject.street,
    //       country: propertyInfoObject.country,
    //       zipcode: propertyInfoObject.zip,
    //     daily_fee : propertyInfoObject.daily_fee,
    //     amenities : propertyInfoObject.amenities,
    //     cleaning_fee : propertyInfoObject.cleaning_fee,
    //     bedrooms : propertyInfoObject.bedrooms,
    //     bathrooms : propertyInfoObject.bathrooms,
    //     email : propertyInfoObject.email
    //   }
    // }

    const handleAddPropSubmit= async (e) => {
      e.preventDefault();
            console.log(propertyInfo.current)
      propertyInfo.current.email=userInfo.current.email
      // const modifiedObject = buildBody(propertyInfo.current)
      const res = await fetch("http://localhost:3000/properties",{
        method:'POST',
        headers : { 
          'Content-Type': 'application/json',
           'Accept': 'application/json'
        },
        body:JSON.stringify(propertyInfo.current)
      });
      const usr = await res.json();
      console.log(usr);
      //console.log("res "+res.status);
      console.log("usr status = "+usr.status);
      if(res.status === 422 || !usr){
      window.alert(usr.error);
      }
      else if(res.status === 425){
        window.alert("User already exists. Please login!");
        // navigate('/login');
      }
      else{
      window.alert("Property successfully added");
      setLoginHost(true);
      setAddPropShow(false);
      }   
    }

    let spanElement3 = document.createElement("span");
    spanElement3.style.display = "none";
    const handleEmailValidation = function (e){
      e.target.parentNode.appendChild(spanElement3);
      spanElement3.style.display = "none";
      var emailRegex = /\S+@\S+\.\S+/;
      var text = e.target.value;
      if(!text.match(emailRegex)){
        spanElement3.className = "error";
        spanElement3.textContent = "Please enter a valid Email Address";
        spanElement3.style.display = "inline-block";
        spanElement3.style.color = "red";
      }
      else{
        spanElement3.style.display = "none";
      }
    }

    let spanElement2 = document.createElement("span");
    spanElement2.style.display = "none";
    const handlePasswordValidation = function (e){
      e.target.parentNode.appendChild(spanElement2);
      spanElement2.style.display = "none";
      var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
      var text = e.target.value;
      if(!text.match(passwordRegex)){
        spanElement2.className = "error";
        spanElement2.textContent = "Password should be of minimum length 5 and contain atleast 1 Uppercase letter, 1 Lowercase Letter, 1 digit and 1 special character";
        spanElement2.style.display = "inline-block";
        spanElement2.style.color = "red";
      }
      else{
        spanElement2.style.display = "none";
      }
    }

    let spanElement1 = document.createElement("span");
    spanElement1.style.display = "none";
    const handlePhoneValidation = function (e){
      e.target.parentNode.appendChild(spanElement1);
      spanElement1.style.display = "none";
      var passwordRegex = /^[0-9]{10}$/;
      var text = e.target.value;
      if(!text.match(passwordRegex)){
        spanElement1.className = "error";
        spanElement1.textContent = "Please enter a 10 digit phone number";
        spanElement1.style.display = "inline-block";
        spanElement1.style.color = "red";
      }
      else{
        spanElement2.style.display = "none";
      }
    }


  const handleShowFavorites= (e)=>{
    var element = document.getElementById("listingA");
  // var element2 = document.getElementById("carouselExampleCaptions");
  var element3 = document.getElementById("showPage");
  element.classList.remove("hide-element");
    // element2.classList.remove("hide-element");
    element3.classList.add("hide-element");
    fetch("http://localhost:3000/users/favorites/"+userInfo.current.email)
    .then(res => res.json())
.then(res => {
  // res = res.filter((l) => (l.available.toLowerCase().includes("y")))
  if(res.length===0){
    window.alert("you have no property in your favorites");
  }
  else{setList(res)
  console.log(res);
  }
})
.catch(err => console.error(err))  
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
          registerInfo.current.owns_properties=false
          console.log(registerInfo.current)
    const res = await fetch("http://localhost:3000/users/register",{
      method:'POST',
      headers : { 
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body:JSON.stringify(registerInfo.current)
    });
    const usr = await res.json(); 
    console.log(usr);
    console.log("usr status = "+usr.status);
    if(res.status === 422 || !usr){
    window.alert(usr.error);
    }
    else if(res.status === 425){
      window.alert("User already exists. Please login!");
    }
    else{
    window.alert("Registration successful. Login to continue");
    setLoginHost(false)
    setRegisterShow(false);
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
          console.log(loginInfo.current)
    const res = await fetch("http://localhost:3000/users/login",{
      method:'POST',
      headers : { 
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body:JSON.stringify(loginInfo.current)
    });
    const usr = await res.json();
    if(res.status === 422){
      window.alert("All fields are required");
    }  
    if(res.status === 425){
      window.alert("User doesn't exist. Please SignUp!");
    }
    if(res.status === 420){
      window.alert("User email or password is incorrect!");
    }
    if(res.status === 200){
    // window.alert("Login successful");
    userInfo.current=usr
    console.log("userInfo")
    console.log(usr)
    window.alert("Logged in Successfully");
    if(userInfo.current.owns_properties===true){
      setLoginHost(true);
    }
    else{
      setLoginHost(false);
    }
    setLoginShow(false);
    setLoggedInUser(true)
    }
  }
 
    const [listings, setListings] = useState([]);
    const [list, setList] = useState([]);
    var updatedList = useRef([]);
    var searchWord = useRef("");

   const handleSearch=()=>{
      const searchInput = document.getElementById("Destination");
        searchWord.current = searchInput.value;
        // updatedList.current=listings
        updatedList.current = listings.filter((l) => (l.property_type.toLowerCase().includes(searchWord.current) || l.city.toLowerCase().includes(searchWord.current)))
        setList(updatedList.current);
        console.log(updatedList.current)
  }

  const getMyProperty=()=>{
    var element = document.getElementById("listingA");
  // var element2 = document.getElementById("carouselExampleCaptions");
  var element3 = document.getElementById("showPage");
  element.classList.remove("hide-element");
    // element2.classList.remove("hide-element");
    element3.classList.add("hide-element");
    // const searchInput = document.getElementById("Destination");
    //   searchWord.current = searchInput.value;
      // updatedList.current=listings
      console.log("Print listings")
      console.log(listings)
      console.log(userInfo.current)
      var myProp = listings.filter((l) => (l.email.toLowerCase().includes(userInfo.current.email)))
      setList(myProp);
      // console.log(updatedList.current)
}
    
    useEffect(() => {
      fetch("http://localhost:3000/properties")
      .then(res => res.json())
  .then(res => {
    res = res.filter((l) => (l.available.toLowerCase().includes("y")))

    setListings(res)  
    setList(res)
    console.log(res);
  })
  .catch(err => console.error(err))  
    }, [])
      return (
    <>
    <Navbar collapseOnSelect expand="lg" navbar-custom variant="dark" id="topnavbar">
      <Container>
        <Navbar.Brand href="#home"><img src="images/AtithiIcon.png" alt="Atithi Icon" width="100" height="50" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">About</Nav.Link>
            {/* <Nav.Link href="#pricing">Our Top Locations</Nav.Link> */}
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              id="Destination"
            />
            <Button variant="outline-success me-3" onClick={handleSearch}>Search</Button>
            <Button variant="secondary flex-center" onClick={handleSearch}>Home</Button>
          </Form>
          </Nav>
          <Nav>

            {loggedInUser ? (<>
            {loginHost===true?
            (<>
            <Button variant="outline-light me-3" onClick={getMyProperty}>My Properties</Button>
            <Button variant="outline-light" onClick={handleAddPropShow}>Add more Properties</Button>
            </>
            ):
              
              (
              <Button variant="outline-light" onClick={handleAddPropShow}>Become a host</Button>)}
       <NavDropdown title={userInfo.current.first_name} id="navbarScrollingDropdown">
       <NavDropdown.Item onClick={handleShowReservations}>Show Reservations</NavDropdown.Item>
       <NavDropdown.Item onClick={handleShowFavorites}>Show Favorites</NavDropdown.Item>
       <NavDropdown.Item onClick={handleLoggedInUser}>LogOut</NavDropdown.Item>
     </NavDropdown>
     </>
      ) : (
        <>
        <Nav.Link href="#deets"><a class="nav-link" href="#" id="register" onClick={handleRegisterShow}>Register</a></Nav.Link>
             <Nav.Link eventKey={2} href="#memes">
             <a class="nav-link" href="#" id="signIn" role="button" 
                             aria-expanded="false" onClick={handleLoginShow}>
                             Login
                         </a>
             </Nav.Link>
             </>
      )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {getReservations?(<ListingReservations listingRess={resList} user={userInfo.current} getrev={getReservations} setgetrev={setGetReservations} />):(<ListingProperties listings={list} user={userInfo.current} setlist={setList}/>)}
    {/* <div style="margin-bottom=20px"></div> */}
    <Modal show={loginShow} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body><Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onBlur={handleEmailValidation} onChange={e => loginInfo.current.email = e.target.value}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onBlur={handlePasswordValidation} onChange={e => loginInfo.current.password = e.target.value}/>
      </Form.Group>
    </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLoginSubmit}>
          Submit
          </Button>
        </Modal.Footer>
      </Modal>


      <Form onSubmit={handleRegisterSubmit} >
      <Modal show={registerShow} onHide={handleRegisterClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicFname">
        <Form.Label>First name</Form.Label>
        <Form.Control type="text" placeholder="Enter First Name" onChange={e => registerInfo.current.first_name = e.target.value} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLname">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" placeholder="Enter Last Name" onChange={e => registerInfo.current.last_name = e.target.value} />
        </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onBlur={handleEmailValidation} onChange={e => registerInfo.current.email = e.target.value} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onBlur={handlePasswordValidation} onChange={e => registerInfo.current.password = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Address" onChange={e => registerInfo.current.address = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="Phone" onBlur={handlePhoneValidation} onChange={e => registerInfo.current.phone = e.target.value} />
      </Form.Group>
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRegisterClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRegisterSubmit}>
          Submit
          </Button>
        </Modal.Footer>
      </Modal>
      </Form>

      <Modal show={addPropShow} onHide={handleAddPropClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicFname">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" onChange={e => propertyInfo.current.title = e.target.value} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLname">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" onChange={e => propertyInfo.current.description = e.target.value} />
        </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Property Type</Form.Label>
        <Form.Control type="email" placeholder="Property Type" onChange={e => propertyInfo.current.property_type = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Thumbnail Image</Form.Label>
        <Form.Control type="thumbnail" placeholder="Thummbnail Image" onChange={e => propertyInfo.current.thumbnail = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Street</Form.Label>
        <Form.Control type="text" placeholder="Street" onChange={e => propertyInfo.current.street = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder="City" onChange={e => propertyInfo.current.city = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>State</Form.Label>
        <Form.Control type="text" placeholder="State" onChange={e => propertyInfo.current.state = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" placeholder="Country" onChange={e => propertyInfo.current.country = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="text" placeholder="ZipCode" onChange={e => propertyInfo.current.zip = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Daily Fee</Form.Label>
        <Form.Control type="text" placeholder="Daily Fee" onChange={e => propertyInfo.current.daily_fee = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Amenities</Form.Label>
        <Form.Control type="text" placeholder="Amenities" onChange={e => propertyInfo.current.amenities = e.target.value.split(",")} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cleaning Fee</Form.Label>
        <Form.Control type="text" placeholder="Cleaning Fee" onChange={e => propertyInfo.current.cleaning_fee = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Bedrooms</Form.Label>
        <Form.Control type="text" placeholder="Bedrooms" onChange={e => propertyInfo.current.bedrooms = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Bathrooms</Form.Label>
        <Form.Control type="text" placeholder="Bathrooms" onChange={e => propertyInfo.current.bathrooms = e.target.value} />
      </Form.Group>
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddPropClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddPropSubmit}>
          Submit
          </Button>
        </Modal.Footer>
        </Modal>
      
    </>
      )
}

export default App;
