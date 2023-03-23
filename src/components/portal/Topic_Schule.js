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
    let user = await loginToMicroservis();

    if(user != null) {
        let data = await fetch("http://localhost:8022", {headers : {"authorization": "max"}});
        console.log("getData: ");
        console.log(data);
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

export async function loginToMicroservis() {
    let req = await fetch("http://localhost:8022/login", {
        method: "POST",
        body: JSON.stringify({username: "lostnumber", pasword: 123})
    });
    if (req.ok) {
        return await req.json()
    }
}

export default Topic_Schule;
