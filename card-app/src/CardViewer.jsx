import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom"
import { auth } from "./authProvider";
import { useGetCardByOwnerQuery } from "./services/cards";
import { messaging } from './firebaseConfig.js'

export default function CardViewer({ }) {
    const [user] = useAuthState(auth);
    const { cardId } = useParams()
    const { data: card, error, isLoading } = useGetCardByOwnerQuery({ email: user.email, docId: cardId })
    const [token, setToken] = useState(null)
    const cardFullArtUrl = () => `https://storage.googleapis.com/joshs_public_card_library/${card.theme}/${card.cardType}/${card.rarity}/${card.cardId}/art.png`
    getToken(messaging, { vapidKey: "BOn9hE0IqDaTwMj7mUFhP1K7cD4HJFudbBAAQSIz_MJOrawRmbgvobvsldTBoO21_ZCoHEMVcjkGCnwei3gi8Ow" }).then((currentToken) => {
        if (currentToken) {
            console.log(currentToken)
            setToken(currentToken)
            // Send the token to your server and update the UI if necessary
            // ...
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
                <>
                    <h1>Card Viewer</h1>
                    <p>
                        {card.cardName}
                    </p>
                    <p>{token}</p>
                    <img width='512' height='512' src={cardFullArtUrl()} />
                </>
            }
        </div>
    )
}