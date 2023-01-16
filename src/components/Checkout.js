import React from "react";
import "../styles/Checkout.css";

const Checkout = ({ queryData }) => {
  const createAmazonLink = async (queryData) => {
    let baseUrl = "https://www.amazon.com/gp/aws/cart/add.html?";

    for (let i = 0; i < queryData.length; i++) {
      let asin = await searchSong([queryData[i]]);
      baseUrl += `ASIN.${i + 1}=${asin}&`;
    }

    window.open(baseUrl);
  };

  const searchSong = async (query) => {
    const searchResultsJSON = await googleSearch(query);
    const uriAsin = await searchResultsJSON.items[0].formattedUrl
      .match(/[^dp/]*$/g)[0]
      .slice(0, 10);

    return verifyAsins(uriAsin);
  };

  const googleSearch = async (query) => {
    const uri = "https://www.googleapis.com/customsearch/v1?";
    const cx = "d047d17383e574d7a";
    const key = "AIzaSyBqmZ730rjITUPla3QPb23PmILw_xw_L30";

    const searchResults = await fetch(`${uri}key=${key}&cx=${cx}&q=${query}`, {
      method: "GET",
      mode: "cors",
    });

    return await searchResults.json();
  };
  const verifyAsins = (uriAsin) => {
    if (/^(B[\dA-Z]{9}|\d{9}(X|\d))/g.test(uriAsin)) {
      return uriAsin;
    } else {
      // going to need a way to track what tracks were not found and display them to the user
      // store the track "info" prop
      console.error("ASIN NOT FOUND");
    }
  };

  return (
    <div className="Checkout" onClick={() => createAmazonLink(queryData)}>
      <div>Checkout </div>[ {queryData.length} ]
    </div>
  );
};

export default Checkout;
