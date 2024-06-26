import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom"
import { auth } from "./authProvider";
import { useGetCardByOwnerQuery } from "./services/cards";
import { colorsByRarity } from "./consts.mjs";

export default function CardOpener({ }) {
    const [user] = useAuthState(auth);
    const { cardId } = useParams()
    const { data: card, error, isLoading } = useGetCardByOwnerQuery({ email: user.email, docId: cardId })
    const cardFullArtUrl = () => `https://storage.googleapis.com/joshs_public_card_library/${card.theme}/${card.cardType}/${card.rarity}/${card.cardId}/art.png`
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
                <>
                    <h1>Card Opener</h1>
                    <p>
                        {card.cardName}
                    </p>
                    <p style={{ color: colorsByRarity[card.rarity] }}>{card.rarity}</p>
                    <img width='512' height='512' src={cardFullArtUrl()} />
                </>
            }
        </div>
    )
}