export interface usersInterface {
    nombre:String  | null,
    apellido:String | null,
    edad: number | null,
    numero: String | null
}



export interface usersInterfacePut {
    


    id: number ,
    nombre:String | null,
    apellido:String | null,
    edad: number | null,
    numero: String | null
}


export interface putError {
    error: { numero: string | undefined, nombre?: string | undefined, apellido?:string | undefined, Error?: string | undefined, id?: number |undefined, edad?: number | undefined  },
}

export interface putNext {
    nombre: string,
    apellido: string,
    numero: String,
    edad:number

}


export interface error {
    nombre?: string | undefined
    apellido?: string | undefined
    Error?: string | undefined
    edad? : number  | undefined
    id? : number | 0,
    numero?: string | undefined
}


export interface usersDataMapping {
    apellido?: string,
    old?: {Error?: string},
    nombre?: string
}
