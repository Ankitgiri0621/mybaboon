import { useState, useEffect } from "react";

const CMS = () => {
    const [data, setData] = useState(null);

    const callAPI = async () => {
        try {
            const response = await fetch("http://api.restful-api.dev/objects", {
                method: "GET",
            });
            const result = await response.json(); // or response.text() if the API returns plain text

            console.log(result);
            setData(Array.isArray(result) ? result : result.value ?? []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {   
        callAPI();
    }, []);
            
  return (
    <>
    
    <div className="table-top-container">
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Object Name </th>
                        <th> Color </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => (
                        <tr key= {item.id} >
                            <td> {item.id} </td>
                            <td> {item.name} </td>
                            <td> {item.data?.color ?? "N/A"} </td>
                            
                            <td>
                                <button className="btn btn-primary"> Edit </button>
                                <button className="btn btn-danger"> Delete </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>

    </>
  )
}

export default CMS