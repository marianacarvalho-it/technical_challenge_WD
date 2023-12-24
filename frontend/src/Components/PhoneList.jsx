/* import React from 'react'; */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import './PhoneList.css';

function PhoneList() {
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhone, setSelectedPhone] = useState(null);

    const selectPhone = phone => {
        setSelectedPhone(phone);
    };

        useEffect(()=>{
            axios.get('http://localhost:5005/phones')
            .then(response =>{
                setPhones(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching phone data.', error);
                setLoading(false)
            })
        }, []);

        if (loading){
            return <Spinner/>
        }

        return(
            <div className='wrapper'>
                <div className='container'>
                    <div className='phone-list'>
                        <h1>Phone List</h1>
                        <ul>
                            {phones.map(phone => (
                                <li key={phone.id} onClick={() => selectPhone(phone)}>
                                    <img src={`assets/images/${phone.imageFileName}`} alt={phone.name}/>
                                    {phone.name} - {phone.manufacturer}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {selectedPhone && (
                        <div className='phone-display'>
                                <img src= {`/assets/images/${selectedPhone.imageFileName}`}/>
                                <h2>{selectedPhone.name}</h2>
                                <p><span>Manufacturer: </span>{selectedPhone.manufacturer}</p>
                                <p>{selectedPhone.description}</p>
                                <p><span>Color: </span>{selectedPhone.color}</p>
                                <p><span>Price: </span>{selectedPhone.price}</p>
                                <p><span>Screen: </span>{selectedPhone.screen}</p>
                                <p><span>Processor: </span>{selectedPhone.processor}</p>
                                <p><span>Ram: </span>{selectedPhone.ram}</p>
                        </div>
                    )}
                </div>
            </div>
        );
}

export default PhoneList;