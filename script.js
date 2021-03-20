
              //function show current Hour GMT+1
              function date_heure(id)
              {
                date = new Date;
                annee = date.getFullYear();
                moi = date.getMonth();
                mois = new Array('Janvier', 'F&eacute;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao&ucirc;t', 'Septembre', 'Octobre', 'Novembre', 'D&eacute;cembre');
                j = date.getDate();
                jour = date.getDay();
                jours = new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
                h = date.getHours();
                if(h<10)
                {
                  h = "0"+h;
                }
                m = date.getMinutes();
                if(m<10)
                {
                  m = "0"+m;
                }
                s = date.getSeconds();
                if(s<10)
                {
                  s = "0"+s;
                }
                resultat = h+':'+m+':'+s;
                document.getElementById(id).innerHTML = resultat;
                setTimeout('date_heure("'+id+'");','1000');
                return true;
              }
              
              
              // Start Api
              
              
              
              let form = document.querySelector("form#meteoform");
              if (form) { 
                
                form.addEventListener('submit' , e => { 
                  
                  e.preventDefault() ; 
                  
                  let $city = document.getElementById("userinput").value; 
                  document.getElementById("demo").innerHTML = $city // Get the user input
                  
                  let city =  document.getElementById("demo").innerHTML
                  
                  let xhr = new XMLHttpRequest();
                  
                  let apiurl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=153112fa07f0e486bfa89f9d7db731ae&lang=fr&units=metric" // Include city shosen in the api openweatherMap
                  
                  if (apiurl)
                  
                  {
                    xhr.open("GET", apiurl , true);
                    xhr.onload = function (e) {
                      if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                          let response = JSON.parse(xhr.responseText); // Tranfsorm data to json
                          
                          
                          //Show the weather
                          let description = response.weather[0].description
                          document.getElementById("description").innerHTML = description 
                          
                          
                          
                          // Show the  city 
                          let cityname = response.name
                          document.getElementById("cityname").innerHTML = cityname
                          
                          // show icons
                          let imgsource ="http://openweathermap.org/img/wn/"+response.weather[0].icon+".png"
                          document.getElementById("img").src=imgsource;

                              //show Temperature 
                              let temp = response.main.temp_min  
                              document.getElementById("demo").innerHTML = Math.round(temp)+' C°' ; // math.round(temp) to show the exact celius 

                                     //show Coord lon
                          let coordlon = "Longtitude  : " +response.coord.lon
                          document.getElementById("Longtitude").innerHTML= coordlon
                          
                          //show Coord lat
                          let coordlan = "Latitude : " +response.coord.lat
                          document.getElementById("Latitude").innerHTML= coordlan

                          
                          // background image conditions
                          if(response.weather[0].main ==="Clouds") {
                            
                            document.body.style.backgroundImage="url('https://i.pinimg.com/originals/c3/66/6d/c3666d78c57aae8132f34a6ec6a2dde1.gif')";
                            
                          }else if (response.weather[0].main ==="Thunderstorm") {
                            
                            document.body.style.backgroundImage="url('https://media.tenor.com/images/7db52216a710e7a262715266b548eceb/tenor.gif')";
                          }
                          else if (response.weather[0].main ==="Drizzle") {
                            
                            document.body.style.backgroundImage="url('https://i.pinimg.com/originals/de/52/d2/de52d28007cb8b8679436504dd1a89ae.gif')";
                          }
                          else if (response.weather[0].main === "Rain") {
                            
                            document.body.style.backgroundImage="url('https://thumbs.gfycat.com/SomeVillainousHydra-small.gif')";
                            
                          }
                          else if (response.weather[0].main ==="Snow") {
                            
                            document.body.style.backgroundImage="url('https://thumbs.gfycat.com/UltimateEcstaticArawana-size_restricted.gif')";
                          }else { 
                            document.body.style.backgroundImage="url('https://media3.giphy.com/media/WxK5PIZnukRqksLYAx/giphy.gif')" ;
                          }

                        }else {
                          
                          console.error(xhr.statusText);
                        }
                      }
                      
                    };
                    xhr.onerror = function (e) {
                      console.error(xhr.statusText);
                    };
                    xhr.send(null);
                  }
                })
                }