// src/app/services/data.service.ts

import { Injectable } from '@angular/core';
import { Observable, finalize, forkJoin, map, switchMap, tap } from 'rxjs';
import { Firestore, collectionData, collection, doc, docData, Timestamp, query, DocumentSnapshot, DocumentData, getDocs } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';




export interface Notif {
  id?: string;
  Title: string;
  alertMessage: string;
  date: Timestamp;
  humidity: string;
  temperature: string;
}
 

export interface TotalHarvest {
  id?: string;
  date_harvested: string;
  grams: number;
  remarks: string;
}


export interface batch {
  id?: string;
  batch_code: string,
  batch_planted: Timestamp,
  batch_remarks: string;
  batch_total_bags: number;
  batch_total_removed: number;
}

export interface test {
  id?: string;
  date_harvested: string;
  grams: number;
  remarks: string;
}




@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private firestore: Firestore,) {
    
  }




  getNotif1(): Observable<Notif[]> {
    const notifRef = collection(this.firestore, 'user/123456/notifications');
    return collectionData(notifRef, { idField: 'id' }).pipe(
      map((notifArray: Notif[]) => {
        // Update each notif to include formattedDate property
        return notifArray.map((notifications) => ({
          ...notifications,
          formattedDate: this.formatDate(notifications.date),
        }));
      })
    );
  }

 formatDate(date: Timestamp): string {
  const dateObject = new Date(date.seconds * 1000); // Convert seconds to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };

  return dateObject.toLocaleDateString('en-US', options);
}

  getNotifById(id): Observable<Notif> {
    const noteDocRef = doc(this.firestore, `user/123456/notifications/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Notif>;
  }

  
  //total harvest
  getTotalharvest(): Observable<TotalHarvest[]> {
    const notifRef = collection(this.firestore, 'user/123456/harvest record');
    return collectionData(notifRef, { idField: 'id' }) as Observable<TotalHarvest[]>;
  }


  //total batch bags
  getBatchBags(): Observable<batch[]> {
    const notifRef = collection(this.firestore, 'user/123456/batch');
    return collectionData(notifRef, { idField: 'id' }) as Observable<batch[]>;
  }


  getTest2(batchId: string): Observable<any[]> {
    const notifRef = collection(this.firestore, `user/123456/batch/${batchId}/batch_harvest`);
    return collectionData(notifRef, { idField: 'id' }).pipe(
      map((harvestedData: any[]) => {
        return harvestedData.map((data) => ({
          id: data.id,
          grams: data['grams'], // Use ['grams'] to access properties dynamically
          // Add other properties as needed
        }));
      })
    );
  }


  //  total harvest by batch lists
  // getBatchHarvestForAll(): Observable<any[]> {
  //   return this.getBatchBags().pipe(
  //     switchMap((batches) => {
  //       const observables = batches.map((batch) =>
  //         this.getTest2(batch.id).pipe(
  //           map((harvestedData) => {
  //             const gramsSum = harvestedData.reduce((sum, data) => sum + data.grams, 0);
  //             console.log('Grams Sum:', gramsSum);
  //             return {
  //               batchID: batch.id,
  //               gramsSum: gramsSum,
  //             };
  //           }),
  //         )
  //       );
  //       return forkJoin(observables).pipe(
  //         tap(data => console.log('Emitted Data:', data)),
  //         finalize(() => console.log('getBatchHarvestForAll completed'))
  //       );
  //     })
  //   );
  // }


    
  async allHarvestedGrams(): Promise<number> {
    const userDocRef = doc(this.firestore, 'user', '123456');
    const batchCollectionRef = collection(userDocRef, 'batch');
    const q = query(batchCollectionRef);
    const querySnapshot = await getDocs(q);

    let totalGrams = 0;
    const promises: Promise<void>[] = [];
    querySnapshot.forEach(async (batchDoc: DocumentSnapshot<DocumentData>) => {
      const batchHarvestCollectionRef = collection(batchDoc.ref, 'batch_harvest');
      const harvestDocsSnapshotPromise = getDocs(batchHarvestCollectionRef);

      promises.push(
        harvestDocsSnapshotPromise.then((harvestDocsSnapshot) => {
          harvestDocsSnapshot.forEach((harvestDoc) => {
            const harvestData = harvestDoc.data();
            if (harvestData && harvestData['grams']) {
              totalGrams += harvestData['grams'];
            }
          });
        })
      );
    });

    // Wait for all promises to resolve before returning the totalGrams
    await Promise.all(promises);

    return totalGrams;
  }
}







