import { Suspense } from "react";
import EditReviewClient from "@/app/components/editReviewClient";

const EditReview = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <EditReviewClient />
            </Suspense>
        </>)
}

export default EditReview;