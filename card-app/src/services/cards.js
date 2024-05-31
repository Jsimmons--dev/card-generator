import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { db } from '../firebaseConfig.js'
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getCardByOwner: builder.query({
      queryFn: async ({ email, docId }) => {
        try {
          const docRef = doc(db, "users", email, 'cards', `${docId}`);
          console.log(email, docId  )
          const docSnap = await getDoc(docRef);
          console.log(docSnap.exists())
          return { data: docSnap.data() }
        } catch (err) {
          console.log(err)
        }
      }
    }),
    getCardsByOwner: builder.query({
      queryFn: async (email) => {
        const cardsRef = collection(db, "users", email, 'cards');
        const docSnap = await getDocs(cardsRef);
        return { data: docSnap.docs.map(doc => ({ docId: doc.id, ...doc.data() })) }
      }
    }),
  }),
})

export const { useGetCardByOwnerQuery, useGetCardsByOwnerQuery } = cardApi