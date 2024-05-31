import { useSearchParams } from "react-router-dom";

export default function Home({}){
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('email'))
  return (
    <div>
        {searchParams.get('email')}
    </div>
  )

}