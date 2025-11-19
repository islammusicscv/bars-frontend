import Card from "./Card.tsx";
import {useEffect, useState} from "react";
import type {Location} from '../interfaces/location.ts';
import axios from "axios";

const Album = () => {
    const[locations,setLocations] = useState<Location[]>([]);

    const getData = async () => {
        const res = await axios.get<Location[]>("http://localhost:3000/locations");

        if (res.status === 200) {
            setLocations(res.data);
            console.log(res.data);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    return (
      <>
          <div className="album py-5 bg-body-tertiary">
              <div className="container">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                      {locations.map((location)=>(
                        <Card key={location.id} location={location}/>
                      ))}
                  </div>
              </div>
          </div>
      </>
  )
}
export default Album;