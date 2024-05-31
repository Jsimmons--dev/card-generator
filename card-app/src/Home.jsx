import { Link, useSearchParams } from "react-router-dom";
import { useGetCardsByOwnerQuery } from "./services/cards";
import { useSelector } from "react-redux";
import { auth } from "./authProvider";
      import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home({}){
  let [searchParams, setSearchParams] = useSearchParams();

  const [user] = useAuthState(auth);
  const { data, error, isLoading } = useGetCardsByOwnerQuery(user.email)
  console.log(data)
  return (
    <div>
      <h3>{searchParams.get('email')}</h3>
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && data.map(card => <li key={card.cardName}><Link to={`/card-viewer/${card.docId}`}>{card.cardName}</Link></li>)}
    </div>
  )

}