import { db, storage } from '../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from '@firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';

export interface Event {
  id?: string;
  title: string;
  description: string;
  descriptionTitle: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  registrationLink: string;
  createdAt?: Date;
}

export const getEvents = async (): Promise<Event[]> => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Event[];
  } catch (error) {
    console.error('Error getting events:', error);
    return [];
  }
};

export const addEvent = async (event: Event, imageFile?: File): Promise<string | null> => {
  try {
    let imageUrl = event.image;
    
    if (imageFile) {
      const storageRef = ref(storage, `events/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const docRef = await addDoc(collection(db, 'events'), {
      ...event,
      image: imageUrl,
      createdAt: new Date()
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding event:', error);
    return null;
  }
};

export const updateEvent = async (eventId: string, event: Event, imageFile?: File): Promise<boolean> => {
  try {
    let imageUrl = event.image;
    
    if (imageFile) {
      const storageRef = ref(storage, `events/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    await updateDoc(doc(db, 'events', eventId), {
      ...event,
      image: imageUrl
    });

    return true;
  } catch (error) {
    console.error('Error updating event:', error);
    return false;
  }
};

export const deleteEvent = async (eventId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'events', eventId));
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
  }
}; 