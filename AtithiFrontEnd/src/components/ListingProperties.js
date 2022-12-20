// import jQuery from 'jquery';
import React, { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./listings.css";

const ListingProperties = (props) => {
  // const [showListing, setshowListing] = useState(true);
  const [infavorite, setInFavorite] = useState(false);
  const [property, setProperty] = useState([{}]);
  // const [comment, set] = useState([{}]);
  // const [updproperty, setUpdProperty] = useState([{}]);
  const [resModalShow, setResModalShow] = useState(false);
  const [rateComShow, setRateComShowShow] = useState(false);
  const [updatePropShow, setUpdatePropShow] = useState(false);
  const propertyInfo=useRef({})
  const handleUpdateProperty=()=>{
    setUpdatePropShow(true)
    propertyInfo.current=property
  }
  // useEffect(() => {
    
  // }, [updatePropShow,rateComShow])
  const handleUpdateClose=()=>setUpdatePropShow(false)
  const handleRateComment=()=>setRateComShowShow(true)
  const handleRateComClose=()=>setRateComShowShow(false)
  
  const handleDeleteProperty=async(e)=>{
   
    e.preventDefault();
    // console.log(propertyInfo.current)
// propertyInfo.current.email=userInfo.current.email
// const modifiedObject = buildBody(propertyInfo.current)
const res = await fetch("http://localhost:3000/properties/softdelete/"+property._id,{
method:'PUT',
headers : { 
  'Content-Type': 'application/json',
   'Accept': 'application/json'
},
body:JSON.stringify()
});
const usr = await res.text;
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
window.alert("Property successfully deleted");
setUpdatePropShow(false);
var element = document.getElementById("listingA");
  // var element2 = document.getElementById("carouselExampleCaptions");
  var element3 = document.getElementById("showPage");
    element.classList.remove("hide-element");
    // element2.classList.remove("hide-element");
    element3.classList.add("hide-element");
    var newList=props.listings.filter((l) => (l.available.toLowerCase().includes("y")))
    props.setlist(newList)
}
  
  }
  const handleRateComSubmit= async (e) => {
    // window.alert(resDate.current.comment);
    e.preventDefault();
          // console.log(resDate.current)
          let requestPro={"rating":"", "comment":"", "name":""}
          requestPro.rating= resDate.current.rating
          requestPro.comment = resDate.current.comment
          requestPro.name = props.user.first_name
    const res = await fetch("http://localhost:3000/properties/rate_and_comment/"+property._id,{
      method:'PUT',
      headers : { 
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body:JSON.stringify(requestPro)
    });
    const usr = await res.text;
    console.log("rate and comment output below...")
    console.log(usr);
    //console.log("res "+res.status);
    console.log("usr status = "+usr.status);
    if(res.status === 422 || !usr){
    window.alert(usr.error);
    }
    else if(res.status === 425){
      window.alert("Cound not add your comment. Please try again");
      // navigate('/login');
    }
    else{
    window.alert("Added your comment");
    setRateComShowShow(false);
   

          
    // setInFavorite(true)
    var element = document.getElementById("listingA");
    // var element2 = document.getElementById("carouselExampleCaptions");
    var element3 = document.getElementById("showPage");
    element.classList.remove("hide-element");
    // element2.classList.remove("hide-element");
    element3.classList.add("hide-element");
    resDate.current.rating = "";
    resDate.current.comment = "";
    setRateComShowShow(false);
    }   
  }

  const handleUpdateSubmit= async (e) => {
    e.preventDefault();
    console.log(propertyInfo.current)
// propertyInfo.current.email=userInfo.current.email
// const modifiedObject = buildBody(propertyInfo.current)
const res = await fetch("http://localhost:3000/properties/"+property._id,{
method:'PUT',
headers : { 
  'Content-Type': 'application/json',
   'Accept': 'application/json'
},
body:JSON.stringify(propertyInfo.current)
});
const usr = await res.text;
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
window.alert("Property successfully updated");
setUpdatePropShow(false);
var element = document.getElementById("listingA");
  // var element2 = document.getElementById("carouselExampleCaptions");
  var element3 = document.getElementById("showPage");
    element.classList.remove("hide-element");
    // element2.classList.remove("hide-element");
    element3.classList.add("hide-element");
}
  }
  const addTofavorites= async (e) => {
    e.preventDefault();
          console.log(resDate.current)
          let requestPro={"property_id":""}
          requestPro.property_id=property._id
    const res = await fetch("http://localhost:3000/users/favorite/"+props.user.email,{
      method:'PUT',
      headers : { 
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body:JSON.stringify(requestPro)
    });
    const usr = await res.text;
    console.log(usr);
    //console.log("res "+res.status);
    console.log("usr status = "+usr.status);
    if(res.status === 422 || !usr){
    window.alert(usr.error);
    }
    else if(res.status === 425){
      window.alert("Cound not add to favorite");
      // navigate('/login');
    }
    else{
    window.alert("added property to your favorite");
    setInFavorite(true)
    var element = document.getElementById("listingA");
    // var element2 = document.getElementById("carouselExampleCaptions");
    var element3 = document.getElementById("showPage");
    element.classList.remove("hide-element");
    // element2.classList.remove("hide-element");
    element3.classList.add("hide-element");
    }   
  }
  const removeFromfavorites= async (e) => {
    e.preventDefault();
          console.log(resDate.current)
          let requestPro={"property_id":""}
          requestPro.property_id=property._id
    const res = await fetch("http://localhost:3000/users/unfavorite/"+props.user.email,{
      method:'PUT',
      headers : { 
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body:JSON.stringify(requestPro)
    });
    const usr = await res.text;
    console.log(usr);
    //console.log("res "+res.status);
    console.log("usr status = "+usr.status);
    if(res.status === 422 || !usr){
    window.alert(usr.error);
    }
    else if(res.status === 425){
      window.alert("Cound not remove from favorite");
      // navigate('/login');
    }
    else{
    window.alert("removed property to your favorite");
    setInFavorite(false)
    var element = document.getElementById("listingA");
    // var element2 = document.getElementById("carouselExampleCaptions");
    var element3 = document.getElementById("showPage");
    element.classList.remove("hide-element");
    // element2.classList.remove("hide-element");
    element3.classList.add("hide-element");
    }   
  }


  const resDate=useRef({})
  const handleReservation=()=>setResModalShow(true)
  const handleResModalClose=()=>setResModalShow(false)
  const handleResModalSubmit= async (e) => {
    let requestB={}
    requestB.guest_email=props.user.email;
    requestB.host_email=property.email;
    requestB.property_id=property._id;
    requestB.start_date=resDate.current.fromDate;
    requestB.end_date=resDate.current.toDate;
    requestB.property_title=property.title;
    requestB.property_photo="";
    e.preventDefault();
          console.log(requestB)
    const res = await fetch("http://localhost:3000/reservations",{
      method:'POST',
      headers : { 
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body:JSON.stringify(requestB)
    });
    const usr = await res.json();
    console.log("output of reservation below...")
    console.log(usr);
    //console.log("res "+res.status);
    console.log("usr status = "+usr.status);
    if(res.status === 422 || !usr){
    window.alert(usr.error);
    }
    else if(res.status === 425){
      window.alert("Reservation already exists. Please select different date");
      // navigate('/login');
    }
    else{
      if(usr.reservations_status==="Not Available"){
        window.alert("Reservation already exists. Please select different date");
      }
else{
  window.alert("Reservation successfully added");
}
    
    setResModalShow(false);
    }   
  }
  var amenity = useRef([]);
  var element = document.getElementById("listingA");
  // var element2 = document.getElementById("carouselExampleCaptions");
  var element3 = document.getElementById("showPage");
  // var element4 = document.getElementById("Destination");
  // var element5 = document.getElementById("filterwidget");
  // var element6 = document.getElementById("returnHome");
  // var element7 = document.getElementById("booksubmit");
  // element6.addEventListener("click", (e) => homepage());
  function homepage() {
    var element = document.getElementById("listingA");
  // var element2 = document.getElementById("carouselExampleCaptions");
  var element3 = document.getElementById("showPage");
    element.classList.remove("hide-element");
    // element2.classList.remove("hide-element");
    element3.classList.add("hide-element");
    // element7.textContent = "Submit";
    // element4.removeAttribute("disabled");
    // element5.classList.remove("hide-element");
    // element6.innerHTML = "";
    // element6.classList.remove("returnBack");
  }
  // useEffect(() => {
  //   // if(props.user.favorites_list.includes(property._id)){
  //   //   setInFavorite(true)
  //   }
  // }, [])
  let propertyDetail = (e, listing) => {
    var element = document.getElementById("listingA");
  // var element2 = document.getElementById("carouselExampleCaptions");
  var element3 = document.getElementById("showPage");
    element.classList.add("hide-element");
    // element2.classList.add("hide-element");
    element3.classList.remove("hide-element");

    // element4.setAttribute("disabled", "");
    // // element4.setProperty(false)
    // element5.classList.add("hide-element");
    // element6.innerHTML =
    //   '<button type="submit" className="loginFields btn btn-secondary">Return to home page</button>';
    // element6.classList.add("returnBack");
    // element7.textContent = "Book";
    setProperty(listing);
    console.log(listing)
    amenity.current=listing.amenities;
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
  };

  return (
    <div>
      <div id="listingA" className="row houseList ">
        {props.listings.map((listing) => (
          <div className="col-md-4 col-sm-12">
            <div
              className="card house text-center btn"
              onClick={(e) => propertyDetail(e, listing)}
            >
              <img
                className="card-img-top rounded"
                src={`/images/${listing.thumbnail}`}
                alt="ListingImages"
              />
              <div className="card-body housedesc text-start font-weight-bold text-decoration">
                <p className="costrating">
                  <span className="costdesc card-text">
                    {listing.nightlyfee}
                  </span>{" "}
                  
                </p>
                <h3>{listing.title}</h3>
                <h5>{listing.property_type}</h5>
                <h6>{listing.city},{listing.state}</h6>
                <p className="amendesc">
                  {listing.amenities[0]}•{listing.amenities[1]}•
                  {listing.amenities[2]}•{listing.amenities[3]}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="pagetogg">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item disabled ">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div id="showPage" className="hide-element">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <img
              className="card-img-top rounded"
              src={`/images/${property.thumbnail}`}
              alt="PropertyImage"
            />
            <hr />
            <div className="container desc">
              <h1>{property.title}</h1>{" "}
            </div>
            <hr />
            <div className="container desc">
              <h2>Location :{property.street}, {property.city}, {property.state}
               {property.zipcode}</h2>
            </div>
            <hr />
            <div className="container desc">
              <h3>Description:</h3> <span>{property.description}</span>
            </div>
            <hr />
            <div className="container desc">
              <h3>Features:</h3>
              <span>
                <p>Number of Bedrooms : {property.bedrooms}</p>
                <p>Number of Bathrooms : {property.bathrooms}</p>
              </span>
            </div>
            <hr />
            <div className="container desc">
              <h3>Cost:</h3>
              <span>
                <p>Nightly Fee : {property.daily_fee}</p>
                <p>Cleaning Fee : {property.cleaning_fee}</p>
              </span>
            </div>
            <hr />
            <div className="container desc">
              <h3>Amenities:</h3>
             
                {property.amenities!==undefined ?
                 <ul>
              <li>{property.amenities[0]}</li>
              <li>{property.amenities[1]}</li>
              <li>{property.amenities[2]}</li> 
              <li>{property.amenities[3]}</li>
              <li>{property.amenities[4]}</li> </ul>: <></>}
              
              {/* {property.amenities!==undefined   ? property.amenities.map(element => {
                <p key={element}>{element}</p>
              }):<p></p>} */}
              
              {/* {property.amenities} */}
              {/* {property.amenities.length} */}
            </div>
            <hr/>
            <div className="container desc">
              <h3>Rating and Comments:</h3>
              {property.rating_and_comments!==undefined ? property.rating_and_comments!==[]?property.rating_and_comments.map((ratingC) => (
                <div>
                  <hr></hr>
                  <p>Rating: {ratingC.rating} Stars</p>
                  <p>Comment: {ratingC.comment}</p>
                  <p>User: {ratingC.name}</p>
                </div>
              )):<p>No comments available</p>:<p>No comments available</p>
              }
              </div>
            <hr />

            <div className="container desc">
              <h3>Cancellation policy:</h3>{" "}
              <span>
                Free cancellation before 48 hours from booking start date.
                Review Atithi's full cancellation policy which applies even if
                you cancel for illness or disruptions caused by COVID-19.
              </span>
            </div>
            <hr />
            <button
              type="submit"
              className="returnBack btn btn-secondary"
              onClick={(e) => {
                homepage();
              }}
            >
              Return to home page
              </button>
              {props.user.email===property.email?(
              <>
              <button
                type="submit"
                className="handleButtons btn btn-secondary"
                onClick={handleUpdateProperty}
              >
                Update Property
              </button>
              <button
                type="submit"
                className="handleButtons btn btn-secondary"
                onClick={handleDeleteProperty}
              >
                Delete Property
              </button>
        
              </>
              
              ):
              (
             !props.user.email || props.user.email==null || props.user.email==""?(<></>):(
            <>
            <button
              type="submit"
              className="handleButtons btn btn-secondary"
              onClick={handleReservation}
            >
              Book Reservation
            </button>
            <button
              type="submit"
              className="handleButtons btn btn-secondary"
              onClick={handleRateComment}
            >
              Rate & Comment
            </button>
            {(props.user.favorites_list.includes(property._id))===true?(
              <button
              type="submit"
              className="handleButtons btn btn-secondary"
              onClick={removeFromfavorites}
            >
              Remove From Favorites
            </button>
            ):(
              <button
              type="submit"
              className="handleButtons btn btn-secondary"
              onClick={addTofavorites}
            >
              Add to favorites
            </button>
            )}
            </>

 ) )}
          </div>
        </div>
      </div>
      <Modal show={resModalShow} onHide={handleResModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reserve</Modal.Title>
        </Modal.Header>
        <Modal.Body><Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>From Date</Form.Label>
        <Form.Control type="date" defaultValue="From Date" onChange={e => resDate.current.fromDate = e.target.value}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>To Date</Form.Label>
        <Form.Control type="date" defaultValue="To Date" onChange={e => resDate.current.toDate = e.target.value}/>
      </Form.Group>
    </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleResModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleResModalSubmit}>
          Submit
          </Button>
        </Modal.Footer>


      </Modal>

      <Modal show={rateComShow} onHide={handleRateComClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rate and Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body><Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Rating</Form.Label>
        <Form.Control type="rating" defaultValue="1 - 10" onChange={e => resDate.current.rating = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={e => resDate.current.comment = e.target.value}/>
      </Form.Group>
    </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRateComClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRateComSubmit}>
          Submit
          </Button>
        </Modal.Footer>


      </Modal>

      <Modal show={updatePropShow} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicFname">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" defaultValue={property.title} onChange={e => propertyInfo.current.title = e.target.value} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLname">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" defaultValue={property.description} onChange={e => propertyInfo.current.description = e.target.value} />
        </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Property Type</Form.Label>
        <Form.Control type="email" defaultValue={property.property_type} onChange={e => propertyInfo.current.property_type = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Street</Form.Label>
        <Form.Control type="text" defaultValue={property.street} onChange={e => propertyInfo.current.street = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" defaultValue={property.city} onChange={e => propertyInfo.current.city = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>State</Form.Label>
        <Form.Control type="text" defaultValue={property.state} onChange={e => propertyInfo.current.state = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" defaultValue={property.country} onChange={e => propertyInfo.current.country = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="text" defaultValue={property.zipcode} onChange={e => propertyInfo.current.zip = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Daily Fee</Form.Label>
        <Form.Control type="text" defaultValue={property.daily_fee} onChange={e => propertyInfo.current.daily_fee = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Amenities</Form.Label>
        <Form.Control type="text" defaultValue={property.amenities} onChange={e => propertyInfo.current.amenities = e.target.value.split(",")} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cleaning Fee</Form.Label>
        <Form.Control type="text" defaultValue={property.cleaning_fee} onChange={e => propertyInfo.current.cleaning_fee = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Bedrooms</Form.Label>
        <Form.Control type="text" defaultValue={property.bedrooms} onChange={e => propertyInfo.current.bedrooms = e.target.value} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Bathrooms</Form.Label>
        <Form.Control type="text" defaultValue={property.bathrooms} onChange={e => propertyInfo.current.bathrooms = e.target.value} />
      </Form.Group>
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
          Submit
          </Button>
        </Modal.Footer>
        </Modal>
    </div>
  );
};

export default ListingProperties;
