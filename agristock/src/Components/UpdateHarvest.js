import React, { useEffect, useState } from 'react'
import backendURL from '../Config/backendURL'
import { useParams } from 'react-router-dom'

const UpdateHarvest = () => {

    const harvestID = useParams().harvestID
    const [harvest, setHarvest] = useState({})

    console.log(harvestID)
    useEffect(() => {
        fetch(backendURL + `/getharvest?uuid=${harvestID}`)
        .then(response => response.json())
        .then(data => {
            setHarvest(data.harvest)
        })
    }, [])
  return (
    <div>
        UpdateHarvest
        <p>{harvest.uuid}</p>
        <p>{harvest.harvestOwner}</p>
        <p>{harvest.cropName}</p>
        {/* <button */}
    </div>

  )
}

export default UpdateHarvest