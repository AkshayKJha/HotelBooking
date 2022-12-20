// import jQuery from 'jquery';
import React, { useState, useRef } from "react";
import "./listings.css";
// var element = document.getElementById("listingA");
// // var element2 = document.getElementById("carouselExampleCaptions");
// var element3 = document.getElementById("showPage");
const ListingReservations = (props) => {
  // const [showListing, setshowListing] = useState(true);
  const [reservation, setReservation] = useState([{}]);
  var amenity = useRef([]);
  const deleteReservation=async (e,listing)=>{
    const res = await fetch("http://localhost:3000/reservations/"+listing._id,{
      method:'DELETE',
      headers : { 
        'Content-Type': 'application/json',
         'Accept': 'application/json'
      }
    });
    const usr = await res.text;
    console.log("lobo");
    console.log(usr);
    window.alert("Successfully deleted Reservation");
    props.setgetrev(false)
    // element.classList.remove("hide-element");
    // // element2.classList.remove("hide-element");
    // element3.classList.add("hide-element");

  }
  // var element = document.getElementById("listingB");
  // // var element2 = document.getElementById("carouselExampleCaptions");
  // var element3 = document.getElementById("showPage");
  // var element4 = document.getElementById("Destination");
  // var element5 = document.getElementById("filterwidget");
  // var element6 = document.getElementById("returnHome");
  // var element7 = document.getElementById("booksubmit");
  // element6.addEventListener("click", (e) => homepage());
  function homepage() {
    // element.classList.remove("hide-element");
    // // element2.classList.remove("hide-element");
    // element3.classList.add("hide-element");
    // element7.textContent = "Submit";
    // element4.removeAttribute("disabled");
    // element5.classList.remove("hide-element");
    // element6.innerHTML = "";
    // element6.classList.remove("returnBack");
    props.setgetrev(false)
  }

  let reservationDetail = (e, listing) => {
    // element.classList.add("hide-element");
    // element2.classList.add("hide-element");
    // element3.classList.remove("hide-element");
    // element4.setAttribute("disabled", "");
    // // element4.setreservation(false)
    // element5.classList.add("hide-element");
    // element6.innerHTML =
    //   '<button type="submit" class="loginFields btn btn-secondary">Return to home page</button>';
    // element6.classList.add("returnBack");
    // element7.textContent = "Book";
    setReservation(listing);
    // amenity.current=listing.amenities;
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
  };

  return (
    <div>
     
      <div id="listingB" className="row houseList ">
      <button
              type="submit"
              className="returnBack btn btn-secondary"
              onClick={(e) => {
                homepage();
              }}
            >
              Return to home page
              </button>
        {props.listingRess.map((listing) => (
          <div className="col-md-4 col-sm-12">
            <div
              className="card house text-center btn"
              onClick={(e) => reservationDetail(e, listing)}
            >
              {/* <img
                className="card-img-top rounded"
                src={listing.thumbnail}
                alt="ListingImages"
              /> */}
              <div className="card-body housedesc text-start font-weight-bold text-decoration">
                <p className="costrating">
                  <div className="costdesc card-text">
                 Start Date: { new Date(listing.start_date.slice(0,10)).toDateString()}
                  </div>{" "}
                  <div className="costdesc card-text">
                 End Date: { new Date(listing.end_date.slice(0,10)).toDateString()}
                  </div>{" "}
                 
                </p>
                <h3>{listing.property_title}</h3>
                <h6>{listing.reservations_status}</h6>
                { ((new Date(listing.start_date)-new Date())/(1000*60*60*24))>2?(<button
              type="submit"
              className="returnBack btn btn-secondary"
              onClick={(e) => deleteReservation(e, listing)}
            >Delete Reservation  
            </button>):(<></>)}
              
                {/* <p className="amendesc">
                  {listing.amenities[0]}•{listing.amenities[1]}•
                  {listing.amenities[2]}•{listing.amenities[3]}
                </p> */}
              </div>
            </div>
          </div>
        ))}
        <div class="pagetogg">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item disabled ">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
    </div>
  );
};

export default ListingReservations;
