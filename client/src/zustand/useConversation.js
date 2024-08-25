 import {create} from "zustand";

 const useConversation = create((set)=> ({
    selectedConversation : null,
    setSelectedConversation : (selectedConversation) => set( {selectedConversation} ),
    messages : [],
    setMessages : (messages) => set({ messages }),
    tempConversation : null,
    setTempConversation : (tempConversation) => set( {tempConversation} ),
 }));

 export default useConversation;