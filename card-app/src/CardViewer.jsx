import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom"
import { auth } from "./authProvider";
import { useGetCardByOwnerQuery } from "./services/cards";

export default function CardViewer({ }) {
    const [user] = useAuthState(auth);
    const { cardId } = useParams()
    const { data, error, isLoading } = useGetCardByOwnerQuery({ email: user.email, docId: cardId })
    console.log(isLoading, data)
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
                <>
                    <h1>Card Viewer</h1>
                    {data.cardName}
                </>
            }
        </div>
    )
}