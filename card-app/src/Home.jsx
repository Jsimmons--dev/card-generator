import { Link, useSearchParams } from "react-router-dom";
import { useGetCardsByOwnerQuery, useOpenCardForOwnerMutation } from "./services/cards";
import { auth } from "./authProvider";
import { useAuthState } from 'react-firebase-hooks/auth';
import { colorsByRarity } from "./consts.mjs";

export default function Home({ }) {
  let [searchParams, setSearchParams] = useSearchParams();

  const [user] = useAuthState(auth);
  const { data, isLoading } = useGetCardsByOwnerQuery(user.email)
  const [useOpenCard, result] = useOpenCardForOwnerMutation()
  return (
    <div>
      <h3>{searchParams.get('email')}</h3>
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && data.map(card => {
        if(card.opened){
        return <li style={{color: colorsByRarity[card.rarity]}} key={card.docId}><Link style={{color: colorsByRarity[card.rarity]}} to={`/card-viewer/${card.docId}`}>{card.cardName}</Link></li>
        }else {
        return <li onClick={() => useOpenCard({email: user.email, docId: card.docId})} key={card.docId}><Link to={`/card-opener/${card.docId}`}>Unopened Card</Link></li>

        }
      })}
    </div>
  )

}