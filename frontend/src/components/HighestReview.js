import { useState, useEffect } from "react";

function HighestReview() {
    const [highest, setHighest] = useState([]);

    async function fetchMessage() {
        try {
            const res = await fetch("http://localhost:5000/api/get-highest")
            const json = await res.json();
            setHighest(json.data);
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
        } catch (e) {
            console.error(`Error: ${e}`);
        }
    }

    useEffect(() => {
        fetchMessage();
    }, []);

    return ( 
        <div>
            <ol>
                {highest.map((item) => (
                    <li key={item.id}>{item.message}</li>
                ))}
            </ol>
        </div>
     );
}

export default HighestReview;