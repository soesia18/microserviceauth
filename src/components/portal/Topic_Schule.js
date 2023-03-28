import React from 'react';

const Topic_Schule = () => (
  <div>
    <h1>Schul Services</h1>

          <a href="http://35.158.248.217:8080" target="_blank" rel="noreferrer noopener" >
              <img src="./images/ServiceBibliothekAusleihe.png" class="service_link" alt="Bibliothek Ausleihe"></img>
          </a>


      <button onClick={getData}>Push me hard</button>
      <h2>Seite in Arbeit</h2>
      <p>Max und Michi waren hier</p>
      <div id="food"></div>
  </div>
);

async function getData() {
    let token = getCookie('token');

    if(token != null) {
        console.log(token);
        let data = await fetch("http://localhost:8022", {headers : {"authorization": token}});
        document.getElementById('food').innerHTML = "";
        data.json().then(categorie => {
            console.log(categorie);
            categorie.categories.forEach(category => {
                const p = document.createElement('p');
                p.innerHTML = category.strCategory;
                document.getElementById('food').appendChild(p);
            })
        })
    } else {
        alert("Failed Login");
    }

    //alert(await data.text());
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default Topic_Schule;
