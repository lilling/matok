import { HttpClient } from '@angular/common/http';
import * as uuid from 'uuid';

export abstract class BaseService<T> {
  protected constructor(private http: HttpClient, private readonly urlPart: string) {}

  get(filter?: string) {
    return this.http.post<T[]>(this.urlPart, { where: { name: { contains: filter } } });
  }

  add(item: T) {
    return this.http.post<T>(`${this.urlPart}/add`, { ...item, id: uuid.v4() });
  }

  delete(id: string) {
    return this.http.delete<T>(`${this.urlPart}/${id}`);
  }

  update(id: string, item: T) {
    return this.http.put<T>(`${this.urlPart}/${id}`, item);
  }
}
