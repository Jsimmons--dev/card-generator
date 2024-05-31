import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { db } from '../firebaseConfig.js'
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Card', 'CardList'],
  endpoints: (builder) => ({
    getCardByOwner: builder.query({
      queryFn: async ({ email, docId }) => {
        try {
          const docRef = doc(db, "users", email, 'cards', `${docId}`);
          const docSnap = await getDoc(docRef);
          return { data: docSnap.data() }
        } catch (err) {
          console.log(err)
        }
      },
      providesTags: ['Card']
    }),
    getCardsByOwner: builder.query({
      queryFn: async (email) => {
        const cardsRef = collection(db, "users", email, 'cards');
        const docSnap = await getDocs(cardsRef);
        return { data: docSnap.docs.map(doc => ({ docId: doc.id, ...doc.data() })) }
      },
      providesTags: ['CardList']
    }),
    openCardForOwner: builder.mutation({
      queryFn: async ({ email, docId }) => {
        try {
          const docRef = doc(db, "users", email, 'cards', `${docId}`);
          await updateDoc(docRef, {
            opened: true
          });
        } catch (err) {
          console.log(err)
        }
      },
      invalidatesTags: ['CardList', 'Card']
    }),
  }),
})

export const { useGetCardByOwnerQuery, useGetCardsByOwnerQuery, useOpenCardForOwnerMutation } = cardApi