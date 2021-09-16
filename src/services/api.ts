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