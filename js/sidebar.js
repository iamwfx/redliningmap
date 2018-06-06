function makeSidebar(d){
  return `
    <h1>
      Tax Lot
    </h1>
    <p>
    <h2 style="font-size:13;">Borough: ${d.data.borough} \t Block: ${d.data.block} \t Lot: ${d.data.lot}</h2>
    <h2 style="font-size:13;">Address: <a href="https://zola.planning.nyc.gov/lot/${d.data.borocode}/${d.data.block}/${d.data.lot}" target="_blank"> ${d.data.address} </a></h2>
    </p>
    <br>
    <div class="boxed">
    <p>
    Primary Zoning District: ${d.data.zonedist1}<br>
    Owner: <span>${d.data.ownername}</span><br>
    Lot Area: <span>${commaSeperateThousands(d.data.lotarea)} sq ft</span><br>
    Maximum Allowable FAR:
    <ul>
    <li> Residential FAR: <span>${d.data.residfar}</span><br>
    <li> Commercial FAR: <span>${d.data.commfar}</span><br>
    <li> Facilities FAR: <span>${d.data.facilfar}</span><br>
    </ul>
    </p>
    <p>
    Year Built: <span>${d.data.yearbuilt}</span><br>
    Year Altered: <span>${d.data.yearalter1}</span><br>
    Building Class: <span>${d.data.bldgclass}</span><br>
    Land to Building Ratio: ${d.data.bldg_land_ratio}<br>
    Building Permits: Not Implemented <br>
    Building Info: <span><a href="http://a810-bisweb.nyc.gov/bisweb/PropertyBrowseByBBLServlet?allborough=${d.data.borocode}&allblock=${d.data.block}&alllot=${d.data.lot}&go5=+GO+&requestid=0" target="_blank"> BISWEB </a></span><br>

        Property Records:
         <span>
          <a href="http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${d.data.borocode}&block=${d.data.block}&lot=${d.data.lot}" target="_blank">
            View ACRIS
          </a>
        </span>
    <br>
    </p>
    </div>
    <br>
    <h2> Neighborhood Information </h2>
    <div class="boxed">
    <p>
    Median Household Income (2016): $${commaSeperateThousands(Math.round(d.data.median_hh_income*100)/100)}<br>
    Population Growth: <span>${Math.round(d.data.pop_density_change*100)/100}%</span><br>
    2017 Crime within Quarter Mile: <br>
    <li> Misdemeanors: ${d.data.misdemeanors_400m}<br>
    <li> Felonies: ${d.data.felonies_400m}<br>
    MTA Ridership Growth (2014 - 15): ${Math.round(d.data.nearest_subway_yoy2015_2016*100)/100}<br>
    Distances to Nearest Community Facilities:
    <ul>
    <li> Child Care and Pre-K: ${Math.round(d.data.child_care_prek_distance*100)/100}
    <li> Library: ${Math.round(d.data.libraries_distance*100)/100}
    <li> School (K-12): ${Math.round(d.data.schools_distance*100)/100}
    <li> Health Care: ${Math.round(d.data.healthcare_distance*100)/100}
    <li> Public Safety (NYPD and NYCHA): ${Math.round(d.data.police_station_distance*100)/100}
    <li> Emergency Services (FDNY): ${Math.round(d.data.fire_station_distance*100)/100}
    </ul>
    </p>
    </div>
    <br>
    <h2> Council District </h2>
    <div class="boxed">
    <p>
    Council District: ${d.data.council}<br>
    Council District Neighborhoods: ${d.data.council_neighborhood}<br>
    Council Representative: ${d.data.council_rep_name}<br>
    Next election: ${d.data.next_election}<br>
    </p>
    </div>
    <br>
    <h2> Community Board </h2>
    <div class="boxed">
    <p>
    Community Board: ${d.data.borough} ${d.data.cd.toString().slice(1,3)}<br>
    Top Three Issues:
    <ol>
    <li>${d.data.son_issue_1}
    <li>${d.data.son_issue_2}
    <li>${d.data.son_issue_3}
    </ol>
    </p>
    </div>
        `
  };
