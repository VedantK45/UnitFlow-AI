import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

import Layout from "../components/layout/Layout";

import Button from "../components/ui/Button";

export default function Preview() {

    const location = useLocation();

    const navigate = useNavigate();

    const data = location.state;
    const handleRunTests = async () => {

    try {

        setLoading(true);

        const response = await api.post(

            `/run-tests/${data.run_id}`

        );

        navigate("/results", {

            state: response.data

        });

    }

    // catch (error) {

    //     console.error(error);

    //     alert("Failed to run tests.");

    // }
    catch (error: any) {

    console.error(error);

    console.log(error.response);

    console.log(error.response?.data);

    alert("Failed to run tests.");

}

    finally {

        setLoading(false);

    }

};
    const [loading, setLoading] = useState(false);

    if (!data) {

    return (

        <Layout>

            <h2>No generated tests found.</h2>

        </Layout>

    );

}
    return (

<Layout>

<div className="max-w-4xl mx-auto">

<h2 className="text-3xl font-bold mb-6">

Generated Test Cases

</h2>

<p className="mb-8">

Run ID :

<strong>

{data.run_id}

</strong>

</p>

<div className="space-y-4">

{

data.generated_tests.map(

(test:any,index:number)=>(

<div

key={index}

className="border border-slate-700 rounded-xl p-5 bg-slate-900"

>

<h3 className="font-semibold text-cyan-400">

{test.name}

</h3>

<p className="text-slate-400 mt-2">

{test.description}

</p>

</div>

)

)

}

</div>
<div className="mt-8">

<Button

text={loading ? "Running..." : "Run Tests"}

onClick={handleRunTests}

disabled={loading}

/>

</div>
</div>

</Layout>

);

}