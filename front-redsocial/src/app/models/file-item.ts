export class FileItem {
  public archivo: File;
  public nombreArchivo: string;
  public url: string = '';
  public estaSubiendo: boolean = false;
  public cargando: boolean = false;
  public completo: boolean = false;
  public error: boolean = false;
  constructor(archivo: File) {
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;

  }
}
