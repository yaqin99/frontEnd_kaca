export default class Api {
    private static host = 'http://localhost:8181';

   public static getTampil(path:string,arr:any):Promise<any>{
       return new Promise (async (resolve,reject)=>{
            try {
                const response = await fetch(this.host + path);
                const data = await response.json();
                
                if(data.length > 0 ){
                    data.forEach((d: any) => {
                      arr.push({
                        nama : d.nama , 
                        hp : d.hp, 
                        alamat : d.alamat,
                      })
                    });
                  }
            }
            catch(err){
                reject(err)
            }
       });
   }
   public static getJenis(path:string,arr:any):Promise<any>{
       return new Promise (async (resolve,reject)=>{
            try {
                const response = await fetch(this.host + path);
                const data = await response.json();
                
                if(data.length > 0 ){
                    data.forEach((d: any) => {
                      arr.push({
                        id:d.id,
                        nama : d.nama , 
                        panjang : d.panjang, 
                        lebar : d.lebar,
                        tebal : d.tebal,
                      })
                    });
                  }
            }
            catch(err){
                reject(err)
            }
       });
   }
   public static getTransaksi(path:string,arr:any):Promise<any>{
       return new Promise (async (resolve,reject)=>{
            try {
                const response = await fetch(this.host + path);
                const data = await response.json();
                
                if(data.length > 0 ){
                    data.forEach((d: any) => {
                      arr.push({
                        tanggal:d.tanggal,
                        nama : d.nama , 
                        total : d.total, 
                      })
                    });
                  }
            }
            catch(err){
                reject(err)
            }
       });
   }
   public static getStok(path:string,arr:any,stok?:number,jumlah?:number):Promise<any>{
       return new Promise (async (resolve,reject)=>{
            try {
                const response = await fetch(this.host + path);
                const data = await response.json();
                
                if(data.length > 0 ){
                    data.forEach((d: any) => {
                      arr.push({
                        id_jenis_kaca:d.id_jenis_kaca,
                        nama : d.nama , 
                        panjang : d.panjang , 
                        lebar : d.lebar , 
                        tebal : d.tebal , 
                        tanggal:d.tanggal , 
                        harga : d.harga , 
                        stok : d.stok , 
                        optional_stok:stok,
                        jumlah:jumlah,
                      })
                    });
                  }
            }
            catch(err){
                reject(err)
            }
       });
   }
    
    public static postResource(path: string, data: any, method: string = 'POST'): Promise<any> {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await fetch(this.host + path, {
              method: method,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            resolve(response.json());
          } catch (err) {
            reject(err);
          }
        });
      }

      public static  putResource(path: string, data: any, method: string = 'PUT'): Promise<any> {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await fetch(this.host + path, {
              method: method,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            resolve(response.json());
          } catch (err) {
            reject(err);
          }
        });
      }
      
      public static deleteResource(path:string ,method:string = 'DELETE'):Promise<any>{
        return new Promise(async( resolve, reject) => {
          try {
           const response = await fetch( this.host + path , {
             method:method, 
             headers: {
               'Content-Type' : 'application/json'
             }
           })
           resolve(response.json())
          }
          catch(err){
            reject(err)
          }
        })
      }
    
}