import React from 'react';

const DataTable = () => {
    const data = [
        { id: 1, name: '.CN Chinese', address: '228 city Road' ,postcode:'3Jh',rating : 5,typeOfFood : 'Chinese' },
        { id: 2, name: '007 Takeaway', address: '6 Drummond Street' ,postcode:'1HY',rating : 6,typeOfFood : 'Pizza' },
        { id: 3, name: '042 Restaurant & Bar', address: '885 High Road Leytonstone' ,postcode:'1HR',rating : 3,typeOfFood : 'African' },
        { id: 4, name: '042 Restaurant & Bar', address: '885 High Road Leytonstone' ,postcode:'1HR',rating : 3,typeOfFood :'African' },
        { id: 5, name: '042 Restaurant & Bar', address: '885 High Road Leytonstone' ,postcode:'1HR',rating : 3,typeOfFood : 'African' },
        { id: 6, name: '123 Chinese', address: 'Unit 4 Spencer House' ,postcode:'3DS',rating : 4.5,typeOfFood : 'Chinese' },
        { id: 7, name: '123 Chinese', address: 'Unit 4 Spencer House' ,postcode:'3DS',rating : 4.5,typeOfFood : 'Chinese' },
    ];

    return (
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%', margin: '20px auto' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Adress</th>
                    <th>Postcode</th>
                    <th>Rating</th>
                    <th>Type of Food</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.postcode}</td>
                        <td>{item.rating}</td>
                        <td>{item.typeOfFood}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;